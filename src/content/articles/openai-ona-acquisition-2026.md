---
title: "OpenAI to Acquire Ona: Cloud Runtime for Codex Agents"
description: "On June 11, 2026, OpenAI announces the acquisition of Ona (formerly Gitpod), a cloud-development-environments platform that already runs secure, customer-controlled execution for 2 million developers. The deal gives Codex — used by 5 million people per week, up 400% year-to-date — a persistent runtime for long-running agents inside the customer's cloud. Until close, both companies remain independent; deal terms, closing date, and headcount were not disclosed."
pubDate: 2026-06-16
author: "AI Newsroom"
tags: ["openai", "ona", "codex", "acquisition", "m-and-a", "cloud-development-environments", "gitpod", "background-agents", "enterprise-ai", "agentic-coding"]
image: "https://images.ctfassets.net/kftzwdyauwt9/3vpY0M1x6mrbhiFVcfTF4Y/99dae42f0ed1030d045f56249385ac3a/OAI-Ona-SEO.png?w=1600&h=900&fit=fill"
imageAlt: "OpenAI Ona acquisition announcement card"
imageCredit: "Image: OpenAI / Ona acquisition announcement (June 11, 2026)"
sources:
  - title: "OpenAI — 'OpenAI to acquire Ona' (Company, June 11, 2026)"
    url: "https://openai.com/index/openai-to-acquire-ona/"
    date: 2026-06-11
    type: primary
  - title: "Ona — 'Ona is joining OpenAI' (Johannes Landgraf, CEO, June 11, 2026)"
    url: "https://ona.com/stories/ona-joins-openai"
    date: 2026-06-11
    type: primary
  - title: "OpenAI — Codex product page"
    url: "https://openai.com/codex/"
    date: 2026-06-11
    type: primary
  - title: "Ona — 'A cloud computer for every developer and coding agent' (Environments case study)"
    url: "https://ona.com/cases/ona-environments"
    date: 2026-06-11
    type: primary
  - title: "Ona — About / Leadership team (Johannes Landgraf, CEO & Co-Founder; Christian Weichel, CTO & Co-Founder)"
    url: "https://ona.com/about"
    date: 2026-06-11
    type: secondary
highRiskClaims: true
---

On **June 11, 2026**, OpenAI announced the acquisition of **Ona** — the cloud-development-environments platform formerly known as Gitpod — to give **Codex** a persistent, customer-controlled runtime for long-running agents. Codex, OpenAI's coding agent, is now used by **more than 5 million people each week**, up **400%** since the start of the year, and the bet is that the next phase of agentic work — sessions that unfold over hours or days, not minutes — needs a *trusted workspace*, not just a better model. Ona, which says it has served **2 million developers** in secure, reproducible cloud environments, is the team OpenAI has picked to build that workspace ([OpenAI, June 11, 2026](https://openai.com/index/openai-to-acquire-ona/); [Ona, June 11, 2026](https://ona.com/stories/ona-joins-openai)).

The deal is signed but not closed. **Both companies remain separate and independent** until customary closing conditions are met — including required regulatory approvals. **On close**, the Ona team will join OpenAI's Codex org; until then, Ona continues to support existing customers under its current commitments. **No deal terms, closing date, employee headcount, or specific regulatory bodies were disclosed** in either announcement ([OpenAI, June 11, 2026](https://openai.com/index/openai-to-acquire-ona/); [Ona, June 11, 2026](https://ona.com/stories/ona-joins-openai)).

## What was announced

**The headline.** OpenAI's June 11 post is short and direct: "Today we're announcing that OpenAI will acquire Ona, bringing its secure cloud execution and orchestration technology into our rapidly expanding Codex ecosystem" ([OpenAI, June 11, 2026](https://openai.com/index/openai-to-acquire-ona/)). The same day, Ona CEO **Johannes Landgraf** published a letter titled *"Ona is joining OpenAI — Our life's work just got bigger"*, framed not as an exit but as an expansion: *"Today, we are announcing that Ona has entered into an agreement to join OpenAI as part of the Codex team"* ([Ona, June 11, 2026](https://ona.com/stories/ona-joins-openai)).

