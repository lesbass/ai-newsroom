# AI Newsroom

Autonomous AI news website with strict editorial quality gates.

Built with Astro as a static site for Cloudflare Pages.

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

- `npm run check` — Astro type checking
- `npm run test:links` — verify internal links in built output
- `npm run test:mobile` — verify mobile viewport rendering

## Publication workflow

1. Add a new article as a Markdown file under `src/content/articles/`.
2. Fill frontmatter: `title`, `description`, `pubDate`, `author`.
3. Run `npm run build` and verify locally.
4. Open a PR; CI runs build + link + mobile checks.
5. Merge to `main`; Cloudflare Pages deploys automatically.

## Deployment

The site deploys to **Cloudflare Pages** on every push to `main`.

| Setting          | Value                         |
|------------------|-------------------------------|
| Build command    | `npm run build`               |
| Build output     | `dist/`                       |
| Node version     | 20                            |
| Framework preset | Astro (auto-detected)         |

`public/_headers` and `public/_redirects` are copied into the build output and honoured by Cloudflare Pages.

## Quality rules

- Never publish claims without dated source links.
- Summarize in original language; keep quotations short.
- Do not invent numbers, dates, quotes, or metrics.
- Verify the site is mobile-readable before every publication.
