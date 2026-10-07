---
title: "Anthropic folds Project Glasswing into a three-tier Cyber Verification Program"
description: "Anthropic merges Project Glasswing and its Cyber Verification Program into Defense, Red Team, and Specialized access tiers for Opus 5.5, Sonnet 5.5, and Mythos 5.1."
pubDate: 2026-10-09
author: "AI Newsroom"
tags:
  - anthropic
  - project-glasswing
  - ai-safety
  - dual-use
  - security
  - red-teaming
  - model-safeguards
  - enterprise-frontier-safeguards
  - high-risk-claims
image: "/images/articles/anthropic-cyber-verification-program-three-tiers-oct-2026/hero.png"
imageAlt: "Screenshot of Anthropic's CyScenarioBench results figure from its Cyber Verification Program announcement: a chart above Anthropic's caption stating that safeguards blocked 46 of 50 tasks on Claude Opus 5.5 in the Defense Access tier, while the Red Team Access tier blocked none and completed 34 of 50."
imageCredit: "Source: https://www.anthropic.com/news/cyber-verification-program · Capture date: 2026-10-07 (Europe/Rome) via Playwright Chromium · Credit: Anthropic · License: no license stated on page"
canonicalURL: "https://news.lesbass.com/articles/anthropic-cyber-verification-program-three-tiers-oct-2026/"
sources:
  - title: "Anthropic — Expanding the Cyber Verification Program (announcement, 2026-10-06)"
    url: "https://www.anthropic.com/news/cyber-verification-program"
    date: 2026-10-06
    type: primary
  - title: "Anthropic — Developing Enterprise Frontier Safeguards with our customers (2026-09-01)"
    url: "https://www.anthropic.com/news/enterprise-frontier-safeguards"
    date: 2026-09-01
    type: primary
  - title: "Anthropic — Project Glasswing (launch 2026-04-07; updated 2026-10-06)"
    url: "https://www.anthropic.com/glasswing"
    date: 2026-04-07
    type: primary
  - title: "Claude — How Comcast and Booz Allen use Claude Mythos to secure their codebases (2026-10-06)"
    url: "https://claude.com/blog/how-comcast-booz-allen-use-claude-mythos-to-secure-their-codebases"
    date: 2026-10-06
    type: primary
  - title: "Claude Help Center — Cyber Verification Program (updated October 2026)"
    url: "https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude-opus-and-sonnet"
    type: primary
  - title: "The Register — Anthropic reconfigures its cool kids security program (2026-10-07)"
    url: "https://www.theregister.com/security/2026/10/07/anthropic-reconfigures-its-cool-kids-security-program/5301509"
    date: 2026-10-07
    type: secondary
  - title: "The Hindu / Reuters — Anthropic opens its most powerful AI models to more security teams (2026-10-07)"
    url: "https://www.thehindu.com/sci-tech/technology/anthropic-opens-its-most-powerful-ai-models-to-more-security-teams/article71554169.ece"
    date: 2026-10-07
    type: secondary
highRiskClaims: true
---

