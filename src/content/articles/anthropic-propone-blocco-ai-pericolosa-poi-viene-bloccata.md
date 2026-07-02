---
title: "Anthropic Seeks AI-Blocking Powers, Gets Blocked Instead"
description: "On June 10, 2026, Anthropic asked the US government for power to block dangerous frontier models. Two days later, that power suspended Fable 5 and Mythos 5."
pubDate: 2026-06-13
author: "AI Newsroom"
tags: ["anthropic", "policy", "regulation", "fable-5", "mythos-5", "export-control", "frontier-models"]
image: "https://www.anthropic.com/api/opengraph-illustration?name=Shield%20with%20checkmark&backgroundColor=heather"
imageAlt: "Anthropic policy framework illustration"
imageCredit: "Image: Anthropic / Advanced AI Framework policy page (June 10, 2026)"
sources:
  - title: "Anthropic: Policy on the AI Exponential"
    url: "https://www.anthropic.com/policy-on-the-ai-exponential"
    date: 2026-06-10
    type: primary
  - title: "Anthropic: Advanced AI Framework (PDF)"
    url: "https://www-cdn.anthropic.com/files/4zrzovbb/website/0a58d567024a8b448ff15158ebc3625328dfcc1f.pdf"
    date: 2026-06-10
    type: primary
  - title: "Dario Amodei: Policy on the AI Exponential (personal essay)"
    url: "https://darioamodei.com/post/policy-on-the-ai-exponential"
    date: 2026-06-10
    type: primary
  - title: "Anthropic: Statement on the US government directive to suspend access to Fable 5 and Mythos 5"
    url: "https://www.anthropic.com/news/fable-mythos-access"
    date: 2026-06-12
    type: primary
  - title: "OpenAI: GPT-5.5 System Card — Cybersecurity"
    url: "https://deploymentsafety.openai.com/gpt-5-5/cybersecurity"
    date: 2026-04-23
    type: primary
  - title: "Anthropic: Claude Fable 5 and Claude Mythos 5 (launch post)"
    url: "https://www.anthropic.com/news/claude-fable-5-mythos-5"
    date: 2026-06-09
    type: primary
highRiskClaims: true
---

