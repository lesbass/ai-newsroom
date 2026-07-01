---
title: "OpenAI ships ChatGPT health; o3 re-solves 4.8% of rare"
description: "On 2026-06-18, OpenAI shipped two health stories: GPT-5.5 Instant rated higher than physicians; a NEJM AI study where o3 Deep Research surfaced 18 of 376 rare-disease cases (4.8%) at Boston Children's."
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
  - title: "OpenAI — 'Improving health intelligence in ChatGPT' (Product post, June 18, 2026; live URL gated by Cloudflare bot protection, accessed via Wayback Machine snapshot 20260618220358)"
    url: "https://web.archive.org/web/20260618220358/https://openai.com/index/improving-health-intelligence-in-chatgpt/"
    date: 2026-06-18
    type: primary
  - title: "NEJM AI study abstract — 'Using AI to help physicians diagnose rare genetic diseases affecting children' (DOI 10.1056/AIcs2501343, June 18, 2026)"
    url: "https://ai.nejm.org/doi/full/10.1056/AIcs2501343"
    date: 2026-06-18
    type: primary
  - title: "OpenAI — 'Introducing HealthBench' (evaluation paper, May 12, 2025)"
    url: "https://openai.com/index/healthbench/"
    date: 2025-05-12
    type: primary
  - title: "OpenAI — 'Making ChatGPT better for clinicians' (ChatGPT for Clinicians announcement, April 22, 2026)"
    url: "https://openai.com/index/making-chatgpt-better-for-clinicians/"
    date: 2026-04-22
    type: primary
  - title: "OpenAI — HealthBench Professional open benchmark PDF (June 18, 2026)"
    url: "https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf"
    date: 2026-06-18
    type: secondary
  - title: "OpenAI — 'Introducing new capabilities to GPT-Rosalind' (product context, June 3, 2026)"
    url: "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind/"
    date: 2026-06-03
    type: secondary
  - title: "OpenAI — Health Blueprint (responsible integration recommendations in U.S. healthcare, 2026)"
    url: "https://cdn.openai.com/pdf/keeping-patients-first.pdf"
    date: 2026-04-22
    type: secondary
highRiskClaims: true
---

