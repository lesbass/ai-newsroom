/**
 * Shared paging arithmetic for the /articles/ archive.
 *
 * The archive grew to 66 cards / ~19,852px at 390x844 — about 23 viewports of
 * undifferentiated scroll (AIN-868). Page 1 keeps the canonical `/articles/`
 * URL; later pages live under `/articles/page/N/` so nothing that already
 * ranks moves.
 *
 * The paging primitives live in ./sitemapLastmod.js so the sitemap endpoint and
 * the sitemap-lastmod check share one implementation (AIN-913); this module
 * keeps the component-facing surface and the canonical href helper.
 */
export {
  ARTICLES_PER_PAGE,
  articlePageCount,
  articlesForPage,
} from './sitemapLastmod.js';

/** Canonical href for a 1-based archive page. */
export function articlePageHref(page: number): string {
  return page <= 1 ? '/articles/' : `/articles/page/${page}/`;
}
