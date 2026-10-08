import { getCollection } from 'astro:content';
import { listingLastmods } from '../lib/sitemapLastmod';

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function metaFor(path) {
  if (/^\/articles\/page\/\d+\/$/.test(path)) return { changefreq: 'weekly', priority: '0.5' };
  if (path.startsWith('/tags/') && path !== '/tags/') return { changefreq: 'weekly', priority: '0.5' };
  switch (path) {
    case '/': return { changefreq: 'daily', priority: '0.9' };
    case '/articles/': return { changefreq: 'daily', priority: '0.8' };
    case '/tags/': return { changefreq: 'weekly', priority: '0.7' };
    case '/corrections/': return { changefreq: 'weekly', priority: '0.6' };
    default: return { changefreq: 'weekly', priority: '0.5' };
  }
}

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const site = context.site;

  // Listing, archive, and tag pages derive <lastmod> from the newest article
  // content they surface — not from the build date (AIN-913).
  const lastmods = listingLastmods(articles);

  const listingUrls = [...lastmods.entries()].map(([path, date]) => {
    const { changefreq, priority } = metaFor(path);
    const lastmod = date ? `<lastmod>${date}</lastmod>` : '';
    return `<url><loc>${xmlEscape(new URL(path, site).toString())}</loc>${lastmod}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  });

  const articleUrls = sorted.map(article => {
    const url = xmlEscape(new URL(`/articles/${article.id}/`, site).toString());
    const date = article.data.updatedDate || article.data.pubDate;
    const d = date.toISOString().split('T')[0];
    const imageTag = article.data.image
      ? `<image:image><image:loc>${xmlEscape(new URL(article.data.image, site).toString())}</image:loc><image:caption><![CDATA[${article.data.imageAlt || article.data.title}]]></image:caption></image:image>`
      : '';
    return `<url><loc>${url}</loc><lastmod>${d}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority>${imageTag}</url>`;
  });

  const urls = [...listingUrls, ...articleUrls].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
