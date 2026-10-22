/**
 * AIN-1023 — narrow-viewport horizontal-overflow guard.
 *
 * `scripts/check-mobile.mjs` is a static scan: it never measures a rendered
 * page, so it could not catch a long hyphenated headline (`codebase-memory-mcp`,
 * `Qwen3.8-Flash-Next`, `ai-agents-from-zero`) pushing the article column past a
 * 320 px phone, or a long topic label colliding with a count on `/tags/`. This
 * script is the real-browser rule: it loads article and core listing pages at
 * 320 px, 390 px and 768 px and fails when
 * `document.documentElement.scrollWidth` is wider than `window.innerWidth`.
 *
 * The 768 px run covers the tablet/landscape-phone band around the 600/640 px
 * CSS breakpoints and the ~760 px shell cap, which 320/390 px never exercise.
 * AIN-1020 regressions came from ad-hoc sweeps of individual pages, so the
 * default set includes both headline fixtures and the core listing/static
 * pages (home, article index, tags, corrections, editorial standards).
 *
 * `<pre>` and `.table-scroll` blocks legitimately scroll horizontally; they
 * contain their own overflow, so the page-level `scrollWidth` stays at the
 * viewport width and they are not flagged.
 *
 * It also guards the footer row: a separator that moves with its link (the
 * AIN-1033 fix) must not lead a wrapped row at narrow widths. The mobile
 * single-column footer therefore drops the middots and relies on gaps.
 *
 * Usage:
 *   node scripts/check-headline-overflow.mjs                 # serves dist/
 *   CHECK_URL=https://news.lesbass.com node scripts/check-headline-overflow.mjs
 *
 * Env overrides:
 *   HEADLINE_OVERFLOW_PAGES=/a/,/b/   limit to specific paths
 *   HEADLINE_OVERFLOW_ALL=1           sweep every article page in dist/
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { closeBrowser, launchBrowser } from './browser.mjs';

const dist = resolve(process.env.HEADLINE_OVERFLOW_ROOT || 'dist');
const baseUrl = (process.env.CHECK_URL || '').replace(/\/$/, '');

const VIEWPORTS = [
  { name: '320', width: 320, height: 640 },
  { name: '390', width: 390, height: 844 },
  { name: '768', width: 768, height: 1024 },
];

// The five headlines that overflowed in the AIN-1020 sweep. The default run
// checks these so the guard stays fast in the daily audit; set
// HEADLINE_OVERFLOW_ALL=1 to sweep every article page.
const ARTICLE_FIXTURES = [
  '/articles/codebase-memory-mcp-zero-dependency-code-intelligence/',
  '/articles/deepseek-v4-flash-vision-exp/',
  '/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/',
  '/articles/didilili-ai-agents-from-zero-guide-open-source-2026/',
  '/articles/openai-misalignment-reporting-framework-2026-09/',
];

// Core listing/static pages. `/tags/` shipped a long-label collision (AIN-1018)
// and article dates/updated meta overflowed (AIN-1020); listing pages are not
// article fixtures, so they need their own coverage.
const PAGE_FIXTURES = [
  '/',
  '/articles/',
  '/tags/',
  '/corrections/',
  '/editorial-standards/',
];

const DEFAULT_PAGES = [...ARTICLE_FIXTURES, ...PAGE_FIXTURES];

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    let s;
    try {
      s = statSync(path);
    } catch {
      continue;
    }
    if (s.isDirectory()) yield* walk(path);
    else if (path.endsWith('.html')) yield path;
  }
}

function allArticlePages() {
  const pages = [];
  for (const path of walk(join(dist, 'articles'))) {
    const rel = path.slice(dist.length).replace(/\\/g, '/');
    if (/^\/articles\/[^/]+\/index\.html$/.test(rel)) {
      pages.push(rel.replace(/index\.html$/, ''));
    }
  }
  return pages.sort();
}

function pagePaths() {
  const override = (process.env.HEADLINE_OVERFLOW_PAGES || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (override.length) return override;
  if (process.env.HEADLINE_OVERFLOW_ALL === '1') {
    const all = [...PAGE_FIXTURES, ...allArticlePages()];
    if (all.length) return all;
  }
  return DEFAULT_PAGES;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

async function serveDist() {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const rel = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    const candidates = [
      join(dist, rel),
      join(dist, rel, 'index.html'),
      join(dist, `${rel}.html`),
    ];
    const file = candidates.find((c) => existsSync(c) && statSync(c).isFile());
    if (!file) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('not found');
      return;
    }
    res.writeHead(200, {
      'content-type': MIME[extname(file)] || 'application/octet-stream',
    });
    res.end(readFileSync(file));
  });
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  const { port } = server.address();
  return { server, origin: `http://127.0.0.1:${port}` };
}

/**
 * Runs in the page. Returns the page overflow delta and the widest offending
 * elements, skipping subtrees that are allowed to scroll on their own.
 */
