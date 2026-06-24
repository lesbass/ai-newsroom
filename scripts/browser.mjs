/**
 * AI Newsroom browser helper.
 *
 * Provides a one-call Playwright Chromium launcher using
 * @sparticuz/chromium with bundled NSS/NSPR libraries.
 * No external system packages (apt) needed.
 *
 * Usage:
 *   import { launchBrowser } from '../scripts/browser.mjs';
 *   const browser = await launchBrowser();
 */

import { chromium } from 'playwright';
import Chromium, { inflate } from '@sparticuz/chromium';
import { stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const TMP = tmpdir();
const NSS_LIBS_DIR = join(TMP, 'al2023', 'lib');
const FONTS_DIR = join(TMP, 'fonts');

const CHROMIUM_ARGS = [
  ...Chromium.args,
  '--disable-dev-shm-usage',
];

let nssReady = false;

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function setupNssLibs() {
  if (nssReady) return;
  const markerSo = join(NSS_LIBS_DIR, 'libnspr4.so');
  if (await exists(markerSo)) {
    nssReady = true;
    return;
  }

  const binDirs = [
    resolve(import.meta.dirname, '..', 'node_modules', '@sparticuz', 'chromium', 'bin'),
    resolve(import.meta.dirname, 'node_modules', '@sparticuz', 'chromium', 'bin'),
  ];

  let binDir = null;
  for (const dir of binDirs) {
    const al2023Path = join(dir, 'al2023.tar.br');
    if (await exists(al2023Path)) {
      binDir = dir;
      break;
    }
  }

  if (!binDir) {
    try {
      const { getBinPath } = await import(
        resolve(
          import.meta.dirname,
          '..',
          'node_modules',
          '@sparticuz',
          'chromium',
          'build',
          'paths.js',
        )
      );
      binDir = getBinPath();
    } catch {
      throw new Error(
        'Cannot locate @sparticuz/chromium bin directory. ' +
          'Run npm install --include=dev to install devDependencies.',
      );
    }
  }

  const al2023Path = join(binDir, 'al2023.tar.br');
  if (!(await exists(al2023Path))) {
    throw new Error(
      `al2023.tar.br not found in ${binDir}. ` +
        'Try reinstalling @sparticuz/chromium.',
    );
  }

  await inflate(al2023Path);
  nssReady = true;
}

/**
 * Launches a Playwright Chromium browser using the self-contained
 * @sparticuz/chromium binary with bundled system libraries.
 *
 * @param {object} [opts] — extra options passed to chromium.launch()
 * @returns {Promise<import('playwright').Browser>}
 */
export async function launchBrowser(opts = {}) {
  await setupNssLibs();

  const execPath = await Chromium.executablePath();

  return chromium.launch({
    executablePath: execPath,
    headless: true,
    args: [...CHROMIUM_ARGS, ...(opts.args || [])],
    env: {
      ...process.env,
      HOME: TMP,
      FONTCONFIG_PATH: FONTS_DIR,
      LD_LIBRARY_PATH: `${NSS_LIBS_DIR}:${process.env.LD_LIBRARY_PATH || ''}`,
      ...(opts.env || {}),
    },
    ...Object.fromEntries(
      Object.entries(opts).filter(([k]) => !['args', 'env'].includes(k)),
    ),
  });
}

export { Chromium, CHROMIUM_ARGS, NSS_LIBS_DIR, FONTS_DIR };
