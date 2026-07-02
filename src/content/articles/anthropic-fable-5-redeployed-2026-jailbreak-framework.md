---
title: "Anthropic redeploys Claude Fable 5 globally and proposes a four-dimension jailbreak severity framework with Amazon, Microsoft, and Google"
description: "Anthropic restored Fable 5 and Mythos 5 access on 2026-06-30 after the US lifted its June 12 export controls, and proposed a four-dimension jailbreak severity framework with Amazon, Microsoft, and Google."
pubDate: 2026-07-02
author: "AI Newsroom"
tags: ["anthropic", "claude-fable-5", "claude-mythos-5", "amazon", "microsoft", "google", "glasswing", "jailbreak", "ai-safety", "ai-policy", "export-controls", "caisi", "hackerone", "executive-order-14409", "us-government", "ai-regulation", "high-risk-claim"]
image: "/images/articles/anthropic-fable-5-redeployed-2026-jailbreak-framework/hero-framework-dimensions.png"
imageAlt: "Screenshot of the Anthropic 'Redeploying Fable 5' announcement page (anthropic.com/news/redeploying-fable-5, captured 2026-07-02), showing the section heading 'A consensus industry framework for jailbreaks' and the opening paragraph that motivates the four-dimension scoring proposal."
imageCredit: "Source: https://www.anthropic.com/news/redeploying-fable-5 · Captured: 2026-07-02 via Playwright Chromium (headless, networkidle) · Section heading 'A consensus industry framework for jailbreaks' visible on the page at the time of capture · Use: editorial illustration for the four-dimension jailbreak severity framework described in the article body."
sources:
  - title: "Anthropic — \"Redeploying Fable 5\" (announcement, dated 2026-06-30)"
    url: "https://www.anthropic.com/news/redeploying-fable-5"
    date: 2026-06-30
    type: primary
  - title: "White House — Executive Order 14409, \"Promoting Advanced Artificial Intelligence Innovation and Security\" (dated 2026-06-02)"
    url: "https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/"
    date: 2026-06-02
    type: primary
  - title: "Howard Lutnick (X) — \"US export controls on Fable 5 and Mythos 5 lifted\" (dated 2026-06-30)"
    url: "https://x.com/howardlutnick/status/2072100729603452965"
    date: 2026-06-30
    type: primary
  - title: "Anthropic — \"Expanding Project Glasswing\" (Mythos 5 access expansion, dated 2026-06-26)"
    url: "https://www.anthropic.com/news/expanding-project-glasswing"
    date: 2026-06-26
    type: primary
  - title: "HackerOne — \"Anthropic Cyber Jailbreak\" (new bug-bounty program, dated 2026-06-30)"
    url: "https://hackerone.com/anthropic-cyber-jailbreak/"
    date: 2026-06-30
    type: primary
highRiskClaims: true
---

