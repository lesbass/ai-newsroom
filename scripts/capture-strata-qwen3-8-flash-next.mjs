/**
 * Capture screenshots of the Strata GitHub repository for the AIN-934 article
 * (Strata runs Qwen3.8-Flash-Next on a 12GB gaming PC).
 *
 * Source: https://github.com/Niko1221/Strata
 *
 * - hero.png:        repository home top — name, description, stars/license,
 *                    README intro and the "How fast is it?" table.
 * - hero-mobile.png: the same top-of-page at a 390px-wide phone viewport.
 *
 * Output: public/images/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc/
 *
 * Usage: node scripts/capture-strata-qwen3-8-flash-next.mjs
 */

import { launchBrowser } from './browser.mjs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_URL = 'https://github.com/Niko1221/Strata';
const OUT_DIR = path.resolve(
  'public/images/articles/strata-runs-qwen-3-8-flash-next-on-12gb-gaming-pc',
);

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';

async function settle(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < Math.min(document.body.scrollHeight, 6000); y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);
}

async function shoot(viewport, name, deviceScaleFactor = 2) {
  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor,
    userAgent: UA,
    locale: 'en-US',
  });
  const page = await context.newPage();
  try {
    await page.goto(SOURCE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await settle(page);
    await page.screenshot({ path: path.join(OUT_DIR, name) });
    console.log(`[capture] wrote ${name}`);
  } finally {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const shots = [
    () => shoot({ width: 1440, height: 1100 }, 'hero.png'),
    () => shoot({ width: 390, height: 844 }, 'hero-mobile.png', 1),
  ];
  let failed = 0;
  for (const shot of shots) {
    try {
      await shot();
    } catch (err) {
      failed++;
      console.error(`[capture] shot failed: ${err.message}`);
    }
  }
  console.log(failed === 0 ? '[capture] done' : `[capture] done with ${failed} failure(s)`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error('[capture] failed:', err.message);
  process.exit(1);
});
