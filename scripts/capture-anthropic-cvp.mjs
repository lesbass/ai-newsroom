/**
 * Capture the hero image for the Anthropic Cyber Verification Program article.
 *
 * Source: https://www.anthropic.com/news/cyber-verification-program (2026-10-06)
 * Target: the CyScenarioBench results figure (chart + Anthropic caption) under
 *         the "Testing the efficacy of our tiers" section.
 *
 * Output: public/images/articles/anthropic-cyber-verification-program-three-tiers-oct-2026/hero.png
 *
 * Usage: node scripts/capture-anthropic-cvp.mjs
 */

import { launchBrowser } from './browser.mjs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_URL = 'https://www.anthropic.com/news/cyber-verification-program';
const SLUG = 'anthropic-cyber-verification-program-three-tiers-oct-2026';
const OUT_DIR = path.resolve('public/images/articles', SLUG);
const OUT_FILE = path.join(OUT_DIR, 'hero.png');

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await launchBrowser();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });

  try {
    await page.goto(SOURCE_URL, { waitUntil: 'networkidle', timeout: 60000 });

    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 800) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(2500);

    const figures = await page.$$('figure');
    const target = figures[1];
    if (!target) throw new Error('CyScenarioBench figure not found');

    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await target.screenshot({ path: OUT_FILE });

    console.log(`[capture] wrote ${OUT_FILE}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
