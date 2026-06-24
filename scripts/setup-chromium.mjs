/**
 * Postinstall setup for Chromium screenshot capability.
 * Pre-extracts all assets from @sparticuz/chromium so they are cached
 * in /tmp/ before any agent needs them — chromium binary, fonts,
 * SwiftShader GPU libraries, and NSS/NSPR crypto libraries.
 */

import Chromium, { inflate } from '@sparticuz/chromium';
import { stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const TMP = tmpdir();

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let done = 0;
  let cached = 0;
  let failed = 0;

  // 1. NSS/NSPR libraries (al2023.tar.br) — needed on all platforms
  const nssMarker = join(TMP, 'al2023', 'lib', 'libnspr4.so');
  if (await exists(nssMarker)) {
    cached++;
  } else {
    const binDir = resolve(
      import.meta.dirname,
      '..',
      'node_modules',
      '@sparticuz',
      'chromium',
      'bin',
    );
    const al2023Path = join(binDir, 'al2023.tar.br');
    if (await exists(al2023Path)) {
      await inflate(al2023Path);
      done++;
    } else {
      console.warn('[postinstall] al2023.tar.br not found — skipping NSS libs');
      failed++;
    }
  }

  // 2. Chromium binary, fonts, SwiftShader (via Chromium.executablePath)
  const chromMarker = join(TMP, 'chromium');
  if (await exists(chromMarker)) {
    cached++;
  } else {
    await Chromium.executablePath();
    done++;
  }

  console.log(
    `[postinstall] Chromium ready (${done} extracted, ${cached} cached, ${failed} skipped)`,
  );
}

main().catch((e) => {
  console.error('[postinstall] Failed:', e.message);
});
