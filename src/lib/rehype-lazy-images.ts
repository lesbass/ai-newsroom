import type { Element, Root, RootContent } from 'hast';
import { existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readImageSizeFile } from '../../scripts/lib/image-size.mjs';

const SITE = 'https://news.lesbass.com/';
const RASTER_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

/**
 * Locate the project `public/` directory from the built bundle. Mirrors the
 * lookup in `src/lib/ogImage.ts`; `import.meta.url` is not the source file
 * inside the Astro build, so walk up from both it and the working directory.
 */
function findPublicDir(): string | null {
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
  return null;
}

const PUBLIC_DIR = findPublicDir();

/**
 * WebP `<source>` data for a local inline raster, if the build generated
 * variants for it.
 *
 * `scripts/optimize-hero-images.mjs` writes `<name>.webp` and `<name>-900.webp`
 * beside every local article image, including Markdown body images. Returning
 * null when no variant exists keeps the plain `<img>` fallback intact for
 * remote images, SVGs, and failed generations.
 */
function resolveInlineWebp(src: string): { srcset: string; sizes: string } | null {
  if (!PUBLIC_DIR || !src.startsWith('/') || /^\/\//.test(src)) return null;
  if (!/\.(png|jpe?g)$/i.test(src)) return null;
  const file = join(PUBLIC_DIR, src.replace(/^\/+/, ''));
  if (!existsSync(file)) return null;

  const fullHref = src.replace(/\.(png|jpe?g)$/i, '.webp');
  const mobileHref = src.replace(
    /[^/]+$/,
    `${basename(src).replace(/\.(png|jpe?g)$/i, '')}-900.webp`,
  );
  const hasFull = existsSync(join(PUBLIC_DIR, fullHref.replace(/^\/+/, '')));
  const hasMobile = existsSync(join(PUBLIC_DIR, mobileHref.replace(/^\/+/, '')));
  if (!hasFull && !hasMobile) return null;

  const entries: string[] = [];
  if (hasMobile) entries.push(`${mobileHref} 900w`);
  if (hasFull) {
    const size = readImageSizeFile(file);
    entries.push(size ? `${fullHref} ${size.width}w` : fullHref);
  }

  return {
    srcset: entries.join(', '),
    sizes: '(max-width: 800px) 100vw, 760px',
  };
}

function wrapInPicture(node: Element, webp: { srcset: string; sizes: string }): Element {
  const source: Element = {
    type: 'element',
    tagName: 'source',
    properties: { type: 'image/webp', srcset: webp.srcset, sizes: webp.sizes },
    children: [],
  };
  return {
    type: 'element',
    tagName: 'picture',
    properties: {},
    children: [source, node],
  };
}

/**
 * Normalize an image `src` / frontmatter path so the same asset compares equal
 * whether it is written as a local path (`/images/...`) or as an absolute URL
 * on the canonical origin.
 */
function normalizeSrc(src: unknown): string {
  const raw = typeof src === 'string' ? src.trim() : '';
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      if (url.origin === new URL(SITE).origin) return url.pathname;
    } catch {
      /* keep the raw remote URL */
    }
    return raw;
  }
  return raw;
}

function isHeroImage(node: Element, heroPath: string): boolean {
  if (node.tagName !== 'img' || !heroPath) return false;
  const src = node.properties ? node.properties.src : '';
  return normalizeSrc(src) === heroPath;
}

function collectImages(node: Element, out: Element[] = []): Element[] {
  if (node.tagName === 'img') out.push(node);
  for (const child of node.children || []) {
    if (child.type === 'element') collectImages(child, out);
  }
  return out;
}

function isCaptionParagraph(node: Element): boolean {
  if (node.tagName !== 'p') return false;
  const children = node.children || [];
  const hasImg = children.some((c) => c.type === 'element' && c.tagName === 'img');
  if (hasImg) return false;
  return children.some((c) => c.type === 'element' && c.tagName === 'em');
}

