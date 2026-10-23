# Daily deploy-freshness and canonical-host check

Operational runbook for the Paperclip routine that bounds how long a silent Cloudflare
Workers Build failure can go unnoticed (AIN-984).

## Why this exists

Between 2026-10-13 and 2026-10-21 production at `https://news.lesbass.com/` kept serving the
2026-10-13 artifact. Every push created a `Workers Builds` check run that failed within the
same second with zero annotations and no downloadable log. Detection depended on the
**biweekly** SEO/mobile audit, so the site was stale for eight days before anyone noticed.

`scripts/check-deploy-freshness.mjs` already detected this exact condition, but nothing ran
it on a short cadence. The routine closes that gap to roughly one day.

## Paperclip objects

| Object | Id |
|---|---|
| Routine | `e3ac4368-1ea2-4c8d-bc64-96c1709de259` |
| Schedule trigger | `e5216e4d-27b0-413d-a7e3-b679c2b56851` |
| Cron | `0 9 * * *` Europe/Rome (07:00 UTC) |
| Assignee | SiteEngineer |
| First scheduled run | 2026-10-22T07:00:00Z |

The routine creates a daily issue assigned to SiteEngineer. It does **not** replace the
biweekly SEO/mobile audit: no visual or Lighthouse work happens here.

## Checks per run

Run from a checkout of `lesbass/ai-newsroom` on `main`:

```bash
git fetch origin main
npm run test:deploy-freshness   # live RSS <lastBuildDate> vs newest origin/main commit, 10 min grace
npm run test:live               # canonical host, symbol font, arrow glyphs, RSS
curl -s https://news.lesbass.com/sitemap.xml | grep -c '<loc>'   # match the built dist/sitemap.xml; all canonical host
curl -s https://news.lesbass.com/rss.xml | grep '<lastBuildDate>'
curl -s https://news.lesbass.com/robots.txt
```

Pass conditions:

- `test:deploy-freshness` reports production at or ahead of `origin/main` within the grace
  window.
- `test:live` reports all checks passing: canonical host, security headers, HTML cache
  policy, workers.dev `noindex`, RSS `<lastBuildDate>`, live `/sitemap.xml` + `/rss.xml` +
  `/robots.txt` canonical URLs, and the single-hop redirect cases.
- The live `/sitemap.xml` `<loc>` count matches the freshly built `dist/sitemap.xml`. Do not
  assert a fixed number: it moves when articles are added or tags are consolidated (157 on
  2026-10-21, 164 on 2026-10-13). A mismatch against the built artifact is the signal.
- Every absolute URL in `/sitemap.xml` and `/rss.xml`, plus the robots `Sitemap:` line, uses
  `https://news.lesbass.com/` — never `ai-newsroom.pages.dev` or
  `ai-newsroom.lesbass.workers.dev`.

`DEPLOY_FRESHNESS_GRACE_MINUTES` and `CHECK_URL` override the defaults when testing another
target; production runs use the defaults.

### Build latency before you escalate

Cloudflare only posts the `Workers Builds` check run when the build **completes**, so a
queued build is invisible on GitHub. Normal builds today finish in 1–3 minutes, but on
2026-10-21 a docs-only commit at `15:18:05Z` did not complete until `15:36:26Z` — about 18
minutes, with no failing check and no Cloudflare incident. During that window
`test:deploy-freshness` correctly reported production behind `origin/main`.

Before treating a stale reading as an outage:

1. `gh api "repos/lesbass/ai-newsroom/commits/$(git rev-parse origin/main)/check-runs"` —
   if a `Workers Builds` run exists, read its `conclusion`.
2. If no check run exists yet, give the queue up to ~20 minutes and re-check the RSS
   `lastBuildDate`; a delayed build is not a failed deploy.
3. Only `conclusion: failure`, or no build after ~20 minutes, is an escalation signal.

## Disposition

- **Green:** post one compact evidence line (commit, live build time, sitemap URL count,
  canonical host) and close the daily issue in the same run.
- **Stale or wrong host:** do not change domain, sitemap, canonical, or robots settings from
  this routine. Record the failing signal with timestamps, inspect the newest
  `Workers Builds` check on `origin/main`, then open an escalation issue naming the exact
  unblock owner and action:
  - Cloudflare dashboard access to re-run the build — the human connection path recorded on
    AIN-845; or
  - `CLOUDFLARE_API_TOKEN=<Workers Scripts:Edit> scripts/deploy-fallback.sh` to deploy the
    current `dist/` directly.

  Keep the daily issue blocked on that escalation.

## Manual run

To exercise the alarm without waiting for 07:00 UTC:

```bash
curl -X POST "$PAPERCLIP_API_URL/api/routines/e3ac4368-1ea2-4c8d-bc64-96c1709de259/run" \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"source":"manual"}'
```

## Related

- `scripts/check-deploy-freshness.mjs` — freshness watchdog and incident history.
- `scripts/deploy-fallback.sh` — direct Workers deploy for build-outage recovery.
- `docs/audit-reports/2026-10-19.md` — the eight-day outage investigation.
- AIN-845 — legacy `ai-newsroom.pages.dev` host; unrelated to production freshness.
