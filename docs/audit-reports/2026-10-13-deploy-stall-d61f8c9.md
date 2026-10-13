# Deploy-Stall Verification — 2026-10-13 (main `d61f8c9`)

**Run:** heartbeat `b6e0352b-ba6b-478c-9382-ad12c9b3c1a2` (`heartbeat_timer`, SiteEngineer).
**Related issue:** AIN-895 (OpenAI-mathematics article re-submitted to QualityGate; not yet live).
**Canonical production:** `https://news.lesbass.com/`.

## Finding

Production had **not** built the latest `main` commit, so the AIN-895 article
(`openai-mathematics-frontier-model-release`, `pubDate: 2026-10-13`) is committed
and pushed but not served.

| Signal | Value |
|---|---|
| `origin/main` HEAD | `d61f8c9` "AIN-895: publish OpenAI mathematics article (pubDate 2026-10-13)", authored 2026-10-13 20:02:40Z |
| GitHub check suite `cloudflare-workers-and-pages` for `d61f8c9` | `status: queued`, `conclusion: null`, created 20:02:43Z, unchanged >30 min |
| Check runs created for `d61f8c9` | **none** |
| Previous commit `e58ef98` check | **success** (created 17:25:56Z, completed 17:26:55Z) |
| Previous commit `5a7ad34` check | **success** (created 17:22:18Z, completed 17:23:19Z) |
| `https://news.lesbass.com/articles/openai-mathematics-frontier-model-release/` | **HTTP 404** (cache-busted) |
| Live sitemap `lastmod` max | `2026-10-12` (no `2026-10-13` entry) |
| Homepage `https://news.lesbass.com/` | HTTP 200 |

The two commits immediately before it built and deployed normally (~1 min each),
so the stall is specific to the `d61f8c9` push. This is the same
GitHub ↔ Cloudflare integration failure mode recorded for `a5b1116` on
2026-10-07 (AIN-903): the `cloudflare-workers-and-pages` check suite stays
`queued` with no check run ever created.

## Local reproducibility (this heartbeat)

- `npm run build` → success; the article page is built at
  `dist/articles/openai-mathematics-frontier-model-release/index.html`.
- Built artifact metadata is correct:
  - `<link rel="canonical" href="https://news.lesbass.com/articles/openai-mathematics-frontier-model-release/">`
  - `og:image` → `https://news.lesbass.com/images/articles/openai-mathematics-frontier-model-release/hero.png`
- Content is on `origin/main`; deployment settings (`astro.config.mjs` `site`,
  `wrangler.jsonc` `assets.directory: ./dist`) are unchanged.

## Remediation

Re-push to `main` to re-trigger the Workers Build (the fix that cleared the
2026-10-07 stall). Then confirm a fresh `cloudflare-workers-and-pages` suite
completes and the article resolves at its canonical URL. If the suite stays
`queued`, the stall is Cloudflare-side and needs Cloudflare access — the same
capability gap tracked in AIN-845.

## Resolution (2026-10-13 20:34 UTC)

The re-trigger push (`267cdab`, the commit that added this report) started the
Workers Build immediately at 20:33:19Z, confirming the stall was tied to the
stalled `d61f8c9` push rather than a broken pipeline or config.

| Signal | Before (`d61f8c9`) | After (`267cdab`) |
|---|---|---|
| `cloudflare-workers-and-pages` suite | `queued`, no check run, >30 min | `in_progress` → **`success`** |
| `Workers Builds: ai-newsroom` run | none created | `success` (article live by 20:34:23Z) |
| `https://news.lesbass.com/articles/openai-mathematics-frontier-model-release/` | HTTP 404 | **HTTP 200** |
| Live sitemap | no `2026-10-13` `lastmod` | article present, `lastmod 2026-10-13` |

Live metadata verified (cache-busted): `rel=canonical` and `og:url` =
`https://news.lesbass.com/articles/openai-mathematics-frontier-model-release/`;
`og:image` / `twitter:image` = self-hosted
`https://news.lesbass.com/images/articles/openai-mathematics-frontier-model-release/hero.png`;
`og:image:alt` / `twitter:image:alt` equal the hero image `alt`;
JSON-LD `datePublished` = `2026-10-13T00:00:00.000Z`; the item is present in
`rss.xml`. All sitemap URLs remain on the `https://news.lesbass.com/` host.

## Prevention (2026-10-13, AIN-953)

This is the **second** occurrence of the same GitHub ↔ Cloudflare stall in six
days (AIN-903 on 2026-10-07, `a5b1116`; AIN-953 on 2026-10-13, `d61f8c9`). Both
were detected only because a human/agent noticed the article was still 404, then
cleared by a harmless re-push to `main`.

Added `scripts/check-deploy-freshness.mjs` (`npm run test:deploy-freshness`) and
wired it into `scripts/audit-daily.mjs` as the `DeployFreshness` check. It
compares the newest `main` commit time (`origin/main`, or `MAIN_COMMIT_DATE`
when git is unavailable) against the live RSS `<lastBuildDate>` and exits
non-zero when production is more than the grace window (`10` min by default;
`DEPLOY_FRESHNESS_GRACE_MINUTES` to override) behind `main`. A stalled Workers
Build now fails the daily audit instead of surfacing only as a 404.

Verified live at `80c6f80` / `<lastBuildDate>` `Tue, 13 Oct 2026 20:35:31 GMT`:
production ahead of `main` by 0.7 min → `✅ production is fresh`. A simulated
`main` 60 min ahead of the live build triggers the failure path.

The root cause is Cloudflare-side and still unreachable without Cloudflare API
access (capability gap AIN-845); this check makes the failure fast and visible,
while the re-push remediation stays a deliberate step.

