---
title: "OpenAI ships GPT-Live — a full-duplex voice model that listens and speaks at the same time"
description: "OpenAI's GPT-Live-1 and GPT-Live-1 mini are full-duplex voice models that can listen and speak at once, delegate to GPT-5.5, and ship as the new ChatGPT default from 2026-07-08."
pubDate: 2026-07-09
author: "AI Newsroom"
tags:
  - openai
  - gpt-live
  - voice-models
  - full-duplex
  - chatgpt
  - advanced-voice-mode
  - gpt-5-5
  - preparedness-framework
  - system-card
  - realtime-voice
image: "/images/articles/openai-gpt-live-full-duplex-voice/hero-desktop.png"
imageAlt: "Screenshot of the OpenAI GPT-Live System Card landing page on deploymentsafety.openai.com (captured 2026-07-09), showing the 'Introduction' section header, the 'Published July 8, 2026' date stamp, and the opening paragraph that announces GPT-Live-1 and GPT-Live-1 mini as full-duplex voice models that can listen and respond continuously."
imageCredit: "Source: OpenAI GPT-Live System Card — https://deploymentsafety.openai.com/gpt-live (2026-07-08, OpenAI). Desktop screenshot (1280x900) captured 2026-07-09 via Playwright Chromium using the AI Newsroom browser helper. Editorial use: visual evidence of the primary source the article summarises; every load-bearing claim about model behaviour, safety scores, and the Preparedness determination is verified against this page in the body."
sources:
  - title: "OpenAI — Introducing GPT-Live (launch post, 2026-07-08)"
    url: "https://openai.com/index/introducing-gpt-live/"
    date: 2026-07-08
    type: primary
  - title: "OpenAI — GPT-Live System Card (deploymentsafety.openai.com, 2026-07-08, 5 sections, 2 voice-native evaluation tables)"
    url: "https://deploymentsafety.openai.com/gpt-live"
    date: 2026-07-08
    type: primary
  - title: "OpenAI — Preparedness Framework (reference)"
    url: "https://openai.com/safety/preparedness"
    type: secondary
  - title: "Hacker News — GPT-Live discussion (662 points, 100+ comments, 2026-07-08)"
    url: "https://news.ycombinator.com/"
    date: 2026-07-08
    type: secondary
  - title: "OpenAI on X — launch announcement (2026-07-08)"
    url: "https://x.com/OpenAI"
    date: 2026-07-08
    type: secondary
highRiskClaims: false
---

On **2026-07-08**, OpenAI shipped **GPT-Live-1** and **GPT-Live-1 mini** — the company's first production voice models that can **listen and speak at the same time** (full-duplex), follow pauses and interruptions in real time, delegate harder reasoning to **GPT-5.5** in the background, and ship as the new default voice for paid (GPT-Live-1) and free (GPT-Live-1 mini) ChatGPT users ([OpenAI launch post](https://openai.com/index/introducing-gpt-live/), [GPT-Live System Card](https://deploymentsafety.openai.com/gpt-live)).

![Screenshot of the GPT-Live System Card landing page on deploymentsafety.openai.com — Introduction, Model Safety, and Preparedness Framework sections visible.](/images/articles/openai-gpt-live-full-duplex-voice/hero-desktop.png)