/**
 * Remove the inline copy of the hero image from the article body.
 *
 * The documented frontmatter pattern (docs/editorial/image-frontmatter-pattern.md)
 * tells writers to reuse the `image` path for any in-body reference so the
 * renderer never shows the same figure twice. The article layout already renders
 * that path as the `.article-hero` figure, so an in-body `<img>` with the same
 * source is a duplicate: drop it (and the paragraph block it owns) and keep the
 * credited hero. Distinct in-body figures have their own source and are left
 * untouched.
 */
function dedupeHero(children: RootContent[], heroPath: string): void {
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    if (node.type !== 'element') continue;

    if (node.tagName === 'figure') {
      if (collectImages(node).some((img) => isHeroImage(img, heroPath))) {
        children.splice(i, 1);
        i--;
        continue;
      }
    }

    if (node.tagName === 'p') {
      const kids = node.children || [];
      const images = kids.filter((c) => c.type === 'element' && c.tagName === 'img') as Element[];
      const heroImages = images.filter((img) => isHeroImage(img, heroPath));
      const text = kids.filter((c) => c.type === 'text').map((c) => (c as { value: string }).value).join('').trim();
      const otherElements = kids.filter((c) => c.type === 'element' && c.tagName !== 'img');
      const isStandalone = images.length === heroImages.length && text === '' && otherElements.length === 0;

      if (heroImages.length > 0 && isStandalone) {
        children.splice(i, 1);
        // Drop the attribution caption that belonged to the removed figure.
        const next = children[i];
        if (next && next.type === 'element' && isCaptionParagraph(next)) children.splice(i, 1);
        i--;
        continue;
      }

      if (heroImages.length > 0 && !isStandalone) {
        for (let k = kids.length - 1; k >= 0; k--) {
          if (isHeroImage(kids[k] as Element, heroPath)) kids.splice(k, 1);
        }
      }
    }

    if (node.children) dedupeHero(node.children, heroPath);
  }
}

export function rehypeLazyImages() {
  return (tree: Root, file?: { data?: { astro?: { frontmatter?: Record<string, unknown> } } }) => {
    const frontmatter = file?.data?.astro?.frontmatter ?? {};
    const rawHero = typeof frontmatter.image === 'string' ? frontmatter.image.trim() : '';
    const heroPath = rawHero && rawHero !== 'exception' ? normalizeSrc(rawHero) : '';

    if (heroPath) dedupeHero(tree.children, heroPath);

    const visitImgs = (children: RootContent[], insidePicture = false) => {
      for (let i = 0; i < children.length; i++) {
        const node = children[i];
        if (node.type !== 'element') continue;
        if (node.tagName === 'img') {
          const props = node.properties || {};
          if (typeof props.loading !== 'string') props.loading = 'lazy';
          if (typeof props.decoding !== 'string') props.decoding = 'async';

          // Reserve intrinsic space for local images so they cannot shift the
          // page as they load. Remote images keep no width/height: their real
          // size is unknown at build time and the CSS aspect-ratio fallback
          // handles them.
          const src = typeof props.src === 'string' ? props.src : '';
          const alreadySized = props.width != null && props.height != null;
          if (
            PUBLIC_DIR &&
            !alreadySized &&
            src.startsWith('/') &&
            RASTER_EXT.test(src)
          ) {
            const size = readImageSizeFile(join(PUBLIC_DIR, src.replace(/^\/+/, '')));
            if (size) {
              props.width = size.width;
              props.height = size.height;
            }
          }
          node.properties = props;

          // Serve inline body rasters from the WebP variants generated at
          // build time, with the original PNG/JPEG as the fallback `src`.
          if (!insidePicture) {
            const webp = resolveInlineWebp(src);
            if (webp) {
              children[i] = wrapInPicture(node, webp);
              continue;
            }
          }
        }
        if (node.children) {
          visitImgs(node.children, insidePicture || node.tagName === 'picture');
        }
      }
    };
    visitImgs(tree.children);
  };
}
