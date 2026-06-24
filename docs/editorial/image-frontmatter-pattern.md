# Article Image Frontmatter Pattern

This document records the canonical frontmatter pattern for article images in
the `lesbass/ai-newsroom` site. It exists so Writer, QualityGate, EditorInChief,
and Publisher all read the same contract. It is the durable reference backing
the Writer's `AGENTS.md` and the schema in `src/content.config.ts`.

Source of truth ordering:

1. Writer's `AGENTS.md` — the rules the writer must follow when drafting.
2. This document — the agreed field name, structure, and rationale.
3. `src/content.config.ts` — the Zod schema the site enforces at build time.
4. `scripts/check-seo.mjs` (and any successor validation) — the build-time
   checks that fail the build if the pattern is missing.

If the schema and this document drift, the writer should treat this document
plus `AGENTS.md` as the source of truth and file a follow-up against
SiteEngineer to reconcile the schema.

## Field names (current site schema)

The schema in `src/content.config.ts` accepts three flat, optional fields on
every article entry:

| Field        | Type     | Purpose                                              |
|--------------|----------|------------------------------------------------------|
| `image`      | string   | Public path (`/images/articles/<slug>/hero.png`) or full source URL. |
| `imageAlt`   | string   | Alt text describing what is visible in the image.    |
| `imageCredit`| string   | One-line credit containing source, owner, license (or generated disclosure). |

All three fields are optional at the article level so Pattern C (no image,
with a recorded exception) remains a valid article. When `image` is set, both
`imageAlt` and `imageCredit` are mandatory per the writer's contract and the
QualityGate block rule.

`image` is also the prop name used by `BaseLayout.astro` for the Open Graph /
Twitter / JSON-LD image URL. The article page reads `post.data.image` and
forwards it to the layout so OG metadata, the article hero figure, the RSS
`<enclosure>`, and the sitemap `<image:image>` all share the same source of
truth.

## Field patterns

### Pattern A — captured screenshot or source-provided media

Use this for product pages, GitHub repository pages, release pages,
documentation pages, benchmark pages, demos, and any other source that can be
visually represented. Always prefer a real capture over a generated image.

```yaml
image: /images/articles/<slug>/hero.png
imageAlt: "Screenshot of <subject> showing <what is visible>"
imageCredit: "Source: <source URL> · Credit: <owner or author> · License: <MIT, Apache-2.0, CC BY 4.0, etc.>"
```

### Pattern B — generated editorial image

Use this when no captured asset is feasible (no public surface, no demo, no
diagram in the source) and the article still benefits from a visual. The
generated disclosure must appear in both the alt text and the credit line so
the disclosure is visible to screen readers and to sighted readers.

```yaml
image: /images/articles/<slug>/hero.png
imageAlt: "Generated editorial diagram of <what the image shows> (AI-generated, AI Newsroom)"
imageCredit: "Generated editorial image · Model/tool: <e.g., hand-authored SVG, Nano Banana, etc.> · Disclosure: AI-generated, not source evidence"
```

### Pattern C — exception (no image)

Omit all three image fields and record a short reason in the article task or
the writer's disposition comment. The reason must state the subject and why
no image is reasonable for it. The exception is a backstop, not a default.

## Field rules

- `image` must resolve at build time. Prefer a local path under `/public/`
  (`/images/articles/<slug>/hero.png`) so the build does not depend on
  third-party uptime. A full source URL is acceptable when the asset is hosted
  by the source and the site wants the canonical source image.
- `imageAlt` is mandatory whenever `image` is set. It must describe what is
  visible in the image, not what the article is about. QualityGate should
  reject empty or generic alt text (e.g. "image", "screenshot", "diagram",
  or just the article title).
- `imageCredit` is mandatory whenever `image` is set. It must be a single
  line that names the source, credits the owner/author, and states the
  license. If the source page does not state a license, write
  `no license stated` and link the source inside the credit string. Generated
  images must say so in the credit line and the alt text.
- Inline `![](path)` references in the article body should reuse the same
  path as `image` so the renderer does not duplicate work. Duplicate images
  in the body and in the hero slot are allowed only when the inline image is
  genuinely a separate figure (e.g., a code snippet, a chart, a second
  screenshot), in which case each inline image must carry its own alt and
  source link in the surrounding prose.

## Handoff contract

A draft is not eligible for QualityGate review unless one of the following is
true:

- The frontmatter includes a valid `image` block (Pattern A or Pattern B)
  with `image`, `imageAlt`, and `imageCredit` all populated.
- The article task or the writer's disposition comment records an explicit
  `image: exception` reason (one or two sentences explaining why no suitable
  image exists for this subject).

If neither is present, the writer must keep the draft out of `in_review` for
QualityGate and surface the missing image fields in the next writer comment
so the gap is visible in the issue thread.

## Suggested future extension (writer preference)

The current flat fields work, but a structured `image` object would make the
source/credit/license requirements machine-checkable instead of free-text.
A future schema migration could look like:

```ts
image: z.object({
  path: z.string(),
  alt: z.string().min(1),
  source: z.string().url().optional(),
  credit: z.string().optional(),
  license: z.string().optional(),
  generated: z.boolean().optional(),
  prompt: z.string().optional(),
}).optional(),
```

Notes for SiteEngineer:

- The flat fields can stay as an accepted input shape during the migration
  (the article page can flatten a structured `image` object to the three
  flat fields, or vice versa).
- `alt` would be required inside the block, not optional. An empty alt on a
  real image is an accessibility bug; an empty alt on a purely decorative
  image is still allowed via a separate `decorative: true` flag if the
  pattern needs it later.
- `scripts/check-seo.mjs` already enforces alt text on rendered `<img>` tags.
  A frontmatter-level check (every article with `image` has non-empty
  `imageAlt`, and `imageCredit` mentions either a `Source:` URL or a
  `Generated` marker) is the natural extension.

## Rationale

- The flat fields mirror the existing `canonicalURL` and `sources` array in
  `src/content.config.ts`: optional at the article level, machine-parseable,
  no nesting. They were adopted by SiteEngineer under AIN-198 alongside the
  renderer change, the RSS `<enclosure>`, and the sitemap `<image:image>`
  tags, so the writer contract has to match what the site already accepts.
- The exception is left as a separate state (no image fields at all), not a
  flag on the fields, because the writer's reason for skipping an image is
  editorial and belongs in the issue thread, not the frontmatter.
- Keeping the frontmatter pattern flat keeps the writer's job simple: three
  fields, one credit line, one alt line. The future structured-object
  extension is documented so the trade-off is visible if QualityGate later
  needs stricter machine checks.
