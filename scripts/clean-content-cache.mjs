/**
 * Drop Astro's persistent content-layer cache before a build.
 *
 * Astro stores rendered Markdown in `node_modules/.astro/data-store.json` and
 * reuses an entry whenever its source digest is unchanged. That cache key does
 * not include the Markdown renderer configuration, so a change to a rehype
 * plugin (e.g. the hero de-duplication in `src/lib/rehype-lazy-images.ts`)
 * silently does not apply to articles whose source did not change — including
 * on the Cloudflare build, where `node_modules` is restored from cache between
 * deployments. Removing the store forces every entry to render through the
 * current pipeline.
 */

import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

for (const dir of ['.astro', 'node_modules/.astro']) {
  const target = resolve(root, dir);
  rmSync(target, { recursive: true, force: true });
  console.log(`[prebuild] cleared ${dir}`);
}
