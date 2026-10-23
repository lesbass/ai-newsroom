/**
 * Generate WebP variants for locally hosted article images.
 *
 * Local PNG/JPEG heroes are the mobile LCP element on article pages
 * (`loading="eager"`), and the captured screenshots are large (up to ~860 KB).
 * WebP cuts them by roughly an order of magnitude at equivalent visual quality,
 * which matters most on the narrow viewports the site targets.
 *
 * The same applies to inline body images (Markdown `![alt](/images/...)`):
 * they are lazy-loaded, but a ~0.5 MB PNG is still 8-20x the weight of a 900 px
 * WebP on a phone. Both frontmatter heroes and inline rasters are collected.
 *
 * For every local raster article image this writes, next to the source file in
 * `public/`:
 *   - `<name>.webp`        full-resolution (quality 82)
 *   - `<name>-900.webp`    max 900 px wide (quality 82) for phones/high-DPR
 *
 * Heroes additionally get a `<name>-social.jpg` card (1200x630) when their
 * aspect ratio is far from the social-card band, or when the source raster is
 * heavy enough that handing it to social crawlers and feed readers wastes
 * bandwidth (see below).
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
// evidence. For those heroes emit a 1200x630 cover crop and let og:image use
// it. Mid-ratio heroes normally stay as-is, unless the source raster is heavy:
// a 0.5-0.9 MB screenshot is a slow social/feed fetch, so those get a
// letterboxed card that keeps every pixel of the evidence instead of cropping.
const SOCIAL_WIDTH = 1200;
const SOCIAL_HEIGHT = 630;
const SOCIAL_QUALITY = 82;
const SOCIAL_MIN_AR = 1.4;
const SOCIAL_MAX_AR = 2.6;
const SOCIAL_MAX_SOURCE_BYTES = 200 * 1024;
const SOCIAL_BACKDROP_BLUR = 28;
const SOCIAL_BACKDROP_BRIGHTNESS = 0.55;

function localRaster(href) {
  const value = typeof href === 'string' ? href.trim() : '';
  if (!value.startsWith('/') || /^\/\//.test(value)) return '';
  return RASTER.test(value) ? value : '';
}

function readArticleFiles() {
  let entries;
  try {
    entries = readdirSync(articlesDir);
  } catch {
    return [];
  }
  const articles = [];
  for (const file of entries) {
    if (!file.endsWith('.md')) continue;
    try {
      articles.push(readFileSync(join(articlesDir, file), 'utf8'));
    } catch {
      /* skip unreadable article */
    }
  }
  return articles;
}

function collectLocalHeroes(articles) {
  const heroes = new Set();
  for (const text of articles) {
    const match = text.match(/^image:\s*"?([^"\n]+?)"?\s*$/m);
    if (!match) continue;
    const href = localRaster(match[1]);
    if (href) heroes.add(href);
  }
  return heroes;
}

/**
 * Local raster images referenced in Markdown bodies, either as
 * `![alt](/path.png)` or as an HTML `<img src="/path.png">`. Remote URLs and
 * data URIs are ignored. Deduped against the hero set by the caller.
 */
function collectInlineImages(articles) {
  const images = new Set();
  for (const text of articles) {
    for (const match of text.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^"']*["'])?\s*\)/g)) {
      const href = localRaster(match[1]);
      if (href) images.add(href);
    }
    for (const match of text.matchAll(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)) {
      const href = localRaster(match[1]);
      if (href) images.add(href);
    }
  }
  return images;
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

  const articles = readArticleFiles();
  const heroes = collectLocalHeroes(articles);
  const inline = collectInlineImages(articles);
  const images = [...new Set([...heroes, ...inline])];
  let generated = 0;
  let current = 0;
  let missing = 0;
  let failed = 0;

  for (const href of images) {
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

    // Heroes outside the social-card band need a cover crop; mid-ratio heroes
    // are left alone unless the source raster is heavy, in which case a
    // letterboxed card cuts the fetch weight without cropping evidence. Inline
    // body images are never used as social cards, so no card for them.
    const size = readImageSizeFile(source);
    const ar = size ? size.width / size.height : null;
    const outsideBand = ar !== null && (ar < SOCIAL_MIN_AR || ar > SOCIAL_MAX_AR);
    const heavySource = statSync(source).size > SOCIAL_MAX_SOURCE_BYTES;
    // A hero narrower than the 1200 px social-card floor is upscaled even when
    // its ratio and weight are fine: Google Discover and large social cards
    // reject undersized previews, and og:image would otherwise point at the
    // small source.
    const tooNarrow = size !== null && size.width < SOCIAL_WIDTH;
    const needsSocial = heroes.has(href) && ar !== null && (outsideBand || heavySource || tooNarrow);
    const letterbox = needsSocial && !outsideBand && !tooNarrow;

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
        if (letterbox) {
          // Keep the whole screenshot (announcement bars, captions, evidence)
          // and fill the 1.91:1 side bands with a blurred, dimmed copy so the
          // card still reads as one image.
          const backdrop = await sharp(source)
            .resize(SOCIAL_WIDTH, SOCIAL_HEIGHT, { fit: 'cover' })
            .blur(SOCIAL_BACKDROP_BLUR)
            .modulate({ brightness: SOCIAL_BACKDROP_BRIGHTNESS })
            .toBuffer();
          const foreground = await sharp(source)
            .resize(SOCIAL_WIDTH, SOCIAL_HEIGHT, {
              fit: 'contain',
              background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .png()
            .toBuffer();
          await sharp(backdrop)
            .composite([{ input: foreground }])
            .jpeg({ quality: SOCIAL_QUALITY })
            .toFile(social);
        } else {
          await sharp(source)
            .resize(SOCIAL_WIDTH, SOCIAL_HEIGHT, {
              fit: 'cover',
              position: (sharp.strategy && sharp.strategy.attention) || 'centre',
            })
            .jpeg({ quality: SOCIAL_QUALITY })
            .toFile(social);
        }
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
      `${missing} missing, ${failed} failed (${images.length} local images: ` +
      `${heroes.size} heroes, ${inline.size} inline)`,
  );
}

main().catch((error) => {
  console.warn(`[optimize-hero-images] skipped: ${error.message}`);
});
