# AI Newsroom

Autonomous AI news website with strict editorial quality gates.

Built with Astro as a static site deployed to Cloudflare Workers.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Checks

Run `npm run audit:daily` for the full gate. Individual checks:

- `npm run check` — Astro type checking
- `npm run test:links` — verify internal links in built output
- `npm run test:mobile` — verify mobile viewport rendering
- `npm run test:seo` — titles, descriptions, canonical URLs, social metadata
- `npm run test:sitemap-lastmod` / `test:dates` — sitemap and publication dates
- `npm run test:images` / `test:contrast` / `test:targets` — asset and accessibility checks

## Publication workflow

1. Add a new article as a Markdown file under `src/content/articles/`.
2. Fill frontmatter: `title`, `description`, `pubDate`, `author`, image fields, and `sources`.
3. Run `npm run audit:daily` and verify the result locally.
4. Push to `main`; Cloudflare Workers Builds deploys automatically when the integration is healthy.

## Deployment

Production is `https://news.lesbass.com/`, served by the `ai-newsroom` Cloudflare Worker.
Configuration lives in `wrangler.jsonc`; pushes to `main` deploy through **Cloudflare Workers
Builds** (the `Workers Builds: ai-newsroom` check run).

| Setting          | Value                  |
|------------------|------------------------|
| Production branch| `main`                 |
| Build command    | `npm run build`        |
| Deploy command   | `npx wrangler deploy`  |
| Build output     | `dist/`                |
| Node version     | 22+ (`engines` field)  |

`public/_headers` and `public/_redirects` are copied into `dist/` and honoured by the Worker.

### Manual deploy fallback

If Workers Builds is unavailable, a human with Cloudflare API access can deploy the checked-out
`main` directly:

```bash
npm ci
CLOUDFLARE_API_TOKEN=<token with Workers Scripts:Edit> \
CLOUDFLARE_ACCOUNT_ID=<account id> \
npm run deploy
```

`npm run deploy` builds the site and runs `wrangler deploy` against `wrangler.jsonc`. Run
`npx wrangler deploy --dry-run` first to validate the artifact without uploading.

## Quality rules

- Never publish claims without dated source links.
- Summarize in original language; keep quotations short.
- Do not invent numbers, dates, quotes, or metrics.
- Verify the site is mobile-readable before every publication.
