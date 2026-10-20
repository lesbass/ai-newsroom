/**
 * Capture glyph-coverage evidence from a local static build.
 *
 * Usage:
 *   python3 -m http.server 4399 --directory dist &
 *   node scripts/capture-glyph-evidence.mjs [base-url] [output-dir]
 *
 * Writes desktop/mobile homepage + article screenshots and a labeled,
 * capture-time font proof that exercises ★ ≈ ≤ ≥ ⚠ and U+2011. The proof
 * paragraph is injected into the DOM for the screenshot only; it is not part
 * of the built article.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { launchBrowser, closeBrowser } from './browser.mjs';

const baseUrl = process.argv[2] || 'http://localhost:4399';
const outDir = resolve(
  process.argv[3] || join(import.meta.dirname, '..', 'docs', 'audit-reports', '2026-10-20'),
);

const viewports = [
  { name: '320', width: 320, height: 720 },
  { name: '375', width: 375, height: 812 },
  { name: '1280', width: 1280, height: 800 },
];

const proofGlyphs = ['★', '≈', '≤', '≥', '⚠', '\u2011'];

const articles = {
  glyphs: '/articles/meta-muse-glimmer-30b-apache-agentic-local/',
  star: '/articles/reverify-grounded-verification-lossless-context-rollover/',
  warning: '/articles/openai-gpt-live-full-duplex-voice/',
  approx: '/articles/openai-jalapeno-first-results-inference-benchmarks-aug-2026/',
};

async function settle(page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
}

async function shot(page, path, options = {}) {
  await page.screenshot({ path, ...options });
  console.log(`[glyphs] ${path.replace(`${outDir}/`, '')}`);
}

await mkdir(outDir, { recursive: true });
const report = { capturedAt: new Date().toISOString(), baseUrl, viewports: [], fonts: {} };

for (const viewport of viewports) {
  // @sparticuz/chromium runs in single-process mode; closing the last context
  // exits the browser, so use one browser per viewport instead of reusing it.
  const browser = await launchBrowser();
  try {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.width < 600 ? 2 : 1,
    });
    const page = await context.newPage();

    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, join(outDir, `glyph-home-${viewport.name}.png`));

    await page.goto(`${baseUrl}${articles.glyphs}`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, join(outDir, `glyph-article-${viewport.name}.png`));

    const proof = await page.evaluate((glyphs) => {
      const header = document.querySelector('.article-header');
      if (!header) throw new Error('article header not found');
      const box = document.createElement('div');
      box.id = 'glyph-coverage-proof';
      box.setAttribute('role', 'note');
      box.style.cssText = [
        'margin: 1rem 0 1.5rem',
        'padding: 0.75rem 0.9rem',
        'border: 1px solid var(--color-border)',
        'border-radius: var(--radius-md)',
        'background: var(--color-surface-strong)',
        'font-size: 1.15rem',
        'line-height: 1.6',
      ].join(';');
      const glyphSpans = glyphs
        .map((glyph) => `<span id="glyph-proof-${glyph.codePointAt(0).toString(16)}">${glyph}</span>`)
        .join(' ');
      box.innerHTML =
        '<strong style="font: 600 0.72rem/1.4 var(--font-mono); letter-spacing: 0.06em; ' +
        'text-transform: uppercase; color: var(--color-muted)">Capture-time font proof</strong>' +
        `<div style="margin-top: 0.35rem">${glyphSpans} <span style="font-size:0.8rem;color:var(--color-muted)">` +
        '(star, approx, less-equal, greater-equal, warning, U+2011)</span></div>';
      header.insertAdjacentElement('afterend', box);
      box.scrollIntoView({ block: 'center' });
      return { text: glyphs.join(' '), width: Math.round(box.getBoundingClientRect().width) };
    }, proofGlyphs);
    await settle(page);
    await shot(page, join(outDir, `glyph-proof-${viewport.name}.png`));

    if (viewport.name === '375') {
      const client = await page.context().newCDPSession(page);
      await client.send('DOM.enable');
      await client.send('CSS.enable');
      const { root } = await client.send('DOM.getDocument');
      for (const glyph of proofGlyphs) {
        const selector = `#glyph-proof-${glyph.codePointAt(0).toString(16)}`;
        const { nodeId } = await client.send('DOM.querySelector', {
          nodeId: root.nodeId,
          selector,
        });
        const fonts = await client.send('CSS.getPlatformFontsForNode', { nodeId });
        report.fonts[glyph] = fonts.fonts.map((f) => `${f.familyName}${f.isCustomFont ? ' (custom)' : ''}:${f.glyphCount}`);
      }

      for (const [name, path] of Object.entries({
        star: articles.star,
        warning: articles.warning,
        approx: articles.approx,
        table: articles.glyphs,
      })) {
        const closeup = await context.newPage();
        await closeup.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
        await settle(closeup);
        const made = await closeup.evaluate(({ kind, path }) => {
          const probes = { star: '★', warning: '⚠', approx: '≈', table: '≤' };
          const needle = probes[kind];
          const walker = document.createTreeWalker(
            document.querySelector('main') || document.body,
            NodeFilter.SHOW_TEXT,
          );
          let node;
          while ((node = walker.nextNode())) {
            if (!node.nodeValue.includes(needle)) continue;
            const source = node.parentElement?.closest('tr, p, li, td, h2, h3, blockquote');
            if (!source) continue;
            const snippet = source.innerText.replace(/\s+/g, ' ').trim().slice(0, 220);
            const escape = (value) =>
              value.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
            const highlighted = escape(snippet).replace(needle, `<mark>${needle}</mark>`);
            const card = document.createElement('div');
            card.id = 'glyph-closeup';
            card.style.cssText = [
              'position: fixed',
              'left: 16px',
              'top: 96px',
              'max-width: min(680px, calc(100vw - 32px))',
              'padding: 14px 16px',
              'background: var(--color-surface-strong)',
              'border: 1px solid var(--color-border)',
              'border-radius: var(--radius-md)',
              'box-shadow: 0 12px 32px rgba(16, 24, 39, 0.18)',
              'font-size: 1.15rem',
              'line-height: 1.55',
              'z-index: 2147483647',
            ].join(';');
            card.innerHTML =
              '<div style="font: 600 0.68rem/1.4 var(--font-mono); letter-spacing: 0.06em; ' +
              'text-transform: uppercase; color: var(--color-muted); margin-bottom: 6px">' +
              `U+${needle.codePointAt(0).toString(16).toUpperCase()} · ${path}</div>` +
              `<div>${highlighted}</div>`;
            document.body.append(card);
            return true;
          }
          return false;
        }, { kind: name, path });
        if (!made) {
          console.warn(`[glyphs] no close-up target for ${name}`);
          await closeup.close();
          continue;
        }
        const closeupPath = join(outDir, `glyph-closeup-${name}-375.png`);
        const handle = await closeup.$('#glyph-closeup');
        await handle.screenshot({ path: closeupPath });
        console.log(`[glyphs] ${closeupPath.replace(`${outDir}/`, '')}`);
        await closeup.close();
      }
    }

    report.viewports.push({ ...viewport, proof });
  } finally {
    await closeBrowser(browser);
  }
}

await writeFile(
  join(outDir, 'glyph-evidence.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(`[glyphs] evidence written to ${join(outDir, 'glyph-evidence.json')}`);
