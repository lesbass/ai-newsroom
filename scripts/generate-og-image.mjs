/**
 * Regenerates public/og-image.png from public/og-image.svg.
 *
 * Social preview fetchers (Facebook, X, LinkedIn, Slack, Discord) do not
 * render image/svg+xml, so the brand card has to exist as a raster file.
 * This script renders the canonical SVG at 1200x630 through the repo's
 * Playwright helper so the PNG always matches the SVG it was generated from.
 *
 * Usage: node scripts/generate-og-image.mjs
 */

import { closeBrowser, launchBrowser } from './browser.mjs';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SVG_PATH = path.join(ROOT, 'public', 'og-image.svg');
const PNG_PATH = path.join(ROOT, 'public', 'og-image.png');
const WIDTH = 1200;
const HEIGHT = 630;

async function main() {
  const svg = await readFile(SVG_PATH, 'utf8');
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><style>` +
        `html,body{margin:0;padding:0;background:#0f172a;}` +
        `svg{display:block;}` +
        `</style></head><body>${svg}</body></html>`,
      { waitUntil: 'load' },
    );
    await page.screenshot({
      path: PNG_PATH,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
      type: 'png',
    });
  } finally {
    await closeBrowser(browser);
  }

  const { size } = await stat(PNG_PATH);
  console.log(
    `[generate-og-image] wrote ${path.relative(ROOT, PNG_PATH)} ` +
      `(${WIDTH}x${HEIGHT}, ${(size / 1024).toFixed(1)}KB)`,
  );
}

main().catch((err) => {
  console.error('[generate-og-image] Failed:', err.message);
  process.exitCode = 1;
});
