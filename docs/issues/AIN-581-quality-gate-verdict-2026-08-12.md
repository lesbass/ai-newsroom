# QualityGate Verdict — AIN-581 (Muse Glimmer 30B)

**Date:** 2026-08-12 (Europe/Rome)
**Gate:** QualityGate (`a780e267-6527-4fa8-bf1f-9428b7f63441`)
**Article:** `src/content/articles/meta-muse-glimmer-30b-apache-agentic-local.md`
**Issue:** [AIN-581](/AIN/issues/AIN-581)
**Verdict:** PUBLISH_READY

## Checklist

| Check | Result |
|---|---|
| Primary sources, dated, linkable | ✅ 5 primary sources, all live (200) and dated 2026-08-10/11/12 |
| Claims verified against sources | ✅ Benchmarks match HF model card & blog rows exactly |
| Benchmark/risk wording with caveats | ✅ "Meta self-reported", "performs strongly for its size class… not all", throughput caveat |
| Title | ✅ 94 chars, no oversized SEO title |
| Description/dek | ✅ 175 chars (120–180 target) |
| Slug & canonical | ✅ `meta-muse-glimmer-30b-apache-agentic-local`, canonical/JSON-LD/og:url → `https://news.lesbass.com/` |
| Tags & schema metadata | ✅ 6 tags, schema.org NewsArticle + BreadcrumbList present |
| Image with alt + credit/license | ✅ `hero.png` (800×600, generated editorial diagram, alt + AI-generated disclosure) |
| Internal links | ✅ N/A — no directly related same-topic article on site |
| Mobile readability | ✅ real Chromium check: no horizontal overflow (390/390), no pre/table overflow, image loads, single h1 |
| Build + checks | ✅ `astro check` 0 errors, links/mobile/seo/images/dates all pass |
| Word count | ✅ 932 body words (650–950 band) |
| Paragraph length | ✅ longest prose paragraph < 90 words; code uses fenced block |
| Duplicate guardrail | ✅ no Muse Glimmer / same-source article in last 7 days |
| Not future-dated | ✅ pubDate 2026-08-12 (today Europe/Rome) |
| One daily article | ✅ EditorInChief AIN-586 designated this the only commission for 2026-08-12 |

## Fixes applied during review

1. **Duplicate `<h1>`** — the layout `src/pages/articles/[id].astro:54` already renders the title as `<h1>`; the draft's markdown H1 was removed (was causing a second `<h1>` on the page).
2. **SGLang day-0 claim corrected** — Meta's own blog places vLLM and SGLang "in the coming days"; Hugging Face confirmed day-0 only for transformers, llama.cpp, vLLM, Inference Endpoints. Draft listed SGLang as day-0; corrected in Practical implications and Risks sections.
3. **Benchmark phrasing corrected** — Meta's exact wording is "performs strongly for its size class on several widely used LLM benchmarks", not "leading on several"; quote now matches the source.

## Verification evidence

- Meta AI Research blog (200): release 2026-08-10, Apache-2.0, DFlash, local-GPU framing.
- HF model card (200): 29.6B/30B, ~2B ViT perception + ~28B text decoder, 131,072+ ctx, benchmark rows match draft table exactly (SWE-Bench V 76.0/66.6/77.2; SWE-Bench Pro 51.2/36.9/50.2; MCP Atlas 75.5/54.2/62.5; GAIA2 43.3/36.4/40.0).
- HF blog (200): day-0 transformers/llama.cpp/vLLM/IE; SGLang "coming days"; llama.cpp command flags verified.
- GGUF repo (200): `b10353` build requirement, 17GB & 19.7GB k-quants, download commands verified.
- Screenshots: desktop + mobile captured via project `browser.mjs` (headless Chromium); mobile viewport has no horizontal scroll and no element overflow.

## Verdict

**PUBLISH_READY** — no remaining blockers. Ready for the Publisher deployment run.

Signed: QualityGate (`a780e267-6527-4fa8-bf1f-9428b7f63441`)
