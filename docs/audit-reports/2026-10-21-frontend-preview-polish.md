# Homepage preview polish — word-boundary cards, spaced topic counts (AIN-997)

**Status: shipped and verified on production.** Canonical target:
`https://news.lesbass.com/`.

## Problem

A real-Chromium audit of production on 2026-10-21 at 1440, 390, 375, and
320 px found two listing-readability defects on the homepage:

1. **Card previews were cut mid-word on phones.** The 220-character preview
   budget produced text taller than the 3-line CSS clamp at 375–390 px, so
   `-webkit-line-clamp` replaced the word-boundary truncator's ending with a
   mid-word cut (observed: `…withheld the mod…`).
2. **Topic-cloud counts ran together with the label** (`AI Agents25`,
   `OpenAI25`). `.tag` is `display: inline-flex`, so the whitespace text node
   between the label and the count was not rendered.

No horizontal overflow was found at any width, and no other surface was
affected.

## Change

Commit `f5cc802` — presentation only. No article prose, dates, tags, slugs,
redirects, sitemap entries, canonical URLs, or feeds were edited.

- `src/components/ArticleCard.astro`: preview budget reduced from 220 to 112
  characters; truncation prefers a sentence end, then a clause separator, then
  the last word boundary, and strips trailing stopwords so a card does not end
  on `the`, `with`, `and`, etc.
- `src/layouts/BaseLayout.astro`: a `max-width: 359px` override raises the card
  clamp from 3 to 4 lines so the shorter preview is never clipped again at
  320 px. `.tag-count` gets an explicit `margin-left: 0.4em` plus tabular
  numerals and muted opacity, so the count spacing no longer depends on markup
  whitespace.
- `src/pages/index.astro`: the topic cloud uses the `.tag-count` class instead
  of an inline style.

## Verification (2026-10-21 13:58–14:02 CEST)

Deployed artifact: RSS `lastBuildDate` `2026-10-21T11:57:17.000Z`, after the
`f5cc802` commit at `11:56:31Z`; live HTML includes `.tag-count` and the
`line-clamp: 4` mobile override.

Real Chromium via `scripts/browser.mjs` against production
(`docs/audit-reports/2026-10-21/preview-polish/verification.json`):

| Width | Horizontal overflow | Card previews clipped by CSS | Min label→count gap |
|---|---|---|---|
| 1440 | none | 0 of 13 | 4.47 px |
| 390 | none | 0 of 13 | 4.47 px |
| 375 | none | 0 of 13 | 4.47 px |
| 320 | none | 0 of 13 | 4.47 px |

Every measured card had `scrollHeight === clientHeight`, so the ellipsis shown
is the truncator's word-boundary ending rather than a CSS clamp cut. At 320 px
the effective clamp is 4 lines; at 375–1440 px it remains 3.

| Check | Result |
|---|---|
| `npm run build` | pass, 569 pages |
| `npm run check` | pass, 0 errors / 0 warnings |
| `npm run lint` | pass |
| `npm run test:mobile` | pass |
| `npm run test:seo` | pass |
| `npm run test:live` | pass — canonical host, symbol font, RSS |
| `dist/sitemap.xml` | 157 `news.lesbass.com` URLs, 0 legacy hosts |

Browser screenshots (Chromium, live production, captured 2026-10-21):

- `card-1440.png`, `card-390.png`, `card-375.png`, `card-320.png` — featured
  card; previews end on complete words (`…Lean formalizations…`) with no
  clipping.
- `topics-1440.png`, `topics-390.png`, `topics-375.png`, `topics-320.png` —
  topic cloud; labels and counts are visually separated (`AI Agents 25`,
  `OpenAI 25`).
- `verification.json` — raw per-width measurements.

Visual inspection of the 320 and 375 px captures confirms no overlap, no
overflow, and legible spacing in both regions.
