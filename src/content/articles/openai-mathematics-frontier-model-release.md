---
title: "OpenAI publishes 722 mathematics manuscripts from an unreleased frontier model"
description: "OpenAI released 722 manuscripts across 372 math result families with 162 Lean formalizations — but withheld the model name and prompts an advisory group had asked for."
pubDate: 2026-10-07
author: "AI Newsroom"
tags:
  - openai
  - mathematics
  - lean
  - formal-verification
  - frontier-models
  - ai-governance
  - transparency
  - agmai
  - research-disclosure
image: "/images/articles/openai-mathematics-frontier-model-release/hero.png"
imageAlt: "Screenshot of the openai/math GitHub repository README, showing that the collection contains 722 manuscripts organized into 372 result families, with the repository name and navigation section visible."
imageCredit: "Source: https://github.com/openai/math (editorial screenshot captured 2026-10-07) · Credit: OpenAI repository page · License: repository content Apache-2.0; screenshot by AI Newsroom"
highRiskClaims: true
sources:
  - title: "OpenAI — Sharing AI progress in mathematics (2026-10-06)"
    url: "https://openai.com/index/sharing-ai-progress-in-mathematics/"
    date: 2026-10-06
    type: primary
  - title: "openai/math — GitHub repository (Apache-2.0, created 2026-10-06)"
    url: "https://github.com/openai/math"
    date: 2026-10-06
    type: primary
  - title: "openai/math — README.md (722 manuscripts, 372 families, ~4,000 problems, ~3h compute)"
    url: "https://github.com/openai/math/blob/main/README.md"
    date: 2026-10-06
    type: primary
  - title: "openai/math — CONTENTS.md (manuscript map, 372 result entries)"
    url: "https://github.com/openai/math/blob/main/CONTENTS.md"
    date: 2026-10-06
    type: primary
  - title: "openai/math — lean/formalization.yaml (162 formalization entries)"
    url: "https://github.com/openai/math/blob/main/lean/formalization.yaml"
    date: 2026-10-06
    type: primary
  - title: "openai/math — lean/ComparatorChallenges/README.md (comparator verification path)"
    url: "https://github.com/openai/math/blob/main/lean/ComparatorChallenges/README.md"
    date: 2026-10-06
    type: primary
  - title: "OpenAI — Advisory Group on Mathematics and Artificial Intelligence (2026-09-21)"
    url: "https://openai.com/index/advisory-group-on-mathematics-and-ai/"
    date: 2026-09-21
    type: primary
  - title: "AGMAI — Responsible Release of AI-Generated Mathematics (2026-09-29)"
    url: "https://agmai.org/general-sep29/"
    date: 2026-09-29
    type: primary
  - title: "OpenAI — On the Navier–Stokes Millennium Prize Problem (2026-09-08)"
    url: "https://openai.com/index/navier-stokes-solution/"
    date: 2026-09-08
    type: primary
  - title: "Scientific American — OpenAI unleashes hundreds more math results upon a field already in shock (2026-10-06)"
    url: "https://www.scientificamerican.com/article/openai-unleashes-hundreds-more-math-results-upon-a-field-already-in-shock/"
    date: 2026-10-06
    type: secondary
---

On October 6, OpenAI published a GitHub repository of 722 mathematics manuscripts organized into 372 result families, produced by an unreleased internal frontier model. The company says the average result used roughly three hours of ChatGPT Pro thinking and that many proofs now carry Lean formalizations. It also released the material with only partial disclosure — one week after an independent mathematicians' group published detailed transparency recommendations.

![Screenshot of the openai/math GitHub README showing 722 manuscripts organized into 372 result families](/images/articles/openai-mathematics-frontier-model-release/hero.png)

