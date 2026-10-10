/* global document, window */
/**
 * Capture screenshots of the Mistral Large 4 announcement for the AIN-893 article.
 *
 * - hero-desktop.png: top of https://mistral.ai/news/mistral-large-4 — the
 *   "Le chonk / Introducing Mistral Large 4" hero image, title, and Oct 6, 2026 date.
 * - hero-mobile.png: same page at a 390px-wide phone viewport.
 * - model-card.png: the ML4 model card near the bottom (modality tags, list pricing).
 * - hero.png: desktop top-of-page composite used as the article hero.
 *
 * Outputs to public/images/articles/mistral-large-4-open-weight-public-preview-europe/
 */

import { launchBrowser } from './browser.mjs';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT =
  'public/images/articles/mistral-large-4-open-weight-public-preview-europe';
const URL = 'https://mistral.ai/news/mistral-large-4';

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';

async function newPage(browser, viewport) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    userAgent: UA,
  });
  return context.newPage();
}

async function log(name, filePath) {
  const { size } = await stat(filePath);
  console.log(`[capture] ${name} (${(size / 1024).toFixed(1)}KB)`);
}

async function shootTop(browser, viewport, name) {
  const page = await newPage(browser, viewport);
  try {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);
    const out = path.join(OUT, name);
    await page.screenshot({ path: out, fullPage: false });
    await log(name, out);
  } finally {
    await page.close();
  }
}

async function shootModelCard(browser) {
  const page = await newPage(browser, { width: 1280, height: 900 });
  try {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    const ok = await page.evaluate(() => {
      const h = Array.from(document.querySelectorAll('h2,h3')).find((el) =>
        (el.textContent || '').trim().startsWith('Mistral Large 4'),
      );
      const target = h || document.querySelector('footer');
      if (!target) return false;
      const rect = target.getBoundingClientRect();
      window.scrollTo(0, Math.max(0, window.scrollY + rect.top - 40));
      return true;
    });
    if (!ok) console.warn('[capture] model card not found');
    await page.waitForTimeout(1500);
    const out = path.join(OUT, 'model-card.png');
    await page.screenshot({ path: out, fullPage: false });
    await log('model-card.png', out);
  } finally {
    await page.close();
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await launchBrowser();
  try {
    await shootTop(browser, { width: 1280, height: 900 }, 'hero-desktop.png');
    await shootTop(browser, { width: 390, height: 844 }, 'hero-mobile.png');
    await shootModelCard(browser);
    console.log('[capture] Done.');
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error('[capture] Failed:', e.message);
  process.exit(1);
});
