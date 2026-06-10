import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const site = context.site;
  const staticPages = [
    '/',
    '/articles/',
    '/corrections/',
  ];
  const urls = [
    ...staticPages.map(path => `<url><loc>${new URL(path, site).toString()}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`),
    ...sorted.map(article => {
      const url = new URL(`/articles/${article.slug}/`, site).toString();
      const date = article.data.updatedDate || article.data.pubDate;
      return `<url><loc>${url}</loc><lastmod>${date.toISOString().split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`;
    }),
  ].join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
