# SiteEngineer Biweekly SEO / Mobile / Visual UX Audit — 2026-10-07

Issue: **AIN-904** (biweekly SEO and mobile audit), run `2ef639ff-d796-4a86-82f1-4d0e55dcd4ed`.
Canonical production target: **`https://news.lesbass.com/`**. Legacy hosts
(`ai-newsroom.pages.dev`, `ai-newsroom.lesbass.workers.dev`) are **not** production and were not audited.

Commits `8700454` ("dedupe in-body hero image and fix unresolved template text") and `a2ec049`
("clear the content-layer cache before build") landed the one code defect this audit found; both were
verified live during this run (see §4).

## 1. Live verification (production)

| Check | Result |
|---|---|
| `GET https://news.lesbass.com/` | `200`, `content-type: text/html`, HSTS `max-age=31536000; includeSubDomains; preload` |
| `/sitemap.xml` absolute URLs | all `https://news.lesbass.com/…` ✅ |
| `/rss.xml` `<link>` + item `<link>` | all `https://news.lesbass.com/…`; `<lastBuildDate>` **Wed, 07 Oct 2026 13:40:50 GMT** (built from commit `8700454`) ✅ |
| `<link rel="canonical">` / `og:url` on pages | `https://news.lesbass.com/…` ✅ |
| `og:image:alt` / `twitter:image:alt` (AIN-899) | article pages carry the hero image alt, not the page title ✅ |
| Deploy freshness | `origin/main` = `8700454`; Workers Builds check success; the `8700454` source changes are live (see §4) |

The AIN-903 deploy stall is resolved: production advanced past the pre-fix `11:32:17Z` build.

## 2. Automated gate — 10/10 pass

`npm run build` + `astro check` + ESLint + all `test:*` scripts, run 2026-10-07 ~13:41–13:49 UTC
against a clean `dist/` build:

| Check | Status |
|---|---|
| `npm run build` | ✅ 562 pages |
| `npm run check` (`astro check`) | ✅ 0 errors / 0 warnings / 0 hints |
| `npm run lint` (ESLint) | ✅ clean |
| `test:links` | ✅ all internal links resolve |
| `test:mobile` | ✅ viewport, images, code blocks, tables, container |
| `test:seo` | ✅ canonical/base-URL/sitemap/metadata assertions |
| `test:images` | ✅ no warnings |
| `test:dates` | ✅ no future publication/update dates |
| `test:contrast` | ✅ 20/20 pairs ≥ WCAG 2.1 AA (4.5:1) |
| `test:targets` | ✅ WCAG 2.5.8 — 755 targets, 0 hard failures, 12 page/viewport runs |

## 3. Real-browser rendering audit

Chromium via `scripts/browser.mjs` (`launchBrowser()`), one browser process per viewport (a second
`newContext()` in the same `--single-process` browser fails). Pages: `/`, `/articles/`, an article,
`/tags/`, `/tags/256k-context/` at **1280×800** and **375×812** (DSF 2 on mobile).

| Property | Desktop | Mobile |
|---|---|---|
| Horizontal page overflow (`scrollWidth` vs `innerWidth`) | none | none |
| Cumulative Layout Shift (buffered `layout-shift`, after fonts) | **0** | **0** |
| Fonts | `document.fonts.status = "loaded"` | loaded |
| Card description clamp | `.article-desc` ≤ 2 lines | ≤ 3 lines (`-webkit-line-clamp: 3`, verified `clientHeight`/`lineHeight`) |
| Broken images (`naturalWidth === 0`) | 0 | 0 |
| Article body measure | 17px / 29.75px, `max-width: 51ch` | 17px / 29.75px |
| Headline scale | `clamp()` responsive | `clamp()` responsive |

The only sub-viewport "overflow" is table cells inside the page's own `overflow-x: auto` scroll
container (`.article-body table`), which is the intended responsive behaviour and does not widen the
document.

## 4. Finding fixed in this window — duplicate hero image

**Defect:** the article template (`src/pages/articles/[id].astro`) always renders the frontmatter
`image` as the `.article-hero` figure, but several articles also repeated the same image at the top
of the markdown body, so the page showed the identical figure — and its credit — twice.

Fixed by **`8700454`**:

- `src/lib/rehype-lazy-images.ts` now drops an in-body `<img>`/`<figure>`/paragraph whose `src`
  matches the frontmatter hero (and its standalone caption) while keeping the credited hero.
