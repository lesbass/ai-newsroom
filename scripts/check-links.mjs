import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const dist = resolve('dist');
const baseUrl = process.env.CHECK_URL || '';

function* walkAll(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    let s;
    try { s = statSync(path); } catch { continue; }
    if (s.isDirectory()) yield* walkAll(path);
    else yield path;
  }
}

function* walkPages(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    let s;
    try { s = statSync(path); } catch { continue; }
    if (s.isDirectory()) yield* walkPages(path);
    else if (path.endsWith('.html') || path.endsWith('.xml')) yield path;
  }
}

let errors = 0;
const files = new Set();

// Build file map from dist/
for (const path of walkAll(dist)) {
  const rel = path.slice(dist.length).replace(/\\/g, '/');
  files.add(rel);
  if (rel.endsWith('/index.html')) files.add(rel.replace(/\/index\.html$/, '/'));
}

// Same-origin absolute links (https://news.lesbass.com/...) are internal links too.
// They must resolve to a built file, a declared `_redirects` rule, or a redirect
// implemented in the Worker, otherwise they silently ship as 404s (e.g. the
// /paperclip/AIN-### provenance links found in the 2026-10-08 audit).
const CANONICAL_ORIGIN = 'https://news.lesbass.com';
const redirectSources = [];
const redirectRules = [];
const redirectsPath = resolve('public/_redirects');
if (existsSync(redirectsPath)) {
  for (const line of readFileSync(redirectsPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [from, to, code] = trimmed.split(/\s+/);
    if (from?.startsWith('/')) {
      redirectSources.push(from);
      redirectRules.push({ from, to, code });
    }
  }
}

// Exact-path 301s must cover both request forms. Astro serves pages with a
// trailing slash and Cloudflare matches `_redirects` literally, so a rule for
// `/old` alone still leaves `/old/` as a 404 — the form legacy links, RSS
// entries, and old sitemaps actually used (AIN-1035).
const exactRedirectSources = new Set(redirectSources);
for (const { from, code } of redirectRules) {
  if (code !== '301') continue;
  // Wildcard/splat/placeholder rules match both forms themselves, and `/` has
  // no meaningful slashless variant.
  if (from === '/' || from.includes('*') || from.includes(':')) continue;
  const alternate = from.endsWith('/') ? from.slice(0, -1) : `${from}/`;
  if (!exactRedirectSources.has(alternate)) {
    console.error(`❌ _redirects: 301 for ${from} has no ${alternate} variant`);
    errors++;
  }
}

function resolvesToBuiltFile(pathname) {
  if (files.has(pathname)) return true;
  if (files.has(pathname + '/index.html')) return true;
  if (files.has(pathname.replace(/\/$/, '') + '.html')) return true;
  return false;
}

function isRedirected(pathname) {
  return redirectSources.some((from) => {
    if (from.endsWith('/*')) return pathname.startsWith(from.slice(0, -1));
    return from === pathname;
  });
}

// `src/worker.js` 301s `/paperclip/AIN-###` provenance links to the public
// Paperclip issue pages before the assets handler runs. Those paths never exist
// in `dist/` or `_redirects`, so model that rule here to avoid false 404s.
const workerRedirectPrefixes = ['/paperclip/'];
function isWorkerRedirected(pathname) {
  return workerRedirectPrefixes.some(
    (prefix) => pathname.startsWith(prefix) && pathname.length > prefix.length,
  );
}

const pagePaths = [...walkPages(dist)];

// Cross-page fragments need their own check. A link such as
// `/editorial-standards/#high-risk-claims` passes the path gate even when the
// target heading is renamed: the browser loads the page and silently stays at
// the top. Map every built HTML page to its file so the fragment can be
// resolved against the real document instead of trusting the path alone.
const htmlFilesByPath = new Map();
function registerPagePath(pathname, file) {
  htmlFilesByPath.set(pathname, file);
  if (pathname.length > 1) htmlFilesByPath.set(pathname.replace(/\/$/, ''), file);
}
for (const path of pagePaths) {
  if (!path.endsWith('.html')) continue;
  const relPath = path.slice(dist.length).replace(/\\/g, '/');
  if (relPath.endsWith('/index.html')) {
    registerPagePath(relPath.slice(0, -'index.html'.length), path);
  } else {
    registerPagePath(relPath, path);
  }
}

const fragmentTargets = new Map();
function hasFragmentTarget(file, fragment) {
  if (fragment === 'top') return true; // implicit browser target
  let ids = fragmentTargets.get(file);
  if (!ids) {
    const text = readFileSync(file, 'utf-8');
    ids = new Set(
      [...text.matchAll(/\b(?:id|name)\s*=\s*["']([^"']+)["']/g)].map((m) => m[1]),
    );
    fragmentTargets.set(file, ids);
  }
  return ids.has(fragment);
}

function checkCrossPageFragment(sourceRel, pathname, hash) {
  if (!pathname || !hash || hash === '#') return;
  const file =
    htmlFilesByPath.get(pathname) ?? htmlFilesByPath.get(pathname.replace(/\/$/, ''));
  // Redirects and worker-served paths have no built document to inspect; their
  // path resolution is already covered above.
  if (!file) return;
  let fragment;
  try {
    fragment = decodeURIComponent(hash.slice(1));
  } catch {
    fragment = hash.slice(1);
  }
  if (!fragment) return;
  if (!hasFragmentTarget(file, fragment)) {
    console.error(`❌ ${sourceRel} → broken cross-page anchor: ${pathname}#${fragment}`);
    errors++;
  }
}

if (pagePaths.length === 0 && baseUrl) {
  console.log(`ℹ No HTML pages in dist/ — checking links from ${baseUrl}`);
  const pages = ['/', '/articles/', '/tags/', '/corrections/',
    '/articles/openai-broadcom-jalapeno-inference-chip/',
    '/articles/codebase-memory-mcp-zero-dependency-code-intelligence/',
  ];
  for (const p of pages) {
    try {
      const resp = await fetch(`${baseUrl.replace(/\/$/, '')}${p}`);
      if (resp.ok) {
        const html = await resp.text();
        const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
        for (const href of hrefs) {
          if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('data:') || href === '/') continue;
          if (!href.startsWith('/') && !href.startsWith('./') && !href.startsWith('../')) continue;
          try {
            const target = new URL(href, `${baseUrl}${p}`).toString();
            const r = await fetch(target, { method: 'HEAD' });
            if (r.status >= 400 && r.status !== 403) {
              console.error(`❌ ${p} → broken link: ${href} (HTTP ${r.status})`);
              errors++;
            }
          } catch { /* skip unreachable */ }
        }
      }
    } catch { /* skip unreachable pages */ }
  }
} else if (pagePaths.length === 0) {
  console.warn('⚠ No HTML pages found in dist/ and no CHECK_URL set. Run with CHECK_URL=https://news.lesbass.com for live checks.');
}