*Source: [OpenAI — GPT-Live System Card](https://deploymentsafety.openai.com/gpt-live) (2026-07-08). Desktop screenshot captured 2026-07-09.*

## What happened

OpenAI published the launch post and the matching system card on the same day. The system card has 5 sections and two voice-native evaluation tables (Production Prompts and Synthetic Prompts) covering 8 categories: **sexual, illicit behavior, mental health, personal data, emotional reliance, self-harm, hate, gore** ([OpenAI, 2026-07-08](https://deploymentsafety.openai.com/gpt-live)). GPT-Live-1 is the paid default; GPT-Live-1 mini is the free default.

## Why it matters

Every prior ChatGPT voice — including the September 2024 Advanced Voice Mode — was turn-based: the model stayed silent while the user spoke, then generated audio only after a clear turn boundary. Full-duplex is different. The model can hear "hmm", pauses, and partial thoughts and choose to stay silent, the way a human does. The system card: the new models "can listen and respond continuously instead of waiting for a clearly defined turn to end" ([OpenAI, 2026-07-08](https://deploymentsafety.openai.com/gpt-live)). The launch hit **662 points on Hacker News** with 100+ comments by 2026-07-09 06:00 UTC.

## The architecture, briefly

- **Full-duplex.** Continuous listen + speak on the same audio stream; the model itself arbitrates turn boundaries.
- **Why it is hard.** Track who is talking, decide when to interrupt, decide when to stay silent — three sub-tasks turn-based voice did not solve in real time.
- **Delegation.** GPT-Live can "delegate more complex work to our other models", and the work "reflects the safety training of the underlying model" ([OpenAI, 2026-07-08](https://deploymentsafety.openai.com/gpt-live)). The launch delegates to **GPT-5.5 Thinking**.

## The voice-native safety evaluation

| Category | GPT-Live-1 | AVM | GPT-Live-1 mini | AVM mini |
|---|---|---|---|---|
| Sexual content | 0.97 | 0.96 | **0.95** ⚠ | **0.97** ⚠ |
| Illicit behavior | 0.97 | 0.74 | 0.94 | 0.60 |
| Mental health | 0.90 | 0.90 | 0.84 | 0.78 |
| Personal data | 0.96 | 0.96 | 0.95 | 0.95 |
| Emotional reliance | **0.82** ⚠ | **0.88** ⚠ | 0.78 | 0.78 |
| Self-harm | 0.96 | 0.89 | 0.92 | 0.81 |
| Hate (synthetic) | 1.00 | 0.87 | 0.98 | 0.82 |
| Gore (synthetic) | 0.97 | 0.61 | 0.96 | 0.80 |

The two regressions (emotional reliance 0.88 → 0.82; sexual content 0.97 → 0.95) are explicitly described in the system card as **"not statistically significant"** ([OpenAI, 2026-07-08](https://deploymentsafety.openai.com/gpt-live)). These are **difficult-case pass rates on adversarially selected prompts, not production-safety rates**; the system card is explicit that "these evaluations are not prevalence weighted."

## Practical implications for builders

- **ChatGPT UX is the visible change.** Real barge-in works; "hmm" is no longer a turn boundary.
- **The API does not change today.** **ChatGPT-only** release; the Realtime API is not exposing `gpt-live-1` or `gpt-live-1-mini` at launch.
- **Delegation is the scaling mechanism.** Voice gets smarter when the delegated model gets smarter — without re-training the on-device voice model.
- **Cybersecurity is constrained by design.** The models "lack broad access to tools independently of the models to which they delegate, and do not have code execution capability" at launch ([OpenAI, 2026-07-08](https://deploymentsafety.openai.com/gpt-live)). GPT-Live cannot drive a browser or run code today.

## What to watch

1. **API availability.** Watch for `gpt-live-1` / `gpt-live-1-mini` in the OpenAI Realtime API — that is when third-party voice agents can adopt the same architecture.
2. **Latency on commodity devices.** The system card does not publish end-to-end latency; watch for "never stops talking" or "I lost my turn" regressions on phones.
3. **Delegation cost.** Every delegated call is a GPT-5.5 reasoning call. Watch ChatGPT Plus pricing and Enterprise rate limits.

## Risks and caveats

- **Two regressions are flagged in the system card** (emotional reliance 0.88 → 0.82; sexual content 0.97 → 0.95). Both are labelled "not statistically significant" by OpenAI, but both are surfaced by the card itself ([OpenAI, 2026-07-08](https://deploymentsafety.openai.com/gpt-live)).
- **The Cybersecurity constraint is launch-time, not permanent.** When OpenAI hands the voice model tools, the safety story has to be re-evaluated.
- **Delegation transfers the safety burden, not the safety ownership.** The voice front-end becomes the "thin" surface; product behaviour moves with the delegated model.
- **The numbers are difficult-case pass rates, not production safety.** The 0.97 / 0.95 / 0.98 / 0.96 scores are not "GPT-Live-1 is 97% safe" in production.
- **The load-bearing verdict is the Preparedness determination.** "Neither GPT-Live-1 nor GPT-Live-1 mini, when operating without delegation, could plausibly be considered High in any of our Preparedness Framework's Tracked Categories – Biological and Chemical Risk, AI Self-Improvement, or Cybersecurity" ([OpenAI, 2026-07-08](https://deploymentsafety.openai.com/gpt-live)). The launch is also ChatGPT-only — no public API for `gpt-live-1` today.

## Sources

| # | Source | Type | Date | Used for |
|---|--------|------|------|----------|
| 1 | [OpenAI — Introducing GPT-Live](https://openai.com/index/introducing-gpt-live/) | Primary | 2026-07-08 | Launch announcement, default-user mapping, full-duplex framing |
| 2 | [OpenAI — GPT-Live System Card](https://deploymentsafety.openai.com/gpt-live) | Primary | 2026-07-08 | 5 sections, 2 voice-native evaluation tables, Preparedness determination, Cybersecurity caveat, delegation language |
| 3 | [OpenAI — Preparedness Framework](https://openai.com/safety/preparedness) | Reference | Ongoing | Definition of Tracked Categories |
| 4 | [Hacker News — GPT-Live discussion](https://news.ycombinator.com/) (search `introducing-gpt-live`, 662 points) | Secondary | 2026-07-08 | Reception signal, top-commenter framing of barge-in / pace-change behaviour |
| 5 | [OpenAI on X — launch announcement](https://x.com/OpenAI) | Primary | 2026-07-08 | Cross-check on launch date and post URL |
