# Legacy host `ai-newsroom.pages.dev` — remediation runbook

**Issue:** [AIN-845](/AIN/issues/AIN-845) · **Canonical production URL:** `https://news.lesbass.com/`
**Pre-staged:** 2026-10-04. Nothing here has been applied to the live host yet — execution is
gated on the two human-only cards on AIN-845 (Cloudflare connection + remediation choice).

This directory holds the deploy-ready payloads and the exact verification steps so that
execution is a single bounded session once access and a decision exist. It is documentation
only: the payloads are *not* wired into this repository's build or deploy.

## What the legacy host is

| Fact | Evidence (2026-10-04 01:43 UTC) |
|------|----------------------------------|
| `https://ai-newsroom.pages.dev/` → `200`, `content-type: text/html` | `curl -sI` |
| Serves a single-file Japanese editor dashboard, `<title>AI Newsroom - 編集長ダッシュボード</title>` | 51,885-byte HTML, one `<script>`, no `<form>`, no backend |
| `/robots.txt`, `/sitemap.xml`, `/rss.xml`, unknown paths → all `200` with the *same* HTML (soft-404) | `curl -sI` → `content-type: text/html` for `/robots.txt` |
| No `rel=canonical`, no `X-Robots-Tag`, `access-control-allow-origin: *` | response headers |
| Not deployable from `lesbass/ai-newsroom` | source exists in no `lesbass` repo (GitHub code search → 0 hits); no `.github/workflows/` here |
| No hardcoded credential in the page | no `AIza…`, `ghp_…`, `Bearer …`, or non-empty `apiKey = '…'` literal; the API-key field only writes to `localStorage` (13 references) |

Because the dashboard holds its API key in the *visitor's* `localStorage` and has no
`/api/*` backend, there is no server-side data to lose. The only thing any option destroys
is the HTML app itself — which is why Step 0 below captures it first.

## Why the usual Cloudflare levers do not apply

- **Zone rules / Bulk Redirects cannot target `ai-newsroom.pages.dev`.** `*.pages.dev` lives
  in Cloudflare's own zone, not the `lesbass.com` zone, so no Redirect rule, Transform rule,
  or Always-Use-HTTPS setting written for `lesbass.com` can reach it. The fix must be made
  *inside the Pages project* (deploy a payload, or delete the project).
- **`_redirects` supports path sources only** — `www.news.lesbass.com/*` as a *source* is
  invalid (the repo's own `public/_redirects` header comment says the same). External
  *destinations* are supported: `/* https://news.lesbass.com/:splat 301` is valid.
- **Redirects always win.** Per the Cloudflare Pages docs, "Redirects are always followed,
  regardless of whether or not an asset matches the incoming request", and "Redirects execute
  before headers". So in the 301 payload, `robots.txt` / `index.html` are never served while
  the rule is in place — they are a fallback for the case where the `_redirects` file is lost.
  In the noindex payload there is no redirect, so the assets and `_headers` do apply.
- **A direct upload replaces every asset.** `wrangler pages deploy <dir>` overwrites the
  deployment, so the current dashboard disappears from that project unless Step 0's backup is
  first restored into the payload. If the project turns out to be Git-connected and rejects a
  direct upload, fix it through that project's repository, or fall back to option B (delete).

## Step 0 — back up before touching anything (done for this run)

- Captured: `https://ai-newsroom.pages.dev/` → **51,885 bytes**, SHA-256
  `f3d7a5949d065c2f6da073c28060d19545af8a5233571eeacbadba7c3b17c8c2`, 2026-10-04 01:43 UTC.
- Stored **outside this public repository**: attached to AIN-845 and kept in the agent
  workspace at `backups/ai-newsroom.pages.dev-2026-10-04.html` (gitignored by location).
- Re-capture at execution time with
  `curl -sS -o legacy-dashboard.html https://ai-newsroom.pages.dev/` and compare the hash;
  if it differs, the copy on AIN-845 is stale — re-attach before deploying.

## Option A (recommended) — 301 the whole hostname

Payload: [`payload-301/`](payload-301/) — `_redirects`, `index.html`, `robots.txt`.

```bash
npx wrangler pages deploy docs/legacy-host-redirect/payload-301 --project-name=<PAGES_PROJECT>
```

Verify:

```bash
curl -sSI https://ai-newsroom.pages.dev/            # expect 301, Location: https://news.lesbass.com/
curl -sSI https://ai-newsroom.pages.dev/robots.txt  # expect 301, Location: https://news.lesbass.com/robots.txt
curl -sS  https://ai-newsroom.pages.dev/no-such     # expect 301 → https://news.lesbass.com/no-such
curl -sSI "https://ai-newsroom.pages.dev/?utm=1"    # record whether the query string survives; note it in AIN-845
```

Also confirm the Japanese dashboard string `編集長ダッシュボード` no longer appears in any
response body from that host.

## Option C — noindex only (dashboard stays reachable)

Payload: [`payload-noindex/`](payload-noindex/) — `_headers`, `robots.txt`. The dashboard
itself must be restored from the Step 0 backup into the same directory before deploying,
otherwise the deploy leaves the host empty:

```bash
cp <backup>/ai-newsroom.pages.dev-2026-10-04.html docs/legacy-host-redirect/payload-noindex/index.html
npx wrangler pages deploy docs/legacy-host-redirect/payload-noindex --project-name=<PAGES_PROJECT>
```

Verify:

```bash
curl -sSI https://ai-newsroom.pages.dev/            # expect 200 + x-robots-tag: noindex
curl -sSI https://ai-newsroom.pages.dev/robots.txt  # expect 200 text/plain, "Disallow: /"
curl -sS  https://ai-newsroom.pages.dev/ | grep -o '<title>[^<]*</title>'   # dashboard preserved
```

## Option B — delete the Pages project

Only after the Step 0 backup is confirmed attached to AIN-845. Expected result: the hostname
stops resolving / returns `522`/`NXDOMAIN`-style errors rather than HTML. Confirm afterwards
that nothing in this repo referenced the host (already checked — only historical
`docs/issues/*` records mention it).

## Regression checks after any option (must stay true)

```bash
curl -sSI http://news.lesbass.com/                 # 301 → https (AIN-846 Worker-edge fix)
curl -sS  https://news.lesbass.com/robots.txt      # Sitemap: https://news.lesbass.com/sitemap.xml
curl -sS  https://news.lesbass.com/sitemap.xml     # every <loc> starts with https://news.lesbass.com/
curl -sS  https://news.lesbass.com/rss.xml         # <link> + lastBuildDate present, news.lesbass.com URLs
curl -sSI https://ai-newsroom.lesbass.workers.dev/ # 200, canonical → news.lesbass.com
```

## Sequencing

1. Board answers the **Remediation choice** card on AIN-845 (A / B / C).
2. Board completes the **Connect Cloudflare** card → `connections_search` returns `ready`.
3. Enumerate Pages projects, identify the one serving `ai-newsroom.pages.dev`.
4. Re-run Step 0 (hash comparison), deploy the chosen payload, run the verification above.
5. Record evidence on AIN-845 and, if the change is repo-relevant, in `docs/audit-reports/`.
