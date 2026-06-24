import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const site = context.site;
  const now = new Date().toISOString().split('T')[0];
  const staticPages = [
    { path: '/', priority: '0.9' },
    { path: '/articles/', priority: '0.8' },
    { path: '/corrections/', priority: '0.6' },
  ];
  const urls = [
    ...staticPages.map(p => `<url><loc>${new URL(p.path, site).toString()}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>${p.priority}</priority></url>`),
    ...sorted.map(article => {
      const url = new URL(`/articles/${article.id}/`, site).toString();
      const date = article.data.updatedDate || article.data.pubDate;
      const imageTag = article.data.image
        ? `<image:image><image:loc>${new URL(article.data.image, site).toString()}</image:loc><image:caption><![CDATA[${article.data.imageAlt || article.data.title}]]></image:caption></image:image>`
        : '';
      return `<url><loc>${url}</loc><lastmod>${date.toISOString().split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority>${imageTag}</url>`;
    }),
  ].join('\n');
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
