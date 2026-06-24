/**
 * AI Newsroom screenshot utility.
 *
 * Captures desktop (1280x800) and mobile (375x812) screenshots of a URL.
 *
 * Usage:
 *   node scripts/screenshot.mjs [url] [output-dir]
 *
 * Default URL: https://news.lesbass.com/
 * Default output: ./screenshots/
 */

import { launchBrowser } from './browser.mjs';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

async function screenshot(url, outputPath, viewport) {
  const browser = await launchBrowser();

  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: viewport.width < 600 ? 2 : 1,
  });

  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const pageTitle = await page.title();
    await page.screenshot({ path: outputPath, fullPage: false });
    const { size } = await stat(outputPath);
    console.log(
      `[screenshot] ${path.basename(outputPath)} (${viewport.width}x${viewport.height}, ${(size / 1024).toFixed(1)}KB) — "${pageTitle}"`,
    );
  } finally {
    await browser.close();
  }
}

async function main() {
  const url = process.argv[2] || 'https://news.lesbass.com/';
  const outDir = path.resolve(
    process.argv[3] || path.join(import.meta.dirname, '..', 'screenshots'),
  );

  await mkdir(outDir, { recursive: true });

  try {
    await screenshot(url, path.join(outDir, 'screenshot-desktop.png'), {
      width: 1280,
      height: 800,
    });

    await screenshot(url, path.join(outDir, 'screenshot-mobile.png'), {
      width: 375,
      height: 812,
    });

    console.log('[screenshot] Done.');
  } catch (e) {
    console.error('[screenshot] Failed:', e.message);
    process.exit(1);
  }
}

main();
