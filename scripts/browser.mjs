/**
 * AI Newsroom browser helper.
 *
 * Provides a one-call Playwright Chromium launcher using
 * @sparticuz/chromium with bundled NSS/NSPR libraries.
 * No external system packages (apt) needed.
 *
 * Also writes a working fontconfig config into FONTCONFIG_PATH: the config
 * shipped by @sparticuz/chromium points at Lambda-only paths (/var/task, /opt)
 * and finds no fonts, which makes Chromium render every glyph as tofu and fail
 * every @font-face load. Screenshots taken that way look blank.
 *
 * Chromium is started through a wrapper that runs `ulimit -c 0` first, so a
 * crashing browser child writes no `core.<pid>` dump into the caller's working
 * directory (which is the repository root for every repo script). The kernel
 * core_pattern here is plain `core`, so without that limit every browser
 * shutdown could drop a ~500MB dump next to README.md (AIN-870).
 *
 * Usage:
 *   import { launchBrowser, closeBrowser } from '../scripts/browser.mjs';
 *   const browser = await launchBrowser();
 *   ...
 *   await closeBrowser(browser);
 */

import { chromium } from 'playwright';
import Chromium, { inflate } from '@sparticuz/chromium';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';

const TMP = tmpdir();
const NSS_LIBS_DIR = join(TMP, 'al2023', 'lib');
const FONTS_DIR = join(TMP, 'fonts');
const CORE_FREE_DIR = join(TMP, 'ai-newsroom-core-free');

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

const FALLBACK_FONT_CONF = `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>{FONTS_DIR}</dir>
  <cachedir>{CACHE_DIR}</cachedir>
  <alias>
    <family>sans-serif</family>
    <prefer><family>Open Sans</family></prefer>
  </alias>
  <alias>
    <family>serif</family>
    <prefer><family>Open Sans</family></prefer>
  </alias>
  <alias>
    <family>monospace</family>
    <prefer><family>Open Sans</family></prefer>
  </alias>
  <config></config>
</fontconfig>
`;

/**
 * fontconfig config shipped by @sparticuz/chromium only scans Lambda paths, so
 * Chromium finds zero fonts and renders tofu. Point it at the extracted fonts
 * instead. Runs on every launch because the tmpdir is per-run.
 */
async function setupFonts() {
  const cacheDir = join(FONTS_DIR, '.cache');
  await mkdir(cacheDir, { recursive: true });

  const confPath = join(FONTS_DIR, 'fonts.conf');
  let existing = '';
  try {
    existing = await readFile(confPath, 'utf8');
  } catch {
    /* no config yet */
  }
  if (existing.includes(`<dir>${FONTS_DIR}</dir>`)) return;

  await writeFile(
    confPath,
    FALLBACK_FONT_CONF.replaceAll('{FONTS_DIR}', FONTS_DIR).replaceAll(
      '{CACHE_DIR}',
      cacheDir,
    ),
  );
}

/**
 * Wraps a Chromium binary so it starts with `ulimit -c 0`.
 *
 * The core dump lands in the *crashing process's* working directory, which for
 * every repo script is the repository root, so the limit has to be applied to
 * the browser process itself (and is inherited by its renderers/zygotes).
 * `exec` replaces the shell, so Playwright still sees one process with the
 * original pid, fds and `--remote-debugging-pipe`.
 *
 * @param {string} execPath real Chromium executable
 * @returns {Promise<string>} wrapper path, or the original path if wrapping failed
 */
async function coreDumpFreeExecutable(execPath) {
  const wrapperPath = join(
    CORE_FREE_DIR,
    `chromium-core0-${basename(execPath).replace(/[^\w.-]/g, '_')}.sh`,
  );

  const script =
    '#!/bin/sh\n' +
    '# AIN-870: never write core.<pid> dumps into the caller working directory.\n' +
    'ulimit -c 0 2>/dev/null || true\n' +
    `exec "${execPath.replace(/["\\$`]/g, '\\$&')}" "$@"\n`;

  try {
    await mkdir(CORE_FREE_DIR, { recursive: true });
    const existing = await readFile(wrapperPath, 'utf8').catch(() => null);
    if (existing !== script) {
      await writeFile(wrapperPath, script, { mode: 0o755 });
    }
    await stat(wrapperPath);
    return wrapperPath;
  } catch (err) {
    console.warn(
      `[browser] could not install core-dump guard (${err.message}); ` +
        'falling back to the raw Chromium binary',
    );
    return execPath;
  }
}

const CLOSE_TIMEOUT_MS = 20000;

/**
 * Closes a Playwright page or browser without ever throwing.
 *
 * Chromium's shutdown path in this environment can reject with
 * "Target page, context or browser has been closed"; that must not abort a
 * capture script after its screenshots are already on disk (AIN-870).
 *
 * @param {{ close: () => Promise<void> } | null | undefined} target
 * @param {string} label used in the warning line
 * @returns {Promise<boolean>} true when the close completed cleanly
 */
export async function closeQuietly(target, label = 'target') {
  if (!target) return false;
  let timer;
  try {
    await Promise.race([
      target.close(),
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`${label}.close() timed out`)),
          CLOSE_TIMEOUT_MS,
        );
      }),
    ]);
    return true;
  } catch (err) {
    console.warn(`[browser] ${label} close failed (continuing): ${err.message}`);
    return false;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Tolerant browser shutdown. Always safe to use in a `finally` block. */
export function closeBrowser(browser) {
  return closeQuietly(browser, 'browser');
}

/** Tolerant page shutdown. Never throws out of a capture script. */
export function closePage(page) {
  return closeQuietly(page, 'page');
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

  const execPath = await coreDumpFreeExecutable(
    opts.executablePath || (await Chromium.executablePath()),
  );
  await setupFonts();

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
      Object.entries(opts).filter(
        ([k]) => !['args', 'env', 'executablePath'].includes(k),
      ),
    ),
  });
}

export { Chromium, CHROMIUM_ARGS, NSS_LIBS_DIR, FONTS_DIR };