for (const path of pagePaths) {
  const rel = path.slice(dist.length).replace(/\\/g, '/');
  const html = readFileSync(path, 'utf-8');
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const href of hrefs) {
    // Same-origin absolute links must resolve to a built file or a redirect rule.
    if (href === CANONICAL_ORIGIN || href.startsWith(CANONICAL_ORIGIN + '/')) {
      let url;
      try { url = new URL(href); } catch { continue; }
      const pathname = url.pathname;
      if (
        pathname !== '/' &&
        !resolvesToBuiltFile(pathname) &&
        !isRedirected(pathname) &&
        !isWorkerRedirected(pathname)
      ) {
        console.error(`❌ ${rel} → broken absolute link: ${href}`);
        errors++;
        continue;
      }
      checkCrossPageFragment(rel, pathname, url.hash);
      continue;
    }
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('data:')) continue;
    // In-page anchors (skip link, editorial-standards deep link, the article
    // "In this article" table of contents) must point at an id that actually
    // exists in the same document; a renamed heading would otherwise ship a
    // dead jump link silently.
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (!id) continue;
      const hasTarget =
        html.includes(`id="${id}"`) || html.includes(`id='${id}'`) || html.includes(`name="${id}"`);
      if (!hasTarget) {
        console.error(`❌ ${rel} → broken in-page anchor: ${href}`);
        errors++;
      }
      continue;
    }
    // Resolve the file path only: fragments (#anchor) and query strings are not
    // part of the built filename, so `/page/#section` must check `/page/`.
    let target = href.split(/[?#]/, 1)[0];
    if (target.startsWith('/')) {
      // absolute
    } else {
      const dir = dirname(rel);
      target = resolve('/', dir, target).replace(/\\/g, '/');
    }
    const hashIndex = href.indexOf('#');
    const fragment = hashIndex === -1 ? '' : href.slice(hashIndex);
    const lookupPath = target;
    if (target.endsWith('/')) target = target + 'index.html';
    const exists = files.has(target) || files.has(target + '/index.html') || files.has(target.replace(/\/$/, '') + '.html');
    if (!exists) {
      console.error(`❌ ${rel} → broken link: ${href}`);
      errors++;
    } else {
      checkCrossPageFragment(rel, lookupPath, fragment);
    }
  }
}

if (errors) {
  console.error(`\n${errors} broken link(s) found`);
  process.exit(1);
}
console.log('✅ All internal links look good');
