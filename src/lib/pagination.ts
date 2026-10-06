/**
 * Shared paging arithmetic for the /articles/ archive.
 *
 * The archive grew to 66 cards / ~19,852px at 390x844 — about 23 viewports of
 * undifferentiated scroll (AIN-868). Page 1 keeps the canonical `/articles/`
 * URL; later pages live under `/articles/page/N/` so nothing that already
 * ranks moves.
 */
export const ARTICLES_PER_PAGE = 20;

export function articlePageCount(total: number): number {
  return Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE));
}

/** Slice a newest-first list for a 1-based page number. */
export function articlesForPage<T>(items: T[], page: number): T[] {
  const start = (page - 1) * ARTICLES_PER_PAGE;
  return items.slice(start, start + ARTICLES_PER_PAGE);
}

/** Canonical href for a 1-based archive page. */
export function articlePageHref(page: number): string {
  return page <= 1 ? '/articles/' : `/articles/page/${page}/`;
}
