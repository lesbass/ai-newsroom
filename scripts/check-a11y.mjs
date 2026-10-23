/**
 * Real-browser accessibility regression check (axe-core + Playwright Chromium).
 *
 * The static checks cover colour contrast and touch-target size, but they cannot
 * see the rendered accessibility tree: landmark structure, form labels, ARIA
 * wiring, heading order, link/button names. This script loads the built site in
 * Chromium and runs axe-core against the WCAG 2.0/2.1/2.2 A and AA rules.
 *
 * Serious and critical violations fail the run; moderate and minor ones are
 * reported as warnings so a new low-risk finding cannot block a deploy.
 *
 * Usage:
 *   npm run test:a11y                              # serves dist/
 *   CHECK_URL=https://news.lesbass.com npm run test:a11y
 *
 * Env overrides:
 *   A11Y_PAGES=/a/,/b/      limit to specific paths
 *   A11Y_ALL_ARTICLES=1     also check every article page
 *   A11Y_BEST_PRACTICE=1    include axe best-practice rules
 *   A11Y_VIEWPORTS=390,1440 comma-separated viewport widths
 *   A11Y_COLOR_SCHEMES=light,dark  comma-separated colour schemes
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { extname, join, normalize, resolve } from 'node:path';
import { closeBrowser, launchBrowser } from './browser.mjs';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const dist = resolve(process.env.A11Y_ROOT || 'dist');
const baseUrl = (process.env.CHECK_URL || '').replace(/\/$/, '');

const DEFAULT_VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

const FIXTURES = [
  '/',
  '/articles/',
  '/tags/',
  '/editorial-standards/',
  '/corrections/',
];

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

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    let s;
    try { s = statSync(path); } catch { continue; }
    if (s.isDirectory()) yield* walk(path);
    else yield path;
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

/** Newest article from the built RSS feed, so the sample page tracks content. */
function newestArticlePage() {
  const rss = join(dist, 'rss.xml');
  if (!existsSync(rss)) return [];
  const xml = readFileSync(rss, 'utf8');
  const match = xml.match(/<item>[\s\S]*?<link>([^<]+)<\/link>/);
  if (!match) return [];
  try {
    return [new URL(match[1]).pathname];
  } catch {
    return [];
  }
}

function pagePaths() {
  const override = (process.env.A11Y_PAGES || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (override.length) return override;
  const pages = [...FIXTURES, ...newestArticlePage()];
  if (process.env.A11Y_ALL_ARTICLES === '1') pages.push(...allArticlePages());
  return [...new Set(pages)];
}

function viewports() {
  const override = (process.env.A11Y_VIEWPORTS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!override.length) return DEFAULT_VIEWPORTS;
  return override.map((w) => ({
    name: w,
    width: Number(w),
    height: Number(w) < 600 ? 844 : 900,
  }));
}

// The site ships a full `prefers-color-scheme: dark` token set, but axe only
// sees the scheme Chromium actually renders. Checking light alone let dark-only
// contrast/visibility regressions pass the gate, so both schemes run by default.
function colorSchemes() {
  const requested = (process.env.A11Y_COLOR_SCHEMES || 'light,dark')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return requested.length ? requested : ['light'];
}

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
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  const { port } = server.address();
  return { server, origin: `http://127.0.0.1:${port}` };
}

const FAIL_IMPACTS = new Set(['serious', 'critical']);
// `landmark-unique` is moderate but deterministic: it fires when two `region`
// table wrappers on one page carry the same accessible name. The browser
// fixtures only sample a few articles, so it is also gated statically below.
const FAIL_RULES = new Set(['landmark-unique']);

let server;
let origin = baseUrl;
if (!origin) {
  if (!existsSync(dist)) {
    console.error(`❌ dist/ not found at ${dist} — run npm run build first, or set CHECK_URL`);
    process.exit(2);
  }
  ({ server, origin } = await serveDist());
  console.log(`ℹ Checking built site at ${origin}`);
} else {
  console.log(`ℹ Checking ${origin}`);
}

const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];
if (process.env.A11Y_BEST_PRACTICE === '1') tags.push('best-practice');

const paths = pagePaths();
const vps = viewports();
const schemes = colorSchemes();
let failures = 0;
let warnings = 0;
let checks = 0;

