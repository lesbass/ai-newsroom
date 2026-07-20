---
title: "OpenAI retracts SWE-Bench Pro: ~30% of tasks broken, audit finds"
description: "OpenAI's own datapoint + 5-engineer audit flags 27–34% of SWE-Bench Pro tasks as broken. It just retracted its own recommendation to use the benchmark."
pubDate: 2026-07-11
image: "/images/articles/openai-swe-bench-pro-audit-30-percent-broken/hero-desktop.png"
imageAlt: "Screenshot of OpenAI's 'Separating signal from noise in coding evaluations' blog post with SWE-Bench Pro audit results and failure-mode analysis charts."
imageCredit: "Source: openai.com/index/separating-signal-from-noise-coding-evaluations/ · Credit: OpenAI · License: Content from the announcement page, used for editorial commentary."
canonicalURL: "https://news.lesbass.com/articles/openai-swe-bench-pro-audit-30-percent-broken/"
tags:
  - openai
  - openai-blog
  - swe-bench-pro
  - benchmark
  - evaluation
  - ai-coding
  - ai-coding-agents
  - coding-agents
  - agentic-ai
  - high-risk-claim
  - preparedness-framework
  - deployment-safety
  - ai-safety
  - codex
  - openai-prep-framework
highRiskClaims: true
---

