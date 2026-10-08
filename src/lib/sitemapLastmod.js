/**
 * Content-date derivation for generated listing, archive, and tag pages.
 *
 * Those pages are products of article content, so their sitemap <lastmod> must
 * be the newest content date (updatedDate || pubDate) among the articles they
 * surface — never the build date. Emitting the build date makes every deploy
 * look like every listing changed, which teaches crawlers to ignore <lastmod>
 * (AIN-913).
 *
 * Kept as plain JS with no imports so `scripts/check-sitemap-lastmod.mjs` can
 * import the exact same logic the sitemap endpoint uses, including on Node 22
 * where importing TypeScript directly is not enabled by default.
 */

/** Article cards per /articles/ archive page. Mirrored by pagination.ts. */
export const ARTICLES_PER_PAGE = 20;

/** Tag slug normalization; mirrors src/lib/slugify.ts. */
export function slugifyTag(tag) {
  return String(tag)
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

/**
 * Slice a newest-first list for a 1-based page number.
 * @template T
 * @param {T[]} items
 * @param {number} page
 * @returns {T[]}
 */
export function articlesForPage(items, page) {
  const start = (page - 1) * ARTICLES_PER_PAGE;
  return items.slice(start, start + ARTICLES_PER_PAGE);
}

/** Number of archive pages needed for `total` articles (always >= 1). */
export function articlePageCount(total) {
  return Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE));
}

/** Source date for an article: updatedDate wins over pubDate. */
export function effectiveDate(entry) {
  return entry.data.updatedDate || entry.data.pubDate;
}

/** Newest effective date in a list, or null when the list is empty. */
export function latestEffectiveDate(entries) {
  if (!entries || entries.length === 0) return null;
  let max = effectiveDate(entries[0]);
  for (let i = 1; i < entries.length; i++) {
    const date = effectiveDate(entries[i]);
    if (date > max) max = date;
  }
  return max;
}

/** `YYYY-MM-DD`, the date format the sitemap already emits. */
export function toDateString(date) {
  return date.toISOString().split('T')[0];
}

/** Tag slugs with at least `minCount` articles (the indexable tag set). */
export function qualifyingTagSlugs(articles, minCount = 2) {
  const counts = new Map();
  for (const entry of articles) {
    for (const tag of entry.data.tags) {
      const slug = slugifyTag(tag);
      if (slug) counts.set(slug, (counts.get(slug) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .filter(([, count]) => count >= minCount)
    .map(([slug]) => slug);
}

/** Articles carrying a tag slug. */
export function tagMatches(articles, slug) {
  return articles.filter((entry) =>
    entry.data.tags.some((tag) => slugifyTag(tag) === slug),
  );
}

/**
 * Lastmod for every generated listing/archive/tag page, keyed by URL path.
 * Values are `YYYY-MM-DD`, or null when the page has no dated content
 * (/corrections/ is hand-edited and carries no machine-readable content date).
 * @param {Array<{data: {pubDate: Date, updatedDate?: Date, tags: string[]}}>} articles
 * @returns {Map<string, string|null>}
 */
export function listingLastmods(articles) {
  const sorted = [...articles].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const map = new Map();

  // Homepage carries the front page and the derived top-topics strip, so it
  // tracks the newest content anywhere on the site.
  const latest = latestEffectiveDate(sorted);
  map.set('/', latest ? toDateString(latest) : null);

  // The archive index shows page 1; later pages track their own slice so a new
  // article does not falsely mark a deep archive page as freshly modified.
  const pageOne = latestEffectiveDate(articlesForPage(sorted, 1));
  map.set('/articles/', pageOne ? toDateString(pageOne) : null);
  const pages = articlePageCount(sorted.length);
  for (let page = 2; page <= pages; page++) {
    const date = latestEffectiveDate(articlesForPage(sorted, page));
    map.set(`/articles/page/${page}/`, date ? toDateString(date) : null);
  }

  // The topics index only lists tags that clear the indexable threshold, so its
  // content date is the newest article contributing to a qualifying tag.
  const qualifying = qualifyingTagSlugs(articles);
  const qualifyingSet = new Set(qualifying);
  const tagged = articles.filter((entry) =>
    entry.data.tags.some((tag) => qualifyingSet.has(slugifyTag(tag))),
  );
  const tagsIndex = latestEffectiveDate(tagged);
  map.set('/tags/', tagsIndex ? toDateString(tagsIndex) : null);

  for (const slug of qualifying) {
    const date = latestEffectiveDate(tagMatches(articles, slug));
    map.set(`/tags/${slug}/`, date ? toDateString(date) : null);
  }

  // No machine-readable content date; omit <lastmod> rather than claim the
  // build date is a content modification.
  map.set('/corrections/', null);

  return map;
}
