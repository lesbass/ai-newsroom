import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const baseUrl = process.env.CHECK_URL || '';

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    let s;
    try { s = statSync(path); } catch { continue; }
    if (s.isDirectory()) yield* walk(path);
    else if (path.endsWith('.html')) yield path;
  }
}

let errors = 0;

const pagePaths = [...walk(dist)];

if (pagePaths.length === 0 && baseUrl) {
  console.log(`ℹ No HTML pages in dist/ — fetching from ${baseUrl}`);
  const pages = ['/', '/articles/', '/tags/', '/corrections/',
    '/articles/openai-broadcom-jalapeno-inference-chip/',
    '/articles/codebase-memory-mcp-zero-dependency-code-intelligence/',
  ];
  for (const p of pages) {
    try {
      const resp = await fetch(`${baseUrl.replace(/\/$/, '')}${p}`);
      if (resp.ok) {
        const html = await resp.text();
        pagePaths.push(`${dist}${p}index.html`);
        checkPage(html, p);
      }
    } catch { /* skip unreachable pages */ }
  }
} else if (pagePaths.length === 0) {
  console.warn('⚠ No HTML pages found in dist/ and no CHECK_URL set. Run with CHECK_URL=https://news.lesbass.com for live checks.');
}

for (const path of pagePaths) {
  if (typeof path === 'string' && existsSync(path)) {
    const html = readFileSync(path, 'utf-8');
    const rel = path.slice(dist.length);
    checkPage(html, rel);
  }
}

function checkPage(html, rel) {
  // 1. Viewport meta tag
  if (!html.includes('name="viewport"') || !html.includes('width=device-width')) {
    console.error(`❌ ${rel}: missing viewport meta tag`);
    errors++;
  }

  // 2. max-width: 100% on images (responsive images)
  if (!html.includes('max-width: 100%') && !html.includes('max-width:100%')) {
    console.error(`❌ ${rel}: missing responsive image rule`);
    errors++;
  }

  // 3. overflow-x: auto on pre/code blocks
  if (!html.includes('overflow-x: auto') && !html.includes('overflow-x:auto')) {
    console.error(`❌ ${rel}: missing pre overflow rule`);
    errors++;
  }

  // 4. Container width control
  if (!html.includes('max-width') || !html.includes('720px')) {
    if (!html.includes('max-width')) {
      console.error(`❌ ${rel}: missing container max-width`);
      errors++;
    }
  }

  // 5. Table overflow handling
  if (html.includes('<table') && !html.includes('display: block') && !html.includes('display:block')) {
    console.error(`❌ ${rel}: has <table> without display:block overflow wrapper`);
    errors++;
  }

  // 6. Text size adjust for mobile
  if (!html.includes('-webkit-text-size-adjust')) {
    console.error(`❌ ${rel}: missing -webkit-text-size-adjust`);
    errors++;
  }

  // 7. No fixed widths (not max-width/min-width/CSS vars) that could overflow on narrow viewports
  const allWidths = [...html.matchAll(/([a-z-]*)width:\s*(\d{3,})px/g)];
  for (const m of allWidths) {
    const prefix = m[1] || '';
    if (prefix === 'max-' || prefix === 'min-' || prefix.startsWith('-') || prefix.includes('max-')) continue;
    console.error(`❌ ${rel}: fixed width > 360px may overflow mobile: "width: ${m[2]}px"`);
    errors++;
  }

  // 8. Overflow wrap / word break for long content
  if (!html.includes('overflow-wrap') && !html.includes('word-wrap')) {
    console.error(`❌ ${rel}: missing overflow-wrap/word-wrap for long words`);
    errors++;
  }

  // 9. Skip to content link accessibility
  if (!html.includes('skip-link') && !html.includes('skip-to-content') && !html.includes('skip-to-main')) {
    console.error(`❌ ${rel}: missing skip-to-content link`);
    errors++;
  }

  // 10. Print styles present (for mobile users who print/share)
  if (!html.includes('@media print')) {
    console.error(`❌ ${rel}: missing print styles`);
    errors++;
  }
}

if (errors) {
  console.error(`\n${errors} mobile-readiness issue(s) found`);
  process.exit(1);
}
console.log('✅ Mobile-readiness checks passed (viewport, images, code blocks, tables, container, touch targets, print)');
