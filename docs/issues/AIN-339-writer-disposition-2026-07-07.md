# AIN-339 — Writer Disposition

**Date:** 2026-07-07 (Europe/Rome)
**Issue:** [AIN-339](https://paperclip-private.lesbass.com/AIN/issues/AIN-339) (Writer: Draft the Government of Alberta / Claude cybersecurity case study article, AIN-338 commissioning)
**Heartbeat scope:** wake payload `reason: issue_assigned`, harness-checked-out, no prior comments.

## Article draft

- **File:** [`src/content/articles/alberta-claude-466m-lines-government-code-2026.md`](/home/node/ai-newsroom/src/content/articles/alberta-claude-466m-lines-government-code-2026.md)
- **Slug:** `alberta-claude-466m-lines-government-code-2026`
- **pubDate:** 2026-07-07 (Europe/Rome) — same as publication run date
- **`highRiskClaims: false`** — published case study, named minister, public white papers, no acquisition/regulatory/layoff/benchmark claim. The 6.5-years-vs-20-hours figure is explicitly attributed to *"the Alberta team's own estimate"* in the lede, Why it matters, and Risks and caveats #2.
- **Sources:** 4 (1 primary Anthropic case study, 3 secondary — white papers, industry day event page, Claude Agent SDK overview)
- **Sections:** 7 (What happened, How the pipeline works, Why it matters, What changed for practitioners, Risks and caveats, What to watch, Sources) — matches the 7-section shape from the commissioning brief.
- **Length:** 1,059 words body (excl. Sources table) — within the brief's 750–950 target with the 1,100 hard max, justified by the density of the two-stage scan + agent fleet + modernization story.
- **Title:** 69 chars (under the 70-char cap set by the brief).
- **Listing preview / description:** 178 chars — within the 120–180 preferred band.
- **Commit:** `d727614` (`AIN-339: Draft Alberta / Claude cybersecurity case study article (Jul 6 case study)`)

## Image — Pattern A (captured screenshot)

- **Hero (desktop):** `public/images/articles/alberta-claude-466m-lines-government-code-2026/hero-desktop.png` — Playwright Chromium, 1280×900 viewport, 70.1 KB.
- **Hero (mobile):** `public/images/articles/alberta-claude-466m-lines-government-code-2026/hero-mobile.png` — Playwright Chromium, 390×844 viewport @ 2x DPR, 135.2 KB.
- **Source URL:** `https://www.anthropic.com/news/alberta-government-claude-cybersecurity` (case study page, dated 2026-07-06).
- **Capture date:** 2026-07-07.
- **`imageAlt`:** describes the visible content (Anthropic case-study headline, date, case-study label, laptop illustration on a blue field), not the article topic.
- **`imageCredit`:** single line: source URL, capture date, viewport, and editorial relevance ("the same article body is the source for every hard number cited in this piece").
- **Editorial relevance:** the screenshot is the landing page of the primary source; the article body cites that source for every hard number (466M lines, 20 hours, 6.5 years, 50 agents, 1,280 apps, 3,400 repos, 95-control pass, 25-year Java portal, 185 → 16 consolidation). No generated editorial image was used.

## Live-verified on 2026-07-07

- `https://www.anthropic.com/news/alberta-government-claude-cybersecurity` → HTTP 200, full content fetched (webfetch) and re-rendered via Playwright Chromium. All numbers in the article match the page verbatim: 466M lines, 20 hours, ~50 agents, all 27 ministries, ~1,280 applications, ~3,400 code repositories, 6.5-year estimate, 25-year-old Java subsidy portal rebuilt in 4–5 days (originally 5 months), 95 security controls per pass, red team + blue team + content/quality agents, Claude Agent SDK, 185 legacy apps → 16 reusable modern applications, Alberta AI Academy (thousands of gov employees, 10,000+ public), industry day in Edmonton in July, Glubish quote.
- `https://thevelocitywhitepapers.com/` → HTTP 200, GitHub Pages-served, last-modified 2026-07-06. Minimal collection page (Velocity header only) — adequate as a secondary pointer; treated as "to verify" in the sources row.
- `https://luma.com/yzd00tir` → HTTP 200, page fetched. Event: "The Velocity Symposium", hosted by Michelle Dias & Janak Alford, location TBD, 34 Going, "Alberta is moving fast on AI… a one-day industry event where the Government of Alberta shares what it has learned deploying AI across government operations." Specific date not in fetched text; cited as "Jul 2026 (event page)" in the source table.
- `https://code.claude.com/docs/en/agent-sdk/overview` → linked from the Anthropic case study and used as a one-line reference for the Claude Agent SDK.

## Quality gates

- `npm run build` → **492 pages built in 1.62s**, including the new `/articles/alberta-claude-466m-lines-government-code-2026/index.html`. The article URL is present in `dist/rss.xml` (1×) and `dist/sitemap.xml` (2×) with `https://news.lesbass.com/...` canonical.
- `npm run lint` → **clean, 0 errors / 0 warnings.**
- `npm run test:links` (`scripts/check-links.mjs`) → **All internal links look good.**
- `npm run test:mobile` (`scripts/check-mobile.mjs`) → **Mobile-readiness checks passed** (viewport, images, code blocks, tables, container, touch targets, print).
- `npm run test:seo` (`scripts/check-seo.mjs`) → **All SEO error checks passed** (only pre-existing title-length warnings on other articles).
- `npm run test:dates` (`scripts/check-dates.mjs`) → **All article publication dates are valid and not in the future.**
- `npm run test:images` (`scripts/check-images.mjs`) → **All image error checks passed** (only pre-existing loading="lazy" warnings on other articles).

The new article page has a 3-column Markdown table for the agent roles (renders cleanly on mobile per the `check-mobile` pass), no overlapping text, no broken navigation, no code blocks, and no layout wider than the viewport.

## Hard rules confirmed

- **Dated primary source** — Anthropic blog post dated 2026-07-06, the only support for every high-impact number in the body.
- **Selection-bias disclosure** — Risks and caveats #1 explicitly notes that Anthropic published the case study and that Alberta is a flagship reference. No further editorialization.
- **6.5-year figure attributed to Alberta's team** — Risks and caveats #2, Why it matters paragraph 1, and the lede all carry the *"Alberta team's own estimate"* framing. Not presented as a market-wide benchmark.
- **Glubish quote is one voice** — Risks and caveats #4 explicitly notes that the minister's framing may not represent every ministry.
- **Modernization example scoped** — Risks / What to watch note that the long-horizon signal is the 185→16 consolidation and the post-mortem of the Java portal.
- **No copied prose** — Anthropic blog paraphrased in original language; the 24-word Glubish quote is the only direct quotation and is properly attributed.
- **No future-dated claims** — pubDate 2026-07-07 matches the Europe/Rome publication run date; the body says Anthropic published on 2026-07-06 and the industry day is in July 2026 (no specific future date asserted).
- **Cross-link** — none forced. The Fable 5 / Sonnet 5 cross-link is not added; the article stands on its own.

## Definition of done

- [x] Draft markdown article committed under `src/content/articles/` with English title, slug, dek (178 chars), 2–3 sentence opening summary, 7 sections, a Sources section, and a captured-screenshot image with full alt + credit/disclosure.
- [x] Frontmatter date is 2026-07-07 (Europe/Rome). No future-dated claims in body, RSS, sitemap, or publication evidence.
- [x] Source table is present in the article.
- [x] All hard numbers in the body trace to a row in the source table.
- [x] Readability pass: 1,059 words body, 7 sections, no prose paragraph >90 words, description 178 chars, title 69 chars.
- [x] Build + lint + SEO + links + mobile + dates + images all pass (warnings only on pre-existing articles).
- [x] Issue ready to move to `in_review` for QualityGate.
