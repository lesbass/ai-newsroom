# Repository Guidelines

## Project Structure & Module Organization

This is an Astro static site for AI Newsroom, deployed to Cloudflare Pages with canonical URL `https://news.lesbass.com/`. Source lives in `src/`: UI in `src/components/`, routes in `src/pages/`, layouts in `src/layouts/`, schema in `src/content.config.ts`, and helpers in `src/lib/`. Articles are Markdown files in `src/content/articles/`. Static assets live in `public/`, including article images under `public/images/articles/<article-slug>/`. Operational notes, audits, and issue dispositions live under `docs/`.

## Build, Test, and Development Commands

- `npm install` installs dependencies and runs the Chromium setup hook.
- `npm run dev` starts the Astro dev server.
- `npm run build` builds the static site into `dist/`.
- `npm run preview` builds, then serves through Wrangler.
- `npm run check` runs Astro type checking.
- `npm run lint` runs ESLint.
- `npm run audit` runs build, type check, lint, link, mobile, SEO, image, and date checks.
- `npm run deploy` builds and deploys with Wrangler.

## Coding Style & Naming Conventions

Use TypeScript/ES modules and existing Astro conventions. Prefer single quotes in TypeScript/Astro frontmatter, two-space indentation, and PascalCase component names, such as `ArticleCard.astro`. Article filenames should be lowercase hyphenated slugs, for example `openai-ona-acquisition-2026.md`. Keep helpers small and colocated in `src/lib/`.

## Testing Guidelines

Run `npm run audit` before publication or PRs that affect output. For smaller changes, run the relevant subset: `npm run check`, `npm run lint`, `npm run test:seo`, `npm run test:links`, `npm run test:images`, and `npm run test:dates`. When changing URLs or feeds, inspect `dist/client/rss.xml`, `dist/client/sitemap.xml`, and affected article pages.

## Editorial & Content Rules

Every article must include frontmatter matching `src/content.config.ts`: `title`, `description`, `pubDate`, `author`, `tags`, and dated `sources` where applicable. Do not publish future-dated articles. Claims need dated, linkable sources; prefer primary sources. Keep quotations short, add `imageAlt` and `imageCredit`, and avoid internal Paperclip issue references in public articles.

## Commit & Pull Request Guidelines

Recent history uses concise, imperative subjects with either `fix:` or an issue prefix, for example `fix: remove robots.txt RSS block...` or `AIN-245: Publish CodeBurn article...`. PRs should summarize the user-visible change, list validation commands run, link the relevant AIN issue when available, and include screenshots for visual or mobile-impacting changes.

## Agent-Specific Instructions

Before broad file reads, prefer TokenSave MCP tools for structure and symbol context. Do not change production metadata away from `news.lesbass.com` unless explicitly asked. Preserve existing docs and publication records; add new records under the matching `docs/` subdirectory.
