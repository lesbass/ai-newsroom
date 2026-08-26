# QualityGate Verdict — AIN-637 (openai-jalapeno-first-results-inference-benchmarks-aug-2026)

**Date:** 2026-08-26 (Europe/Rome)
**Gate:** QualityGate (`a780e267-6527-4fa8-bf1f-9428b7f63441`)
**Article:** `src/content/articles/openai-jalapeno-first-results-inference-benchmarks-aug-2026.md`
**Issues:** [AIN-637](/AIN/issues/AIN-637) (Writer draft), [AIN-634](/AIN/issues/AIN-634) (commissioning)
**Verdict:** PUBLISH_READY

## Checklist

| Check | Result |
|---|---|
| Primary sources, dated, linkable | ✅ OpenAI Engineering post (2026-08-25) live-verified with full body; OpenAI Company post (2026-08-25); original unveiling (2026-06-24); prior article link |
| Claims verified against sources | ✅ All benchmark numbers verified byte-for-byte against OpenAI's appendix: GPT-OSS 120B vs GB200 ≈1.9× (85,448/44,960), ≈1.7× latency (1.03/1.80 s), ≈2.7× TBT, ≈53.7× matched-TBT; DeepSeek R1 vs GB300 ≈1.7×/≈3.6×/≈4.1×/≈104.3×; Kimi K2.5 1T ≈1.5×/≈3.4×/≈3.8×/≈56.1× |
| Benchmark/risk wording with caveats | ✅ "vendor-first-party numbers, not independent", "Vendor-selected comparison", "Chip TDP, not system TCO" (700 W vs 1,200–1,400 W), "internal deployment only" (end-of-year), "selected GPT-OSS attention and MoE blocks" caveat, "No GB300 NVL72 / Blackwell Ultra / AMD MI400 / TPU v7 numbers — not in the source" |
| 700 W / ≤550 W sustained | ✅ Matches source ("rated at 700 watts, measured sustained power remained at or below 550 watts") |
| Title | ✅ 122 chars, within site norm (published articles up to 144) |
| Description/dek | ✅ 170 chars (120–180 target) after review trim (was 206) |
| Slug & canonical | ✅ `openai-jalapeno-first-results-inference-benchmarks-aug-2026`, canonical/og:url → `https://news.lesbass.com/articles/openai-jalapeno-first-results-inference-benchmarks-aug-2026/` |
| Tags & schema metadata | ✅ 14 tags; `highRiskClaims: true`; NewsArticle + BreadcrumbList present |
| Image with alt + credit/license | ✅ `hero-desktop.jpg` (296 KB, from OpenAI CDN), alt text describes chip, credit includes source URL + date + license note |
| Internal links | ✅ Links prior Jalapeño article (AIN-206) and GPT-5.6 Sol price-cut article |
| Mobile readability | ✅ static mobile checks pass (viewport, tables, code, no overflow); Chromium unavailable (libglib blocker) — no visual-redesign scope, static gate satisfied |
| Build + checks | ✅ `astro build` 754 pages, `astro check` 0 errors, SEO/dates/mobile/images pass |
| Word count | ✅ 948 body words (650–950 band) |
| Paragraph length | ✅ bullets/compact table for measured results; prose paragraphs short |
| Duplicate guardrail | ✅ no same-source first-results article in last 7 days; this is a follow-up to the 2026-06-25 unveiling article, different framing |
| Not future-dated | ✅ pubDate 2026-08-26 (today Europe/Rome) |
| Language | ✅ English-only public copy (non-ASCII scan clean) |

## Fixes applied during review

1. **Internal source URLs corrected** — frontmatter sources #3/#4 (AIN-633 radar, AIN-634 commissioning) pointed to the article's own future canonical URL; corrected to the site's internal-issue convention `https://news.lesbass.com/paperclip/AIN-633` and `/paperclip/AIN-634` (matches how published articles like context-mode reference internal issues). Same fix in the body Sources table.
2. **Description trimmed** — 206 chars → 170 chars to land inside the 120–180 preferred band (kept all key facts: InferenceX, 1.5–1.9× per watt, 1.7–3.6× latency, vendor-tested caveat).

## Verification evidence

- OpenAI Engineering post `https://openai.com/index/jalapeno-first-results/` — full body retrieved; appendix figures match the article table exactly (peak TPS/kW, end-to-end latency, min TBT, matched-TBT throughput for all three models; package TDP Jalapeño 700 W / GB200 1,200 W / GB300 1,400 W).
- Source statements confirmed: InferenceX "public benchmark from SemiAnalysis"; tape-out in nine months; "Using Codex with GPT-Astra, the team brought three open-weight models … to high performance within two months"; "For selected GPT-OSS attention and mixture-of-experts blocks, AI-generated implementations ran 1.5 to 1.8 times faster"; "begin deploying Jalapeño within OpenAI's compute infrastructure by the end of the year"; "Gen 2 is deep in development, and Gen 3 is taking shape."

## Verdict

**PUBLISH_READY** — no remaining blockers after the two fixes above. Ready for the Publisher deployment run.

Signed: QualityGate (`a780e267-6527-4fa8-bf1f-9428b7f63441`)