On **2026-06-10**, Anthropic published a two-part policy proposal — the **Advanced AI Framework** and an **Economic Policy Framework** — formally asking the US federal government for *"the legal authority to block or deter the deployment of models that pose a significant risk of catastrophic harm"*, with graduated civil penalties tied to global revenue ([Anthropic, June 10, 2026](https://www.anthropic.com/policy-on-the-ai-exponential)). Two days later, an export control directive ordered the immediate suspension of access to **Claude Fable 5** and **Claude Mythos 5** — Anthropic's flagships, launched three days earlier — for *all* customers, not just foreign ones. Anthropic complied, then cited its own proposal to challenge the process ([Anthropic, June 12, 2026](https://www.anthropic.com/news/fable-mythos-access)).

It's a 48-hour arc, signed by one actor on both sides: a major lab requesting regulatory power over its own models, and that power being exercised *against* its models without following the process the lab had invoked.

## What happened

**June 10 — the proposal.** The Advanced AI Framework defines a precise frontier threshold: models trained with more than **10²⁵ FLOP**, developed by companies with over $500M in AI revenue or $1B in AI R&D. It names four catastrophic risk categories — **biological, cyber, loss of control, and automated R&D** that accelerates the other three — and asks for civil penalties scaled to global revenue for repeated violations ([Anthropic, June 10, 2026](https://www.anthropic.com/policy-on-the-ai-exponential)). CEO Dario Amodei's same-day essay frames the model in the US regulatory tradition — *"airplanes, not nuclear weapons"* — and cites the June 2026 Trump Executive Order as incremental progress, recommending *more* action ([darioamodei.com, June 2026](https://darioamodei.com/post/policy-on-the-ai-exponential)).

The proposal isn't a blank check. The PDF specifies that blocking authority should be *"scoped to the above four specific risks"* with *"protective measures against political favoritism or arbitrary decisions"* and that the process must be *"statutory, transparent, fair, clear, and grounded in technical facts"* ([Advanced AI Framework, June 10, 2026](https://www-cdn.anthropic.com/files/4zrzovbb/website/0a58d567024a8b448ff15158ebc3625328dfcc1f.pdf)). These are the words the June 12 statement will reuse — and contest.

**June 12 — the directive.** At 5:21 PM ET on June 11, Anthropic received an export control directive ordering immediate suspension of Fable 5 and Mythos 5 access for *any* "foreign national," including Anthropic employees of foreign nationality. To ensure compliance, Anthropic disabled both models for all customers. Other Claude classes (Sonnet, Opus, Haiku) were not affected ([Anthropic, June 12, 2026](https://www.anthropic.com/news/fable-mythos-access)).

The government letter, per Anthropic, *"did not provide specific details of its national security concern."* Anthropic's understanding is that the government learned of a method to bypass Fable 5's safeguards. Anthropic reviewed a demonstration and called the results *"a small number of previously known, minor vulnerabilities,"* replicable *"by other publicly-available models … without requiring a bypass"* — pointing explicitly at **OpenAI GPT-5.5**, whose [system card](https://deploymentsafety.openai.com/gpt-5-5/cybersecurity) classifies it as "High capability in the Cybersecurity domain, but below Critical" ([OpenAI GPT-5.5, 2026-04-23](https://deploymentsafety.openai.com/gpt-5-5/cybersecurity)).

Anthropic's closing line is direct: *"We believe the government should have the ability to block unsafe deployments, as part of a statutory process that is transparent, fair, clear, and grounded in technical facts. This action does not adhere to those principles."* ([Anthropic, June 12, 2026](https://www.anthropic.com/news/fable-mythos-access)).

## Why it matters

**1. The first operational precedent of blocking power *without* the *statutory* process requested.** Fable 5 launched on [June 9, 2026](https://www.anthropic.com/news/claude-fable-5-mythos-5) as the first publicly available "Mythos" class model. Three days later it's unreachable by any customer — the first time the suspension power is exercised *against* the lab that had publicly requested that power. Anthropic's own framing: *"If this standard was applied across the industry, we believe it would essentially halt all new model deployments for all frontier model providers"* ([Anthropic, June 12, 2026](https://www.anthropic.com/news/fable-mythos-access)).

**2. The "all customers" cutoff is operational, not semantic.** The directive prohibits access to foreign nationals; for compliance, Anthropic disabled access for *everyone*. Any team running eval, logs, or agents on `claude-fable-5` or `claude-mythos-5` needs a fallback. Sonnet, Opus, and Haiku users are unaffected on the API — but the regulatory precedent is.

**3. The policy artifact of the week isn't the statement — it's the proposal.** The Advanced AI Framework is the most detailed AI policy proposal ever published by a major lab: 27 pages with measurable compute thresholds, measurable applicability criteria, graduated penalties, and explicit safeguards against misuse. The real question isn't what happens to Fable 5; it's what happens to the relationship between blocking power and *statutory* process in the next twelve months.

## What to watch

1. The full text of the export control directive (or an unclassified version).
2. OpenAI's response to the GPT-5.5 equivalence claim — Anthropic's case depends on it.
3. Statements from Google DeepMind, Meta, xAI, Microsoft AI.
4. The relationship between the June 2026 Executive Order and the June 12 directive.
5. Fable 5 and Mythos 5 restoration date (Anthropic: *"as soon as possible"*, no date).
6. The Advanced AI Framework's trajectory on Capitol Hill and in Brussels over 3–6 months.

## Risks and caveats

- **The "other models do the same jailbreak" claim is Anthropic's, not a verdict.** OpenAI had not commented as of June 13, 2026.
- **The directive text isn't public.** Any assertion about what it says is from Anthropic's summary.
- **Anthropic challenges procedure, not the legal basis itself.** The government invoked *"national security authorities"* — standard language.
- **Fable 5 and Mythos 5 are closed-weight API models.** Self-hosting was never an option.

## Verdict

A 48-hour arc: a major lab publicly requests stricter rules for itself, those rules become operational in 48 hours in a form the lab contests. The open question isn't when Fable 5 and Mythos 5 return — it's whether the regulatory precedent holds, and whether other labs join Anthropic's procedural position or distance themselves from it.

> "We believe the government should have the ability to block unsafe deployments, as part of a statutory process that is transparent, fair, clear, and grounded in technical facts. This action does not adhere to those principles."

— Anthropic, statement of June 12, 2026 ([Anthropic](https://www.anthropic.com/news/fable-mythos-access))