On **2026-06-30**, Anthropic restored global access to Claude Fable 5 and Mythos 5 after the US government lifted the **2026-06-12** export-control directive that had suspended both models for all users ([Anthropic, 2026-06-30](https://www.anthropic.com/news/redeploying-fable-5); [Howard Lutnick, X, 2026-06-30](https://x.com/howardlutnick/status/2072100729603452965)). Alongside the restoration, Anthropic and its Glasswing partners — Amazon, Microsoft, Google — are drafting a four-dimension jailbreak severity scoring framework, the first attempt at a shared industry standard since the Fable 5 suspension made the gap visible.

## What happened

- **Fable 5** is back on the Claude Platform, Claude.ai, Claude Code, and Claude Cowork from **2026-07-01** for Pro, Max, Team, and select Enterprise plans. Through **2026-07-07**, Fable 5 is included for up to **50% of each user's weekly usage limit**; after that, access is via usage credits. AWS, Google Cloud, and Microsoft Foundry re-enablement is *"as quickly as possible"* ([Anthropic, 2026-06-30](https://www.anthropic.com/news/redeploying-fable-5)).
- **Mythos 5** was restored on **2026-06-26** to a set of US organizations under Glasswing, and Anthropic is coordinating with the US government to expand access to broader domestic and international Glasswing partners ([Anthropic — Expanding Project Glasswing, 2026-06-26](https://www.anthropic.com/news/expanding-project-glasswing)).
- The June 12 directive was triggered by a report from **Amazon researchers** who found a way to bypass Fable 5's safeguards: prompting the model to identify software vulnerabilities and produce code showing how one could be exploited. Anthropic's own testing confirmed that less capable models — Claude Opus 4.8, GPT-5.5, Kimi K2.7 — could identify the same vulnerabilities, and every model tested (Haiku 4.5, Sonnet 4.6, Opus 4.6–4.8, GPT-5.4, GPT-5.5, Kimi K2.7) could produce the same exploit demo. The technique did **not** expose unique Mythos-level cyber capabilities ([Anthropic, 2026-06-30](https://www.anthropic.com/news/redeploying-fable-5)).
- **CAISI** (Commerce's Center for AI Standards and Innovation) tested both the prior and new safeguards and *"agree that they are extraordinarily strong."* A new safety classifier trained during the suspension blocks the Amazon-reported technique in over 99% of cases; blocked requests route to Opus 4.8. Tradeoff: more false positives on benign coding and debugging tasks.
- The lifting follows the **2026-06-02** Executive Order 14409, which set up a classified benchmarking process for *"covered frontier models"* and a voluntary framework for AI developers to give the federal government up to 30 days of pre-release access ([White House EO 14409, 2026-06-02](https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/)).

## The four-dimension jailbreak severity framework

The headline new policy product. Anthropic, with Amazon, Microsoft, Google, and other Glasswing partners, is drafting a **consensus framework** for scoring jailbreak severity ([Anthropic, 2026-06-30](https://www.anthropic.com/news/redeploying-fable-5)):

- **Capability gain.** How far beyond existing tools does the jailbreak take the user? Reachable with widely available tools → low. Significantly accelerates domain experts → high.
- **Breadth of capability gain.** How many distinct offensive tasks does the same technique work for? Narrow targets → low. Multiple targets or techniques → high.
- **Ease of weaponization.** How much human effort to turn it into an attack? Skilled prompting, many retries → low. Single prompt, first or second try → high.
- **Discoverability.** How easy is it to obtain the technique? Specialist knowledge → low. Already widely known → high.

The most severe class — a jailbreak *"being used to actively cause a devastating impact on critical power grids or banking systems"* — triggers immediate preliminary mitigations, with a new 24/7 jailbreak monitoring team. Anthropic also opened a new [HackerOne cyber jailbreak program](https://hackerone.com/anthropic-cyber-jailbreak/) for Fable 5 submissions. The framework is a proposal, not yet ratified; Anthropic calls it a *"work in progress"* and compares it to the **Common Vulnerability Scoring System (CVSS)** in software security.

## Four deeper US government commitments

Anthropic is scaling up collaboration with the US government on four tracks ([Anthropic, 2026-06-30](https://www.anthropic.com/news/redeploying-fable-5)):

1. **Pre-release government access.** For frontier-advancing models in national-security-relevant areas, designated government partners get expanded early access to both model and safeguards, with dedicated Anthropic staff on-site during testing.
2. **Rapid information sharing.** On significant jailbreaks or misuse, Anthropic will triage, notify, share new safeguards for independent testing, and contribute threat intel to the **interagency AI cybersecurity clearinghouse** under Sec. 2(d) of EO 14409.
3. **Dedicated resources for joint research.** Anthropic will stand up dedicated teams for shared government priorities, allocate significant compute, and contribute red-teaming expertise.
4. **A common industry bar.** A shared, voluntary security and evaluation standard for frontier providers, with Anthropic contributing evaluations, tooling, and best practices.

## Why it matters

**The framework is the durable deliverable.** The export-control episode was a single event; a shared industry jailbreak scoring system, if adopted, sets a precedent for how AI labs, governments, and researchers triage frontier-model failures together. The most severe jailbreaks now get the most severe response — 24/7 monitoring and immediate mitigations are concrete operational changes. Pre-release US-government access is now an Anthropic default, building on the 30-day window in EO 14409.

## Risks and caveats

1. **The framework is a draft, not a ratified standard.** Anthropic says *"we expect the framework to evolve"* and invites *"other industry partners and model providers to join us."* The article does not assert Amazon, Microsoft, or Google have formally endorsed the four-dimension scoring as written.
2. **The "no unique Mythos-level capability" finding is Anthropic's own testing.** No independent benchmarks or third-party reproduction are in the source.
3. **The 99%+ block rate is per Anthropic's internal measurement on the specific technique.** Not a claim about general jailbreak success rates; Anthropic notes universal jailbreaks may still be discovered.
4. **All Anthropic capability and safety claims are Anthropic's.** The article attributes; it does not assert.
5. **The export-control future is not predicted.** The article does not infer future directives or retractions.

## What to watch

1. **Whether the framework is adopted by other Glasswing partners and model providers.** Drafting is not adoption.
2. **The 24/7 monitoring team's first major incident** — the operational test of the *"immediately begin deploying preliminary mitigations"* commitment.
3. **Fable 5 false-positive rate on benign coding tasks** and **independent benchmarks after restoration** — the capability claims from the original 2026-06-09 launch predate the suspension.
4. **Mythos 5 international expansion timeline** and **AWS / Google Cloud / Microsoft Foundry availability** — both currently pending.

## Sources

| # | Source | Type | Date | URL |
|---|---|---|---|---|
| 1 | Anthropic — "Redeploying Fable 5" | Primary | 2026-06-30 | https://www.anthropic.com/news/redeploying-fable-5 |
| 2 | White House — Executive Order 14409, "Promoting Advanced Artificial Intelligence Innovation and Security" | Primary | 2026-06-02 | https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/ |
| 3 | Howard Lutnick (X) — "Export controls on Fable 5 and Mythos 5 lifted" | Primary | 2026-06-30 | https://x.com/howardlutnick/status/2072100729603452965 |
| 4 | Anthropic — "Expanding Project Glasswing" (Mythos 5 access expansion) | Primary | 2026-06-26 | https://www.anthropic.com/news/expanding-project-glasswing |
| 5 | HackerOne — "Anthropic Cyber Jailbreak" program | Primary | 2026-06-30 | https://hackerone.com/anthropic-cyber-jailbreak/ |