Anthropic has merged Project Glasswing and its original Cyber Verification Program into one expanded Cyber Verification Program (CVP) split into three access tiers: Defense Access, Red Team Access, and Specialized Access ([announcement, 2026-10-06](https://www.anthropic.com/news/cyber-verification-program)). Each tier unlocks progressively less-restricted cyber work on Claude Opus 5.5, Sonnet 5.5, and Mythos 5.1. In Anthropic's own CyScenarioBench test, Defense Access blocked 46 of 50 tasks while Red Team Access blocked none and completed 34 of 50 — effectively matching the no-safeguard baseline.

## What happened

For the past six months, Anthropic ran two trusted-access programs: Project Glasswing, which gave selected organizations access to the cyber-focused Claude Mythos, and the original CVP, which gave vetted teams reduced safeguards on Opus and Sonnet ([Glasswing](https://www.anthropic.com/glasswing)). The new program integrates both, with tiers defined by the work an organization does rather than by verification alone.

| Tier | Eligible organizations | Added capability | Classifier behavior |
|---|---|---|---|
| Defense Access | Security teams at companies, nonprofits, universities and government bodies defending systems they own; critical-infrastructure operators; smaller security firms; open-source maintainers; individual researchers with a track record | SOC and incident response, malware reverse engineering, vulnerability analysis and validation | Conservative; heavy blocking on offensive tasks |
| Red Team Access | In-house and government red teams, and security or penetration-testing firms (organizations only) | Authorized penetration testing and red-teaming against systems the org may test | Real-time blocks retained for actions that could cause physical harm or mass disruption |
| Specialized Access | A limited set of verified organizations authorized to test safety-critical systems | Fewest cyber blocks; Anthropic's examples include flight operating systems, power grids, telecom networks and interbank transfer infrastructure | Every organization reviewed in depth with the US government; existing Glasswing members transition automatically for current models |

Two operational details carry over. CVP requires data retention so Anthropic can monitor for misuse; once Enterprise Frontier Safeguards (EFS) ships "later this fall," eligible organizations will be able to store that data in cloud infrastructure they control ([EFS, 2026-09-01](https://www.anthropic.com/news/enterprise-frontier-safeguards)). Existing CVP members keep their settings for previous models and are evaluated automatically for the new ones.

## Why it matters

The three-tier structure is Anthropic's most explicit attempt to answer a dual-use problem: the same model behavior that finds a vulnerability can also exploit it. Rather than treat "verified security professional" as one gate, Anthropic now ties classifier strictness to a task profile, and publishes tier-by-tier classifier behavior alongside an efficacy benchmark.

Anthropic's self-reported impact numbers are the other half of the pitch:

- Partners uncovered **at least 129,000 verified software vulnerabilities** between April and July 2026.
- Anthropic's own open-source scanning found an **additional 5,500** between April and October.
- More than **33,000** of the verified vulnerabilities have been rated critical or high severity.

Anthropic also published two applied examples. Comcast used Mythos Preview to find a critical authentication vulnerability in a public-facing platform while assessing 258 business-critical systems and roughly 170 million lines of code; it was fixed before any evidence of exploitation. Booz Allen said one analyst reviewed eight production systems across 138 repositories in twelve days ([Comcast/Booz Allen, 2026-10-06](https://claude.com/blog/how-comcast-booz-allen-use-claude-mythos-to-secure-their-codebases)).

## Practical implications

CVP spans the Claude Platform, Google Cloud's Vertex AI, and Microsoft Foundry. It reaches Amazon Bedrock only for EFS-eligible customers, because Bedrock does not yet support the human review of automated safety flags that CVP requires by default ([Help Center](https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude-opus-and-sonnet)). For teams evaluating access:

- **One application, highest tier wins.** Anthropic says a single application places an organization at the highest tier it qualifies for; admins then assign the grant to specific workspaces.
- **Individuals are limited to Defense Access.** Red Team and Specialized tiers are organizations only.
- **Review times differ.** Anthropic aims to respond to Defense Access applications "within a few days," while Red Team Access takes "a few weeks"; qualifying organizations are enrolled in Defense Access while the Red Team review runs.
- **Security controls tighten.** Defense Access has until December 15, 2026 to adopt phishing-resistant multi-factor authentication and stop using API keys. Until then, MFA is required and API keys expire every seven days; Anthropic recommends migrating to Workload Identity Federation.
- **Zero-data-retention option is narrow.** Organizations that already have ZDR access to Fable 5.1 or Mythos 5.1 can use CVP with ZDR until EFS is available.

## Risks and caveats

Every impact figure and CyScenarioBench result in this article is **Anthropic's own reporting**, not independent audit.

- **The "5×" line is an estimate.** Anthropic says the true impact is "at least five times higher," derived from partial survey data covering 33 partner reports. Fewer than 50% of partners disclosed patched numbers, so the patch rate is significantly undercounted.
- **CyScenarioBench is first-party and narrow.** It ran Claude Opus 5.5 across five attempts at each of 10 challenges per tier — 50 trials per tier — and no independent reproduction was located.
- **"New models moving forward" is a forward statement**, not a contractual commitment.
- **The Specialized Access categories are Anthropic's own** classification of which systems count as safety-critical.
- **Access depends on judgment calls**, including the applicant's environment and who the work is ultimately for; Anthropic says it is more cautious where customers primarily serve military, intelligence, or law enforcement.
- **Vulnerability counts are not risk.** The Register's independent coverage noted that an outside researcher tracking Anthropic-linked CVEs found few being exploited in the wild ([The Register, 2026-10-07](https://www.theregister.com/security/2026/10/07/anthropic-reconfigures-its-cool-kids-security-program/5301509)).

## What to watch

- **EFS general availability**, which converts the data-retention requirement into customer-controlled storage and is the hinge for Bedrock access.
- **The gap between CVP's "few days" response and the Help Center's "seven business days" review window** — a signal of real staffing capacity.
- **An independent reproduction of CyScenarioBench**, the cleanest test of whether the tier classifiers behave as advertised.
- **Whether tier boundaries hold as new models ship**, since every tier promises access to "new models moving forward."
- **Any misuse incident traceable to expanded access**, which would test the monitoring data retention enables.

## Sources

| # | Publisher | Title | Date | URL |
|---|---|---|---|---|
| 1 | Anthropic | Expanding the Cyber Verification Program | 2026-10-06 | https://www.anthropic.com/news/cyber-verification-program |
| 2 | Anthropic | Developing Enterprise Frontier Safeguards with our customers | 2026-09-01 | https://www.anthropic.com/news/enterprise-frontier-safeguards |
| 3 | Anthropic | Project Glasswing (launch; updated 2026-10-06) | 2026-04-07 | https://www.anthropic.com/glasswing |
| 4 | Claude | How Comcast and Booz Allen use Claude Mythos to secure their codebases | 2026-10-06 | https://claude.com/blog/how-comcast-booz-allen-use-claude-mythos-to-secure-their-codebases |
| 5 | Claude Help Center | Cyber Verification Program | updated 2026-10 | https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude-opus-and-sonnet |
| 6 | The Register (secondary) | Anthropic reconfigures its cool kids security program | 2026-10-07 | https://www.theregister.com/security/2026/10/07/anthropic-reconfigures-its-cool-kids-security-program/5301509 |
| 7 | The Hindu / Reuters (secondary) | Anthropic opens its most powerful AI models to more security teams | 2026-10-07 | https://www.thehindu.com/sci-tech/technology/anthropic-opens-its-most-powerful-ai-models-to-more-security-teams/article71554169.ece |
