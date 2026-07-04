/* global document, window */
/**
 * Capture screenshots of the Mistral AI Leanstral 1.5 blog post and
 * HuggingFace model card for the AIN-308 article.
 *
 * - Hero (desktop + mobile): Mistral blog landing showing the
 *   "Leanstral 1.5: Proof Abundance for All" cover, subhead, and benchmark
 *   chart (miniF2F 100%, PutnamBench 587/672, FATE-H 87%, FATE-X 34%).
 * - Section "PutnamBench test-time scaling": the chart that supports the
 *   test-time compute claim (44→244→493→587 problems at 50k→200k→1M→4M).
 * - Section "FLTEval": the pass@1 / pass@8 chart against Opus 4.6.
 * - Model card (HuggingFace): sidebar with Apache-2.0 license, 53 likes,
 *   119B/6B-active MoE architecture summary.
 *
 * Outputs to:
 *   public/images/articles/mistral-leanstral-1-5-proof-engineering-model/
 */

import { launchBrowser } from './browser.mjs';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT =
  '/paperclip/ai-newsroom/public/images/articles/mistral-leanstral-1-5-proof-engineering-model';

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';

async function capture(url, viewport, outName, scrollToText) {
  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: viewport.width < 600 ? 2 : 1,
    userAgent: UA,
  });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    if (scrollToText) {
      const ok = await page.evaluate((needle) => {
        const sels = ['h1', 'h2', 'h3', 'h4', 'p', 'li', 'figcaption', 'figure'];
        const all = Array.from(document.querySelectorAll(sels.join(',')));
        for (const el of all) {
          if (
            el.textContent &&
            el.textContent.toLowerCase().includes(needle.toLowerCase()) &&
            el.textContent.length < 1500
          ) {
            const rect = el.getBoundingClientRect();
            const top = window.scrollY + rect.top;
            const target = Math.max(0, top - 200);
            window.scrollTo(0, target);
            return true;
          }
        }
        return false;
      }, scrollToText);
      await page.waitForTimeout(1200);
      if (!ok) {
        console.warn(`[capture] "${scrollToText}" not found at ${url}`);
      }
    } else {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(800);
    }
    const outPath = path.join(OUT, outName);
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
  await mkdir(OUT, { recursive: true });

  // Hero: Mistral blog landing — desktop
  await capture(
    'https://mistral.ai/news/leanstral-1-5',
    { width: 1280, height: 900 },
    'hero-desktop.png',
    null,
  );
  // Hero: Mistral blog landing — mobile
  await capture(
    'https://mistral.ai/news/leanstral-1-5',
    { width: 375, height: 812 },
    'hero-mobile.png',
    null,
  );
  // Section: PutnamBench test-time scaling chart — anchor on
  // "44 problems solved at 50k" line so the chart is centered.
  await capture(
    'https://mistral.ai/news/leanstral-1-5',
    { width: 1280, height: 900 },
    'section-putnambench-scaling.png',
    '44 problems solved at 50k',
  );
  // Section: FLTEval pass@1 / pass@8 comparison — anchor on the
  // second occurrence of the comparison chart by looking for a more
  // specific phrase further down the page.
  await capture(
    'https://mistral.ai/news/leanstral-1-5',
    { width: 1280, height: 900 },
    'section-flteval.png',
    'surpassing Opus 4.6',
  );
  // Model card: HuggingFace page — anchor on the "Key Features" heading
  // so the MoE / context-length / multimodal summary is visible.
  await capture(
    'https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B',
    { width: 1280, height: 900 },
    'section-model-card.png',
    '128 experts, 4 active',
  );
  console.log('[capture] Done.');
}

main().catch((e) => {
  console.error('[capture] Failed:', e.message);
  process.exit(1);
});
