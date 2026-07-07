---
title: "Alberta scanned 466M lines of government code with Claude in 20 hours"
description: "Alberta's Ministry of Technology and Innovation scanned 466M lines of government code in 20 hours with Claude Code and ~50 agents — here is the playbook other provinces can copy."
pubDate: 2026-07-07
author: "AI Newsroom"
tags: ["anthropic", "claude-code", "claude-opus", "claude-sonnet", "agent-sdk", "government", "alberta", "cybersecurity", "vulnerability-scanning", "code-modernization", "case-study", "applied-ai", "public-sector"]
image: "/images/articles/alberta-claude-466m-lines-government-code-2026/hero-desktop.png"
imageAlt: "Screenshot of the Anthropic case study 'Government of Alberta uses Claude to find and fix cybersecurity vulnerabilities across government systems' (anthropic.com, dated Jul 6, 2026), showing the headline, the case-study label, and the laptop illustration on a blue field."
imageCredit: "Source: https://www.anthropic.com/news/alberta-government-claude-cybersecurity · Captured: 2026-07-07 via Playwright Chromium (headless, 1280x900 viewport) · Use: editorial illustration of the published case-study landing page; the same article body is the source for every hard number cited in this piece."
sources:
  - title: "Anthropic — \"Government of Alberta uses Claude to find and fix cybersecurity vulnerabilities across government systems\" (case study, dated 2026-07-06)"
    url: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity"
    date: 2026-07-06
    type: primary
  - title: "The Velocity White Papers — Government of Alberta technical white papers (collection page)"
    url: "https://thevelocitywhitepapers.com/"
    type: secondary
  - title: "The Velocity Symposium — Alberta industry day, Edmonton, July 2026 (Luma event page)"
    url: "https://luma.com/yzd00tir"
    type: secondary
  - title: "Anthropic — Claude Agent SDK overview (developer documentation)"
    url: "https://code.claude.com/docs/en/agent-sdk/overview"
    type: secondary
highRiskClaims: false
---

