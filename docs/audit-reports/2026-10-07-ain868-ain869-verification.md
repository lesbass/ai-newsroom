# AIN-868 / AIN-869 closure verification — 2026-10-07

**Scope:** verify two SiteEngineer issues that were implemented and committed but left in `todo`,
because comment POST and status PATCH from heartbeat runs are rejected with
`403 cross_issue_influence_run_context_required` (root cause AIN-874 / AIN-873).

**Status writes still blocked this heartbeat** (2 consecutive failures each, no further retries):
`POST /api/issues/{id}/comments` → 403, `PATCH /api/issues/{id}` (`status: done`) → 403, even with
the sanctioned `X-Paperclip-Run-Id` header. Durable evidence therefore lives in issue **documents**
(`verification-2026-10-07` on both issues, HTTP 201) and in this file.

**Recommended disposition:** `AIN-869` → `done`, `AIN-868` → `done`.

---

## AIN-869 — WCAG 2.5.8 target-size check

| Ask | Delivered |
|---|---|
| Browser-based target-size check reusing `launchBrowser()` | `scripts/check-targets.mjs` (398 lines), one browser per viewport |
| size / spacing / inline assertions for `a[href]`, `button`, `[role=button]`, `input`, `select`, `textarea` | all four pass paths, incl. unmodified UA control |
| expose as `test:targets` | `package.json` → `"test:targets": "node scripts/check-targets.mjs"` |
| add to `audit` script | `package.json` `audit` includes `test:targets` |
| add to `checks` in `scripts/audit-daily.mjs` | line 33 `['Targets', 'npm run test:targets']` |
| stop the success line claiming a rule that does not exist | `scripts/check-mobile.mjs:121` ends `…container, print` |

Commit: `b706c8a` on `main`.

Verification 2026-10-07:

- `npm run test:targets` (local `dist/`) → PASS, 12/12 page×viewport runs, 0 hard failures,
  755 targets, 84 candidates cleared by the spacing exception.
- `CHECK_URL=https://news.lesbass.com npm run test:targets` → PASS, 12/12, 0 hard failures
  against production.
- `npm run audit` → all 10 steps green.

## AIN-868 — bound the /articles/ listing on mobile

Pagination was implemented (of the three offered options).

| Production, 390x844 | 2026-10-05 baseline | 2026-10-07 measured |
|---|---|---|
| `.article-card` on `/articles/` | 66 | 20 (page 2: 20) |
| `documentElement.scrollHeight` | 19,852px ≈ 23.5 viewports | **6,439px ≈ 7.6 viewports** (page 2: 6,609px ≈ 7.8) |
| pager | none | `/articles/page/2/` on page 1 → `/articles/page/3/` |

Commits: `c7abb4d`, `2be3251` on `main`.

Constraints: `/articles/` canonical unchanged and crawlable (`test:seo`, `test:links` green);
`GET /articles/page/2/` → 200; no horizontal overflow at 390px (`scrollWidth === innerWidth === 390`
on both pages). `npm run audit` green, which is the Verify the issue asked for.

## Base-URL spot check (guardrail, re-run this heartbeat)

- `GET /sitemap.xml` → 200 `application/xml`; all 155 `<loc>` on `https://news.lesbass.com`
- `GET /rss.xml` → 200 `application/rss+xml`; channel and item links/guids on `https://news.lesbass.com`
- `max(lastmod)` = `2026-10-07`, **0** future dates
- repo `astro.config.mjs` `site: 'https://news.lesbass.com/'`; `wrangler.jsonc` `assets.directory: ./dist`;
  `dist/sitemap.xml` / `dist/rss.xml` identical host profile to production
