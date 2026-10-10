---
title: "Mistral opens a public preview of Mistral Large 4, a 1.05T-parameter open-weight model trained in Europe"
description: "Mistral puts Mistral Large 4 (\"le Chonk\") into public preview: a 1.05T-parameter open-weight MoE served from EU datacenters, with weights promised by month's end."
pubDate: 2026-10-10
author: "AI Newsroom"
tags:
  - mistral
  - mistral-large-4
  - open-weights
  - moe
  - europe
  - ai-sovereignty
  - pricing
  - security
  - benchmark
  - high-risk-claim
image: "/images/articles/mistral-large-4-open-weight-public-preview-europe/hero.png"
imageAlt: "Screenshot of Mistral's \"Introducing Mistral Large 4\" announcement page showing the dark hero artwork with the title \"Le Chonk / Introducing Mistral Large 4\" and the October 6, 2026 date."
imageCredit: "Source: https://mistral.ai/news/mistral-large-4 · Capture date: 2026-10-07 (Europe/Rome) via Playwright Chromium (headless, 1280x900) · Credit: Mistral AI · License: no license stated on page"
canonicalURL: "https://news.lesbass.com/articles/mistral-large-4-open-weight-public-preview-europe/"
highRiskClaims: true
sources:
  - title: "Mistral — Introducing Mistral Large 4 (public preview announcement, weights promised end of October)"
    url: "https://mistral.ai/news/mistral-large-4"
    date: 2026-10-06
    type: primary
  - title: "Mistral Docs — Mistral Large 4 model page (52B active / 1.05T total, 1M context, preview and list pricing)"
    url: "https://docs.mistral.ai/models/mistral-large-4"
    date: 2026-10-06
    type: primary
  - title: "Mistral Docs — Mistral Large 4 model detail / API page"
    url: "https://docs.mistral.ai/models/mistral-large-4-0"
    date: 2026-10-06
    type: primary
  - title: "Artificial Analysis — Mistral Large 4 Preview (independent Intelligence Index score and labels)"
    url: "https://artificialanalysis.ai/models/mistral-large-4"
    date: 2026-10-07
    type: primary
  - title: "Brussels Signal — French AI flagship Mistral announces new model (secondary framing, independent index ranking)"
    url: "https://brusselssignal.eu/2026/10/french-ai-flagship-mistral-announces-new-model/"
    date: 2026-10-07
    type: secondary
  - title: "DataNorth — Mistral Large 4 brings trillion-parameter scale to Europe (secondary framing, license and pricing context)"
    url: "https://datanorth.ai/news/mistral-large-4-brings-trillion-parameter-scale-to-europe"
    date: 2026-10-07
    type: secondary
---

Mistral put Mistral Large 4 (ML4, nicknamed "le Chonk") into public preview on October 6, 2026, calling it its largest model yet and Europe's first trillion-parameter open-weight model. The preview API is live in Mistral Studio today; the weights are promised by the end of the month, and the license is not yet published.

## What happened

Mistral's [announcement](https://mistral.ai/news/mistral-large-4) and [model docs](https://docs.mistral.ai/models/mistral-large-4) describe a roughly 1T-parameter mixture-of-experts model in public preview under the label "open-weight" — not "open-source."

- **Public preview now.** Available through the Mistral Studio/API; weights "drop end of this month." No distribution channel named. [1]
- **Trained in Europe.** From scratch on 3,800 NVIDIA Grace Blackwell GPUs in Mistral's own European datacenters, which also serve the preview. [1]
- **Preview red-teaming.** Cybersecurity leaders, vetted partners, and state authorities get a build with reduced moderation and expanded cyber capabilities. [1]
- **No license yet.** The terms that will govern self-deployment are unpublished. [1][2]

## Why it matters

Mistral's pitch is sovereignty: EU-hosted inference under European law, plus self-deployable weights. It trained on 160+ languages, including every official EU language, and is natively multimodal on input. [1][2]

That positions ML4 as the Western counterweight to Chinese open models in the trillion-parameter tier it names — GLM-5.3, Kimi K3, and DeepSeek V4 Pro. For EU public-sector, finance, and legal teams avoiding US-hosted APIs, an EU-run endpoint plus downloadable weights is the concrete pitch.

## The model in numbers

| Spec | Value | Source |
|---|---|---|
| Total parameters | 1.05T | [2][3] |
| Active parameters | 52B | [2][3] |
| Vision encoder | 1.6B | [2] |
| Architecture | Granular MoE, hybrid instruct-and-reasoning | [1][2] |
| Context window | 1M tokens | [2] |
| Input / output | Text + image in; text out | [1][2] |
| Languages | 160+, incl. every EU official language | [1] |
| Training hardware | 3,800 NVIDIA Grace Blackwell GPUs, European datacenters | [1] |
| License | Not published | [1][2] |

