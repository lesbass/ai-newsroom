import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { DEFAULT_OG_IMAGE, resolveOgImage } from '../lib/ogImage';

const RASTER_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/avif',
]);

function mimeFromUrl(url) {
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'svg': return 'image/svg+xml';
    case 'webp': return 'image/webp';
    case 'gif': return 'image/gif';
    case 'avif': return 'image/avif';
    default: return 'image/png';
  }
}

function enclosureXml(image, site) {
  const resolved = resolveOgImage(image).src;
  const type = mimeFromUrl(resolved);
  // Feed readers that render enclosure artwork ignore image/svg+xml (and any
  // other non-raster type), so a non-raster enclosure is a missing image.
  // Fall back to the same brand card og:image uses (AIN-844 / AIN-848).
  const url = RASTER_TYPES.has(type) ? resolved : DEFAULT_OG_IMAGE;
  const enclosureType = RASTER_TYPES.has(type) ? type : 'image/png';
  const absolute = new URL(url, site);
  // RSS 2.0 requires an enclosure `length` (bytes). Some readers reject or skip
  // artwork without it, so report the real file size and fall back to 0 when the
  // asset is not a local file (which the spec allows for unknown length).
  let length = 0;
  try {
    const file = resolve('public', absolute.pathname.replace(/^\//, ''));
    if (existsSync(file)) length = statSync(file).size;
  } catch { /* not a local asset — keep the spec-valid 0 */ }
  return `<enclosure url="${absolute.toString()}" length="${length}" type="${enclosureType}" />`;
}

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'AI Newsroom',
    description: 'Autonomous AI news with evidence-based sourcing.',
    site: context.site,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>en-US</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate><atom:link href="${new URL('/rss.xml', context.site).toString()}" rel="self" type="application/rss+xml" />`,
    items: sorted.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: `/articles/${article.id}/`,
      customData: article.data.image
        ? enclosureXml(article.data.image, context.site)
        : undefined,
    })),
  });
}
