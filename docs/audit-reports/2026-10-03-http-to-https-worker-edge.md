# HTTP → HTTPS redirect at the Worker edge — 2026-10-03

**Run:** heartbeat `59c74b23-ff79-4a5b-9417-b67fed19b9c7` (wake reason `heartbeat_timer`,
unassigned). Implements **AIN-846**. Records how production is actually served, why the
issue-suggested zone-level fix was not reachable, what shipped instead, and the live
before/after evidence so neither the topology nor the regression checks need re-deriving.

Canonical production URL: `https://news.lesbass.com/`.

## Problem (as filed, AIN-846)

Plain `http://news.lesbass.com/` answered **200 OK** with the full homepage instead of
`301` to `https://`. HSTS was already present on HTTPS, but it only binds a client that has
seen an HTTPS response first.

## Serving topology (determined in this run, not documented anywhere else)

| Fact | Evidence |
|------|----------|
| Production is a **Cloudflare Worker** named `ai-newsroom`, not a Cloudflare Pages project | `GET /index.html` → `307 Location: /` (Workers Assets `html_handling`), whereas `dist/404.html` exists yet unknown paths return a **byte-empty** `404` — that combination is Assets, not Pages |
| Custom domain `news.lesbass.com` is attached to that Worker in account `4adb3952e18826ca172f446428e1b2a3` | body + headers of `https://news.lesbass.com/` and `https://ai-newsroom.lesbass.workers.dev/` are byte-identical |
| Deploys are made by **Workers Builds** through the GitHub App *Cloudflare Workers and Pages* | every push to `lesbass/ai-newsroom` produces a `Workers Builds: ai-newsroom` check run; there is **no** `.github/workflows/` in the repo |
| `ai-newsroom.pages.dev` is **not** this site | single-file Japanese HTML app, no source in any `lesbass` repo (GitHub code search → 0 hits) — that is **AIN-845** |
| Zone-level controls (`Always Use HTTPS`, Redirect rules) were not reachable | no `CLOUDFLARE_API_TOKEN`, no `~/.wrangler` auth, `/api/agents/me/secrets` → `[]`, no Cloudflare tool installed in the tool gateway (`GET /api/tool-gateway/tools` → empty) |

`public/_redirects` (177 legacy tag/host redirects) and `public/_headers` are parsed by the
Assets layer, so any Worker in front of them must forward to `env.ASSETS.fetch`.

## Fix shipped

Commits on `main`:

| Commit | Change |
|--------|--------|
| `2a01713` | `src/worker.js` — `http:` requests → `301` to the same URL over `https:`, preserving path and query; `localhost` / `127.0.0.1` / `[::1]` exempt so local tooling keeps working; every other request delegates to `env.ASSETS.fetch`. `wrangler.jsonc` gains `main: src/worker.js`, `assets.binding: "ASSETS"`, `assets.run_worker_first: true` |
| `e6dd0e5` | `eslint.config.mjs` — ignore `.wrangler/` (gitignored temp bundles broke `npm run lint` after any `npm run preview`) |

This is the credentials-free equivalent of *Always Use HTTPS*: the redirect happens at the
worker request handler, before any asset lookup, so it applies to every path.

## Verification

Local (`npm run preview` → `wrangler dev --port 8787`, driven through
`news.127.0.0.1.nip.io` because `wrangler dev` serves plain HTTP):

- `http://` any path → `301`, `location` keeps path + query
- `localhost` → still `200` (no redirect loop with dev servers)
- `/tags/agent-auth` → `301 /tags/security` (`_redirects` still applied)
- security headers present (`_headers` still applied)
- unknown path → empty `404`; `/rss.xml` → `application/rss+xml`

Live, after `2a01713` reached `main` and the Workers Builds check run completed
(`conclusion: success`, build `255ef54e-9909-48f9-849b-4c425f0be34a`):

| Request | Result |
|---------|--------|
| `http://news.lesbass.com/` | **`301` → `https://news.lesbass.com/`** |
| `http://news.lesbass.com/robots.txt` | **`301` → `https://…/robots.txt`** |
| `http://news.lesbass.com/articles/dario-amodei-pace-the-frontier/?x=1` | **`301` → `https://…?x=1`** (path + query preserved) |
| `http://ai-newsroom.lesbass.workers.dev/` | **`301` → `https://…`** |
| `https://news.lesbass.com/` | `200`, 36 489 bytes |
| `https://news.lesbass.com/articles/dario-amodei-pace-the-frontier/` | `200` |
| `https://news.lesbass.com/tags/agent-auth` | `301 /tags/security` — `_redirects` intact |
| `https://news.lesbass.com/` response headers | `strict-transport-security`, `x-frame-options: DENY`, `x-content-type-options: nosniff`, `referrer-policy`, `permissions-policy` — `_headers` intact |
| `/rss.xml` / `/sitemap.xml` | `application/rss+xml` / `application/xml` |
| `https://news.lesbass.com/nope-xyz/` | `404`, body size `0` |

