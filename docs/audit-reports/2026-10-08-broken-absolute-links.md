# Broken absolute links: article Sources → `news.lesbass.com/paperclip/AIN-###` (2026-10-08)

Issue: **AIN-918**. Canonical target: **https://news.lesbass.com/**.

## Defect

Six published article pages linked internal commissioning/radar records at
`https://news.lesbass.com/paperclip/AIN-###`. That path is not a route on the news
site, so all of them returned **404** live (verified 2026-10-08).

| Article | Links |
|---|---|
| `openai-gpt-5-6-sol-terra-luna-and-chatgpt-work` | AIN-360, AIN-224, AIN-356 |
| `ratel-context-engineering-tool-catalog` | AIN-371, AIN-372 |
| `google-interactions-api-ga-primary-gemini-interface` | AIN-381, AIN-382 |
| `openai-gpt-red-automated-red-teaming-frontier-safety` | AIN-418 |
| `context-mode-mcp-context-window-optimization` | AIN-544, AIN-545 |
| `openai-jalapeno-first-results-inference-benchmarks-aug-2026` | AIN-633, AIN-634 |

Root cause: `scripts/check-links.mjs` skipped every `http(s)://` href, so absolute
same-origin links were never validated and the 404s shipped.

## Fix (`2cb0661`)

- Rewrote the 24 link sites to the real public issue URLs
  `https://paperclip.lesbass.com/AIN/issues/AIN-###` (12 unique issues).
- `scripts/check-links.mjs` now treats same-origin absolute links
  (`https://news.lesbass.com/...`) as internal: each must resolve to a built file or to a
  declared `_redirects` rule, otherwise the check fails. Negative test: re-adding the old
  links without a covering rule surfaces all 12 as errors.

An earlier attempt to solve this with an external `_redirects` rule
(`/paperclip/* https://paperclip.lesbass.com/AIN/issues/:splat 301`) was reverted: the
Workers Builds run for that commit failed (build `4f856f97`). Correcting the links at
source avoids the external-redirect dependency.

## Final resolution for legacy inbound links (`fb72da5`)

Source fixes stop the site from emitting the bad links, but cached/inbound
`https://news.lesbass.com/paperclip/AIN-###` links still 404'd. `fb72da5` adds the
provenance redirect directly in the Worker (`run_worker_first`) rather than via
`_redirects`, which Workers Builds rejects for external targets:

- `/paperclip/<issue>` (optionally trailing slash) → `301` to
  `https://paperclip.lesbass.com/AIN/issues/<issue>`, query string preserved.
- Bare `/paperclip/` and `/paperclip` deliberately fall through to the assets handler
  (they were never article routes).

## Live verification — 2026-10-08 ~15:00 UTC (build `2cb0661`, RSS `lastBuildDate` 14:59:19 GMT)

| Check | Result |
|---|---|
| The 6 article pages | 200; **0** `news.lesbass.com/paperclip` links; correct `paperclip.lesbass.com/AIN/issues/...` links present |
| All 12 target issue URLs | `200` |
| Canonical / base URL | `/` canonical `https://news.lesbass.com/`; sitemap 197 `news.lesbass.com` refs, 0 `paperclip` |
| `npm run build && check && lint && test:links && test:seo` | pass |

## Live verification — 2026-10-08 ~15:20 UTC (build `fb72da5`, RSS `lastBuildDate` 15:03:09 GMT)

Verified after the Worker-edge redirect shipped:

| Request | Result |
|---|---|
| `/paperclip/AIN-918` | `301` → `https://paperclip.lesbass.com/AIN/issues/AIN-918` |
| `/paperclip/AIN-918?ref=x` | `301` → `https://paperclip.lesbass.com/AIN/issues/AIN-918?ref=x` (query preserved) |
| `/paperclip/AIN-918/` | `301` → `https://paperclip.lesbass.com/AIN/issues/AIN-918` (trailing slash stripped) |
| `/paperclip/`, `/paperclip` | `404` (fall through to assets; never article routes) |
| `/articles/`, `/` | `200` (normal routing unaffected) |
| Canonical / base URL | `/` canonical + `og:url` = `https://news.lesbass.com/`; `sitemap.xml` 197 `news.lesbass.com` refs, 0 `paperclip`; `rss.xml` 68 links all `news.lesbass.com`; `robots.txt` `Sitemap: https://news.lesbass.com/sitemap.xml`; `http://` → `301` → `https://` |
