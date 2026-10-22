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
