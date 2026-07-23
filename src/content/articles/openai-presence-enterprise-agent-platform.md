---
title: "OpenAI launches Presence — a managed enterprise agent platform with FDE-led deployments and self-reported 75% resolution"
description: "OpenAI launches Presence, a managed enterprise agent platform with self-reported 75% resolution and 15pp handoff cuts — FDE-led, limited GA, no pricing yet."
pubDate: 2026-07-23
author: "AI Newsroom"
tags:
  - openai
  - presence
  - enterprise-agents
  - customer-service
  - codex
  - fde
  - limited-ga
  - high-risk-claim
  - ai-agents
  - openai-deployment-company
image: /images/articles/openai-presence-enterprise-agent-platform/hero.svg
imageAlt: "Editorial diagram of the OpenAI Presence platform architecture showing six components — Policies & SOPs, Guardrails, Approved Actions, Simulation, Evaluation Tools, and the Codex Improvement Loop — with deployment model and self-reported metrics."
imageCredit: "Generated editorial diagram · AI Newsroom · Disclosure: AI-generated, not source evidence"
canonicalURL: "https://news.lesbass.com/articles/openai-presence-enterprise-agent-platform/"
sources:
  - title: 'OpenAI — "Introducing OpenAI Presence" (launch post, 2026-07-22)'
    url: "https://openai.com/index/introducing-openai-presence/"
    date: 2026-07-22
    type: primary
  - title: 'The Register — "OpenAI tries the consulting path with Presence, charging enterprises boots-on-the-ground prices to deploy agents" (Thomas Claburn, 2026-07-22)'
    url: "https://www.theregister.com/AI-and-ML/2026/07/22/openai-tries-the-consulting-path-with-presence-charging-enterprises-boots-on-the-ground-prices-to-deploy-agents/5275867"
    date: 2026-07-22
    type: secondary
  - title: "Hacker News — OpenAI Presence discussion (2026-07-22, 50+ comments)"
    url: "https://hn.algolia.com/api/v1/search?query=openai+presence&tags=story"
    date: 2026-07-22
    type: secondary
highRiskClaims: true
---

