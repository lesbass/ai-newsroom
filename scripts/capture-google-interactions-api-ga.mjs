/* global document, window */
/**
 * Capture screenshots of the Google Interactions API GA blog post and
 * supporting primary sources for the AIN-383 article.
 *
 * - Hero (desktop + mobile): Google blog landing showing the
 *   "Interactions API: our primary interface for Gemini models and agents"
 *   title, the bylines (Ali Çevik, Philipp Schmid), and the "Today we're
 *   announcing that the Interactions API has reached general availability"
 *   opening paragraph with the Interactions_API_GA_final hero image.
 * - Section "Key updates since December": the bullets block (Managed
 *   Agents, background execution, Tool improvements, Deep Research
 *   upgrades, Media generation, From Roles to Steps, Cost and developer
 *   optimizations).
 * - Section "The new standard for development": the paragraph on
 *   generateContent remaining supported.
 *
 * Outputs to:
 *   public/images/articles/google-interactions-api-ga-primary-gemini-interface/
 */

import { launchBrowser } from './browser.mjs';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT =
  'public/images/articles/google-interactions-api-ga-primary-gemini-interface';

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

  // Hero: Google blog landing — desktop
  await capture(
    'https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/',
    { width: 1280, height: 900 },
    'hero-blog-desktop.png',
    null,
  );
  // Hero: Google blog landing — mobile
  await capture(
    'https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/',
    { width: 390, height: 844 },
    'hero-blog-mobile.png',
    null,
  );
  // Section: Key updates since December — anchor on "Managed Agents" so
  // the bullet list of GA capabilities is centered in the frame.
  await capture(
    'https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/',
    { width: 1280, height: 900 },
    'section-key-updates.png',
    'Managed Agents',
  );
  // Section: The new standard for development — anchor on "generateContent"
  // to capture the legacy-API-still-supported paragraph.
  await capture(
    'https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability/',
    { width: 1280, height: 900 },
    'section-new-standard.png',
    'generateContent API remains fully supported',
  );
  console.log('[capture] Done.');
}

main().catch((e) => {
  console.error('[capture] Failed:', e.message);
  process.exit(1);
});
