# Tag consolidation — 2026-10-21 (AIN-987)

**Status: shipped and verified on production.** Canonical target:
`https://news.lesbass.com/`.

## Problem

The public `/tags/` index carried near-duplicate topic pages that split internal links
and search authority, plus a long tail of singular/plural, acronym, and typo variants.
Examples observed at the start of the run: `benchmark` (3) vs `benchmarks` (3),
`model-context-protocol` (2) vs `mcp` (16), `ai-policy`/`ai-regulation` vs `policy`,
`coding-agents`/`agentic-coding` vs `ai-coding`.

## Change

Metadata only — no article prose, dates, titles, images, or sources were edited.

- Normalized 19 source tags to 11 canonical tags across 19 articles and removed duplicate
  tag values per article.
- Added 301s in `public/_redirects` for every removed tag URL.
- Added trailing-slash variants for **all** tag redirect rules (382 tag rules total). The
  previous tag consolidations only matched the non-slash path; the published canonical
  form is `/tags/<tag>/`, so those old URLs returned 404 instead of 301. This fixes that
  latent regression for every historical tag consolidation, not only the new ones.

| Removed | Canonical |
|---|---|
| `benchmark`, `evaluation` | `benchmarks` |
| `model-context-protocol` | `mcp` |
| `api-pricing` | `pricing` |
| `ai-policy`, `ai-regulation` | `policy` |
| `coding-agents`, `agentic-coding`, `ai-coding-agent` | `ai-coding` |
| `ai-agent`, `agent`, `agents` | `ai-agents` |
| `deepmind` | `google-deepmind` |
| `hugging-face` | `huggingface` |
| `deploymentsafety` | `deployment-safety` |
| `ai-export-controls`, `export-controls` | `export-control` |
| `acquisition`, `m-and-a` | `acquisitions` |

Commits: `f9b15ed` (tag normalization + 301s), `7ab578c` (trailing-slash coverage).

## Verification (2026-10-21 10:15–10:18 UTC)

| Check | Result |
|---|---|
| `npm run build` | 574 pages, pass |
| `npm run test:seo` (includes AIN-719 tag-redirect guard) | pass |
| `npm run test:links` | pass |
| `npm run test:dates` | pass |
| `npm run lint` | pass |
| Removed tag URLs, both slash forms | 38/38 return `301` to the canonical tag |
| Pre-existing tag redirect, e.g. `/tags/agent-memory/` | now `301` (was `404`) |
| `/tags/benchmarks/` | `200`, 5 articles |
| `/tags/policy/` | `200`, 7 articles |
| `/tags/ai-coding/` | `200`, 21 articles |
| `/tags/ai-agents/` | `200`, 25 articles |
| `/tags/` index | 78 topics across 72 articles (was 85) |
| `/sitemap.xml` | 157 URLs, 79 tag URLs, 0 removed-alias URLs, 0 non-canonical hosts |
| `npm run test:deploy-freshness` | pass — live `<lastBuildDate>` 10:15:39 UTC vs main 10:14:43 UTC |
| `npm run test:live` | pass — canonical host, symbol font, arrow glyphs, RSS |

Rollback: `git revert 7ab578c f9b15ed` (metadata only; no data migrated).
