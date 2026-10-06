/**
 * WCAG 2.5.8 target-size (Minimum) guard — AIN-869.
 *
 * `scripts/check-mobile.mjs` prints "touch targets" in its success line but has
 * never contained a touch-target rule, so the daily audit could not catch a
 * target-size regression. This script is that missing rule: a real-browser
 * measurement of every interactive target on a representative page set, at
 * mobile and desktop viewports.
 *
 * A target passes when one of these holds:
 *   size       — the bounding box is at least 24x24 CSS px;
 *   spacing    — the 24px circle centred on it intersects no other target
 *                (adequately sized neighbours must be >=12px away from its
 *                centre, undersized neighbours >=24px centre-to-centre), which
 *                is the WCAG 2.5.8 spacing exception;
 *   inline     — the target is an inline link inside flowing text, so its size
 *                is constrained by the line-height of non-target text (the
 *                inline exception);
 *   ua-control — an unmodified user-agent widget such as a checkbox or radio.
 *
 * Usage:
 *   node scripts/check-targets.mjs                  # serves dist/ locally
 *   CHECK_URL=https://news.lesbass.com node scripts/check-targets.mjs
 *
 * Negative control (proves the guard can fail): point it at a fixture that
 * deliberately breaks the rule, and expect exit 1.
 *   TARGETS_ROOT=/path/to/fixture TARGETS_PAGES=/ node scripts/check-targets.mjs
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { closeBrowser, launchBrowser } from './browser.mjs';

const dist = resolve(process.env.TARGETS_ROOT || 'dist');
const baseUrl = (process.env.CHECK_URL || '').replace(/\/$/, '');

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1366, height: 768 },
];

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

function firstMatch(pattern) {
  for (const path of walk(dist)) {
    const rel = path.slice(dist.length).replace(/\/index\.html$/, '/');
    if (pattern.test(rel)) return rel;
  }
  return null;
}

function pagePaths() {
  const override = (process.env.TARGETS_PAGES || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (override.length) return override;
  const article = firstMatch(/^\/articles\/(?!index\/)[^/]+\/$/);
  const tag = firstMatch(/^\/tags\/(?!index\/)[^/]+\/$/);
  return ['/', '/articles/', article, '/tags/', tag, '/corrections/'].filter(
    (p, i, all) => p && all.indexOf(p) === i,
  );
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
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
 * Runs entirely in the page. Returns one record per visible target, including
 * the reason it passed, so the CLI can print how many candidates the two
 * exceptions cleared.
 */
function collectTargets() {
  const MIN_SIZE = 24;
  const SELECTOR =
    'a[href], button, [role=button], input, select, textarea, summary';
  const UA_TYPES = new Set([
    'checkbox',
    'radio',
    'submit',
    'reset',
    'button',
    'file',
    'range',
    'color',
    'image',
  ]);
  const INLINE_PARENTS = new Set([
    'P',
    'LI',
    'TD',
    'TH',
    'DD',
    'DT',
    'BLOCKQUOTE',
    'FIGCAPTION',
    'SUMMARY',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
  ]);

  const box = (el) => {
    const r = el.getBoundingClientRect();
    return {
      left: r.left + window.scrollX,
      top: r.top + window.scrollY,
      right: r.right + window.scrollX,
      bottom: r.bottom + window.scrollY,
      width: r.width,
      height: r.height,
    };
  };

  const visible = [...document.querySelectorAll(SELECTOR)].filter((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    if (cs.opacity === '0') return false;
    if (el.closest('[aria-hidden="true"], [hidden]')) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });

  const items = visible.map((el) => {
    const cs = getComputedStyle(el);
    return {
      el,
      rect: box(el),
      undersized: false,
      ua:
        el.tagName === 'INPUT' && UA_TYPES.has((el.type || '').toLowerCase()),
      inline:
        el.tagName === 'A' &&
        cs.display === 'inline' &&
        INLINE_PARENTS.has((el.parentElement || {}).tagName || ''),
      label: (
        el.getAttribute('aria-label') ||
        (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 48) ||
        el.tagName.toLowerCase()
      ),
      tag: el.tagName.toLowerCase() + (el.getAttribute('type') ? `[${el.type}]` : ''),
    };
  });
  for (const it of items) {
    it.undersized = it.rect.width < MIN_SIZE || it.rect.height < MIN_SIZE;
  }

  const centre = (b) => ({
    x: (b.left + b.right) / 2,
    y: (b.top + b.bottom) / 2,
  });

  /** Distance from point p to axis-aligned box b (0 when p is inside). */
  const pointBoxDistance = (p, b) => {
    const dx = Math.max(b.left - p.x, 0, p.x - b.right);
    const dy = Math.max(b.top - p.y, 0, p.y - b.bottom);
    return Math.hypot(dx, dy);
  };

  const results = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (!it.undersized) {
      results.push({ ...describe(it), reason: 'size' });
      continue;
    }
    if (it.ua) {
      results.push({ ...describe(it), reason: 'ua-control' });
      continue;
    }

    const c = centre(it.rect);
    let worstExcess = Infinity;
    let nearest = null;
    for (let j = 0; j < items.length; j++) {
      if (j === i) continue;
      const other = items[j];
      if (isInside(other.rect, it.rect) || isInside(it.rect, other.rect)) continue;
      // WCAG 2.5.8 spacing: the 24px circle centred on this target must not
      // intersect another target's box (>=12px from its centre) or the circle
      // of another undersized target (>=24px centre to centre).
      const limit = other.undersized ? MIN_SIZE : MIN_SIZE / 2;
      const d = other.undersized
        ? Math.hypot(c.x - centre(other.rect).x, c.y - centre(other.rect).y)
        : pointBoxDistance(c, other.rect);
      const excess = d - limit;
      if (excess < worstExcess) {
        worstExcess = excess;
        nearest = other;
      }
    }
    const clearance =
      nearest === null ? null : Math.round(worstExcess * 10) / 10;
    const spaced = nearest === null || worstExcess >= 0;
    if (spaced) {
      results.push({
        ...describe(it),
        reason: 'spacing',
        clearance,
        nearest: nearest ? nearest.label : null,
      });
      continue;
    }
    if (it.inline) {
      results.push({
        ...describe(it),
        reason: 'inline',
        clearance,
        nearest: nearest ? nearest.label : null,
      });
      continue;
    }
    results.push({
      ...describe(it),
      reason: 'FAIL',
      clearance,
      nearest: nearest ? nearest.label : null,
    });
  }
  return results;

  function describe(it) {
    return {
      tag: it.tag,
      label: it.label,
      width: Math.round(it.rect.width * 10) / 10,
      height: Math.round(it.rect.height * 10) / 10,
    };
  }

  function isInside(inner, outer) {
    return (
      inner.left >= outer.left - 0.5 &&
      inner.right <= outer.right + 0.5 &&
      inner.top >= outer.top - 0.5 &&
      inner.bottom <= outer.bottom + 0.5 &&
      (inner.right - inner.left) * (inner.bottom - inner.top) <
        (outer.right - outer.left) * (outer.bottom - outer.top)
    );
  }
}

