---
title: "OpenAI ships ChatGPT health; o3 re-solves 4.8% of rare"
description: "OpenAI's June 18, 2026 release: GPT-5.5 Instant rated higher than physicians on a 3,500-response panel; o3 Deep Research surfaces 18 of 376 unsolved rare-disease cases (4.8%)."
pubDate: 2026-06-20
author: "AI Newsroom"
tags: ["openai", "chatgpt", "gpt-5-5-instant", "health-ai", "rare-disease", "boston-childrens", "nejm-ai", "o3-deep-research", "manton-center", "acmg-amp", "clinical-ai", "healthbench", "healthbench-professional", "physician-panel", "gpt-rosalind", "high-risk-claim"]
image: "https://images.ctfassets.net/kftzwdyauwt9/42SsGr6pOo6F7fcF0VZGGV/25583b98cb667d103adb7bf0476cafc5/SEO_Card_new.png?w=1600&h=900&fit=fill"
imageAlt: "OpenAI health intelligence announcement card with the title 'Using AI to help physicians diagnose rare genetic diseases affecting children' over a dark background"
imageCredit: "Image: OpenAI / rare disease diagnosis announcement (June 18, 2026)"
sources:
  - title: "OpenAI — 'Using AI to help physicians diagnose rare genetic diseases affecting children' (Applied AI post, June 18, 2026)"
    url: "https://openai.com/index/diagnose-rare-childhood-diseases/"
    date: 2026-06-18
    type: primary
  - title: "OpenAI — 'Improving health intelligence in ChatGPT' (Product post, June 18, 2026; Wayback snapshot 20260618220358)"
    url: "https://web.archive.org/web/20260618220358/https://openai.com/index/improving-health-intelligence-in-chatgpt/"
    date: 2026-06-18
    type: primary
  - title: "NEJM AI study — 'Using AI to help physicians diagnose rare genetic diseases affecting children' (DOI 10.1056/AIcs2501343, June 18, 2026)"
    url: "https://ai.nejm.org/doi/full/10.1056/AIcs2501343"
    date: 2026-06-18
    type: primary
  - title: "OpenAI — 'Introducing HealthBench' (May 12, 2025)"
    url: "https://openai.com/index/healthbench/"
    date: 2025-05-12
    type: primary
  - title: "OpenAI — 'Making ChatGPT better for clinicians' (April 22, 2026)"
    url: "https://openai.com/index/making-chatgpt-better-for-clinicians/"
    date: 2026-04-22
    type: primary
  - title: "OpenAI — HealthBench Professional open benchmark PDF (June 18, 2026)"
    url: "https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf"
    date: 2026-06-18
    type: secondary
  - title: "OpenAI — 'Introducing new capabilities to GPT-Rosalind' (June 3, 2026)"
    url: "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind/"
    date: 2026-06-03
    type: secondary
highRiskClaims: true
---

On **June 18, 2026**, OpenAI published two health stories. The first is a consumer ChatGPT update on **GPT-5.5 Instant** rated higher than physician-written responses on a 3,500-response panel, with **71%** fewer flagged factuality issues. The second is a peer-reviewed **NEJM AI** paper in which Boston Children's **Manton Center**, Harvard, and OpenAI used **o3 Deep Research** to reanalyze **376 previously unsolved rare-disease cases**, surface candidate diagnoses for **18** of them, and report **4.8% additional diagnostic yield** after expert review under **ACMG/AMP** and **CLIA-certified** confirmation. **Two caveats:** neither story is evidence that patients or clinicians should use ChatGPT to diagnose disease; the NEJM AI study is retrospective on heterogeneous cohorts with unblinded reviewers.

## Story A — ChatGPT product update

GPT-5.5 Instant is now the default model for free users in ChatGPT. On OpenAI's hardest health evaluations, including **HealthBench Professional**, OpenAI reports it reaches performance comparable to its frontier Thinking models. The scale: **230M** weekly ChatGPT health users; **3,500** physician-panel reviewed responses; **260+** physicians across 60 countries; **71%** drop in flagged factuality issues. The 3,500-response set, criteria, and panel are OpenAI's own.

## Story B — NEJM AI study

Researchers applied o3 Deep Research to 376 previously unsolved cases already through multiple pipelines and multidisciplinary team review at Boston Children's Manton Center. The de-identified packet per case was standardized **HPO terms**, clinician notes, age and gender metadata, and a filtered variant table. The workflow acted as an **explanation-first reasoning layer** on top of existing genomic pipelines: the model had to connect clinical features, inheritance pattern, variant evidence, and the scientific literature into a justification a human reviewer could interrogate. At least two reviewers used the **ACMG/AMP** framework; a finding counted only after **CLIA-certified** laboratory confirmation.

Validation on solved cases preceded the unsolved cohort: correct gene and variant in **48 of 51**; correct diagnosis in **45 of 57** neuromuscular. Self-reported confidence tracked with correctness: mean **85.6** for correct calls vs **42.1** for incorrect.

| Cohort | Cases | Diagnoses surfaced | Yield |
|---|---|---|---|
| Neurodevelopmental | 100 | 10 | 10.0% |
| Neuromuscular disease | 61 | 4 | 6.6% |
| Sudden unexpected death in pediatrics | 200 | 2 | 1.0% |
| Early psychosis | 15 | 2 | 13.3% |
| **Total** | **376** | **18** | **4.8%** |

