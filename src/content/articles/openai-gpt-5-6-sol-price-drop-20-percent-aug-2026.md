---
title: "OpenAI cuts GPT-5.6 Sol API and credit pricing by over 20% for three months"
description: "An Aug 21 update to the GPT-5.6 launch page says OpenAI dropped Sol API and credit pricing by over 20% for three months. The new per-token figure has not been published."
pubDate: 2026-08-22
author: "AI Newsroom"
tags: ["openai", "gpt-5-6", "gpt-5-6-sol", "api-pricing", "openai-blog"]
image: "/images/articles/openai-gpt-5-6-sol-price-drop-20-percent-aug-2026/hero-desktop.png"
imageAlt: "Editorial pricing-chart graphic for the Aug 21, 2026 GPT-5.6 Sol update: dark slate background with cyan bars showing the listed $5 input / $30 output base price and an at-least-20% cut (illustrated at $4/$24), plus a panel noting the third GPT-5.6 price move in two months and that the exact new per-token price has not been published."
imageCredit: "Generated editorial image (AI Newsroom), 2026-08-22, illustrating the Aug 21, 2026 GPT-5.6 Sol price update from openai.com/index/gpt-5-6/. Screenshot-based hero was not possible: the Playwright environment is missing libglib-2.0.so.0 (see browser capability blocker). Values shown for the cut are an arithmetic illustration of a 20% reduction on the listed $5/$30 base, not a published price."
sources:
  - title: "OpenAI — GPT-5.6 launch page (Jul 9, 2026 with Aug 21, 2026 update line; the quote about the 20%+ Sol price cut and the unchanged $5/$30 base price in the body)"
    url: "https://openai.com/index/gpt-5-6/"
    date: 2026-07-09
    type: primary
  - title: "OpenAI — Advancing the price-performance frontier with GPT-5.6 (Jul 30, 2026; prior Luna 80% cut and Terra 20% cut with explicit per-token prices, Fast mode introduction)"
    url: "https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/"
    date: 2026-07-30
    type: primary
  - title: "OpenAI API pricing page (the page to watch for an updated Sol per-token number)"
    url: "https://openai.com/business/pricing/#api"
    date: 2026-08-22
    type: primary
highRiskClaims: true
---

OpenAI quietly appended an update to its GPT-5.6 launch page on August 21: Sol, the flagship model in the GPT-5.6 family, now has a temporary price cut on API and credit billing. The move is the third price adjustment in the family in two months — and it matters for anyone budgeting GPT-5.6 Sol usage over Q4 2026.

This is an update note, not a re-coverage of the [launch](/articles/openai-gpt-5-6-sol-terra-luna-and-chatgpt-work/).

## What happened

The [GPT-5.6 launch page](https://openai.com/index/gpt-5-6/) now opens with this line:

> *"OpenAI dropped the API and credit pricing of GPT‑5.6 Sol by over 20% for the next 3 months."*

The body of the page has not been updated. The "Availability and pricing" section still lists the original base price: **Sol is $5 input / $30 output** per 1M tokens. No new per-token figure has been published.

This follows two earlier moves in the same family:

- **Jul 30, 2026:** Luna cut by 80% (to $0.20/$1.20 per 1M tokens), Terra cut by 20% (to $2/$12 per 1M tokens) — per the [price-performance post](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/).
- **Aug 21, 2026:** Sol cut by over 20% for 3 months — per the launch page update.

## Why it matters

- **Q4 cost planning.** API users paying for GPT-5.6 Sol today should expect a lower invoice for approximately three months from Aug 21. Agents, long-running workflows, and batch jobs benefit most from per-token price drops.
- **Third price move in two months.** The Sol family has gone from launch pricing to three distinct price adjustments in six weeks. That pace signals competitive pricing pressure and OpenAI's willingness to pass efficiency gains through quickly.

## Practical implications

**Who benefits:** API users running GPT-5.6 Sol for long agent loops, batch inference, and token-heavy workflows. The effective cost per million output tokens drops by at least 20% during the window.

**What does NOT change:**

- **Fast mode** pricing remains at 2× the per-token rate for ~2.5× speed on Sol (introduced Jul 30).
- **Cache writes** are still billed at 1.25× the uncached input rate.
- **Cache reads** still receive the 90% cached-input discount.
- **ZDR behavior** and the 30-minute minimum cache life are unchanged.

**What to verify before locking in cost forecasts:**

- The new Sol per-token number on the [platform pricing page](https://openai.com/business/pricing/#api).
- Whether "credits" means API billing credits, ChatGPT Work credits, or both.
- The exact end date of the 3-month window.

## Risks and caveats

- **The exact new per-token price has not been published.** The claim is "over 20% for 3 months." A 20% reduction on the listed $5/$30 would be $4/$24 — but that is arithmetic illustration, not a published figure. Do not treat it as the official new price.
- **"Credits" is undefined.** The update says "API and credit pricing." It is not yet clear whether "credits" refers to API billing credits, ChatGPT Work credits, or both.
- **The 3-month end date is not published.** "Approximately three months from Aug 21, 2026" is the best available framing. The exact expiry date has not been announced.
- **The launch page body has not been updated.** The "Availability and pricing" section still shows $5/$30. The update note was appended at the top; the page body may or may not be updated later.

## What to watch

- The [OpenAI platform pricing page](https://openai.com/business/pricing/#api) for an updated Sol per-token number and an explicit end date for the 3-month window.
- Any clarification on what "credits" means in the update line.
- A possible follow-up post on the [price-performance frontier page](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/) with updated Sol numbers.

## Sources

| # | Source | Date | Claim supported |
| --- | --- | --- | --- |
| 1 | [GPT-5.6 page — OpenAI](https://openai.com/index/gpt-5-6/) | Jul 9, 2026 (Aug 21 update) | The Aug 21 quote ("over 20% for 3 months"); unchanged $5/$30 base price in page body |
| 2 | [Advancing the price-performance frontier — OpenAI](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/) | Jul 30, 2026 | Prior Luna 80% and Terra 20% cuts with explicit per-token prices; Fast mode introduction |
| 3 | [OpenAI API pricing](https://openai.com/business/pricing/#api) | Aug 22, 2026 | Page to watch for updated Sol per-token number |
