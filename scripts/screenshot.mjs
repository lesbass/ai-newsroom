/**
 * AI Newsroom screenshot utility.
 *
 * Captures desktop (1280x800) and mobile (375x812) screenshots of a URL.
 * Uses @sparticuz/chromium for a self-contained Chromium that needs minimal
 * system libraries. Automatically downloads NSS libraries if missing.
 *
 * Usage:
 *   node scripts/screenshot.mjs [url] [output-dir]
 *
 * Default URL: https://news.lesbass.com/
 * Default output: ./screenshots/
 *
 * Requires: playwright, @sparticuz/chromium (npm dependencies)
 * NSS libs are downloaded from Debian archive on first run, cached in /tmp/nss-libs/
 */

import { chromium } from 'playwright';
import Chromium from '@sparticuz/chromium';
import { createWriteStream } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { execSync } from 'node:child_process';

const TMP = tmpdir();
const NSS_DIR = path.join(TMP, 'nss-libs');
const NSPR_DIR = path.join(NSS_DIR, 'nspr');
const NSS_LIB_DIR = path.join(NSS_DIR, 'nss');
const NSS_LIB_PATH = `${NSPR_DIR}/usr/lib/x86_64-linux-gnu:${NSS_LIB_DIR}/usr/lib/x86_64-linux-gnu`;

const NSPR_DEB = {
  url: 'http://deb.debian.org/debian/pool/main/n/nspr/libnspr4_4.36-1_amd64.deb',
  file: path.join(TMP, 'libnspr4.deb'),
};
const NSS_DEB = {
  url: 'http://deb.debian.org/debian/pool/main/n/nss/libnss3_3.124-1_amd64.deb',
  file: path.join(TMP, 'libnss3.deb'),
};

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const ws = createWriteStream(dest);
  await pipeline(res.body, ws);
}

function extractDeb(debPath, destDir) {
  execSync(`dpkg-deb -x "${debPath}" "${destDir}"`, {
    env: { ...process.env, LD_LIBRARY_PATH: '/usr/lib/x86_64-linux-gnu' },
    stdio: 'pipe',
  });
}

async function setupNssLibs() {
  const nsprSo = path.join(NSPR_DIR, 'usr/lib/x86_64-linux-gnu/libnspr4.so');
  if (await exists(nsprSo)) return;

  console.log('[screenshot] Downloading NSS libraries...');
  await mkdir(NSS_DIR, { recursive: true });

  await download(NSPR_DEB.url, NSPR_DEB.file);
  extractDeb(NSPR_DEB.file, NSPR_DIR);

  await download(NSS_DEB.url, NSS_DEB.file);
  extractDeb(NSS_DEB.file, NSS_LIB_DIR);

  console.log('[screenshot] NSS libraries ready');
}

async function screenshot(url, outputPath, viewport) {
  const execPath = await Chromium.executablePath();

  const browser = await chromium.launch({
    executablePath: execPath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--no-zygote',
    ],
    env: {
      ...process.env,
      LD_LIBRARY_PATH: `${NSS_LIB_PATH}:${process.env.LD_LIBRARY_PATH || ''}`,
    },
  });

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
    console.log(`[screenshot] ${path.basename(outputPath)} (${viewport.width}x${viewport.height}, ${(size / 1024).toFixed(1)}KB) — "${pageTitle}"`);
  } finally {
    await browser.close();
  }
}

async function main() {
  const url = process.argv[2] || 'https://news.lesbass.com/';
  const outDir = path.resolve(process.argv[3] || path.join(import.meta.dirname, '..', 'screenshots'));

  await mkdir(outDir, { recursive: true });
  await setupNssLibs();

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