On **2026-07-06**, Anthropic published a case study showing that the **Government of Alberta** used **Claude Code** with Opus and Sonnet to scan **466 million lines of government code in 20 hours**, find vulnerabilities, generate patches, and run continuous security review across all **27 provincial ministries** ([Anthropic, 2026-07-06](https://www.anthropic.com/news/alberta-government-claude-cybersecurity)). Alberta's Ministry of Technology and Innovation is now publishing technical white papers and hosting an industry day in Edmonton so other governments can adapt the same playbook.

## What happened

Alberta's Ministry of Technology and Innovation maintains the systems of all 27 ministries — from social services to public safety to wildfire response — covering roughly **1,280 applications and 3,400 code repositories**. Most of it had never been through a systematic security review. In 2025, the Ministry set up an internal team to fix that, working with Claude.

The headline result: a team of about **50 Claude agents** ran autonomously and in parallel across the codebases, using Claude Code with Opus and Sonnet. Each agent scanned for security vulnerabilities, infrastructure weaknesses, and documentation gaps. Claude Code ran a two-stage routine: a **rules engine** first flagged known patterns, then Claude reviewed those flags and **cited the exact file and line** for each finding so a developer could verify it. The scan covered every repository Alberta owns and surfaced issues traditional automated scanners had missed.

The scan took **20 hours**. The team estimates a traditional review of the same surface would have taken **about 6.5 years** ([Anthropic, 2026-07-06](https://www.anthropic.com/news/alberta-government-claude-cybersecurity)).

## How the pipeline works

The daily loop is small and explicit. A **red team** agent probes an application the way an external attacker would, mapping how a vulnerability might be exploited. A **blue team** agent scores defenses against an international security standard and writes a remediation plan that points to specific files.

**Content and quality agents** check code quality and the clarity of public-facing writing. Every application is checked against roughly **95 security controls per pass**, and every agent is built on the [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview).

| Agent | What it does | Output |
|---|---|---|
| Rules engine | Flags known vulnerability patterns across all repos | Candidate findings |
| Claude Code reviewer (Opus + Sonnet) | Reviews each flag, cites file and line | Verified findings with citations |
| Red team | Simulates an external attacker | Exploitation map |
| Blue team | Scores against an international security standard | Remediation plan with file pointers |
| Content / quality | Checks code quality and public-facing copy | Style and clarity fixes |

Where a finding was patchable, Claude Code generated the fix, wrote tests, and built it. Where a system lacked tests, Claude wrote the tests first. Where the code was too outdated to patch in place, Claude rebuilt it — a 25-year-old Java subsidy portal that originally took **five months** of hand-coding was rebuilt in **four to five days** ([Anthropic, 2026-07-06](https://www.anthropic.com/news/alberta-government-claude-cybersecurity)). Every patch was reviewed and approved by a Ministry engineer before it shipped.

## Why it matters

This is a published, dated, government-scale example of AI-assisted security work — not a vendor benchmark slide. The 6.5-years-versus-20-hours comparison is the Alberta team's own estimate of the manual alternative, not a productivity claim to extrapolate to other codebases or other governments.

It is also a playbook. Alberta has published a [collection of technical white papers](https://thevelocitywhitepapers.com/) and is hosting [an industry day in Edmonton in July 2026](https://luma.com/yzd00tir). The narrative is force multiplier for under-resourced security teams, not "AI replaces humans." A human developer still approves every patch.

## What changed for practitioners

- **Two-stage scan-and-fix as a default pattern.** Rules engine first, LLM review with file-and-line citations second. The citations keep a human in the loop without re-reading every flagged line.
- **A small fleet of specialized agents beats one mega-agent.** About 50 agents, each with a narrow role (red, blue, content, quality), running in parallel.
- **The Claude Agent SDK is the building block.** Custom review agents are not bespoke infrastructure; they are SDK calls wrapped with prompts and tooling.
- **Modernization economics shift.** A 25-year-old subsidy portal in four to five days vs. the original five months. One ministry's 185 legacy applications are slated to consolidate into **16 reusable modern applications** ([Anthropic, 2026-07-06](https://www.anthropic.com/news/alberta-government-claude-cybersecurity)).
- **Capacity-building alongside tooling.** The Alberta AI Academy has trained thousands of government employees and more than 10,000 members of the public on effective AI use.

## Risks and caveats

- **One government's experience, not a market-wide benchmark.** Alberta is a flagship reference; Anthropic published the case study, so there is inherent selection bias.
- **The 6.5-year figure is the Alberta team's estimate**, not a vendor benchmark. Do not present it as a productivity claim for other agencies.
- **The 95-control pass is a coarse aggregate.** It counts controls checked, not per-control effectiveness or false-positive rates.
- **The Glubish quote is one voice.** *"By using AI to find and fix vulnerabilities across our systems, we accomplished in hours what would have taken a traditional approach years to complete"* ([Anthropic, 2026-07-06](https://www.anthropic.com/news/alberta-government-claude-cybersecurity)). A single minister's framing may not represent every ministry.
- **The white papers and industry day are the right next reading**, not a substitute for a published evaluation methodology. No third-party audit of the pipeline has been disclosed.

## What to watch

1. The [Velocity White Papers](https://thevelocitywhitepapers.com/) for technical depth on the agent designs and the scan routine.
2. The [Edmonton industry day in July 2026](https://luma.com/yzd00tir) for peer-government follow-through and shared lessons.
3. The planned consolidation of **185 legacy apps into 16 reusable modern applications** — the long-horizon signal on whether the modernization economics hold.
4. Other Canadian provinces, US states, or federal agencies publishing similar case studies.
5. Anthropic's roadmap for the [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) in security and government use cases.
6. Any post-mortem of the modernized Java subsidy portal — does the AI-assisted rewrite stay maintainable, or does it accumulate new technical debt?

## Sources

| # | Source | URL | Date | Used for |
|---|--------|-----|------|----------|
| 1 | Anthropic case study (Alberta / Claude cybersecurity) | https://www.anthropic.com/news/alberta-government-claude-cybersecurity | 2026-07-06 | All primary numbers, the 466M / 20 hours / 6.5 years estimate, the ~50 agents, the 1,280 apps / 3,400 repos, the 95-control pass, the Claude Agent SDK, the modernization examples, the Glubish quote. |
| 2 | The Velocity White Papers (Alberta) | https://thevelocitywhitepapers.com/ | collection page | Supporting depth for the practitioner-impact and what-to-watch sections. |
| 3 | The Velocity Symposium (Edmonton industry day) | https://luma.com/yzd00tir | Jul 2026 (event page) | Reference for the what-to-watch section. |
| 4 | Claude Agent SDK overview (Anthropic developer docs) | https://code.claude.com/docs/en/agent-sdk/overview | live docs | Brief technical reference for "what is the Claude Agent SDK." |
