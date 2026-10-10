/**
 * Capture screenshots of the GitLab AI Gateway critical patch release page for
 * the AIN-930 article (CVE-2026-90970).
 *
 * Source: https://docs.gitlab.com/releases/patches/other-patches/patch-release-gitlab-ai-gateway-19-4-1-released/
 *
 * - hero.png:         top of the advisory — title, fixed versions, summary.
 * - cve-details.png:  the CVE-2026-90970 section with the affected/fixed
 *                     version matrix and the CVSS 9.9 line.
 * - hero-mobile.png:  the same top-of-page at a 390px-wide phone viewport.
 *
 * Output: public/images/articles/gitlab-ai-gateway-cve-2026-90970-prompt-template-rce/
 *
 * Usage: node scripts/capture-gitlab-ai-gateway-cve.mjs
 */

import { launchBrowser } from './browser.mjs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_URL =
  'https://docs.gitlab.com/releases/patches/other-patches/patch-release-gitlab-ai-gateway-19-4-1-released/';
const OUT_DIR = path.resolve(
  'public/images/articles/gitlab-ai-gateway-cve-2026-90970-prompt-template-rce',
);

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';

const CVE_HEADING_ID =
  'cve-2026-90970---improper-neutralization-issue-in-custom-flow-prompt-template-impacts-ai-gateway';

async function settle(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
}

async function shootTop(viewport, name) {
  const browser = await launchBrowser();
  const context = await browser.newContext({ viewport, userAgent: UA });
  const page = await context.newPage();
  try {
    await page.goto(SOURCE_URL, { waitUntil: 'networkidle', timeout: 60000 });
    await settle(page);
    await page.screenshot({ path: path.join(OUT_DIR, name) });
    console.log(`[capture] wrote ${name}`);
  } finally {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

async function shootCveSection() {
  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 2,
    userAgent: UA,
  });
  const page = await context.newPage();
  try {
    await page.goto(SOURCE_URL, { waitUntil: 'networkidle', timeout: 60000 });
    await settle(page);

    const ok = await page.evaluate((id) => {
      const heading =
        document.getElementById(id) ||
        Array.from(document.querySelectorAll('h2,h3,h4')).find((el) =>
          (el.textContent || '').includes('CVE-2026-90970'),
        );
      if (!heading) return false;
      const rect = heading.getBoundingClientRect();
      window.scrollTo(0, Math.max(0, window.scrollY + rect.top - 120));
      return true;
    }, CVE_HEADING_ID);

    if (!ok) throw new Error('CVE-2026-90970 heading not found');
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT_DIR, 'cve-details.png') });
    console.log('[capture] wrote cve-details.png');
  } finally {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const shots = [
    () => shootTop({ width: 1440, height: 1100 }, 'hero.png'),
    () => shootTop({ width: 390, height: 844 }, 'hero-mobile.png'),
    () => shootCveSection(),
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
