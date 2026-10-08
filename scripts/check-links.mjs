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
// They must resolve to a built file or to a declared `_redirects` rule, otherwise
// they silently ship as 404s (e.g. the /paperclip/AIN-### provenance links found in the
// 2026-10-08 audit).
const CANONICAL_ORIGIN = 'https://news.lesbass.com';
const redirectSources = [];
const redirectsPath = resolve('public/_redirects');
if (existsSync(redirectsPath)) {
  for (const line of readFileSync(redirectsPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const from = trimmed.split(/\s+/)[0];
    if (from?.startsWith('/')) redirectSources.push(from);
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

const pagePaths = [...walkPages(dist)];

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
      let pathname;
      try { pathname = new URL(href).pathname; } catch { continue; }
      if (pathname === '/') continue;
      if (resolvesToBuiltFile(pathname) || isRedirected(pathname)) continue;
      console.error(`❌ ${rel} → broken absolute link: ${href}`);
      errors++;
      continue;
    }
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('data:')) continue;
    let target = href;
    if (target.startsWith('/')) {
      // absolute
    } else {
      const dir = dirname(rel);
      target = resolve('/', dir, target).replace(/\\/g, '/');
    }
    if (target.endsWith('/')) target = target + 'index.html';
    const exists = files.has(target) || files.has(target + '/index.html') || files.has(target.replace(/\/$/, '') + '.html');
    if (!exists) {
      console.error(`❌ ${rel} → broken link: ${href}`);
      errors++;
    }
  }
}

if (errors) {
  console.error(`\n${errors} broken link(s) found`);
  process.exit(1);
}
console.log('✅ All internal links look good');
