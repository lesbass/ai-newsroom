/**
 * Rasterize the brand favicon into the 512x512 `public/logo.png` used in
 * structured data.
 *
 * Google's Article and Organization logo guidance rejects vector files
 * (`.svg`) for `publisher.logo`; the image must be a raster format at least
 * 112x112. The site previously declared `favicon.svg` at 512x512, which passes
 * a naive dimension check but is still ineligible for Article rich results.
 *
 * Chromium is used because the source SVG is text-based and must render with
 * the same system font stack the browser uses for the favicon.
 *
 * Usage: node scripts/generate-logo.mjs
 *
 * Re-run after editing `public/favicon.svg`; `npm run test:seo` fails when the
 * committed PNG does not match the declared 512x512 size or is not raster.
 */

import { closeBrowser, launchBrowser } from './browser.mjs';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const source = join(root, 'public/favicon.svg');
const output = join(root, 'public/logo.png');
const SIZE = 512;

async function main() {
  const svg = readFileSync(source, 'utf8');
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  html, body { margin: 0; padding: 0; background: transparent; }
  svg { display: block; width: ${SIZE}px; height: ${SIZE}px; }
</style></head><body>${svg}</body></html>`;

  const browser = await launchBrowser();
  try {
    const context = await browser.newContext({
      viewport: { width: SIZE, height: SIZE },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.screenshot({ path: output, omitBackground: true });
    console.log(`[generate-logo] wrote ${output} (${SIZE}x${SIZE})`);
  } finally {
    await closeBrowser(browser);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
