# Article Image Requirements

Per AIN-197, articles must include at least one relevant image by default. This document specifies the expected frontmatter and content patterns for Writer and provides the checklist QualityGate uses to manually verify compliance.

## Frontmatter Pattern

Articles should include an `image` field in frontmatter that points to a file in `public/images/`:

```yaml
---
title: "Article Title"
description: "Article description"
image: "/images/article-slug-hero.png"
---
```

The `image` field is passed to `BaseLayout` and used for:
- `og:image` (Open Graph social preview)
- `twitter:image` (Twitter/X card)
- JSON-LD `NewsArticle.image` (schema.org structured data)

When `image` is absent or empty, all three default to `/favicon.svg`. The `scripts/check-images.mjs` audit script flags this as a warning on article pages.

## In-Content Images

Images embedded in the article body should follow this Markdown pattern:

```markdown
![Alt text describing what the image shows](/images/article-slug-diagram.png)

*Source: screenshot of GitHub repository DeusData/codebase-memory-mcp, captured 2026-06-24. Repository is MIT-licensed. Credit: GitHub.*
```

Or in HTML:

```html
<img
  src="/images/article-slug-screenshot.png"
  alt="Screenshot of the Cloudflare Workers dashboard showing the temporary accounts toggle"
  loading="lazy"
/>
<figcaption>Source: Cloudflare Dashboard, captured 2026-06-24. Credit: Cloudflare.</figcaption>
```

## Image Metadata Checklist

QualityGate should verify:

1. **Presence**: Article page includes at least one `<img>` tag, or the `image` frontmatter field is set to a non-favicon path.
2. **Alt text**: Every `<img>` has a non-empty `alt` attribute describing image content (accessibility requirement).
3. **Loading attribute**: Each `<img>` includes `loading="lazy"` for performance.
4. **Source/credit**: Image has a caption or nearby text crediting the source, unless it's an AI-generated image (which must be disclosed).
5. **No broken references**: Image paths resolve in the built `dist/` output.
6. **OG/Twitter/JSON-LD images**: Not the `/favicon.svg` fallback on article pages.

## Automated Validation

Run after build:

```bash
npm run test:images
```

This invokes `scripts/check-images.mjs` which checks the built `dist/` output for:
- Article pages with no `<img>` tags (warning)
- `<img>` missing `alt` attribute (error)
- `<img>` with empty `alt` (warning)
- `<img>` missing `loading` attribute (warning)
- `og:image` using favicon fallback on article pages (warning)
- `twitter:image` using favicon fallback on article pages (warning)
- JSON-LD image using favicon fallback on article pages (warning)
- Broken local image references (error)

The check is also included in the full audit pipeline:
```bash
npm run audit        # full: build + check + lint + links + mobile + seo + images
npm run audit:daily  # daily report runner (includes images step)
```

## Exception Protocol

If an article genuinely cannot include a relevant image and the favicon fallback is unavoidable:

1. Writer records the reason in the article's Paperclip issue thread.
2. QualityGate reviews the reason and either approves the exception or requests alternatives.
3. The exception reason is auditable — it should cite why screenshots, diagrams, or charts of primary sources were unavailable or inappropriate.

## Image File Conventions

- Store images in `public/images/`.
- Use the article slug as a prefix: `article-slug-hero.png`, `article-slug-diagram.png`.
- Prefer WebP or AVIF for photos, PNG for screenshots and diagrams, SVG for charts.
- Keep images under 200 KB where practical.
- Progressive JPEG or optimized PNG is preferred.
