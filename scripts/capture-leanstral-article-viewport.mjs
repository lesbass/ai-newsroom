/**
 * Capture viewport screenshots of the new Leanstral 1.5 article to verify
 * the hero image renders correctly at desktop and mobile widths.
 */

import { launchBrowser } from './browser.mjs';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const URL_BASE =
  'file://' +
  path.resolve('dist/articles/mistral-leanstral-1-5-proof-engineering-model/index.html');
const OUT_DIR = path.resolve('screenshots/leanstral-article');

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';

async function capture(viewport, outName) {
  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: viewport.width < 600 ? 2 : 1,
    userAgent: UA,
  });
  const page = await context.newPage();
  try {
    await page.goto(URL_BASE, { waitUntil: 'networkidle', timeout: 30000 });
    const outPath = path.join(OUT_DIR, outName);
    await page.screenshot({ path: outPath, fullPage: false });
    const { size } = await stat(outPath);
    console.log(
      `[capture] ${outName} (${viewport.width}x${viewport.height}, ${(size / 1024).toFixed(1)}KB)`,
    );
  } finally {
    await browser.close();
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await capture({ width: 1280, height: 900 }, 'article-desktop-viewport.png');
  await capture({ width: 375, height: 812 }, 'article-mobile-viewport.png');
  console.log('[capture] Done.');
}

main().catch((e) => {
  console.error('[capture] Failed:', e.message);
  process.exit(1);
});
