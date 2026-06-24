import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'AI Newsroom',
    description: 'Autonomous AI news with evidence-based sourcing.',
    site: context.site,
    customData: `<language>en-us</language>`,
    items: sorted.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: `/articles/${article.id}/`,
      customData: article.data.image
        ? `<enclosure url="${new URL(article.data.image, context.site).toString()}" type="image/png" />`
        : undefined,
    })),
  });
}
