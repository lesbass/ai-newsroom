---
title: "Sonnet 5 launches at $2/$10, nears Opus 4.8"
description: "Anthropic's Claude Sonnet 5 launches 2026-06-30 with intro pricing $2/$10 per MTok (→$3/$15 on Sep 1), a new effort-level API dial, and a near-Opus cost-performance curve."
pubDate: 2026-07-01
author: "AI Newsroom"
tags: ["anthropic", "claude-sonnet-5", "claude-opus-4-8", "anthropic-pricing", "anthropic-api", "claude-code", "claude-platform", "claude-sonnet-4-6", "claude-mythos-5", "claude-fable-5", "effort-level", "cost-performance", "agentic-search", "browsecomp", "osworld-verified", "humanitys-last-exam", "swe-bench-pro", "terminal-bench", "firefox-147", "mozilla", "cyber-verification-program", "tokenizer-change", "system-card", "anthropic-blog", "ai-newsroom-coverage"]
image: "/images/articles/claude-sonnet-5-narrows-gap-to-opus/hero-cost-performance-browsecomp.png"
imageAlt: "Cost-performance chart titled 'Agentic search performance by effort level' on BrowseComp. Y-axis is Pass rate (%); X-axis is Cost per task in USD on a log scale. Three lines: Sonnet 5 (orange) starts at ~60% pass at the lowest cost and rises to ~85% pass at the highest cost; Opus 4.8 (yellow) starts higher and runs roughly parallel at a higher cost; Sonnet 4.6 (gray) tops out near 76% pass. Each data point is labelled with its effort level (low, med, high, xhigh, max). Sonnet 5's high and xhigh points are clustered with Opus 4.8's high and xhigh points near 82–85% pass rate."
imageCredit: "Source: anthropic.com/news/claude-sonnet-5 (Anthropic blog post 'Introducing Claude Sonnet 5', 2026-06-30; chart methodology corrected on the same day per the post's Changelog section: '10M token budget with compaction and programmatic tool calling', aligned with the Sonnet 5 system card). Captured 2026-07-01 by downloading the chart from the Anthropic CDN at www-cdn.anthropic.com/images/4zrzovbb/website/cd0df787f39b6408dcba539fba93f817f2f3c0b4-3840x2160.png via curl, after the agent-browser skill confirmed the chart renders correctly with the post-Edit June 30, 2026 methodology on the live page. License: Anthropic-published marketing material; used editorially for the news commentary in this article under fair use."
sources:
  - title: "Anthropic — \"Introducing Claude Sonnet 5\" (launch post, dated 2026-06-30, with 'Edit June 30, 2026' BrowseComp chart methodology correction)"
    url: "https://www.anthropic.com/news/claude-sonnet-5"
    date: 2026-06-30
    type: primary
  - title: "Anthropic — Claude Sonnet 5 System Card (Sonnet 5 cyber capability in Section 3.2.4, automated behavioral audit in Section 6.4, standard methodology '10M token budget with compaction and programmatic tool calling')"
    url: "https://www.anthropic.com/claude-sonnet-5-system-card"
    date: 2026-06-30
    type: primary
  - title: "Anthropic — Pricing page (Sonnet 5 model listing; $2/$10 introductory and $3/$15 standard rate card on the API model lineup)"
    url: "https://www.anthropic.com/pricing"
    date: 2026-06-30
    type: primary
  - title: "Anthropic — Claude API reference, model listing (claude-sonnet-5 documented, effort-level parameter documented as 'effort' / 'effort level')"
    url: "https://docs.claude.com/en/api/models"
    date: 2026-06-30
    type: primary
  - title: "Anthropic — Claude API release notes (effort parameter generally available for Sonnet 5; effort level 'low / medium / high / xhigh' documented; default and override behavior described)"
    url: "https://docs.claude.com/en/release-notes/api"
    date: 2026-06-30
    type: primary
  - title: "Mozilla — Security advisories index (Firefox 147 vulnerability advisories; the Anthropic cyber evaluation was developed in collaboration with Mozilla and all vulnerabilities are patched in Firefox 148, per the Anthropic blog)"
    url: "https://www.mozilla.org/en-US/security/advisories/"
    date: 2026-06-30
    type: primary
  - title: "VentureBeat — \"Anthropic launches Claude Sonnet 5 at a steep discount to its top model as the company races toward a blockbuster IPO\" (Michael Nuñez, 2026-06-30, 11:00 am PT; secondary press confirmation of launch, pricing, 1.0–1.35x tokenizer change, Firefox 147 result, Cyber Verification Program, Fable-5 cyber-safeguards framing)"
    url: "https://venturebeat.com/ai/anthropic-launches-claude-sonnet-5-at-a-steep-discount-to-its-top-model-as-the-company-races-toward-a-blockbuster-ipo/"
    date: 2026-06-30
    type: secondary
  - title: "AI Newsroom 2026-07-01 news radar sweep (Claude Sonnet 5 flagged as the day's top candidate from the 2026-06-30 news cycle; the same-day Fable 5 returns and Google TabFM candidates held for the Day 2 and Day 3 cycles)"
    url: "https://news.lesbass.com/sitemap.xml"
    date: 2026-07-01
    type: secondary
  - title: "AI Newsroom EditorInChief disposition 2026-07-01 (the commissioning decision: accept Claude Sonnet 5 as the day's only article; reject the Headroom candidate brief as a duplicate of the 2026-06-24 Headroom article)"
    url: "https://news.lesbass.com/articles/headroom-ai-agent-token-compression/"
    date: 2026-07-01
    type: secondary
  - title: "AI Newsroom article candidate brief: Claude Sonnet 5 — Anthropic's most agentic Sonnet yet (the day's accepted candidate; 5-row candidate brief with the load-bearing primary sources)"
    url: "https://news.lesbass.com/sitemap.xml"
    date: 2026-07-01
    type: secondary