**Parameter discrepancy.** The announcement says "1 trillion-parameter" and "49 billion active"; the docs say 1.05T total and 52B active. This article uses the docs figures. [1][2]

## Pricing and access

Docs show two price columns per million tokens — the preview rate and the list rate. Mistral states no end date for the preview discount. [2]

| Rate | Input | Cached input | Output |
|---|---|---|---|
| Preview | $0.68 | $0.07 | $2.09 |
| List | $1.36 | $0.14 | $4.18 |

Access is via Mistral Studio and the API, with a Mistral-operated European deployment plus other regions. [1] DataNorth lists GLM-5.3 near $1.40/$4.40 and Kimi K3 near $3.00/$15.00 per million tokens. [6]

## What Mistral claims it can do

Every figure below is Mistral's own evaluation unless an independent evaluator is named.

- **Cybersecurity.** Top five globally on the Artificial Analysis Cyber Index and, per Mistral, ahead of open-weight models built outside China; 93% of 40 Cybench challenges; 82% on a vulnerability-reproduction test where Mistral says Claude Opus 5.5 and GPT-6 Astra score near zero because they refuse the task. [1]
- **Agentic coding.** 61.7% DeepSWE v1.1, 59.4% SWE-Atlas-QnA, 28.3% Terminal-Bench 4, and a 49.8% combined Coding Agent Index that Mistral says leads DeepSeek V4 Pro 0813 and Qwen3.8 Max. [1]
- **Knowledge work.** automationBench 59.9%; AA-Briefcase 1,393 Elo; vals.ai legal and finance evaluations Mistral says exceed GPT-6 Astra; and, per Mistral, Harvey's Legal Agent benchmark ahead of all open-source models. [1]
- **Multimodal.** 42% on Dense 200 visual grounding, versus 41% for GPT-6-Astra, per Mistral. [1]
- **Safety.** 93.3% attack resistance on Lakera's B3 benchmark and KORA score 1.691, plus, Mistral reports, a higher refusal rate on harmful cyber prompts than all open-weight models. [1]
- **Independent check.** Artificial Analysis scores the preview 38 on its Intelligence Index — above the median but not the frontier — and currently labels it proprietary because weights are unavailable; Brussels Signal reports seven Chinese open-weight models rank above it. [4][5]

## Risks and caveats

- **License pending.** "Open-weight" is Mistral's term; the actual terms, including commercial-use limits, are unpublished. Don't plan self-hosting around assumptions.
- **Preview pricing has no stated sunset**, so the $0.68/$2.09 rate is not a guaranteed steady state.
- **Benchmarks are self-reported.** Except for Artificial Analysis and the named third-party evaluators, every score is Mistral's, including the Cybench refusal comparison. "Outperforms any open-weight model developed in the US or Europe" and the "€3 billion Series D — largest equity round ever raised by a European tech company" are Mistral statements this article did not independently confirm.
- **Parameter and context numbers differ across sources.** Mistral's announcement and docs disagree on parameter counts; Artificial Analysis lists a ~520K context for the served preview versus Mistral's 1M claim.
- **Dual-use cyber positioning.** Mistral frames reduced-moderation access as defensive research; that framing, not an independent audit, is the basis for the claim.

## What to watch

- **Weight release and license text**, promised by end of October 2026 — the point at which "open-weight" becomes checkable.
- **Independent evaluations**, including updated Artificial Analysis runs and any published Cyber Index detail.
- **EU deployment evidence**, since sovereignty claims depend on where inference actually runs and under which terms.

## Sources

| # | Publisher | Title | Date | URL |
|---|---|---|---|---|
| 1 | Mistral | Introducing Mistral Large 4 | 2026-10-06 | https://mistral.ai/news/mistral-large-4 |
| 2 | Mistral Docs | Mistral Large 4 model page | 2026-10-06 | https://docs.mistral.ai/models/mistral-large-4 |
| 3 | Mistral Docs | Mistral Large 4 model detail page | 2026-10-06 | https://docs.mistral.ai/models/mistral-large-4-0 |
| 4 | Artificial Analysis | Mistral Large 4 Preview — Intelligence Index | checked 2026-10-07 | https://artificialanalysis.ai/models/mistral-large-4 |
| 5 | Brussels Signal (secondary) | French AI flagship Mistral announces new model | 2026-10-07 | https://brusselssignal.eu/2026/10/french-ai-flagship-mistral-announces-new-model/ |
| 6 | DataNorth (secondary) | Mistral Large 4 brings trillion-parameter scale to Europe | 2026-10-07 | https://datanorth.ai/news/mistral-large-4-brings-trillion-parameter-scale-to-europe |
