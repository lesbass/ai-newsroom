/**
 * Render 1200x630 social cards for articles whose hero is a local SVG.
 *
 * Social fetchers (Facebook, X, LinkedIn, Slack, Discord) and most feed readers
 * do not render image/svg+xml, so `resolveOgImage` can only use a raster file.
 * Without a card these articles fall back to the generic brand og-image and the
 * per-article diagram never appears when the story is shared.
 *
 * The SVGs use system-ui text and the site's symbol font (arrows, checks), so a
 * pure image pipeline (sharp/librsvg) renders missing glyphs as tofu. Chromium
 * is the only renderer here that has both the fonts and the symbol fallback, so
 * this runs through the repo's Playwright helper and the resulting JPEGs are
 * committed next to the SVG as `<name>-social-svg.jpg`.
 *
 * Usage: node scripts/generate-svg-socials.mjs
 *
 * Re-run this after editing an SVG hero. `npm run test:images` fails when a
 * local SVG hero has no matching card.
 */

import { closeBrowser, launchBrowser } from './browser.mjs';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const articlesDir = join(root, 'src/content/articles');
const publicDir = join(root, 'public');
const symbolsFont = join(publicDir, 'fonts/ai-newsroom-symbols.woff');

const WIDTH = 1200;
const HEIGHT = 630;
const QUALITY = 82;

function collectSvgHeroes() {
  let files;
  try {
    files = readdirSync(articlesDir);
  } catch {
    return [];
  }
  const heroes = new Map();
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    let text;
    try {
      text = readFileSync(join(articlesDir, file), 'utf8');
    } catch {
      continue;
    }
    const match = text.match(/^image:\s*"?([^"\n]+?)"?\s*$/m);
    const href = match?.[1]?.trim() || '';
    if (!href.startsWith('/') || !/\.svg$/i.test(href)) continue;
    heroes.set(href, file);
  }
  return [...heroes.entries()];
}

/**
 * Reuse the SVG's own background colour for the letterbox bands so a scaled
 * diagram blends into the card edge. Gradients resolve to their first stop.
 */
function guessBackground(svg) {
  const rect = svg.match(/<rect\b[^>]*\bfill="([^"]+)"/i);
  const fill = rect?.[1]?.trim();
  if (fill && /^(#[0-9a-f]{3,8}|rgb\([^)]*\)|rgba\([^)]*\))$/i.test(fill)) {
    return fill;
  }
  if (fill?.startsWith('url(#')) {
    const id = fill.slice(5).replace(/\)$/, '');
    const gradient = svg.match(new RegExp(`<linearGradient\\b[^>]*id="${id}"[\\s\\S]*?</linearGradient>`, 'i'));
    const stop = gradient?.[0].match(/stop-color="(#[0-9a-f]{3,8})"/i);
    if (stop) return stop[1];
  }
  return '#0f172a';
}

async function main() {
  const heroes = collectSvgHeroes();
  if (heroes.length === 0) {
    console.log('[generate-svg-socials] no local SVG heroes');
    return;
  }
  if (!existsSync(symbolsFont)) {
    throw new Error(`symbol font missing: ${pathToFileURL(symbolsFont).pathname}`);
  }
  const symbolFontUrl = pathToFileURL(symbolsFont).href;

  const browser = await launchBrowser();
  // This Chromium build runs single-process here; a second newPage() after a
  // page close can kill the browser. Reuse one page for every card instead.
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
  let generated = 0;
  let skipped = 0;
  let failed = 0;
  try {
    for (const [href, article] of heroes) {
      const source = join(publicDir, href.replace(/^\/+/, ''));
      if (!existsSync(source)) {
        console.warn(`[generate-svg-socials] source not found: ${href} (${article})`);
        failed++;
        continue;
      }
      const output = join(dirname(source), `${basename(source).replace(/\.svg$/i, '')}-social-svg.jpg`);
      const sourceMtime = statSync(source).mtimeMs;
      if (existsSync(output) && statSync(output).mtimeMs >= sourceMtime) {
        skipped++;
        continue;
      }

      const svg = readFileSync(source, 'utf8');
      const background = guessBackground(svg);
      const html =
        '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
        '@font-face{font-family:"AI Newsroom Symbols";src:url("' +
        symbolFontUrl +
        '") format("woff");unicode-range:U+0100-017F,U+0391-03C9,U+2000-206F,U+2070-209F,U+2190-21FF,U+2200-22FF,U+25A0-25FF,U+2605-2606,U+26A0-26A1,U+2794,U+27A1,U+2B05-2B07;}' +
        `html,body{margin:0;padding:0;width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;background:${background};}` +
        'body{display:flex;align-items:center;justify-content:center;}' +
        `svg{display:block;width:${WIDTH}px;height:${HEIGHT}px;font-family:"Open Sans","AI Newsroom Symbols",system-ui,sans-serif;}` +
        '</style></head><body>' +
        svg +
        '</body></html>';

      try {
        await page.setContent(html, { waitUntil: 'load' });
        await page.screenshot({ path: output, type: 'jpeg', quality: QUALITY });
        const { size } = statSync(output);
        console.log(`[generate-svg-socials] ${href} -> ${basename(output)} (${(size / 1024).toFixed(1)}KB)`);
        generated++;
      } catch (error) {
        console.warn(`[generate-svg-socials] failed ${href}: ${error.message}`);
        failed++;
      }
    }
  } finally {
    await closeBrowser(browser);
  }

  console.log(`[generate-svg-socials] ${generated} generated, ${skipped} up-to-date, ${failed} failed`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`[generate-svg-socials] ${error.message}`);
  process.exitCode = 1;
});
