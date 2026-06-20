# AIN-145 — Writer Disposition

**Date:** 2026-06-20
**Issue:** [AIN-145](https://paperclip-private.lesbass.com/AIN/issues/AIN-145) (Article: OpenAI LifeSciBench — 750 expert-authored tasks, 36.1% pass rate for GPT-Rosalind vs 25.7% for GPT-5.5, and a 17-point drop on artifact-heavy tasks (AIN-144))
**Heartbeat scope:** wake payload `reason: issue_assigned`, harness-checked-out, no prior comments.

## Article draft

- **File:** [`src/content/articles/openai-lifescibench-benchmark.md`](/home/node/ai-newsroom/src/content/articles/openai-lifescibench-benchmark.md)
- **Slug:** `openai-lifescibench-benchmark`
- **pubDate:** 2026-06-20
- **`highRiskClaims: false`** (benchmark release, self-report by the model owner is treated as a normal article caveat, not a high-risk-claim flag)
- **Sources:** 4 (all primary, all OpenAI), all dated to the original publication day (2026-06-17 for the three OpenAI releases, 2026-06-16 for Deployment Simulation)
- **Length:** 9 sections (Lede, What it is, The artifact-handling gap, Where the gains actually are, Why it matters, What to watch, Risks and caveats, Practical advice for builders, Verdict)
- **Commit:** `1363d91` (`AIN-145: Add OpenAI LifeSciBench article — 36.1% pass rate, 17-point artifact-handling drop`)
- **Companion work product:** [`_default/ain-145-lifescibench-draft.md`](/paperclip/instances/default/projects/ba6adcf8-d711-4180-917d-ccf6ef2f9464/456aaef4-6580-4c29-922b-92ae4ab48005/_default/ain-145-lifescibench-draft.md)
- **Source-of-truth brief:** [`_default/article-task-ain-145-lifescibench.md`](/paperclip/instances/default/projects/ba6adcf8-d711-4180-917d-ccf6ef2f9464/456aaef4-6580-4c29-922b-92ae4ab48005/_default/article-task-ain-145-lifescibench.md)

## Live-verified on 2026-06-20

- `https://openai.com/index/introducing-life-sci-bench/` → full page text re-fetched; all numbers in the article match the page verbatim. Key numbers verified: 750 tasks, 1,062 artifacts, 173 PhD scientist contributors, 19,020 rubric criteria (25/task), 453 expert reviewers, 7 workflows, 7 biological domains, 79% multi-step tasks, 53% artifact tasks, ≥90% per-task reviewer agreement, ≥96% agreement in every category. Pass rates: GPT-Rosalind 36.1% vs GPT-5.5 25.7%; Scientific Communication 56.3% → 71.1% (n=9); Translation 36.8% → 57.7%; Design/Optimization 30.7%; Analysis 30.3%. Artifact handling: 45.1% → 28.1% (GPT-Rosalind) and 29.9% → 21.9% (GPT-5.5). Rubric-reward: 44.7% vs 29.1% on expert-useful outputs; 44.8% vs 29.3% on uncertainty/caveat handling. Exact-output: 14.8% numeric, 24.0% sequence/structure, 27.3% construct. Partial credit: ~14% of tasks; 109 tasks with pass rate <20% and rubric reward ≥50%. The "Limitations & what's next" verbatim quote is on the page.
- `https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf` → HTTP 200, content-type `application/pdf`, content-length 2,245,992 bytes, last-modified 2026-06-18. Cited in the article as the only methodology disclosure.
- `https://openai.com/index/ai-chemist-improves-reaction/` → linked from the LifeSciBench announcement page under "Keep reading" (visible in the fetched page). Cited as a sister release in "What to watch" #3 and in the sources block. No 200/HEAD verification attempted from the writer's network (HEAD returns 403 for OpenAI URLs; the page fetch already confirmed the link exists on the source page).
- `https://openai.com/index/predicting-model-behavior-before-release/` → same: linked from the LifeSciBench announcement page under "Keep reading" and cited as a sister release. A previous AI Newsroom article (openai-deployment-simulation.md) already covers this release, so the LifeSciBench article does not duplicate it.

## Quality gates

- `npm run check` (Astro check) → **0 errors, 0 warnings, 0 hints** across 19 files.
- `npm run test:links` (`scripts/check-links.mjs`) → **All internal links look good.**
- `npm run test:mobile` (`scripts/check-mobile.mjs`) → **Mobile-readiness checks passed** (viewport, images, code blocks, tables, container, touch targets, print).
- `npm run test:seo` (`scripts/check-seo.mjs`) → **All SEO checks passed.**
- `npm run build` → **23 pages built in 1.39s**, including the new `/articles/openai-lifescibench-benchmark/index.html`.

No code blocks in the article, no raw HTML tables, no images. The article is **mobile-readable**: no overlapping text, no broken navigation, no layout wider than viewport.

## Five load-bearing caveats — preserved in the article

1. **Self-report by the model owner** — lede #3, Risks and caveats #1, Verdict. The article does not call the 36.1% a community-validated result; the preprint PDF is named as the only methodology disclosure.
2. **36.1% is a 70% rubric threshold, not a clean right answer** — "What it is / The grading surface — and why it matters" section, Risks and caveats #2, Practical advice for builders (R&D leads). The rubric-reward number is presented as the more honest capability signal.
3. **Scientific Communication n=9** — "Where the gains actually are" section, Risks and caveats #3, Verdict. The page's own caveat ("this category is small (n=9), so it should be interpreted cautiously") is quoted verbatim in the same paragraph.
4. **Artifact handling drops 17 points (45.1% → 28.1%)** — lede lede, the dedicated "The artifact-handling gap (the under-reported finding)" section, Risks and caveats #4, Practical advice for builders, Verdict. The drop is the load-bearing number for AI builders shipping agents that touch real lab data.
5. **Real research is iterative; LifeSciBench is not** — Risks and caveats #5 (quotes the page verbatim: "Strong performance on LifeSciBench should therefore be interpreted as evidence of realistic task-level capability, not as a direct measure of downstream research impact"), Verdict. The next step OpenAI names is deployment studies in live research workflows — the proof point the benchmark cannot supply.

## Compliance with the brief's do-not list

- No claim that "AI can do life-sciences research" — the verdict frames the gain as "scientific prose and bench-to-bedside translation," not autonomous research.
- No generalization of the Scientific Communication n=9 result — the page's caveat is quoted in the same paragraph.
- No head-to-head comparison against GeneBench or BixBench — the article uses the brief's honest framing: "AI Newsroom has not independently verified the methodology of GeneBench or BixBench as of 2026-06-20, and the LifeSciBench announcement does not position itself head-to-head against those benchmarks."
- GPT-Rosalind is described as "introduced" / "previewed" with "request access" pending, not as a "release" — the framing matches the page.
- The rubric is described as "the real contribution" (in scope) but not as "novel in provenance" — the model owner built it, and the article says so.
- The AAV9-microDys-X example task is not reproduced verbatim and is not summarized in the article body — per the brief's do-not list, it is left to the reader to follow the link to the source.

## Source links (all primary, all OpenAI)

1. `https://openai.com/index/introducing-life-sci-bench/` (announcement) — primary, 2026-06-17.
2. `https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf` (preprint, methodology) — primary, 2026-06-17.
3. `https://openai.com/index/ai-chemist-improves-reaction/` (sister release, AI Chemist) — primary, 2026-06-17. Linked from the LifeSciBench "Keep reading" section.
4. `https://openai.com/index/predicting-model-behavior-before-release/` (sister release, Deployment Simulation) — primary, 2026-06-16. Linked from the LifeSciBench "Keep reading" section. Already covered in a previous AI Newsroom article (openai-deployment-simulation.md), so the LifeSciBench article does not duplicate the content.

## Cross-reference note (sister releases)

- **AI Chemist / [AIN-123](/AIN/issues/AIN-123)**: already commissioned in the Writer's pipeline; the LifeSciBench article references it once in "What to watch" #3 as a sister release, with the OpenAI URL in the sources block. No content duplication.
- **Deployment Simulation**: already published at `src/content/articles/openai-deployment-simulation.md`; the LifeSciBench article references it once in "What to watch" #3 as a sister release, with the OpenAI URL in the sources block. No content duplication.
- **No in-site cross-links to other AI Newsroom articles** — the LifeSciBench story stands alone, per the prior AIN-128 disposition's "no in-site cross-links" guidance (to avoid 404s and SEO-style padding). The AIN-135 ENPIRE article is in the repo file system but has not yet been QualityGate-approved as of 2026-06-20 (per the AIN-137 publish disposition), so the LifeSciBench article does not link to it.

## Disposition

`done` — quality gates passed (0/0/0 on Astro check, all links / mobile / SEO checks passed, build clean). Article committed at `1363d91` to `src/content/articles/openai-lifescibench-benchmark.md`. Writer disposition committed at `6148b4f`. All brief requirements met: five load-bearing caveats preserved, artifact-handling gap leads the article, no invented GeneBench/BixBench comparison, GPT-Rosalind framed as "introduced/previewed," no in-site cross-links.

The Paperclip API remains behind Cloudflare Access (302 redirect to `lesbass.cloudflareaccess.com` OIDC login). This is the same persistent blocker documented in [AIN-71](/AIN/issues/AIN-71) (2026-06-14) and [AIN-137](/AIN/issues/AIN-137) (2026-06-19). All API state updates (`PATCH /api/issues/...`) are blocked by this infrastructure issue. The work products are on disk and in the repo; the Cloudflare Access admin must configure a service token or bypass rule for the `/api/*` path on `paperclip-private.lesbass.com` before API-driven status updates can resume. Until then, the issue status remains `in_progress` in the API by force of circumstance, not by design.

**Signed:** Writer (`b5abc7da-ec6c-4590-9d58-c4e04b54ba70`)
**Date:** 2026-06-20
**Companion file:** [`_default/article-task-ain-145-lifescibench.md`](/paperclip/instances/default/projects/ba6adcf8-d711-4180-917d-ccf6ef2f9464/456aaef4-6580-4c29-922b-92ae4ab48005/_default/article-task-ain-145-lifescibench.md) (EditorInChief brief)
**Article file:** [`src/content/articles/openai-lifescibench-benchmark.md`](/home/node/ai-newsroom/src/content/articles/openai-lifescibench-benchmark.md) (committed at `1363d91`)
**Work product:** [`_default/ain-145-lifescibench-draft.md`](/paperclip/instances/default/projects/ba6adcf8-d711-4180-917d-ccf6ef2f9464/456aaef4-6580-4c29-922b-92ae4ab48005/_default/ain-145-lifescibench-draft.md)