// Static per-page landmark gate. Every horizontally scrollable markdown table
// is wrapped in `role="region"` with an accessible name derived from its
// position and header row (src/lib/rehype-table-scroll.ts). Two regions with the
// same name on one page violate WCAG 1.3.1 and axe `landmark-unique`, but the
// fixture set does not include multi-table articles, so scan every built page.
function checkUniqueRegionLabels() {
  if (baseUrl || !existsSync(dist)) return;
  let duplicatePages = 0;
  for (const path of walk(dist)) {
    if (!path.endsWith('.html')) continue;
    const html = readFileSync(path, 'utf-8');
    const labels = [...html.matchAll(/<[^>]*\brole="region"[^>]*\baria-label="([^"]*)"[^>]*>/g)].map(
      (m) => m[1],
    );
    if (labels.length < 2) continue;
    const seen = new Set();
    const duplicates = new Set();
    for (const label of labels) {
      if (seen.has(label)) duplicates.add(label);
      seen.add(label);
    }
    if (duplicates.size === 0) continue;
    duplicatePages += 1;
    console.error(
      `❌ ${path.slice(dist.length)}: duplicate region landmark label(s): ${[...duplicates].join(', ')}`,
    );
    failures += duplicates.size;
  }
  if (duplicatePages === 0) {
    console.log('✅ region landmark labels are unique on every page');
  }
}

// Static skip-link gate. The skip link must target a landmark that can take
// programmatic focus (`tabindex="-1"`); otherwise activating it scrolls the
// page but leaves keyboard focus on <body>, so the next Tab restarts at the
// top of the page (WCAG 2.4.1). Scan every built page because the browser
// fixtures sample only a few.
function checkSkipLinkTargets() {
  if (baseUrl || !existsSync(dist)) return;
  let bad = 0;
  for (const path of walk(dist)) {
    if (!path.endsWith('.html')) continue;
    const html = readFileSync(path, 'utf-8');
    const link = html.match(/<a[^>]*class="skip-link"[^>]*>/);
    if (!link) continue;
    const href = link[0].match(/href="#([^"]+)"/);
    if (!href) continue;
    const target = html.match(new RegExp(`<[^>]*\\bid="${href[1]}"[^>]*>`));
    if (!target || !/\btabindex="-1"/.test(target[0])) {
      bad += 1;
      console.error(
        `❌ ${path.slice(dist.length)}: skip link targets #${href[1]} without tabindex="-1"`,
      );
    }
  }
  if (bad === 0) {
    console.log('✅ skip links target a focusable main landmark');
  } else {
    failures += bad;
  }
}

// Real-browser proof that activating the skip link moves focus. Fragment
// navigation alone leaves document.activeElement on <body> in Chromium.
async function checkSkipLinkFocus(page, url, path) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.keyboard.press('Tab');
  const onSkipLink = await page.evaluate(() =>
    document.activeElement?.classList?.contains('skip-link'),
  );
  if (!onSkipLink) {
    failures += 1;
    console.error(`❌ ${path}: first Tab stop is not the skip link`);
    return;
  }
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  const focusedId = await page.evaluate(() => document.activeElement?.id);
  if (focusedId !== 'main-content') {
    failures += 1;
    console.error(
      `❌ ${path}: skip link did not move focus to #main-content (activeElement #${focusedId || 'none'})`,
    );
  }
}

checkUniqueRegionLabels();
checkSkipLinkTargets();

for (const vp of vps) {
  for (const scheme of schemes) {
    let browser;
    try {
      browser = await launchBrowser();
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: scheme,
      });
      const page = await context.newPage();
      for (const path of paths) {
        const url = `${origin}${path}`;
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
          await page.addScriptTag({ content: axeSource });
          const result = await page.evaluate(async (runTags) => {
            return await window.axe.run(document, { runOnly: { type: 'tag', values: runTags } });
          }, tags);
          checks++;
          if (result.violations.length) {
            console.log(`\n${path} @ ${vp.width}px (${scheme})`);
          }
          for (const v of result.violations) {
            const isFail = FAIL_IMPACTS.has(v.impact) || FAIL_RULES.has(v.id);
            const mark = isFail ? '❌' : '⚠';
            console.log(`${mark} [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'})`);
            for (const node of v.nodes.slice(0, 3)) {
              console.log(`    ${node.target.join(' ')}`);
              const summary = String(node.failureSummary || '').split('\n')[0];
              if (summary) console.log(`    ${summary}`);
            }
            if (isFail) failures += v.nodes.length;
            else warnings += v.nodes.length;
          }
        } catch (e) {
          console.error(`❌ ${path} @ ${vp.width}px (${scheme}): ${String(e.message).split('\n')[0]}`);
          failures++;
        }
        // One viewport/scheme is enough to prove the skip-link behaviour; it
        // does not depend on width or colour scheme.
        if (vp === vps[0] && scheme === schemes[0]) {
          try {
            await checkSkipLinkFocus(page, url, path);
          } catch (e) {
            console.error(`❌ ${path}: skip-link focus check failed: ${String(e.message).split('\n')[0]}`);
            failures++;
          }
        }
      }
    } finally {
      if (browser) await closeBrowser(browser);
    }
  }
}

if (server) await new Promise((done) => server.close(done));

console.log(`\n${checks} page/viewport/scheme checks — ${failures} serious/critical node(s), ${warnings} minor/moderate node(s)`);
if (failures > 0) {
  console.error('❌ Accessibility check failed');
  process.exit(1);
}
console.log('✅ Accessibility check passed');
