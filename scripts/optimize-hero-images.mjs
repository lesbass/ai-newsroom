/**
 * Generate WebP variants for locally hosted article hero images.
 *
 * Local PNG/JPEG heroes are the mobile LCP element on article pages
 * (`loading="eager"`), and the captured screenshots are large (up to ~860 KB).
 * WebP cuts them by roughly an order of magnitude at equivalent visual quality,
 * which matters most on the narrow viewports the site targets.
 *
 * For every local raster hero referenced by an article's `image:` frontmatter
 * this writes, next to the source file in `public/`:
 *   - `<name>.webp`        full-resolution (quality 82)
 *   - `<name>-900.webp`    max 900 px wide (quality 82) for phones/high-DPR
 *
 * Outputs are build artifacts (git-ignored) and are regenerated whenever the
 * source is newer. The article renderer only emits a WebP `<source>` when the
 * variant exists, so a missing variant degrades to the original `<img>` — this
 * script can never break a build. Failures are logged and swallowed.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { readImageSizeFile } from './lib/image-size.mjs';

const root = resolve(import.meta.dirname, '..');
const articlesDir = join(root, 'src/content/articles');
const publicDir = join(root, 'public');

const RASTER = /\.(png|jpe?g)$/i;
const MOBILE_WIDTH = 900;
const QUALITY = 82;

// Social cards (`summary_large_image`, Facebook, LinkedIn) are ~1.91:1. A hero
// far from that ratio is cropped hard by the platform — a portrait screenshot
// becomes a thin horizontal band that drops the headline and most of the
// evidence. For those heroes only, emit a 1200x630 crop and let og:image use it.
const SOCIAL_WIDTH = 1200;
const SOCIAL_HEIGHT = 630;
const SOCIAL_QUALITY = 82;
const SOCIAL_MIN_AR = 1.4;
const SOCIAL_MAX_AR = 2.6;

function collectLocalHeroes() {
  const heroes = new Set();
  let entries;
  try {
    entries = readdirSync(articlesDir);
  } catch {
    return [];
  }
  for (const file of entries) {
    if (!file.endsWith('.md')) continue;
    let text;
    try {
      text = readFileSync(join(articlesDir, file), 'utf8');
    } catch {
      continue;
    }
    const match = text.match(/^image:\s*"?([^"\n]+?)"?\s*$/m);
    if (!match) continue;
    const href = match[1].trim();
    if (!href.startsWith('/') || !RASTER.test(href)) continue;
    heroes.add(href);
  }
  return [...heroes];
}

function isStale(source, output) {
  if (!existsSync(output)) return true;
  try {
    return statSync(output).mtimeMs < statSync(source).mtimeMs;
  } catch {
    return true;
  }
}

async function generate(sharp, source, output, transform) {
  await sharp(source)
    .resize(transform?.resize)
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(output);
}

async function main() {
  let sharp;
  try {
    // Dynamic import so a missing optional dependency (sharp is a transitive
    // dependency of astro) can never fail the build — the article renderer
    // falls back to the original PNG/JPEG when no WebP variant exists.
    ({ default: sharp } = await import('sharp'));
  } catch (error) {
    console.warn(`[optimize-hero-images] sharp unavailable, skipping: ${error.message}`);
    return;
  }

  const heroes = collectLocalHeroes();
  let generated = 0;
  let current = 0;
  let missing = 0;
  let failed = 0;

  for (const href of heroes) {
    const source = join(publicDir, href.replace(/^\/+/, ''));
    if (!existsSync(source)) {
      console.warn(`[optimize-hero-images] source not found: ${href}`);
      missing++;
      continue;
    }
    const dir = dirname(source);
    const name = basename(source).replace(RASTER, '');
    const full = join(dir, `${name}.webp`);
    const mobile = join(dir, `${name}-${MOBILE_WIDTH}.webp`);
    const social = join(dir, `${name}-social.jpg`);

    // Only heroes outside the social-card band need a crop; inside the band the
    // original hero is already close enough to 2:1 that a crop adds no value.
    const size = readImageSizeFile(source);
    const ar = size ? size.width / size.height : null;
    const needsSocial = ar !== null && (ar < SOCIAL_MIN_AR || ar > SOCIAL_MAX_AR);

    try {
      if (isStale(source, full)) {
        await generate(sharp, source, full);
        generated++;
      } else {
        current++;
      }
      if (isStale(source, mobile)) {
        await generate(sharp, source, mobile, { resize: { width: MOBILE_WIDTH, withoutEnlargement: true } });
        generated++;
      } else {
        current++;
      }
      if (needsSocial && isStale(source, social)) {
        await sharp(source)
          .resize(SOCIAL_WIDTH, SOCIAL_HEIGHT, {
            fit: 'cover',
            position: (sharp.strategy && sharp.strategy.attention) || 'centre',
          })
          .jpeg({ quality: SOCIAL_QUALITY })
          .toFile(social);
        generated++;
      } else if (needsSocial) {
        current++;
      }
    } catch (error) {
      console.warn(`[optimize-hero-images] failed ${href}: ${error.message}`);
      failed++;
    }
  }

  console.log(
    `[optimize-hero-images] ${generated} generated, ${current} up-to-date, ` +
      `${missing} missing, ${failed} failed (${heroes.length} local heroes)`,
  );
}

main().catch((error) => {
  console.warn(`[optimize-hero-images] skipped: ${error.message}`);
});
