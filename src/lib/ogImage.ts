import { existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readImageSizeFile } from '../../scripts/lib/image-size.mjs';

export const DEFAULT_OG_IMAGE = '/og-image.png';
const DEFAULT_OG_WIDTH = 1200;
const DEFAULT_OG_HEIGHT = 630;

const SITE = 'https://news.lesbass.com/';

const RASTER_EXT = /\.(png|jpe?g|gif|webp|avif)$/i;

/**
 * The frontmatter runs inside Astro's build bundle, where `import.meta.url`
 * is not the source file — so walk up from both that location and the working
 * directory until the project root (astro.config.mjs + public/) is found.
 */
function findPublicDir(): string {
  for (const start of [fileURLToPath(new URL('.', import.meta.url)), process.cwd()]) {
    let dir = resolve(start);
    for (let i = 0; i < 8; i++) {
      if (existsSync(join(dir, 'astro.config.mjs')) && existsSync(join(dir, 'public'))) {
        return join(dir, 'public');
      }
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return join(process.cwd(), 'public');
}

const PUBLIC_DIR = findPublicDir();

if (!existsSync(PUBLIC_DIR)) {
  console.warn(`[ogImage] public directory not found at ${PUBLIC_DIR}; social previews fall back to ${DEFAULT_OG_IMAGE}`);
}

export interface OgImage {
  src: string;
  width?: number;
  height?: number;
}

/**
 * Resolves the social-preview image for a page.
 *
 * Social fetchers ignore SVG, so anything that is not a readable local raster
 * (missing file, `image: exception`, SVG hero, unknown format) falls back to
 * the raster brand card. Rendered article heroes are untouched — this only
 * feeds og:image, twitter:image and JSON-LD.
 *
 * og:image:width/height are only emitted when the intrinsic size of the
 * emitted file is known, so the claim is never false.
 */
export function resolveOgImage(image?: string): OgImage {
  const fallback: OgImage = { src: DEFAULT_OG_IMAGE, width: DEFAULT_OG_WIDTH, height: DEFAULT_OG_HEIGHT };
  const raw = typeof image === 'string' ? image.trim() : '';
  if (!raw) return fallback;

  let pathname: string;
  try {
    pathname = new URL(raw, SITE).pathname;
  } catch {
    return fallback;
  }

  // Remote heroes: fetchers read the response content-type, so an extension
  // is not required — but a remote SVG is just as unrenderable as a local one.
  if (/^https?:\/\//i.test(raw)) {
    if (/\.svg$/i.test(pathname)) return fallback;
    return { src: new URL(raw, SITE).toString() };
  }

  if (!RASTER_EXT.test(pathname)) return fallback;

  const file = join(PUBLIC_DIR, pathname.replace(/^\/+/, ''));
  if (!existsSync(file)) return fallback;

  const size = readImageSizeFile(file);
  return size ? { src: raw, ...size } : { src: raw };
}

/**
 * Intrinsic dimensions for a rendered article hero, used to emit width/height
 * attributes so the browser reserves layout space and the image cannot cause
 * Cumulative Layout Shift when it loads.
 *
 * Returns null when the size is genuinely unknown (a remote image without
 * explicit w/h query params), so callers omit the attributes rather than
 * fabricating a size.
 */
export function resolveImageDimensions(image?: string): OgImage | null {
  const raw = typeof image === 'string' ? image.trim() : '';
  if (!raw) return null;

  if (/^https?:\/\//i.test(raw)) {
    let url: URL;
    try {
      url = new URL(raw);
    } catch {
      return null;
    }
    const w = Number(url.searchParams.get('w'));
    const h = Number(url.searchParams.get('h'));
    if (Number.isFinite(w) && w > 0 && Number.isFinite(h) && h > 0) {
      return { src: raw, width: Math.round(w), height: Math.round(h) };
    }
    return null;
  }

  let pathname: string;
  try {
    pathname = new URL(raw, SITE).pathname;
  } catch {
    return null;
  }
  const file = join(PUBLIC_DIR, pathname.replace(/^\/+/, ''));
  if (!existsSync(file)) return null;

  const size = readImageSizeFile(file);
  return size ? { src: raw, ...size } : null;
}

export interface HeroWebp {
  srcset: string;
  sizes: string;
}

/**
 * WebP `<source>` for a locally hosted raster hero, if the build generated one.
 *
 * `scripts/optimize-hero-images.mjs` writes `<name>.webp` and
 * `<name>-900.webp` next to each local PNG/JPEG hero. This returns the
 * `srcset`/`sizes` for a `<picture>` only when at least one variant exists, so
 * a missing variant (remote hero, SVG, unoptimized image, failed generation)
 * cleanly falls back to the original `<img>`. `og:image` deliberately keeps the
 * original PNG/JPEG so social fetchers get a universally supported format.
 */
export function resolveHeroWebp(image?: string): HeroWebp | null {
  const raw = typeof image === 'string' ? image.trim() : '';
  if (!raw || /^https?:\/\//i.test(raw) || !/\.(png|jpe?g)$/i.test(raw)) return null;

  let pathname: string;
  try {
    pathname = new URL(raw, SITE).pathname;
  } catch {
    return null;
  }
  const file = join(PUBLIC_DIR, pathname.replace(/^\/+/, ''));
  if (!existsSync(file)) return null;

  const fullHref = pathname.replace(/\.(png|jpe?g)$/i, '.webp');
  const mobileName = basename(pathname).replace(/\.(png|jpe?g)$/i, '');
  const mobileHref = pathname.replace(/[^/]+$/, `${mobileName}-900.webp`);
  const hasFull = existsSync(file.replace(/\.(png|jpe?g)$/i, '.webp'));
  const hasMobile = existsSync(file.replace(/\.(png|jpe?g)$/i, '-900.webp'));

  const size = readImageSizeFile(file);
  const entries: string[] = [];
  if (hasMobile) entries.push(`${mobileHref} 900w`);
  if (hasFull) entries.push(size ? `${fullHref} ${size.width}w` : fullHref);
  if (entries.length === 0) return null;

  return {
    srcset: entries.join(', '),
    sizes: '(max-width: 800px) 100vw, 760px',
  };
}