On **2026-07-22**, OpenAI launched **Presence**, a managed enterprise product for deploying trusted AI agents across voice and chat workflows ([launch post](https://openai.com/index/introducing-openai-presence/)). Presence bundles six components — policies and standard operating procedures, guardrails, approved actions, simulations, evaluation tools, and a Codex-powered improvement loop — into a single deployment product. It is not a model and not an API.

**Availability is limited general availability**: eligible enterprise customers only, deployments led by OpenAI Forward Deployed Engineers (FDEs) and select global systems integrators, no self-serve, no published pricing. OpenAI's spokesperson told [The Register](https://www.theregister.com/AI-and-ML/2026/07/22/openai-tries-the-consulting-path-with-presence-charging-enterprises-boots-on-the-ground-prices-to-deploy-agents/5275867) that "broader pricing details to come as availability expands."

## The self-reported production numbers

OpenAI says Presence handles its own English-language phone support at **1-888-GPT-0090** and reports two numbers, both against OpenAI's own grading benchmarks:

| Metric | Value | Context |
|---|---|---|
| Phone-support resolution rate | **75%** of inbound issues without human assistance | Within weeks of deployment, against OpenAI's own benchmarks for frontline human-support quality |
| Handoff reduction (Codex loop) | **15 percentage points in 10 days** | Codex proposed updates from production sessions; teams tested and rolled out changes via controlled release |

Both figures are **OpenAI self-reported against its own grading**. The launch post says the system "met or exceeded benchmarks we use to grade frontline human-support quality" on the company's 1-888-GPT-0090 line.

## How Presence is sold — and what is in the box

Presence is not a self-serve API. Each deployment starts with the FDE team scoping a specific job — billing, insurance claims, or IT service requests. The agent receives only the knowledge and access required for that job; the company sets policies for what it can do, when it needs approval, and when a person takes over.

The product includes a **web-based analytics dashboard** with an agent editor, an agent playground, and a simulation tool for testing common tasks (customer refunds, order queries, account deletion). The commercial vehicle is the **OpenAI Deployment Company**, bolstered by the **May 2026 acquisition of Tomoro**. Pricing is unpublished per-deployment scoping.

## Named design partners — three, all exploring or testing

The launch post names three enterprise customers, each in a pre-production phase:

| Customer | Use case | Status |
|---|---|---|
| **BBVA Mexico** | AI-powered voice support for everyday banking in Mexico | **Design partner** — "exploring" |
| **SoftBank Corp.** (Japan) | Natural Japanese-language customer conversations | **"Testing"** — frontline teams rated conversations highly for natural and accurate quality |
| **IAG Australia** | Timely support during high-demand events (severe-weather claims) | **"Exploring"** |

Attributed quotes from the launch post:

- **Daniel Ordaz, Head of AI Transformation at BBVA Mexico:** "At BBVA, we are working closely with OpenAI to explore how trusted customer agents can help shape the future of financial services. As a design partner for Presence, we are working closely with OpenAI to help shape and refine voice experiences for financial customer service."

- **Tadahisa Murakami, VP at SoftBank Corp.:** "Through our collaboration with OpenAI, we are exploring how Presence can enable trusted customer agents that communicate naturally, connect to the processes needed to resolve requests, and represent SoftBank consistently across customer interactions. Our frontline teams have rated the agent's Japanese-language conversations highly for their natural and accurate quality."

- **Julie Batch, CEO Retail Insurance Australia at IAG:** "We see an opportunity to use Presence to deploy trusted customer agents that provide timely, reliable support for our customers during moments that matter, particularly during high demand periods such as severe weather events and natural disasters."

## Why it matters

Three takeaways for technical readers:

- **The Codex improvement loop is the load-bearing design pattern.** Production-session mining → Codex proposes changes → human approval → controlled rollout. The 15pp handoff reduction in 10 days is the headline evidence.

- **FDE-led deployment is a strategic model signal.** OpenAI is not selling Presence as self-serve. The Register frames it as "charging enterprises boots-on-the-ground prices to deploy agents."

- **The named-customer list is real but pre-production.** BBVA, SoftBank, and IAG are recognizable brands. None has stated production deployment at scale.

## Risks and caveats

- **Every metric is OpenAI self-reported.** Both figures are against OpenAI's own grading benchmarks for its own phone line. No third-party audit, no published methodology.

- **Every customer is in the exploring/testing phase.** None has announced production deployment at scale.

- **"Limited GA" means narrow deployment surface.** Eligible enterprises only, FDE-led, no self-serve, no published pricing.

- **Gartner predicted in June 2026 that by 2027, 50% of organizations planning to shift customer service to AI will abandon those plans.** Analyst Kathy Ross told The Register: "While AI offers significant potential to transform customer service, it is not a panacea."

- **FDE-led deployment is a consulting path, not a software path.** Per-deployment professional-services cost and custom SoW procurement differ from a self-serve API. The Register identifies the Tomoro acquisition (May 2026) as the SI backbone.

## What to watch

- **Pricing publication.** The first public price list changes the deployment economics. No date announced.

- **Self-serve availability.** Presence is FDE-led today; a self-serve or marketplace launch would signal a platform shift.

- **Independent reproductions of the 75%/15pp numbers.** Third-party benchmarks or customer-disclosed metrics are the next-order story.

- **SI channel breadth.** The Register notes Tomoro as the SI backbone; additional global SIs (Accenture, Deloitte, TCS, Capgemini) joining the program would signal platform generality.

## Sources

| # | Source | Date | Type |
|---|---|---|---|
| 1 | [OpenAI — "Introducing OpenAI Presence"](https://openai.com/index/introducing-openai-presence/) | 2026-07-22 | primary |
| 2 | [The Register — "OpenAI tries the consulting path with Presence"](https://www.theregister.com/AI-and-ML/2026/07/22/openai-tries-the-consulting-path-with-presence-charging-enterprises-boots-on-the-ground-prices-to-deploy-agents/5275867) | 2026-07-22 | secondary |
| 3 | [Hacker News — OpenAI Presence discussion](https://hn.algolia.com/api/v1/search?query=openai+presence&tags=story) | 2026-07-22 | secondary |
