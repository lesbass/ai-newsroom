import { getCollection } from 'astro:content';

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function slugifyTag(tag) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const site = context.site;
  const now = new Date().toISOString().split('T')[0];

  const tagCount = new Map();
  for (const article of articles) {
    for (const tag of article.data.tags) {
      const slug = slugifyTag(tag);
      if (slug) {
        tagCount.set(slug, (tagCount.get(slug) || 0) + 1);
      }
    }
  }
  const qualifyingTags = [...tagCount.entries()]
    .filter(([, count]) => count >= 2)
    .map(([slug]) => slug);

  const staticPages = [
    { path: '/', priority: '0.9' },
    { path: '/articles/', priority: '0.8' },
    { path: '/tags/', priority: '0.7' },
    { path: '/corrections/', priority: '0.6' },
  ];

  const urls = [
    ...staticPages.map(p => {
      const url = xmlEscape(new URL(p.path, site).toString());
      return `<url><loc>${url}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq><priority>${p.priority}</priority></url>`;
    }),
    ...qualifyingTags.map(tag => {
      const url = xmlEscape(new URL(`/tags/${tag}/`, site).toString());
      return `<url><loc>${url}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>`;
    }),
    ...sorted.map(article => {
      const url = xmlEscape(new URL(`/articles/${article.id}/`, site).toString());
      const date = article.data.updatedDate || article.data.pubDate;
      const d = date.toISOString().split('T')[0];
      const imageTag = article.data.image
        ? `<image:image><image:loc>${xmlEscape(new URL(article.data.image, site).toString())}</image:loc><image:caption><![CDATA[${article.data.imageAlt || article.data.title}]]></image:caption></image:image>`
        : '';
      return `<url><loc>${url}</loc><lastmod>${d}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority>${imageTag}</url>`;
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