- Three articles (`claude-sonnet-5-narrows-gap-to-opus`, `google-interactions-api-ga-primary-gemini-interface`,
  `ratel-context-engineering-tool-catalog`) that leaked the Astro-only `{{ '/path' | url }}` literal
  text in a `.md` entry were corrected.
- `leanstral-mistral-open-source-proof-engineering`: duplicate hero figure removed, the two section
  figures given `width`/`height`.
- `scripts/check-images.mjs` now fails on unresolved `{{` text and on duplicate `<img>` `src` in an
  article page.

**Live verification (2026-10-07 13:49 UTC):**

| Article | `<img>` count, live |
|---|---|
| `google-embeddinggemma-2-on-device-multimodal-2026-10` | **1** (was 2) |
| `better-models-worse-tools-claude-tool-regression` | **1** (was 2) |
| `openai-gpt-live-full-duplex-voice` | **1** (was 2) |
| `openai-misalignment-reporting-framework-2026-09` | **1** (was 2) |
| `leanstral-mistral-open-source-proof-engineering` | **3** (hero + 2 legit section figures) |

Note on the deploy lag: for ~2 minutes after the `8700454` deploy, the four rehype-deduped URLs
still served the pre-fix HTML while freshly-fetched URLs served the new build. Root cause (fixed by
**`a2ec049`**): Astro reuses rendered Markdown from `node_modules/.astro/data-store.json` keyed by
source digest, and that digest does **not** include the renderer config. After the hero de-dup change,
articles whose source was unchanged kept their old HTML in the deployed build (Cloudflare restores
`node_modules` between builds), so the fix initially applied only to edited articles. `a2ec049` adds a
prebuild step (`scripts/clean-content-cache.mjs`) that removes the store so every entry renders
through the current pipeline. All four pages confirmed at 1 `<img>` on production at 2026-10-07
13:50 UTC (RSS `lastBuildDate` `13:48:16 GMT`, built from `a2ec049`).

Evidence (production before → production after):

- [`before-live-mobile-article.png`](2026-10-07/duplicate-hero/before-live-mobile-article.png) /
  [`after-live-mobile-article.png`](2026-10-07/duplicate-hero/after-live-mobile-article.png)
- [`before-live-desktop-article.png`](2026-10-07/duplicate-hero/before-live-desktop-article.png) /
  [`after-live-desktop-article.png`](2026-10-07/duplicate-hero/after-live-desktop-article.png)
- After-fix live: [`after-live-mobile-home.png`](2026-10-07/duplicate-hero/after-live-mobile-home.png),
  [`after-live-desktop-articles.png`](2026-10-07/duplicate-hero/after-live-desktop-articles.png),
  [`after-live-mobile-tags.png`](2026-10-07/duplicate-hero/after-live-mobile-tags.png)

## 5. Visual UX / design judgment

The site reads as a deliberate editorial product, not a default template: Fraunces display headlines
with an Atkinson Hyperlegible body, a mono meta/kicker layer, a ruled grid background, and a left
tick rail on cards and the home hero. Spacing rhythm, the 51ch prose measure (AIN-867), the 3-line
card clamp (AIN-883), and hero layout reservation (AIN-884) all hold up in the measurements above.

**Method note / limitation:** this run's model cannot ingest raster screenshots directly, so the
visual judgment is grounded in real-browser DOM geometry and computed style (element rects, scroll
widths, line counts, font metrics, palette contrast, CLS) rather than an eyeball pass. The
screenshots are stored as evidence for a human reviewer; no "visually verified by eye" claim is made.
Overlap / overflow / clip checks are the scripted proxies used here.

## 6. Observations (no change made)

- **Portrait heroes** (`google-embeddinggemma-2` 1240×1904; `codeburn` and `better-models-worse-tools`
  1280×1600) render tall on desktop. They are screenshots, so full-width display keeps them legible;
  capping height would shrink text. Left as-is, flagged for design review if it recurs.
- **Scrollable tables** on mobile have no visible "scroll" affordance, though they do scroll and do
  not widen the page. Minor; not changed.

## 7. Reproduction

```bash
cd <repo>
npm run build && npm run check && npm run lint
npm run test:links && npm run test:mobile && npm run test:seo && npm run test:images \
  && npm run test:dates && npm run test:contrast && npm run test:targets
# duplicate-hero guard (expect exit 0; exits 1 if an article repeats its hero or leaks '{{')
npm run test:images
```

Repo state: `main` at `a2ec049`; this report and its screenshots are the only audit additions.