highRiskClaims: false
---

Anthropic launched **Claude Sonnet 5** on **2026-06-30** as *"the most agentic Sonnet model yet"* — a model that can plan, use browsers and terminals, and run autonomously at a level that, just months ago, required larger and more expensive models ([Anthropic blog, 2026-06-30](https://www.anthropic.com/news/claude-sonnet-5)). The launch ships a new `effort` API dial, intro pricing of **$2 / $10 per MTok** through **2026-08-31** (→ $3 / $15 on 2026-09-01), and a chart where Sonnet 5 overlaps Opus 4.8.

## What happened

Sonnet 5 is the **default for Free and Pro** plans, available to Max, Team, and Enterprise, in Claude Code and the Claude Platform API as **`claude-sonnet-5`** ([Anthropic blog](https://www.anthropic.com/news/claude-sonnet-5); [API model listing](https://docs.claude.com/en/api/models)).

| Pricing surface | Rate per MTok |
| --- | --- |
| Sonnet 5 — introductory, through 2026-08-31 | **$2 input / $10 output** |
| Sonnet 5 — standard, from 2026-09-01 | **$3 input / $15 output** |
| Opus 4.8 (comparison) | $5 input / $25 output |

The new **`effort` parameter** is generally available for Sonnet 5 (no beta header) with four settings: **`low` / `medium` / `high` / `xhigh`** ([API release notes, 2026-06-30](https://docs.claude.com/en/release-notes/api)). Higher effort costs more tokens; rate limits across Chat, Cowork, Claude Code, and the Claude Platform were raised to accommodate.

On Anthropic's own charts, **Sonnet 5 (orange) is a strict improvement over Sonnet 4.6 (gray) and overlaps Opus 4.8 (yellow) at `high` / `xhigh` near 82–85% pass rate on BrowseComp**. OSWorld-Verified tells the same story: Sonnet 5 reaches ~81% at `xhigh` vs Opus 4.8's ~83% at `xhigh` and `max`.

![Cost-performance chart on BrowseComp at five effort levels for Sonnet 5 (orange), Opus 4.8 (yellow), and Sonnet 4.6 (gray). Sonnet 5's `high` and `xhigh` points cluster with Opus 4.8's `high` and `xhigh` near 82–85% pass rate. Source: anthropic.com/news/claude-sonnet-5, 2026-06-30.]({{ '/images/articles/claude-sonnet-5-narrows-gap-to-opus/hero-cost-performance-browsecomp.png' | url }})

The launch post's *Changelog* documents an *"Edit June 30, 2026"* BrowseComp chart methodology fix to *"10M token budget with compaction and programmatic tool calling"*, the [Sonnet 5 system card](https://www.anthropic.com/claude-sonnet-5-system-card) standard. The chart above is the corrected version, captured 2026-07-01.

**Same-day releases.** Sonnet 5 ships alongside **Fable 5 returns** (with a proposed industry-wide jailbreak-severity framework with Amazon, Microsoft, Google, and Glasswing), **Claude Science** (a research workbench), and **Claude Tag** (a teams product) — separate AI Newsroom Day 2 and Day 3 candidates.

## Why it matters

Near-Opus agentic performance is now reachable at Sonnet pricing. The launch post: *"Between Sonnet 5 and Opus 4.8, users can adjust the effort level to find the right balance of cost and performance."* For builders, **effort is the new primary optimization knob** — a runtime parameter, not a model swap. The August 31 deadline is a 50% price increase at a specific date; any team that budgets by token volume should plan for it now.

## Practical implications for builders

- **Model name swap.** Existing code on `claude-sonnet-4-6` becomes `claude-sonnet-5` — the smallest possible change to an agent stack.
- **Tune the dial.** Start at `effort="medium"` for cost efficiency; pin `effort="xhigh"` for near-Opus behavior.
- **Plan for August 31.** $2 / $10 → $3 / $15 is a 50% step on a fixed date. Opus 4.8 at $5 / $25 stays a 67% premium over Sonnet 5 standard for near-Opus performance.
- **Tokenizer delta.** The same input maps to **~1.0–1.35× more tokens** depending on content type; output tokens are unaffected; introductory pricing is set so the transition is roughly input-cost-neutral. Bench context-window budgets before assuming the bill is unchanged.
- **Cyber Verification Program.** Sonnet 5 is enrolled on the native Claude Platform, AWS, and Claude in Microsoft Foundry, and coming to Google Vertex. Anthropic recommends **Opus 4.8** for cyber work needing reduced guardrails.
- **Partner signal** ([Anthropic blog](https://www.anthropic.com/news/claude-sonnet-5)). **Sualeh Asif, Co-founder (Cursor)**: *"With Claude Sonnet 5, agents stay on plan, follow our conventions, and ship clean multi-step changes, all at an efficient cost."* **Daniel Shepard, Senior Engineer**: *"We handed Claude Sonnet 5 a two-part job — update Salesforce account tiers, send a launch announcement to enterprise contacts — and it finished end to end. That used to stall halfway."*

## Risks and caveats

- **Intro price ends 2026-08-31.** No extension announced.
- **Tokenizer 1.0–1.35×.** Cost-neutrality is at the input level; output unchanged. A 200K window budget may now hit sooner on content that tokenizes less efficiently.
- **Cyber capability: 0.0% full working exploit on Firefox 147, partial success rose.** Launch post: *"Sonnet 5 showed a slightly higher partial success rate than Sonnet 4.6."* [VentureBeat](https://venturebeat.com/ai/anthropic-launches-claude-sonnet-5-at-a-steep-discount-to-its-top-model-as-the-company-races-toward-a-blockbuster-ipo/) reports **13.2% partial for Sonnet 5 vs 8.8% for Sonnet 4.6**. All Firefox 147 vulnerabilities are patched in Firefox 148 ([Mozilla advisories](https://www.mozilla.org/en-US/security/advisories/)).
- **Cyber safeguards less strict than Fable 5's.** Anthropic: *"the safeguards are less strict than those launched with Fable 5."*
- **Misaligned-behavior ranking.** Sonnet 5 is lower (safer) than Sonnet 4.6, but **higher than Opus 4.8 and Claude Mythos Preview** (system card [Section 6.4](https://www.anthropic.com/claude-sonnet-5-system-card)).

## What to watch

- **First independent benchmarks** on Sonnet 5 (SWE-Bench, Aider polyglot, Terminal-Bench, Vibe-Eval) — the load-bearing independent evidence versus Anthropic's own charts.
- **The August 31 pricing transition** on the [pricing page](https://www.anthropic.com/pricing) and the [API model listing](https://docs.claude.com/en/api/models).
- **Effort-level adoption** in Claude Code, Cursor, Codex, and other agent frameworks.
- **Fable 5 returns and Claude Science** as the Day 2 and Day 3 stories in the AI Newsroom cycle.

## Sources

- [Anthropic — *Introducing Claude Sonnet 5* (launch post, 2026-06-30)](https://www.anthropic.com/news/claude-sonnet-5)
- [Anthropic — *Claude Sonnet 5 System Card* (2026-06-30)](https://www.anthropic.com/claude-sonnet-5-system-card)
- [Anthropic — *Pricing page* (2026-06-30)](https://www.anthropic.com/pricing)
- [Anthropic — *Claude API reference, model listing* (2026-06-30)](https://docs.claude.com/en/api/models)
- [Anthropic — *Claude API release notes* (2026-06-30)](https://docs.claude.com/en/release-notes/api)
- [Mozilla — *Security advisories index* (2026-06-30)](https://www.mozilla.org/en-US/security/advisories/)
- [VentureBeat — *Anthropic launches Claude Sonnet 5 at a steep discount to its top model* (Michael Nuñez, 2026-06-30)](https://venturebeat.com/ai/anthropic-launches-claude-sonnet-5-at-a-steep-discount-to-its-top-model-as-the-company-races-toward-a-blockbuster-ipo/)
- [AI Newsroom 2026-07-01 news radar sweep (sitemap)](https://news.lesbass.com/sitemap.xml)
- [AI Newsroom EditorInChief disposition 2026-07-01 (Headroom rejection reference)](https://news.lesbass.com/articles/headroom-ai-agent-token-compression/)
- [AI Newsroom article candidate brief: Claude Sonnet 5 (sitemap)](https://news.lesbass.com/sitemap.xml)
