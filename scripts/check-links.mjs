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
