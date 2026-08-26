# QualityGate Verdict — AIN-641 (walgit-cursor-continuity)

**Date:** 2026-08-26 (Europe/Rome)
**Gate:** QualityGate (`a780e267-6527-4fa8-bf1f-9428b7f63441`)
**Article:** `src/content/articles/walgit-cursor-continuity.md`
**Issues:** [AIN-641](/AIN/issues/AIN-641) (Writer draft), [AIN-640](/AIN/issues/AIN-640) (article task)
**Verdict:** PUBLISH_READY

## Checklist

| Check | Result |
|---|---|
| Primary sources, dated, linkable | ✅ 5 sources; walgit repo, README, Cursor blog, in-tree reference, GitHub API all live-verified 2026-08-26 |
| Claims verified against sources | ✅ Repo metadata matches live GitHub API (1,726 stars, 92 forks, MIT, Rust, created 2026-08-23, 3 open issues); scale figures verified against Cursor post (120 pushes/s S3 Standard, >300 S3 Express One Zone, 100 replicas linear reads) |
| Scale-figure attribution | ✅ All scale figures attributed to Cursor's post, not to walgit |
| Risk wording with caveats | ✅ 3-days-old / no tagged releases / 3 contributors / owner-centric project prominent in Risks |
| Title | ✅ 118 chars, within site norm (published articles up to 144) |
| Description/dek | ✅ 150 chars (120–180 target) |
| Slug & canonical | ✅ `walgit-cursor-continuity`, canonical/og:url → `https://news.lesbass.com/articles/walgit-cursor-continuity/` (site base URL verified in `astro.config.mjs`) |
| Tags & schema metadata | ✅ 12 tags; NewsArticle + BreadcrumbList present in build |
| Image with alt + credit/license | ✅ `hero.svg` generated editorial architecture diagram, alt text + "AI-generated, not source evidence" disclosure |
| Internal links | ✅ N/A — no directly related same-topic article on site |
| Mobile readability | ✅ static mobile checks pass (viewport, tables, code, no overflow); Chromium unavailable (libglib blocker) — no visual-redesign scope, static gate satisfied |
| Build + checks | ✅ `astro build` 754 pages, `astro check` 0 errors, SEO/dates/mobile/images pass (2 image errors pre-existing, not this article) |
| Word count | ✅ 942 body words (650–950 band) |
| Paragraph length | ✅ bullets/tables used; longest prose paragraph < 90 words |
| Duplicate guardrail | ✅ no walgit/Cursor-Continuity article on site or RSS in last 7 days (verified by Editor disposition AIN-639) |
| Not future-dated | ✅ pubDate 2026-08-26 (today Europe/Rome) |
| Language | ✅ English-only public copy (non-ASCII scan clean) |

## Fixes applied during review

1. **Mixed-language text removed** — Risks section had `one个人` (Chinese characters) in the "single-author" bullet; rewrote to English: "The repository is owned by a single GitHub user, tobi (Tobias Lütke), with two other contributors so far."
2. **Contributor count corrected** — draft said "~5 contributors"; live GitHub API returns exactly 3 (igrigorik 5 commits, tobi 3, dsfaccini 1). Now "3 contributors."
3. **"single-author" framing corrected** — repo has 3 contributors, so the bullet was reframed from "MIT single-author" to "Owner-centric early project" to avoid a factual mislabel.

## Verification evidence

- GitHub API `repos/tobi/walgit`: stars 1,726, forks 92, MIT, Rust, created 2026-08-23, pushed 2026-08-25, open issues 3, tags `[]` (no releases).
- GitHub API `repos/tobi/walgit/contributors`: 3 contributors (igrigorik, tobi, dsfaccini).
- Cursor post `https://cursor.com/blog/git-at-any-scale` (HTTP 200, h1 "Git at any scale"): "using S3 Standard, we can sustain up to 120 pushes/s", "S3 Express One Zone … more than 300 pushes/s", "synthetic stress tests with up to 100 replicas … consistent linear scaling for reads".
- walgit README (HTTP 200): capabilities (smart HTTP v0/v2, bundle-uri, LFS, web UI + API, policy, auth none/token/oidc, stores S3/S3-compatible/GCS/in-memory), explicit lineage to the Cursor post, verbatim copy kept in `docs/reference/`.
- GitHub profile `tobi`: name "Tobias Lütke", company "Shopify".

## Verdict

**PUBLISH_READY** — no remaining blockers after the three fixes above. Ready for the Publisher deployment run.

Signed: QualityGate (`a780e267-6527-4fa8-bf1f-9428b7f63441`)