**The strategic rationale — OpenAI's framing.** OpenAI positions the deal as the next step in Codex's evolution from a developer tool to a long-running agent platform:

> "More than 5 million people use Codex each week to research, analyze, build, and automate their work — up 400% from earlier this year. Codex began as a tool for software developers and now helps a wider range of people do complex work from an initial request through to a finished result. As Codex becomes more capable, its most valuable work is unfolding over hours or days, rather than minutes."
>
> "Ona will help us do that. Its technology provides secure, persistent environments where agents can access the tools, systems, and context they need to make progress over time. By bringing Ona to OpenAI, we will expand Codex beyond work tied to a single device or active session and help more organizations deploy agents securely in production."
>
> — [OpenAI, June 11, 2026](https://openai.com/index/openai-to-acquire-ona/)

**The strategic rationale — Ona's framing.** Landgraf's letter gives the customer side of the same argument and discloses an Ona growth number not in the OpenAI post: *"Since the beginning of the year, weekly Ona agent sessions have grown 13x in production across some of the world's most demanding institutions: the oldest bank in the US, one of Europe's largest pharma companies, one of Asia's largest sovereign wealth funds and many others"* ([Ona, June 11, 2026](https://ona.com/stories/ona-joins-openai)). Landgraf names **Sam, Tibo** (Thibault Sottiaux) and the Codex team as the conversation partners who changed his mind. The combined pitch, in his words: *"Ona brings the building blocks agents need for enterprise work: trusted, customer-controlled cloud environments where work continues across devices, inside the systems where software actually lives. OpenAI brings frontier intelligence, product polish, and a scale of research and distribution we could never reach alone."*

## What Ona is — and isn't

**Ona is the rebrand of Gitpod.** The platform's authentication still routes to `app.gitpod.io`, its GitHub organization is `gitpod-io`, and the same product line that ran cloud development environments for years is now positioned for *background agents* — autonomous AI engineers that run in the cloud, return pull requests, and operate continuously ([Ona, environments case study](https://ona.com/cases/ona-environments)). Ona's own materials describe the architecture as **Pattern 1 — full dev environment**, not "sandbox as a tool": *"The agent gets a full development environment, a VM running a dev container with your codebase, test suite, databases, and network access. This is how Stripe and Ramp run their agents. It's the closest to how a human developer works"* ([Ona, environments case study](https://ona.com/cases/ona-environments)). Each session runs in a fresh, ephemeral environment that's destroyed after use; credentials are scoped; activity is logged; **agents run inside the customer's own VPC** ([Ona, environments case study](https://ona.com/cases/ona-environments)).

**The customer footprint.** Ona lists Bank of New York (BNY, "Since 2025"), GSR ("Since 2024"), Vanta ("Since 2026"), Pearson ("Since 2024"), EquipmentShare ("Since 2023"), and Hargreaves Lansdown ("Since 2024") as customers visible on its home page, with quoted productivity metrics like "4× productivity increase" and "83% of PRs co-authored by Ona" and "400+ Python repos modernized in 6 months" ([Ona, home](https://ona.com/)). The case study calls out *4 million developers* reached cumulatively across the company's history and 400% productivity gains attributed to Ona Automations in customer environments.

**Leadership.** **Johannes Landgraf** (CEO & Co-Founder) and **Christian Weichel** (CTO & Co-Founder) are the public co-founders. The leadership page also lists **Philipp Pietsch** (COO), **Matt Boyle** (Product), **Eva Hyder** (People), **Austin Prasad** (Revenue), and **Kai Klasen** (Finance) ([Ona, About](https://ona.com/about)). Landgraf's letter frames the team as the binding agent: *"I love building and winning with you and the prize is larger now."*

**Ona is not a model.** It is execution and orchestration infrastructure — VMs, dev containers, automation triggers, audit trails, customer-controlled network boundaries. The OpenAI post is explicit that *"Ona's customer-controlled execution model will allow agents to operate inside an organization's own cloud environment while OpenAI provides the intelligence and orchestration that power the experience"* ([OpenAI, June 11, 2026](https://openai.com/index/openai-to-acquire-ona/)). That phrasing is a deliberate carve-out: OpenAI owns the model and the user-facing agent; Ona owns the *substrate* the agent runs on.

## What Codex looks like today

The OpenAI Codex product page, current at the time of the announcement, describes Codex as *"A coding agent that helps you build and ship with AI — powered by ChatGPT"*, available on macOS and Windows. The product page highlights four explicit capabilities that map cleanly onto the Ona acquisition: (1) **multi-agent workflows** with built-in worktrees and cloud environments, (2) **always-on background work** via "Automations" that pick up triage, alert monitoring, CI/CD, (3) **customer standards alignment** via Skills (code understanding, prototyping, documentation), and (4) **code review and high-signal PR review** ([OpenAI, Codex](https://openai.com/codex/)). Testimonials from Wonderful, Harvey, Sierra, Ramp, Duolingo, and Cisco Meraki accompany the page. *None* of the four capabilities is fully realized without a persistent execution environment — which is exactly what Ona has been building since the Gitpod era.

## The quotes

Both companies put executive statements on the record on June 11, 2026. They are short, on-topic, and worth quoting in full because they signal what each side thinks it's buying.

**Johannes Landgraf, Co-Founder and CEO, Ona:**

> "Agents need more than intelligence; they need a trusted workspace. We built Ona to give agents cloud environments with the context, control and collaboration enterprises require. Joining OpenAI lets us bring that foundation into Codex, helping organizations deploy agents with confidence and giving humans more agency over their work."
>
> — [OpenAI, June 11, 2026](https://openai.com/index/openai-to-acquire-ona/)

**Thibault Sottiaux, Core Products Lead, OpenAI:**

> "Enterprises want powerful agents that can do real work while meeting the security and control requirements of their environments. Ona will help us make Codex easier to deploy securely across production workflows for customers operating at the highest standards of trust and scale."
>
> — [OpenAI, June 11, 2026](https://openai.com/index/openai-to-acquire-ona/)

Landgraf's letter adds an unstated but important corollary: *"For our customers, the work we have been doing will now compound with OpenAI's ambition."* The subtext is a continuity commitment — Ona customers aren't being sold a new product, they're being told the platform they already trust will now sit under a much larger product surface.

## What changes for users

**For developers and teams using Codex today.** Practically nothing on day one. The OpenAI post is explicit: *"Until closing, OpenAI and Ona will remain separate and independent companies."* Ona continues to support customers, the Gitpod-origin sign-in flow remains in place, and the existing product line (Background Agents, Automations, Environments, Guardrails) continues to ship. After close, the Ona team joins the Codex org and the long-term product direction tilts toward Codex-native execution, but no integration timelines or migration paths have been announced in either post ([OpenAI, June 11, 2026](https://openai.com/index/openai-to-acquire-ona/); [Ona, June 11, 2026](https://ona.com/stories/ona-joins-openai)).

**For enterprises evaluating Codex as a production agent platform.** The structural question changes. Until now, *"Can I run Codex in our cloud, on our VPC, with our audit trail and our credentials?"* was a question that needed answering with workarounds. The Ona deal reframes it: OpenAI is buying — not renting, not partnering, *buying* — a platform whose entire value proposition is exactly that. Sottiaux's quote names the outcome: *"Ona will help us make Codex easier to deploy securely across production workflows for customers operating at the highest standards of trust and scale."* For procurement, security, and platform teams who have been holding Codex at arm's length, this is a signal worth tracking through the close.

**For Ona customers (BNY, GSR, Vanta, Pearson, EquipmentShare, Hargreaves Lansdown, and others).** Continuity is the message. Landgraf's letter is unambiguous: *"Until close, OpenAI and Ona will remain separate and independent companies, and we will continue supporting customers under our existing commitments."* No immediate product rebranding, no immediate price changes, no immediate migration. The fact that the Ona team will join the Codex org *after close* is a structural fact, not a near-term product fact.

**For the competitive landscape.** Cloud development environments have a small set of incumbents (GitHub Codespaces, Gitpod/Ona, Google Cloud Shell Editor, Coder, and a long tail of internal enterprise tools). With this deal, **the most credible independent CDE-and-agents platform exits the market as a standalone**, and the Codex side of OpenAI's developer stack gets a substrate that Cursor, Windsurf, Claude Code, and Devin don't have at the same depth. The strategic question for the next 12 months is whether the "Codex runtime" becomes a productized layer that other agents can run on, or whether it stays internal to Codex.

## What wasn't disclosed

In the spirit of source rigor: here is the list of things the two announcements *do not* say, and that an investor, customer, or reporter will reasonably want to know.

- **Deal value.** No price, no equity/cash mix, no earn-out language. The OpenAI post is silent on the headline number. *At the time of publication, no financial terms for the OpenAI–Ona transaction have been disclosed.*
- **Closing date or expected close window.** "Customary closing conditions, including receipt of required regulatory approvals" is the entire timeline language in both posts ([OpenAI, June 11, 2026](https://openai.com/index/openai-to-acquire-ona/); [Ona, June 11, 2026](https://ona.com/stories/ona-joins-openai)).
- **Specific regulatory bodies or jurisdictions.** No FTC, no CMA, no DG COMP, no SAMR mention. *At the time of publication, no specific competition authorities have been named as reviewing the deal.*
- **Headcount or which Ona roles transfer.** Both companies say "the Ona team will join OpenAI" but do not break out how many people, which functions, or whether every role is in scope. The Ona leadership page (Landgraf, Weichel, Pietsch, Boyle, Hyder, Prasad, Klasen) is the public roster as of the announcement; whether each of those leaders remains in their role post-close is not stated ([Ona, About](https://ona.com/about)).
- **Product roadmap for the combined entity.** No statement about which Ona products (Background Agents, Automations, Environments, Guardrails) continue, end, or merge into Codex; no statement about whether the Gitpod sign-in (`app.gitpod.io`) survives; no statement about pricing for the integrated offering.
- **Customer migration or pricing changes.** No statement about existing Ona customer contracts. The repeated phrase is *"continue supporting customers under our existing commitments"* — a continuity commitment, not a roadmap.
- **Cross-product availability.** No statement about whether Ona's Pattern-1 architecture (full dev environment per agent) becomes a Codex default, an option, or stays Ona-specific.

## Risks and caveats

- **M&A category: high-risk claims.** Acquisitions are notoriously prone to leak inflation, valuation speculation, and unverified "people familiar with the matter" reporting. The article sticks to *what was published on the record* on June 11, 2026, by OpenAI and Ona. *No deal value, headcount, or closing date is reported as fact in this article because none was disclosed in the primary sources.* When financial press or company filings publish terms, the article will be updated.
- **"13x" growth in Ona agent sessions.** This number is a vendor claim from Landgraf's letter, not an independently audited figure. It is consistent with the visible customer roster (BNY, GSR, Vanta, Pearson, EquipmentShare, Hargreaves Lansdown) and the 4× productivity gains Ona publishes in case studies, but the underlying methodology is not disclosed. Treat as a directional signal, not a measured benchmark.
- **"5 million people use Codex each week" and "up 400% from earlier this year."** These are OpenAI's own disclosures, framed in the acquisition post. OpenAI defines "use Codex" broadly (Codex app, CLI, IDE plugin, API). The 400% growth comparison is year-to-date against an early-2026 baseline; it is a *self-reported* growth metric. *At the time of publication, no third-party measurement of Codex weekly active users exists in the public sources cited.*
- **"Customer-controlled cloud" and "inside your VPC."** Ona's marketing language is precise about the architecture (Pattern 1, ephemeral environments, scoped credentials, audit logs), but the announcement does not enumerate which OpenAI/Codex components are *also* in-customer-VPC after the deal closes, vs. which remain in OpenAI-managed infrastructure. For enterprises, the *post-close* topology is the question that matters; both companies declined to specify it on June 11, 2026.
- **Regulatory review is unspecified.** Acquisitions of AI infrastructure companies have drawn attention from US, UK, and EU competition authorities in the last 24 months. The "customary closing conditions" language is standard and does not pre-commit to a particular review path. If a substantive review opens, the closing timeline will slip and the integration plans will change. The article does not speculate on outcomes.
- **Ona is Gitpod in product lineage.** The product still signs in at `app.gitpod.io`, the GitHub organization is `gitpod-io`, and the security / governance primitives (kernel-level controls, audit logs, scoped credentials) are Gitpod-originated. For buyers, the team's history is a feature (years of CDE deployment, named enterprise customers), not a flaw, but it is worth being explicit about because the "Ona" name is younger than the product.
- **Continuity is a promise, not a contract.** Until the deal closes, Ona is a standalone company. Pricing, terms, and product roadmap remain Ona's. After close, the contracts, SLAs, and roadmap will be Codex's. *For customers evaluating multi-year commitments, the safe reading is: do not sign new long-term Ona contracts that extend significantly past the expected close window without a re-up clause tied to the OpenAI relationship.*
- **"Background agents" is a contested category.** Ona, Devin, Claude Code, GitHub Copilot agents, Codex, Factory, and a long tail of vendors are all competing for the same language. The acquisition is a strong signal that OpenAI is treating background agents as a first-class product surface, but it is not, on its own, a market consolidation event — the category is still early and the boundaries are still being drawn.

## What to watch

1. **The close date and any conditions imposed by competition authorities.** The earliest signal of friction will be a public comment period, an HSR filing, or a Competition and Markets Authority (UK) Phase 1 notice. Watch the FTC, DOJ Antitrust, CMA, and DG COMP dockets in the 30-90 days post-announcement.
2. **Ona pricing and product roadmap statements.** The first Ona product update after June 11, 2026 will reveal whether the standalone product is being wound down, frozen, or accelerated. The Ona changelog and the next Ona Stories blog post are the canary.
3. **Codex product changes that explicitly invoke Ona.** A Codex release note that names Ona as the runtime — "Codex now runs in your VPC via the Ona runtime", or similar — is the integration signal. Until that, the deal is structural, not productized.
4. **Independent third-party benchmarks on Codex background-agent throughput and quality.** Aider benchmarks, SWE-bench Verified runs, Stanford CRFM evaluations, and the Vellum AI leaderboard will surface once Ona-powered Codex sessions become observable in the wild. The first public run on a *customer-controlled* Codex deployment is the integration event.
5. **Customer roster changes.** If a named Ona customer (BNY, GSR, Vanta, Pearson, EquipmentShare, Hargreaves Lansdown) publishes a case study that explicitly references Codex, the integration is real. Until then, the two brands remain separate in customer-facing material.
6. **Talent retention at Ona.** Landgraf and Weichel are the public co-founders. Whether both stay in their roles after close, and whether the broader Ona leadership team (Pietsch, Boyle, Hyder, Prasad, Klasen) signs on, is the second-order integration risk.
7. **Ona's Pattern 1 architecture as a market signal.** If OpenAI publishes an architecture whitepaper or developer documentation describing the Ona runtime as a reference for "agent in customer cloud", it becomes a de facto pattern for the industry. Cursor, Claude Code, and Devin will be measured against it.

## Verdict

On June 11, 2026, OpenAI announced the acquisition of Ona — the cloud-development-environments platform formerly known as Gitpod, used by 2 million developers and a roster of named enterprise customers (BNY, GSR, Vanta, Pearson, EquipmentShare, Hargreaves Lansdown) — to give **Codex** (5 million weekly users, up 400% year-to-date) a *trusted, customer-controlled runtime* for agents that run for hours or days, not minutes. **The deal is signed but not closed**; both companies remain independent until regulatory approvals land. **No deal value, closing date, or headcount was disclosed** in either announcement, and the article respects that gap. Strategically, the move reframes Codex from a coding assistant into a long-running, in-customer-VPC agent platform — and it makes Ona's *"Pattern 1: full dev environment, not sandbox as a tool"* architecture the substrate for OpenAI's agentic-coding surface. The customer message from both sides is *continuity*: existing Ona customers keep their contracts, existing Codex customers see no immediate change, and the integration work happens in the open between now and close. The next signal worth tracking is a Codex product update that explicitly invokes the Ona runtime, and any public regulatory review that lengthens the closing timeline.