*Editorial screenshot of [github.com/openai/math](https://github.com/openai/math), captured 2026-10-07. Source and credit: OpenAI; repository content is Apache-2.0.*

## What OpenAI released

- **722 manuscripts** across **372 result families** in the public `openai/math` repository, licensed Apache-2.0 and created October 6.
- Manuscript PDFs dated **September 23 to October 6, 2026**.
- **162 manuscripts** with Lean formalization entries — about 22% of the collection.
- **10 reasoning summaries**, including the irrationality exponent of π, Kaplansky's direct-finiteness conjecture, and the Mézard–Parisi formula.
- **About 4,000 problems** posed over the evaluation.
- **Roughly 3 hours** of ChatGPT Pro thinking compute, on average, per result ([OpenAI](https://openai.com/index/sharing-ai-progress-in-mathematics/); [README](https://github.com/openai/math/blob/main/README.md)).

The repository documents exceptions to its fixed procedure: work on a zero-free region for the Riemann zeta function and on the Hodge Conjecture for CM abelian varieties was handled differently, and the zeta writeup was human-edited for readability.

## How the results were produced

OpenAI says the "vast majority" of results came from one procedure using an unreleased internal model. The company links to its September 8 Navier–Stokes post as the same system, where it described a roughly 10,000-agent swarm that sent 4.9 million messages and used about 300 billion output tokens ([OpenAI](https://openai.com/index/navier-stokes-solution/)).

The production method for this release may differ. Scientific American reports that an OpenAI spokesperson said almost every result came from a single prompt to a single AI agent, though some results may have taken multiple attempts. That claim is not independently verified, and OpenAI has published no prompts or per-result logs. Andrew Sutherland, a mathematician at MIT, told the magazine: "We should ask for receipts" ([Scientific American](https://www.scientificamerican.com/article/openai-unleashes-hundreds-more-math-results-upon-a-field-already-in-shock/)).

OpenAI says the model is not yet released and that it is working to release it "as quickly and responsibly as possible."

## The transparency gap

The Advisory Group on Mathematics and Artificial Intelligence (AGMAI), hosted at the Institute for Advanced Study and formed on September 21 with nine mathematicians, published its recommendations on September 29. OpenAI says it consulted the group and drew on its advice. How the two line up:

| AGMAI recommendation (Sep 29) | OpenAI (Oct 6) |
|---|---|
| Publish the model name, prompts, summarized chain of thought, time taken, and estimated compute cost per result | Published 10 reasoning summaries and average compute; withheld the model name, prompts, and per-result cost |
| Formalize proofs with copyright headers, a comparator challenge file, and a `formalization.yaml` | Provided 162 Lean entries, a `formalization.yaml`, and comparator instructions |
| Document how each problem used AI, how many comparable problems failed, and how problems were chosen | Published statistics on ~4,000 attempted problems; no per-problem failure accounting |
| Provide funding and support so human understanding can follow | Says it will fund workshops, conferences, and special programs |
| Give the community broad access, not proprietary-only testing | Model remains unreleased, with a stated intent to release it |

AGMAI states plainly that it does "not endorse" testing advanced mathematics on proprietary models and asks labs to stop. OpenAI told Scientific American that it takes the guidelines seriously but is "not bound by these recommendations."

## Why it matters

For researchers, the 162 Lean entries are the subset whose logic a machine can check now. The other roughly 560 manuscripts rest on human reading, and the README warns: "Some of the unformalized results could have issues." Lean coverage therefore bounds what is machine-verified, not whether all 372 families are correct.

For governance watchers, the release tests how frontier labs disclose AI-generated research after the Navier–Stokes controversy. OpenAI told Scientific American that many of its new results are not yet understood by its own mathematicians.

## Risks and caveats

- **Counts are self-reported.** The 722/372/162 figures come from OpenAI's own repository; independent verification of the unformalized set is pending.
- **Single-agent framing is unverified.** It rests on a secondary report of a company statement, with no prompts, logs, or released model.
- **Partial compliance.** AGMAI's core technical asks — model name, prompts, per-result cost — remain unmet.
- **Unreleased model.** Without access, mathematicians cannot replicate or falsify the method.
- **Lean is not a correctness guarantee for the whole collection.** Only the formalized subset is machine-checked.

## What to watch

- Whether OpenAI publishes model names, prompts, and per-result compute for future releases.
- Whether the collection moves to a community-hosted repository, as AGMAI recommends and OpenAI says it is exploring.
- How many of the 372 families gain Lean formalizations over time.
- Whether AGMAI comments publicly on this release's compliance.

## Sources

| Publisher | Source | URL |
|---|---|---|
| OpenAI | Sharing AI progress in mathematics (2026-10-06) | https://openai.com/index/sharing-ai-progress-in-mathematics/ |
| GitHub | openai/math repository, Apache-2.0 (2026-10-06) | https://github.com/openai/math |
| GitHub | openai/math README.md | https://github.com/openai/math/blob/main/README.md |
| GitHub | openai/math CONTENTS.md | https://github.com/openai/math/blob/main/CONTENTS.md |
| GitHub | openai/math lean/formalization.yaml | https://github.com/openai/math/blob/main/lean/formalization.yaml |
| GitHub | openai/math lean/ComparatorChallenges/README.md | https://github.com/openai/math/blob/main/lean/ComparatorChallenges/README.md |
| OpenAI | Advisory Group on Mathematics and AI (2026-09-21) | https://openai.com/index/advisory-group-on-mathematics-and-ai/ |
| AGMAI | Responsible Release of AI-Generated Mathematics (2026-09-29) | https://agmai.org/general-sep29/ |
| OpenAI | On the Navier–Stokes Millennium Prize Problem (2026-09-08) | https://openai.com/index/navier-stokes-solution/ |
| Scientific American | OpenAI unleashes hundreds more math results (2026-10-06) | https://www.scientificamerican.com/article/openai-unleashes-hundreds-more-math-results-upon-a-field-already-in-shock/ |
