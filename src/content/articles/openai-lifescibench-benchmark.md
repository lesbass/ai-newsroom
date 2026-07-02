---
title: "LifeSciBench: GPT-Rosalind 36.1%, artifact gap 17pts"
description: "OpenAI published LifeSciBench, a 750-task life-sciences evaluation. GPT-Rosalind hits 36.1% vs GPT-5.5's 25.7%, but drops 17 points on tasks with artifacts."
pubDate: 2026-06-20
author: "AI Newsroom"
tags: ["openai", "lifesci-bench", "lifescibench", "life-sciences", "benchmark", "gpt-rosalind", "gpt-5-5", "biotech", "pharma", "drug-discovery", "phd-scientist-evaluators", "expert-review", "rubric", "scientific-communication", "translation", "design-optimization", "analysis", "artifact-handling", "evaluation"]
image: "https://images.ctfassets.net/kftzwdyauwt9/1trh6KslZ4XaGmEYHQVoDP/e4a6d9910ef9025bfbe5bed00cf0ae42/LifeSciBench_16x9.png?w=1600&h=900&fit=fill"
imageAlt: "LifeSciBench 16:9 illustration card"
imageCredit: "Image: OpenAI / LifeSciBench announcement (June 17, 2026)"
sources:
  - title: "OpenAI — Introducing LifeSciBench (announcement, taxonomy, model results, rubric counts, reviewer agreement)"
    url: "https://openai.com/index/introducing-life-sci-bench/"
    date: 2026-06-17
    type: primary
  - title: "OpenAI — LifeSciBench preprint (methodology; PDF binary, full URL reachable)"
    url: "https://cdn.openai.com/pdf/b4299379-0a97-4ffa-8b9b-c3fbb299caa9/lifescibench_preprint.pdf"
    date: 2026-06-17
    type: primary
  - title: "OpenAI — AI Chemist (sister release, 2026-06-17, link present on the LifeSciBench announcement page under 'Keep reading')"
    url: "https://openai.com/index/ai-chemist-improves-reaction/"
    date: 2026-06-17
    type: primary
  - title: "OpenAI — Deployment Simulation (sister release, 2026-06-16, link present on the LifeSciBench announcement page under 'Keep reading')"
    url: "https://openai.com/index/predicting-model-behavior-before-release/"
    date: 2026-06-16
    type: primary
highRiskClaims: false
---

On **2026-06-17**, OpenAI published **LifeSciBench** — a 750-task, 1,062-artifact, 19,020-criterion life-sciences evaluation built with **173 PhD-level scientists** and validated by **453 independent expert reviewers** ([OpenAI, Introducing LifeSciBench, 2026-06-17](https://openai.com/index/introducing-life-sci-bench/)). **GPT-Rosalind**, a new life-sciences model introduced on a request-access basis, reaches **36.1% exact pass rate** vs **25.7% for GPT-5.5**. The under-reported finding: GPT-Rosalind **drops from 45.1% on text-only tasks to 28.1% on tasks with artifacts — a 17-point drop**.

## What it is

LifeSciBench contains **750 expert-authored tasks** across **seven biological domains** and **seven workflows**: evidence handling, analysis, design and optimization, scientific reasoning, validation and operations, translation, and scientific communication ([OpenAI, Introducing LifeSciBench, 2026-06-17](https://openai.com/index/introducing-life-sci-bench/)).

- **79% of tasks** require multiple reasoning steps (avg. 4 steps/task)
- **53% of tasks** require interpreting at least one artifact (figures, PDFs, sequence files)
- Grading uses per-task rubrics totaling **19,020 criteria** (avg. 25/task)
- **453 independent reviewers** (97% PhD, avg. 12 years experience) validated tasks; reviewer agreement exceeded 96%

The benchmark reports two metrics: **pass rate** (70% rubric threshold) and **score** (average rubric reward with partial credit). The rubric-reward number is the more honest capability signal.

## The artifact-handling gap

The most useful number in the announcement is buried in the "Where AI systems still fall short" section:

- GPT-Rosalind: **45.1%** text-only → **28.1%** with artifacts (−17 pts)
- GPT-5.5: **29.9%** text-only → **21.9%** with artifacts

Both models drop the same amount. OpenAI confirms frontier models **struggle at extracting information from complex figures or large sequence files** ([OpenAI, Introducing LifeSciBench, 2026-06-17](https://openai.com/index/introducing-life-sci-bench/)).

For AI builders shipping agents that touch real lab data — PDFs, sequence files, gel images, instrument exports — this is the number to plan around. The 36.1% headline is a ceiling on text-only performance.

## Where the gains are

- **Scientific Communication**: 56.3% → 71.1% — but **n=9 tasks**, too small to generalize
- **Translation** (bench-to-bedside): 36.8% → 57.7% — the strongest clean signal, on a larger category
- **Design/Optimization**: 30.7% — barely moved from GPT-5.5's baseline
- **Analysis**: 30.3% — same story

The improvement is concentrated in *talking-about* workflows (communication, translation), not *designing-and-analyzing* workflows.

## Partial-credit pattern

In roughly **14% of tasks**, models earned substantial rubric credit despite failing the exact-pass threshold. GPT-Rosalind had **109 tasks** with pass rates below 20% while earning at least 50% rubric reward — models can identify relevant evidence but miss key constraints.

## Why it matters

The **19,020-criterion rubric** is the real contribution. LifeSciBench asks "is the model *useful* in a research meeting?" rather than "did the model get the right answer?" The seven-workflow taxonomy maps cleanly onto how biotech R&D teams talk about their work.

## Risks and caveats

1. **Self-report by the model owner.** OpenAI is both benchmark publisher and model owner. No third-party reproduction exists as of 2026-06-20. No public code or task data is referenced in the announcement.
2. **36.1% is a 70% rubric threshold, not a clean "right answer."** The rubric-reward number (44.7% vs 29.1% on expert-useful outputs) is the more honest signal.
3. **Scientific Communication gain is on n=9 tasks.** Too small to generalize.
4. **Artifact handling is the load-bearing weakness.** The 17-point drop is the number most useful to AI builders.
5. **Real research is iterative; LifeSciBench is not.** OpenAI names deployment studies in live workflows as the proof point the benchmark cannot supply.

## What to watch

- Public release of GPT-Rosalind access pathways (currently request-only)
- Third-party reproduction of the 36.1% / 25.7% delta
- AI Chemist and Deployment Simulation follow-ups
- Design/Optimization leaderboard updates
- Independent artifact-handling evaluations broken out by type
- Head-to-head runs against non-OpenAI models

## Verdict

LifeSciBench shows frontier models improving rapidly at scientific prose and bench-to-bedside translation, and not measurably at design-and-analysis work. The **17-point artifact-handling drop** is the number to plan around. It is a self-report by the model owner, GPT-Rosalind access is gated, and the strongest gain is on nine tasks ([OpenAI, Introducing LifeSciBench, 2026-06-17](https://openai.com/index/introducing-life-sci-bench/)).