function measureOverflow() {
  const inner = window.innerWidth;
  const doc = document.documentElement;
  const delta = doc.scrollWidth - inner;

  const offenders = [];
  if (delta > 0) {
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      // A scroll container contains its own overflow; its box may be at the
      // viewport edge without widening the page.
      if (cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.overflowX === 'hidden') {
        continue;
      }
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > inner + 1 || r.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute('class') || '').slice(0, 60),
          text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60),
          right: Math.round(r.right),
          left: Math.round(r.left),
        });
      }
    }
  }
  return { inner, scrollWidth: doc.scrollWidth, delta, offenders };
}

/**
 * Runs in the page. Returns footer link items whose `::before` separator
 * starts a wrapped row instead of following a label.
 */
function measureFooterSeparators() {
  const rows = new Map();
  for (const el of document.querySelectorAll('.footer-links > *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const top = Math.round(r.top);
    if (!rows.has(top)) rows.set(top, []);
    rows.get(top).push({ el, left: r.left });
  }

  const tops = [...rows.keys()].sort((a, b) => a - b);
  const offenders = [];
  for (let i = 1; i < tops.length; i++) {
    const first = rows.get(tops[i]).sort((a, b) => a.left - b.left)[0];
    const before = getComputedStyle(first.el, '::before');
    if (
      before.content &&
      before.content !== 'none' &&
      before.content !== 'normal' &&
      before.content !== '""'
    ) {
      offenders.push({
        text: (first.el.textContent || '').trim(),
        top: tops[i],
        content: before.content,
      });
    }
  }
  return offenders;
}

const pages = pagePaths();
if (pages.length === 0) {
  console.error('❌ No pages found — run `npm run build` first');
  process.exit(1);
}

let server = null;
let origin = baseUrl;
if (!origin) {
  if (!existsSync(join(dist, 'index.html'))) {
    console.error('❌ No dist/index.html and no CHECK_URL set');
    process.exit(1);
  }
  ({ server, origin } = await serveDist());
  console.log(`ℹ Serving dist/ at ${origin}`);
} else {
  console.log(`ℹ Live-check mode: ${origin}`);
}

const failures = [];
let runs = 0;

try {
  for (const viewport of VIEWPORTS) {
    const browser = await launchBrowser();
    try {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      const page = await context.newPage();
      for (const path of pages) {
        runs++;
        await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await page.evaluate(() => document.fonts && document.fonts.ready);
        const { inner, scrollWidth, delta, offenders } = await page.evaluate(measureOverflow);
        const separatorOffenders = await page.evaluate(measureFooterSeparators);
        if (delta > 0) {
          failures.push({ viewport: viewport.name, path, inner, scrollWidth, delta, offenders });
          console.log(`❌ ${viewport.name}px ${path.padEnd(64)} scrollWidth ${scrollWidth} > innerWidth ${inner} (+${delta})`);
        } else if (separatorOffenders.length > 0) {
          failures.push({ viewport: viewport.name, path, separatorOffenders });
          console.log(`❌ ${viewport.name}px ${path.padEnd(64)} footer separator leads a wrapped row: ${separatorOffenders.map((o) => o.text).join(', ')}`);
        } else {
          console.log(`✅ ${viewport.name}px ${path.padEnd(64)} scrollWidth ${scrollWidth} = innerWidth ${inner}`);
        }
      }
    } finally {
      await closeBrowser(browser);
    }
  }
} finally {
  if (server) server.close();
}

if (failures.length) {
  console.error(`\n❌ ${failures.length} of ${runs} page/viewport runs failed the narrow-layout guard:`);
  for (const f of failures) {
    if (f.separatorOffenders) {
      console.error(`   ${f.viewport}px ${f.path} footer separator leads a wrapped row`);
      for (const o of f.separatorOffenders.slice(0, 5)) {
        console.error(`      "${o.text}" starts row at y=${o.top} with ::before ${o.content}`);
      }
      continue;
    }
    console.error(`   ${f.viewport}px ${f.path} (+${f.delta}px)`);
    for (const o of f.offenders.slice(0, 5)) {
      console.error(`      <${o.tag} class="${o.cls}"> right=${o.right} left=${o.left} "${o.text}"`);
    }
  }
  process.exit(1);
}
console.log(
  `✅ No horizontal page overflow or leading footer separator across ${runs} page/viewport runs ` +
    `(${pages.length} pages at ${VIEWPORTS.map((v) => `${v.name}px`).join('/')})`,
);
