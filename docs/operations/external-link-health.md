# External citation link health

Advisory checker for outbound source links in published articles (AIN-1010). It exists because
`npm run test:links` only verifies internal links, so dead external citations were previously
found only during a manual crawl (AIN-1006 / AIN-1007).

## Run

```bash
npm run test:external-links
npm run test:external-links -- --limit 25
npm run test:external-links -- --url https://example.com/source --json /tmp/report.json
```

Options: `--limit <n>`, `--url <url>` (repeatable, works for URLs no longer referenced by an
article), `--json <path>`, `--concurrency <n>` (1–10, default 6), `--timeout <ms>` (default
15000), `--verbose`.

The script reads `src/content/articles/*.md`, collecting frontmatter `sources[].url` values
plus inline markdown links and autolinks. It deduplicates them and skips
`news.lesbass.com` URLs, which `test:links` already covers.

## Classification

| Outcome | Status | Fails the run? |
|---|---|---|
| ok | 2xx / 3xx | no |
| dead | 404 / 410 | **yes** |
| gated | 401 / 403 / 429 (bot gates) | no, reported only |
| needs-review | other 4xx / 5xx, DNS/TLS errors, timeouts | no, reported only |

Exit codes: `0` when there are no dead links, `1` when at least one dead link is found, `2` for
invalid arguments. `--json` writes the full per-URL report with the referencing article names.

## Scope and limits

- **Advisory, not a gate.** The check is network-dependent and is intentionally excluded from
  `npm run audit` / `audit:daily` so a third-party outage or bot wall cannot fail a build.
- Requests are polite: a descriptive `AI-Newsroom-LinkCheck` user agent, bounded concurrency,
  no retries, and a per-request timeout.
- A `gated` or `needs-review` result is not proof the citation is bad. Open the URL in a browser
  before changing article content; this script reports health, it does not repair citations.
- Redirects are followed, so the reported status is the final response. Sites that block
  non-browser clients may appear as `gated` even when the page is live.