const pages = pagePaths();
if (pages.length === 0) {
  console.error('❌ No HTML pages found in dist/ — run `npm run build` first');
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

const totals = { size: 0, spacing: 0, inline: 0, 'ua-control': 0, FAIL: 0 };
let candidates = 0;
const failures = [];
const rows = [];

try {
  for (const viewport of VIEWPORTS) {
    // One browser per viewport: a second newContext() after ctx.close() fails
    // under --single-process (same constraint the screenshot audit records).
    const browser = await launchBrowser();
    try {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      const page = await context.newPage();
      for (const path of pages) {
        await page.goto(origin + path, { waitUntil: 'load', timeout: 45000 });
        const results = await page.evaluate(collectTargets);
        const counts = { size: 0, spacing: 0, inline: 0, 'ua-control': 0, FAIL: 0 };
        for (const r of results) counts[r.reason]++;
        for (const k of Object.keys(totals)) totals[k] += counts[k];
        const flagged = results.filter((r) => r.reason !== 'size');
        candidates += flagged.length;
        for (const r of results) {
          if (r.reason === 'FAIL') {
            failures.push({ viewport: viewport.name, path, ...r });
          }
        }
        rows.push({
          viewport: viewport.name,
          path,
          total: results.length,
          undersized: counts.spacing + counts.inline + counts['ua-control'] + counts.FAIL,
          failed: counts.FAIL,
        });
        console.log(
          `${counts.FAIL ? '❌' : '✅'} ${viewport.name.padEnd(7)} ${path.padEnd(46)} ` +
            `${String(results.length).padStart(3)} targets, ` +
            `${flagged.length} flagged, ${counts.FAIL} hard failure(s)`,
        );
      }
    } finally {
      await closeBrowser(browser);
    }
  }
} finally {
  if (server) server.close();
}

const pad = (s, n) => String(s).padEnd(n);
console.log(`\n${pad('viewport', 9)}${pad('page', 46)}targets  flagged  failed`);
for (const r of rows) {
  console.log(
    `${pad(r.viewport, 9)}${pad(r.path, 46)}${String(r.total).padStart(7)}  ` +
      `${String(r.undersized).padStart(6)}  ${String(r.failed).padStart(6)}`,
  );
}

console.log(
  `\nCandidates flagged before exceptions: ${candidates} ` +
    `— cleared by spacing ${totals.spacing}, inline ${totals.inline}, ` +
    `user-agent control ${totals['ua-control']}`,
);
console.log(
  `Targets measured: ${totals.size + totals.spacing + totals.inline + totals['ua-control'] + totals.FAIL} ` +
    `(>=24x24: ${totals.size}) across ${rows.length} page/viewport runs`,
);

if (totals.FAIL) {
  console.error(`\n❌ ${totals.FAIL} target(s) below WCAG 2.5.8 (24x24):`);
  for (const f of failures) {
    console.error(
      `   ${f.viewport} ${f.path} — <${f.tag}> "${f.label}" ` +
        `${f.width}x${f.height}px, spacing clearance ${f.clearance}px ` +
        `against "${f.nearest}" (needs >= 0)`,
    );
  }
  process.exit(1);
}
console.log('✅ WCAG 2.5.8 target-size checks passed (size, spacing, inline, UA-control)');