On **June 18, 2026**, OpenAI published two health stories. The first is a consumer ChatGPT update on **GPT-5.5 Instant** that OpenAI reports as rated higher than physician-written responses on a 3,500-response panel, with a **71% drop in flagged factuality issues** on production health traffic ([OpenAI, June 18, 2026](https://web.archive.org/web/20260618220358/https://openai.com/index/improving-health-intelligence-in-chatgpt/)). The second is a peer-reviewed **NEJM AI** paper in which researchers from Boston Children's **Manton Center**, Harvard, and OpenAI used **o3 Deep Research** to reanalyze **376 previously unsolved rare-disease cases**, surface candidate diagnoses for **18** of them, and report a **4.8% additional diagnostic yield** after expert review under the **ACMG/AMP** framework and **CLIA-certified** confirmation ([OpenAI, June 18, 2026](https://openai.com/index/diagnose-rare-childhood-diseases/); [NEJM AI, DOI 10.1056/AIcs2501343](https://ai.nejm.org/doi/full/10.1056/AIcs2501343)). **Two load-bearing caveats:** neither story is evidence that patients or clinicians should use ChatGPT to diagnose disease, and the NEJM AI study is retrospective, on heterogeneous cohorts, with unblinded reviewers.

## Story A — ChatGPT product/evaluation update

GPT-5.5 Instant is now the default model for free users in ChatGPT. On OpenAI's hardest health evaluations, including **HealthBench Professional**, OpenAI reports it reaches performance comparable to its frontier Thinking models.

| Metric | Number |
|---|---|
| Weekly ChatGPT health users | 230 million |
| Physician-panel reviewed responses | 3,500 |
| Physicians in the rubric network | 260+ across 60 countries, 49 languages, 26 specialties |
| Reviewed example responses to date | 700,000+ |
| Drop in flagged factuality issues (last 2 months) | 71% |

OpenAI's report: *"GPT-5.5 Instant responses were rated higher than physician-written and older model responses across criteria in this evaluation."* The 3,500-response set, the criteria, and the panel are OpenAI's own. Supporting product: **ChatGPT for Clinicians** (free for verified U.S. clinicians, 2026-04-22).

## Story B — NEJM AI study

Researchers applied o3 Deep Research to 376 previously unsolved cases already through multiple commercial or institutional pipelines and multidisciplinary team review at Boston Children's Manton Center. The de-identified packet per case was standardized **HPO terms**, clinician notes, age and gender metadata, and a filtered variant table covering rarity, predicted protein effect, ClinVar classification, and family-member signal quality. The workflow acted as an **explanation-first reasoning layer** on top of existing genomic pipelines: instead of returning a ranked gene, the model had to connect clinical features, inheritance pattern, variant evidence, and the scientific literature into a justification a human reviewer could interrogate. At least two reviewers used the **ACMG/AMP** framework; a finding counted only after **CLIA-certified** laboratory confirmation.

Validation on solved cases preceded the unsolved cohort: correct gene and variant in **48 of 51**; correct diagnosis in **45 of 57** neuromuscular; correct gene in every long-read case and both disease-causing alleles in 12 of 15. Self-reported confidence scores tracked with correctness: mean minimum **85.6** for consistently correct calls vs **42.1** for incorrect or unknown.

| Cohort | Cases | Diagnoses surfaced | Yield |
|---|---|---|---|
| Neurodevelopmental | 100 | 10 | 10.0% |
| Neuromuscular disease | 61 | 4 | 6.6% |
| Sudden unexpected death in pediatrics | 200 | 2 | 1.0% |
| Early psychosis | 15 | 2 | 13.3% |
| **Total** | **376** | **18** | **4.8%** |

**7 of the 18** diagnoses were rediscoveries — established outside the local research workflow but absent from the local record. That is a data-integration finding, not a model-capability finding.

Worked examples: in an early-psychosis case the model inferred a 22q11.2 deletion (DiGeorge syndrome) not in the input data, confirmed by follow-up sequencing. In a neurodevelopmental case, the model highlighted an 11-amino-acid deletion in **S1PR1** and proposed *"a possible novel mechanistic explanation"* — flagged as requiring *"additional experimental validation."* A neuromuscular case study, **Kyra**, was diagnosed with **myofibrillar myopathy** linked to a frameshift variant in **HSPB8** after a near-20-year diagnostic journey.

## Why it matters

- **Two OpenAI health stories in one day is itself a signal.** A consumer ChatGPT update and a peer-reviewed research study, on the same news index.
- **The NEJM AI study is the under-reported story.** A defined workflow (o3 Deep Research + ACMG/AMP + CLIA-certified confirmation), a defined cohort (376 unsolved cases already through expert pipelines), and a defined yield (4.8% additional diagnoses, of which 7 of 18 were rediscoveries).
- **The clinical/regulatory boundary is the load-bearing caveat.** *"The model did not diagnose any participant; physicians and other qualified clinical experts made every diagnosis."*

## What to watch

1. **Prospective, multi-center studies** comparing LLM-assisted reanalysis with standard practice.
2. **The OpenAI Foundation grant to the Manton Center** for a platform-agnostic, low-cost genetics AI copilot.
3. **Regulatory clarity, especially FDA.** The NEJM AI study is research, not a cleared device.
4. **Independent reproduction of the 3,500-response physician-panel results.**
5. **Generalization of the 4.8% yield beyond the four Boston Children's cohorts.** The neurodevelopmental cohort at 10.0% carries most of the absolute weight.

## Risks and caveats

1. **The model did not diagnose any patient.** Every diagnosis passed through physician review using ACMG/AMP and CLIA-certified confirmation.
2. **The 4.8% yield is on previously unsolved cases that had already been through expert pipelines.** Not a 4.8% general-population rate.
3. **The 7 of 18 rediscoveries are operationally important.** The challenge is data integration across data sources, not a model capability gap.
4. **Story A and Story B are not the same artifact.** GPT-5.5 Instant on consumer ChatGPT is a separate product from o3 Deep Research in the research workflow.
5. **The "rated higher than physician-written responses" claim is on OpenAI's own panel, set, and criteria.** Treat as OpenAI's report until independent reproduction.
6. **The study is retrospective on heterogeneous cohorts with unblinded reviewers.** Cohorts were heterogeneous; reviewers were not blinded to model confidence; the researchers did not measure time saved, cost, clinician effort, false-positive workload, or changes in care.
7. **No FDA clearance; no general HIPAA statement for ChatGPT.** ChatGPT for Clinicians and OpenAI for Healthcare carry their own BAA / HIPAA posture.
8. **The early-psychosis 13.3% cohort is small** (15 cases, 2 diagnoses, wide CI).
9. **The S1PR1 / vitiligo hypothesis is not a discovery.** Same for **HSPB8** and **CDK13** phenotype-expansion signals.

## Verdict

OpenAI shipped two health stories on 2026-06-18. The first is a consumer ChatGPT update on **GPT-5.5 Instant** rated higher than physician-written responses on a 3,500-response panel, with a **71% drop in flagged factuality issues** on production health traffic. The second is a peer-reviewed **NEJM AI** paper in which **o3 Deep Research** reanalyzed **376 previously unsolved rare-disease cases** at Boston Children's **Manton Center**, surfaced candidate diagnoses for **18** of them, and reported a **4.8% additional yield** after expert review under the **ACMG/AMP** framework and **CLIA-certified** confirmation — **7 of 18** were rediscoveries of diagnoses already in public databases. The clinical boundary is the load-bearing caveat: the model produced reviewable hypotheses, physicians made every diagnosis, and the study is retrospective on heterogeneous cohorts with unblinded reviewers. The right takeaway is the **workflow** — explanation-first reasoning, expert review using ACMG/AMP, CLIA-certified confirmation — not the headline number.

## What to watch

1. **Prospective, multi-center studies** comparing LLM-assisted reanalysis with standard practice.
2. **The OpenAI Foundation grant to the Manton Center** for a platform-agnostic, low-cost genetics AI copilot.
3. **Regulatory clarity, especially FDA.** The NEJM AI study is research, not a cleared device.
4. **Independent reproduction of the 3,500-response physician-panel results.**
5. **Generalization of the 4.8% yield beyond the four Boston Children's cohorts.** The neurodevelopmental cohort at 10.0% carries most of the absolute weight.

## Sources

- [OpenAI, *Using AI to help physicians diagnose rare genetic diseases affecting children* (Applied AI, June 18, 2026)](https://openai.com/index/diagnose-rare-childhood-diseases/)
- [OpenAI, *Improving health intelligence in ChatGPT* (Product, June 18, 2026; Wayback snapshot 20260618220358)](https://web.archive.org/web/20260618220358/https://openai.com/index/improving-health-intelligence-in-chatgpt/)
- [NEJM AI study abstract (DOI 10.1056/AIcs2501343, June 18, 2026)](https://ai.nejm.org/doi/full/10.1056/AIcs2501343)
- [OpenAI, *Introducing HealthBench* (May 12, 2025)](https://openai.com/index/healthbench/)
- [OpenAI, *Making ChatGPT better for clinicians* (April 22, 2026)](https://openai.com/index/making-chatgpt-better-for-clinicians/)
- [OpenAI, HealthBench Professional PDF (June 18, 2026)](https://cdn.openai.com/dd128428-0184-4e25-b155-3a7686c7d744/HealthBench-Professional.pdf)
- [OpenAI, *Introducing new capabilities to GPT-Rosalind* (June 3, 2026)](https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind/)
- [OpenAI, *Health Blueprint* (April 22, 2026)](https://cdn.openai.com/pdf/keeping-patients-first.pdf)