Repo checks after the change: `npm run lint` ✅ · `npm run check` ✅ (0 errors/warnings/hints)
· `npm run test:seo` ✅ (base-URL guard) · `test:links` ✅ · `test:dates` ✅ · `test:images` ✅.

## Not done / out of scope

- Zone-level *Always Use HTTPS* and a `http.request.uri.scheme` Redirect rule were **not**
  configured — no credentials. The Worker-level redirect satisfies AIN-846; the zone rule
  remains a belt-and-braces option once Cloudflare access exists (**AIN-845**).
- `www.news.lesbass.com` still NXDOMAIN (per AIN-846, out of scope).
- No content, copy, or design changes.

## Re-verify later

```sh
curl -sI http://news.lesbass.com/                       # expect 301 + location: https://
curl -sI http://news.lesbass.com/articles/              # expect 301 (deep path)
curl -s  -o /dev/null -w '%{http_code}\n' https://news.lesbass.com/   # expect 200
curl -sI https://news.lesbass.com/tags/agent-auth       # expect 301 /tags/security
curl -s  -o /dev/null -w '%{http_code} %{size_download}\n' https://news.lesbass.com/nope-xyz/  # expect 404 0
```

## Paperclip bookkeeping — handoff to the task-bound run

**Why this section exists.** Issue writes are gated by the cross-issue influence counter
(`server/src/services/cross-issue-influence-limit.ts`): for an agent, every comment, status
change and relation edit runs `observeCrossIssueInfluence`, which *throws*
`cross_issue_influence_run_context_required` unless the run's `contextSnapshot` carries
`issueId`/`taskId`. A `heartbeat_timer` run has neither, so from that run **no issue can be
commented, updated or re-triaged** — the code fix above is complete and live, but the two
issues could not be dispositioned from it. Same guard is why `connections_search` /
`connection_request` refuse a timer run ("Connection requests require a task-bound
heartbeat run"; they also need `responsibleUserId`, which AIN-845 has).

An issue-scoped wake (assignment / `issue_monitor_due` / `payload: { issueId }` on
`POST /api/agents/{id}/wakeup`) produces a run whose `contextSnapshot.issueId` is set.
Writes on that issue are then free (`sourceIssueId === targetIssueId` short-circuits the
cap); writes on the *other* issue count against `CROSS_ISSUE_INFLUENCE_LIMIT = 20` per run.

**Do not redo any of the following — it is finished:**

| Item | State |
|---|---|
| Worker-edge `http:` → `301 https:` (`src/worker.js`, `wrangler.jsonc`) | live on production, verified |
| `_redirects` / `_headers` / RSS / sitemap / empty 404 | verified intact after the Worker change |
| `npm run lint` · `check` · `test:seo` · `test:links` · `test:dates` · `test:images` | all pass |
| this report | on `main` |

**Remaining Paperclip steps, in order:**

1. **AIN-846** (`32c74205-ad37-4bda-bea2-d95a408c2648`, currently `blocked` by AIN-845,
   assignee = this agent). The fix is done, so the blocker is obsolete:
   `PATCH /api/issues/32c74205-…` with `{"blockedByIssueIds": []}`, then a second PATCH
   `{"status": "done", "comment": <evidence: this file's tables, commits 2a01713 / e6dd0e5 /
   cc7977b, build 255ef54e, before/after curl table>}`. A single PATCH with both fields
   returns `409 Issue follow-up blocked by unresolved blockers`, so clear first, then close.
2. **AIN-845** (`67a80b89-2820-40ba-8883-8ea105c0e7a8`, `in_progress`, assignee = this
   agent, responsible user `KrG7jrdSjANfsanpgzdjx6KyZqnaVudo`). On the task-bound run call
   `connections_search` for Cloudflare:
   - **found** → `connection_request`, then use the granted access to enable zone
     *Always Use HTTPS* (belt and braces) and remediate/redirect the legacy
     `ai-newsroom.pages.dev` host → comment the outcome → `done`.
   - **not found** → `PATCH` the issue to `blocked` with an
     `unblockDescriptor: { owner, action }` naming the board/user as the owner of
     "grant the agent Cloudflare access (dashboard login or `CLOUDFLARE_API_TOKEN`)", and a
     comment carrying the evidence in this file. Do **not** fabricate a connection card and
     do not leave it `in_progress` with no live path.
3. Both issues are in the same project (`456aaef4-…`) and goal (`c3a5fb13-…`); no other
   AIN-84x issue depends on either.

**Known platform facts for this repo** (verified 2026-10-03, do not re-derive):

- Production = Cloudflare Worker `ai-newsroom` + custom domain `news.lesbass.com`, deployed
  by the *Workers Builds* GitHub check on every push to `main`. No workflow files in-repo.
- `ai-newsroom.pages.dev` is a different app and is **not** in any `lesbass` repo.
- `GET /api/agents/{id}/runner-goal` → `availability: unsupported` for this adapter
  (`opencode_structured_goals_unavailable`), so session goals cannot carry a handoff.
- No Cloudflare credentials anywhere: `/api/agents/me/secrets` empty, no `~/.wrangler`
  auth, `GET /api/tool-gateway/tools` returns `[]`.
