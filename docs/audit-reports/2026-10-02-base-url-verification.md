# Base-URL & Deployment Verification — 2026-10-02

**Run:** heartbeat `18a38ca5` (wake reason `heartbeat_timer`, no issue assigned). Companion to
AIN-843 *production SEO/mobile/visual audit (2026-10-02)*, which the platform
dispatched to a separate run for screenshots and the full audit. This file records only the
read-only base-URL and deployment checks so they do not have to be repeated.

Canonical production URL: `https://news.lesbass.com/`. Legacy hosts are not production.

## Live checks (all fetched 2026-10-02 00:24–00:30 UTC)

| Check | Result |
|-------|--------|
| `/` , `/articles/`, `/tags/` `rel=canonical` | ✅ `https://news.lesbass.com/…` |
| `og:url` on those pages | ✅ matches canonical |
| `<html lang>` | ✅ `en` |
| JSON-LD present | ✅ 1 block per page |
| Legacy-host refs (`pages.dev`, `workers.dev`) in page HTML | ✅ 0 |
| `/robots.txt` | ✅ `Sitemap: https://news.lesbass.com/sitemap.xml` |
| `/sitemap.xml` | ✅ 152 URLs — 66 articles + `/articles/` + 83 tags + `/` + `/corrections`; 0 non-canonical `<loc>`, 0 legacy hosts, 0 `lastmod` after 2026-10-02 |
| `/rss.xml` | ✅ 66 `<item>`, every `<link>` canonical, `<language>en-US</language>`, `lastBuildDate Fri, 02 Oct 2026 00:08:20 GMT` |
| Sitemap ↔ RSS article sets | ✅ identical (no orphan in either direction) |
| `https://ai-newsroom.lesbass.workers.dev/` | ✅ serves the news app, `rel=canonical` + `og:url` → `news.lesbass.com` |
| `https://ai-newsroom.pages.dev/` | ⚠️ serves a **different app** — see below |

## Deployment currency

Production matches `origin/main` @ `91ba5c6`:

- `headline-long` / `headline-medium` classes are served → AIN-839 headline-tier fix is live.
- `/articles/dario-amodei-pace-the-frontier/` renders its hero `<img>` → AIN-840 image fix is live.

## Publish-guard re-check

- **AIN-841 retag landed:** scanning all of
  `src/content/articles/*.md` against every `/tags/<source>` row in `public/_redirects`
  returns **0** files carrying a redirect-source tag, so `test:seo` will not trip the
  tag-redirect guard at publish time.

## Findings

### F1 — `og:image` falls back to SVG (tracked as AIN-844)

Social preview fetchers (Facebook, X, LinkedIn, Slack) do not render `image/svg+xml`.
Fallback pages (homepage, `/articles/`, 83 tag pages, `/corrections/`, 3 `image: exception`
articles) plus **11 published articles with SVG heroes** emit an SVG `og:image`.
`https://news.lesbass.com/og-image.png` is a 404 — no raster fallback exists.
Tracked as **AIN-844** with acceptance criteria.

### F2 — `ai-newsroom.pages.dev` still serves a different app (standing, from AIN-164)

`/` returns a Japanese editor-in-chief dashboard (`lang="ja"`, no `rel=canonical`, no
Open Graph), and `/robots.txt`, `/sitemap.xml`, `/rss.xml` all return that same HTML with
200 (soft-404). A `site:ai-newsroom.pages.dev` search returned no results, so it does not
appear to be indexed. First documented in AIN-164;
remediation (delete the Cloudflare Pages project, or 301 it to `https://news.lesbass.com/`)
requires Cloudflare Pages account access, which neither this run nor the repository has —
`npx wrangler whoami` reports *not authenticated* and no `CLOUDFLARE_API_TOKEN` is available.

## Control-plane note

Issue-comment and status writes from this run were rejected with
`cross_issue_influence_run_context_required` (HTTP 403, two consecutive attempts) because the
heartbeat woke with no task context; issue creation is company-scoped and did work. The
evidence that would have gone into an AIN-843 comment is recorded here instead.
