/**
 * Topic tags are the tags that have their own indexable `/tags/<slug>/` page.
 *
 * A tag used by a single article still renders a page, but those pages are
 * `noindex` and listed nowhere except the article that already carries the
 * tag. Linking article cards and article headers to them turns the topic pills
 * into dead ends (the only result is the page the reader is already on) and
 * spends internal-link equity on pages that cannot rank.
 *
 * Keep the threshold in sync with the topics index and the tag page's
 * `isThinTag` check so one corpus rule drives all three surfaces.
 */
import { getCollection } from 'astro:content';
import { slugifyTag } from './slugify';

export const TOPIC_MIN_ARTICLES = 2;

let topicSlugs: Promise<Set<string>> | null = null;

export function getTopicTagSlugs(): Promise<Set<string>> {
  topicSlugs ??= (async () => {
    const articles = await getCollection('articles');
    const counts = new Map<string, number>();

    for (const article of articles) {
      for (const tag of article.data.tags) {
        const slug = slugifyTag(tag);
        if (slug) counts.set(slug, (counts.get(slug) ?? 0) + 1);
      }
    }

    return new Set(
      [...counts]
        .filter(([, count]) => count >= TOPIC_MIN_ARTICLES)
        .map(([slug]) => slug),
    );
  })();

  return topicSlugs;
}

export interface TaggedArticle {
  id: string;
  data: {
    title: string;
    tags: string[];
    pubDate: Date;
  };
}

export interface RelatedArticle<T extends TaggedArticle> {
  article: T;
  sharedTags: string[];
}

/**
 * Pick up to `limit` other articles that share at least one indexable topic
 * tag with `current`, ranked by shared-tag count and then recency. Pass the
 * `getTopicTagSlugs()` set so related links use exactly the same indexability
 * rule as the topic pages. Returns an empty list when the article has no
 * indexable tag or no candidate shares one.
 */
export function getRelatedArticles<T extends TaggedArticle>(
  current: T,
  articles: readonly T[],
  indexableTags: ReadonlySet<string>,
  limit = 3,
): RelatedArticle<T>[] {
  if (limit <= 0) return [];

  const currentTags = new Set(
    current.data.tags
      .map(slugifyTag)
      .filter((slug) => slug && indexableTags.has(slug)),
  );
  if (currentTags.size === 0) return [];

  const ranked: Array<RelatedArticle<T> & { score: number }> = [];
  for (const candidate of articles) {
    if (candidate.id === current.id) continue;

    const candidateTags = new Set(
      candidate.data.tags.map(slugifyTag).filter(Boolean),
    );
    const sharedTags = [...currentTags].filter((slug) =>
      candidateTags.has(slug),
    );
    if (sharedTags.length === 0) continue;

    ranked.push({ article: candidate, sharedTags, score: sharedTags.length });
  }

  ranked.sort(
    (a, b) =>
      b.score - a.score ||
      b.article.data.pubDate.valueOf() - a.article.data.pubDate.valueOf() ||
      a.article.id.localeCompare(b.article.id),
  );

  return ranked.slice(0, limit).map(({ article, sharedTags }) => ({
    article,
    sharedTags,
  }));
}
