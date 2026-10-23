# Legacy Italian article redirects — trailing-slash coverage (AIN-1035)

**Status: shipped and verified on production.** Canonical target:
`https://news.lesbass.com/`.

## Problem

`public/_redirects` carried five Italian→English article 301s, but each source
was registered only without a trailing slash. Astro serves the legacy article
URLs as `/articles/<slug>/`, and Cloudflare matches `_redirects` literally, so
the real legacy URLs still returned `404` while only the slashless forms
redirected. The 397 tag-consolidation rules already had both forms; these five
were missed.

Affected sources:

- `/articles/anthropic-propone-blocco-ai-pericolosa-poi-viene-bloccata`
- `/articles/anthropic-claude-corps-fellowship-150-milioni`
- `/articles/didilili-ai-agents-from-zero-guida-open-source-2026`
- `/articles/google-gemini-spark-agente-24-7-cloud-workspace-2026`
- `/articles/smolagents-hugging-face-agenti-codice-python`

## Change

- Added the trailing-slash variant for all five sources in `public/_redirects`,
  each pointing at the same English target as the slashless form.
- Added a regression in `scripts/check-links.mjs`: every exact-path `301`
  source must have both `/path` and `/path/` in the redirect table. Wildcard,
  splat, placeholder, and `/` sources are exempt because they match both forms
  themselves. `npm run test:links` fails with the missing variant named.
- Proved the guard fails on the original defect by removing one trailing-slash
  rule locally: the check exited `1` naming
  `/articles/anthropic-claude-corps-fellowship-150-milioni/`, then passed again
  after restoring it.

Commits: `dd6f699` (five redirect pairs + guard), `24f347e` (wildcard exemption
hardening in the guard).

## Verification (2026-10-23 03:38–03:40 UTC)

| Check | Result |
|---|---|
| `npm run build` | 578 pages, pass; `dist/_redirects` contains the new pairs |
| `npm run test:links` | pass (and fails as expected when a pair is removed) |
| Both slash forms of all five sources | 15/15 checks pass: `301` to the correct English article on `https://news.lesbass.com/` |
| Resolved English article targets | 5/5 return `200` (with the canonical trailing slash) |

Live evidence was captured after the Workers Build picked up `dd6f699`; the
follow-up `24f347e` only changes the local check script and does not alter
routing. Example (`curl -sI`):

```text
/articles/anthropic-propone-blocco-ai-pericolosa-poi-viene-bloccata/ -> 301
  https://news.lesbass.com/articles/anthropic-proposes-block-then-gets-blocked
/articles/smolagents-hugging-face-agenti-codice-python/ -> 301
  https://news.lesbass.com/articles/smolagents-hugging-face-agents-code-python
```
