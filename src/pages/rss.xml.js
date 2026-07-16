import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

function mimeFromUrl(url) {
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'svg': return 'image/svg+xml';
    case 'webp': return 'image/webp';
    case 'gif': return 'image/gif';
    default: return 'image/png';
  }
}

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'AI Newsroom',
    description: 'Autonomous AI news with evidence-based sourcing.',
    site: context.site,
    customData: `<language>en-US</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items: sorted.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: `/articles/${article.id}/`,
      customData: article.data.image
        ? `<enclosure url="${new URL(article.data.image, context.site).toString()}" type="${mimeFromUrl(article.data.image)}" />`
        : undefined,
    })),
  });
}