On **2026-07-08**, OpenAI published *"Separating signal from noise in coding evaluations"* — a detailed audit of **SWE-Bench Pro**, the 731-task coding-agent benchmark OpenAI itself endorsed as the successor to SWE-bench Verified in 2025. The headline number: **~30% of tasks broken**. The headline action: OpenAI retracted its own recommendation to adopt the benchmark ([OpenAI, 2026-07-08](https://openai.com/index/separating-signal-from-noise-coding-evaluations/)). This is a self-audit by the benchmark's largest institutional user, and a clean signal that even widely-trusted evals deserve a hard second look.

## What happened

OpenAI ran a two-track audit on the 731-task public split. An automated filter first flagged **286** potentially broken tasks; a deeper review of that subset then split into two parallel paths.

| Path | Output | Share of 731 | Method |
|------|--------|-------------|--------|
| Datapoint analysis pipeline | 200 broken | **27.4%** | Codex-based investigator agents review model attempts, task metadata, and failure traces |
| Human annotation campaign | 249 broken | **34.1%** | 5 experienced software engineers per task, disagreements escalated |
| Initial automated filter | 286 flagged | 39.1% | Reviews instructions, model attempts, and tests for likely broken examples |

The headline estimate lands between the two paths: *"we estimate that ~30% of SWE-bench Pro tasks are broken, and advise that model developers carefully examine results."* OpenAI's direct next sentence: *"we retract our earlier recommendation to adopt SWE-Bench Pro"* ([OpenAI, 2026-07-08](https://openai.com/index/separating-signal-from-noise-coding-evaluations/)).

## Why it matters

- **One of the most-cited coding-agent benchmarks.** SWE-Bench Pro was built to fix SWE-bench Verified's design and contamination problems and to track longer-horizon coding work. Frontier models moved from **23.3% to 80.3% pass rate** in eight months — the deltas almost every recent model card has cited.
- **OpenAI's evaluations feed the Preparedness Framework.** Deployment and safety decisions rest on these numbers; an audit failure in a flagship coding benchmark is a direct input into capability claims, not a side note.
- **The pattern repeats.** OpenAI ran a similar audit on SWE-bench Verified earlier and reached a similar verdict; audit-driven benchmark skepticism is now a recurring obligation, not a one-off.
- **The post lands two days before the GPT-5.6 row.** The 2026-07-09 GPT-5.6 launch ([AI Newsroom, 2026-07-10](/articles/openai-gpt-5-6-sol-terra-luna-and-chatgpt-work/)) still lists SWE-Bench Pro as a cited row (Sol 64.6% vs Mythos 5 80.3%); that row now reads "with the audit attached."

## The four failure modes

OpenAI's labels are the post's verbatim — keep them, do not paraphrase.

| Failure mode | What goes wrong | What the audit found |
|-------------|----------------|---------------------|
| **Overly strict tests** (was: "narrow tests") | Tests enforce a specific implementation the prompt did not require, so functionally correct solutions fail | Most common category in the agent review |
| **Underspecified prompts** (was: "wide tests") | Hidden tests require behaviour the prompt never states and a reader could not infer | Second-most-common category |
| **Low-coverage tests** | Tests under-check the requested feature, so partial fixes can pass | Humans flagged **9.4%** vs **4.1%** for the agent pipeline — the largest gap |
| **Misleading prompt** | Prompt points the model at the wrong behaviour or contradicts what tests require | Drives the OpenLibrary-77c16d5 example below |

The single worked example is **OpenLibrary-77c16d5** (`TocEntry.to_markdown`). The prompt specifies one leading space; the hidden `test_to_markdown` assertions require two. A model that follows the prompt fails the hidden test on a one-character whitespace difference.

## Practical implications

- **For model developers reporting SWE-Bench Pro numbers:** treat the published pass rate as overstated. The 80.3% frontier figure sits on a 731-task set where 27–34% are now flagged; the *clean* pass rate is materially lower. Re-validate per task before quoting.
- **For coding-agent builders:** pair SWE-Bench Pro with a second eval. The HN thread names **DeepSWE** and **FrontierCode** as the two replacements engineers are moving to.
- **For organisations citing the 23.3% → 80.3%:** the curve is real but the *ceiling* is visibly lower than the headline. An adjustment on the order of the audit's 27–34% range is defensible.
- **For benchmark builders:** OpenAI's call is for evals *"built by experienced software developers specifically to test model capabilities"* with cleaner prompt/test coupling. The 74% reviewer/agent overlap is the practical signal — the agent pipeline undercounts cases where reviewers saw multiple issues per task.

## Risks and caveats

- **Single-source benchmark claim from the benchmark owner.** OpenAI is the publisher, a major model owner that reports SWE-Bench Pro numbers, and the auditor. Self-retraction is the most credible source movement, but the "~30%" is not an independent count.
- **The 27.4% and 34.1% are the more defensible range.** Both are OpenAI's; the agent pipeline undercounted vs human review, so **34.1% is the more conservative estimate**.
- **The audit was on a subset.** The deeper review covered the 286 tasks the filter flagged, not all 731; tasks below the threshold may also be broken, and the "~30%" is the audit's *flagged* share, not a full-dataset estimate.
- **The audit is methodology-heavy and reproducible.** Codex-based investigator agents, 5 human engineers per task, escalations, 74% reviewer/agent category overlap — the pipeline is on the page, not behind a press release. The "single source" risk is the source's identity, not its rigour.
- **A separate signal from the same week:** Claude tool-call regression on Opus 4.8 and Sonnet 5 ([AI Newsroom, 2026-07-05](/articles/better-models-worse-tools-claude-tool-regression/)) — rising benchmark numbers do not always track real-world reliability.
- **Timing is in scope.** The post lands 24 hours before OpenAI ships GPT-5.6 with a SWE-Bench Pro row; one HN read is *"other labs have learned to benchmaxx SWE-Bench Pro better than they do."* The retraction is real, but readers should know the timing.

## What to watch

- **Independent replication.** A second audit by Anthropic, Google DeepMind, or an academic group on the same 731 tasks would settle whether the 27–34% range is robust or model-owner-specific.
- **The list of broken task IDs.** If OpenAI publishes a per-task flag list, the field can re-score every published SWE-Bench Pro claim against the cleaned subset.
- **SWE-Bench Pro's maintainer response.** The audit's call to *"let some third party do the fixing"* is the open question — who owns the next version of the eval?
- **Preparedness Framework inputs.** Whether the audit changes the *weight* OpenAI gives to SWE-Bench Pro in deployment decisions, or replaces it in the next system card.
- **Cited coding-evals drift.** Watch the next two model launches for whether SWE-Bench Pro stays in the headline benchmark table or quietly drops to a secondary row.

## Sources

1. [OpenAI — "Separating signal from noise in coding evaluations" (2026-07-08)](https://openai.com/index/separating-signal-from-noise-coding-evaluations/)
2. [OpenAI — research index (live-verified 2026-07-11)](https://openai.com/research/index/)
3. [Hacker News — thread "Separating signal from noise in coding evaluations" (sk4rekr0w, 2026-07-08, 238 points, 93 comments)](https://news.ycombinator.com/item?id=48837396)
4. [Hacker News — Algolia search index entry (story 48837396, 2026-07-11)](https://hn.algolia.com/api/v1/items/48837396)
5. [Hugging Face — ScaleAI/SWE-bench_Pro dataset card (2026-07-11)](https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro)
6. [AI Newsroom — "OpenAI ships GPT-5.6 (Sol, Terra, Luna) and ChatGPT Work" (2026-07-10, SWE-Bench Pro cross-reference)](/articles/openai-gpt-5-6-sol-terra-luna-and-chatgpt-work/)
7. [AI Newsroom — "Better Models, Worse Tools: Claude tool calls regress on Sonnet 5 and Opus 4.8" (2026-07-05)](/articles/better-models-worse-tools-claude-tool-regression/)