**7 of 18** diagnoses were rediscoveries — established outside the local research workflow but absent from the local record. That is a data-integration finding, not a model-capability finding. Worked examples: an early-psychosis case where the model inferred a 22q11.2 deletion (DiGeorge) not in the input data, confirmed by follow-up sequencing; a neurodevelopmental case highlighting an 11-amino-acid deletion in **S1PR1** as a *"possible novel mechanistic explanation"*; a neuromuscular case (**Kyra**) diagnosed with **myofibrillar myopathy** linked to a frameshift in **HSPB8** after a near-20-year diagnostic journey.

## Why it matters

- **Two OpenAI health stories in one day is itself a signal.** A consumer update and a peer-reviewed study on the same news index.
- **The NEJM AI study is the under-reported story.** A defined workflow (o3 Deep Research + ACMG/AMP + CLIA-certified confirmation), a defined cohort (376 unsolved cases), and a defined yield (4.8% additional diagnoses, 7 of 18 rediscoveries).
- **The clinical boundary is the load-bearing caveat.** *"The model did not diagnose any participant; physicians and other qualified clinical experts made every diagnosis."*

## Practical advice

**1. Patients and families.** ChatGPT is not a clinical diagnostic tool — the *NEJM AI* study is explicit the model did not diagnose any patient. Real workflow: centers like Boston Children's **Manton Center** can re-run unsolved cases through LLM-assisted workflows. Ask the clinical team; the 4.8% yield is on cases that already failed multiple pipelines.

**2. Clinicians and informatics teams.** Two surfaces, two artifacts. **GPT-5.5 Instant** is a consumer product; **o3 Deep Research** is the research workflow. ChatGPT for Clinicians ([April 22, 2026](https://openai.com/index/making-chatgpt-better-for-clinicians/)) is the BAA-backed clinical surface; **HealthBench** ([May 12, 2025](https://openai.com/index/healthbench/)) is the open eval — use it to validate on your specialty, not the headline 3,500-response panel.

**3. Researchers.** Reproducible scaffold in the paper (DOI 10.1056/AIcs2501343): HPO terms, clinician notes, age/gender, filtered variant table → o3 Deep Research → ACMG/AMP with ≥2 reviewers → CLIA-certified confirmation. The 13.3% early-psychosis sub-cohort has wide CIs (n=15). The **S1PR1** / **HSPB8** / **CDK13** signals are *candidate hypotheses, not discoveries*.

## What to watch

1. **Prospective, multi-center studies** comparing LLM-assisted reanalysis with standard practice.
2. **The OpenAI Foundation grant to the Manton Center** for a platform-agnostic, low-cost genetics AI copilot.
3. **Regulatory clarity, especially FDA.** The NEJM AI study is research, not a cleared device.
4. **Independent reproduction of the 3,500-response physician-panel results.**
5. **Generalization of the 4.8% yield beyond Boston Children's.**

## Risks and caveats

1. **The model did not diagnose any patient.** Every diagnosis passed through physician review using ACMG/AMP and CLIA-certified confirmation.
2. **The 4.8% yield is on previously unsolved cases already through expert pipelines.** Not a general-population rate.
3. **The 7 of 18 rediscoveries are operationally important.** The challenge is data integration, not a model capability gap.
4. **The "rated higher than physician-written responses" claim is on OpenAI's own panel, set, and criteria.** Treat as OpenAI's report until independent reproduction.
5. **The study is retrospective on heterogeneous cohorts with unblinded reviewers.** No measurement of time saved, cost, false-positive workload, or changes in care.
6. **No FDA clearance; no general HIPAA statement for ChatGPT.** ChatGPT for Clinicians and OpenAI for Healthcare carry their own BAA / HIPAA posture.
7. **The early-psychosis 13.3% cohort is small** (15 cases, 2 diagnoses, wide CI).

## Verdict

OpenAI shipped two health stories on 2026-06-18: a ChatGPT update on **GPT-5.5 Instant** (3,500-response panel, **71%** fewer flagged factuality issues), and a **NEJM AI** paper in which **o3 Deep Research** reanalyzed **376** previously unsolved cases at Boston Children's **Manton Center**, surfacing **18** diagnoses (**4.8%** yield; 7 of 18 rediscoveries). The clinical boundary is the load-bearing caveat — physicians made every diagnosis, the study is retrospective with unblinded reviewers. The takeaway is the **workflow** — explanation-first reasoning, ACMG/AMP review, CLIA-certified confirmation — not the headline number.

## Sources

- [OpenAI, *Using AI to help physicians diagnose rare genetic diseases affecting children* (Applied AI, June 18, 2026)](https://openai.com/index/diagnose-rare-childhood-diseases/)
- [OpenAI, *Improving health intelligence in ChatGPT* (Product, June 18, 2026; Wayback snapshot 20260618220358)](https://web.archive.org/web/20260618220358/https://openai.com/index/improving-health-intelligence-in-chatgpt/)
- [NEJM AI study (DOI 10.1056/AIcs2501343, June 18, 2026)](https://ai.nejm.org/doi/full/10.1056/AIcs2501343)
- [OpenAI, *Introducing HealthBench* (May 12, 2025)](https://openai.com/index/healthbench/)
- [OpenAI, *Making ChatGPT better for clinicians* (April 22, 2026)](https://openai.com/index/making-chatgpt-better-for-clinicians/)
- [OpenAI, HealthBench Professional PDF (June 18, 2026)](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)
- [OpenAI, *Introducing new capabilities to GPT-Rosalind* (June 3, 2026)](https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind/)
