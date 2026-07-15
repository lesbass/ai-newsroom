---
title: "Anthropic launches Claude for Teachers: free K-12 access with open-source skills"
description: "Anthropic launches Claude for Teachers \u2014 free, verified K-12 access to June 30 2027, 50-state standards, 9 K-12 tools, Apache-2.0 skills, AFT + Gates partners."
pubDate: 2026-07-15
author: "AI Newsroom"
tags: ["anthropic", "claude", "claude-for-teachers", "k-12", "education", "teachers", "american-federation-of-teachers", "gates-foundation", "learning-commons", "openscied", "illustrative-mathematics", "claude-cowork", "claude-code", "ai-fluency", "teach-for-america", "detroit-public-schools", "playlab"]
image: "https://www-cdn.anthropic.com/images/4zrzovbb/website/c39f489c0763bac41638f8ea29a0ae1335c3ecb2-1200x630.jpg"
imageAlt: "Claude for Teachers announcement header image showing a teacher at a whiteboard with a glowing 'C' emblem, books, and geometric shapes"
imageCredit: "Source: https://www.anthropic.com/news/claude-for-teachers · Announcement page header image (Jul 14, 2026) · Fair use editorial"
canonicalURL: "https://news.lesbass.com/articles/anthropic-claude-for-teachers-k12-launch/"
sources:
  - title: "Anthropic — Introducing Claude for Teachers"
    url: "https://www.anthropic.com/news/claude-for-teachers"
    date: 2026-07-14
    type: primary
  - title: "Claude for Teachers product page"
    url: "https://claude.com/solutions/teachers"
    date: 2026-07-14
    type: primary
  - title: "Open-source skills repo — anthropics/k12-teacher-skills"
    url: "https://github.com/anthropics/k12-teacher-skills"
    date: 2026-07-14
    type: primary
  - title: "AI Fluency for K-12 Teachers course"
    url: "https://anthropic.skilljar.com/path/ai-fluency-for-pk-12-educators"
    date: 2026-07-14
    type: primary
  - title: "Teacher Terms — K-12 Data Privacy"
    url: "https://support.claude.com/en/articles/15926041"
    date: 2026-07-14
    type: primary
  - title: "Claude for Teachers in Action (tutorial)"
    url: "https://claude.com/resources/tutorials/claude-for-teachers-in-action"
    date: 2026-07-14
    type: primary
  - title: "Anthropic — Gates Foundation partnership"
    url: "https://www.anthropic.com/news/gates-foundation-partnership"
    date: 2026-05-14
    type: primary
  - title: "Stanford SCALE — Evidence Base for AI in K-12 Education"
    url: "https://scale.stanford.edu/research-in-action/understanding-evidence-base-ai-k12-education"
    date: 2026-07-14
    type: secondary
  - title: "AFT — American Federation of Teachers"
    url: "https://www.aft.org/"
    date: 2026-07-14
    type: secondary
  - title: "FERPA — Family Educational Rights and Privacy Act"
    url: "https://studentprivacy.ed.gov/"
    date: 2026-07-14
    type: secondary
highRiskClaims: false
---

On **2026-07-14**, Anthropic launched [Claude for Teachers](https://claude.com/solutions/teachers), a free offering for verified US K-12 educators pairing premium Claude with curriculum-connected teaching skills, the Learning Commons knowledge graph (academic standards across all 50 states), nine named K-12 tool integrations, and Claude Code and Cowork ([Anthropic, 2026-07-14](https://www.anthropic.com/news/claude-for-teachers)). Signing up by June 30, 2027 grants a full year of free access. This is Anthropic's first dedicated K-12 product and the only major-lab K-12 launch this week — a bet on education as a vertical where privacy compliance (FERPA, state laws) and institutional credibility matter as much as the model.

## What teachers actually get

**Learning Commons.** Claude accesses academic standards across all 50 states, plus fine-grained learning competencies beneath each standard. Two evidence-based curricula are built in: [Illustrative Mathematics IM v.360](https://illustrativemathematics.org/) and [OpenSciEd](https://openscied.org/) ([Anthropic, 2026-07-14](https://www.anthropic.com/news/claude-for-teachers)).

**Two teaching skills.** Open-source, co-developed with Learning Commons, Apache-2.0:

- **Lesson planning:** Draft standards-aligned lesson plans grounded in curricular materials, with student-facing materials.
- **Differentiation:** Adapt a lesson into tiered versions (below/at/above proficiency) with personalized materials for each level.

**Claude Code and Cowork.** Teachers can schedule recurring tasks — daily exit-ticket review with plan adaptation at 4pm, weekly parent newsletters — or analyze class data to build a picture of where every student is ([Anthropic, 2026-07-14](https://www.anthropic.com/news/claude-for-teachers)).

**Nine launch integrations:**

| Partner | Function |
|---|---|
| [ASSISTments](https://www.assistments.org/) | Auto-scored, standards-aligned math problems |
| [Brisk Teaching](https://www.briskteaching.com/) | Interactive student activities and lessons |
| [Canva Education](https://www.canva.com/education/) | Classroom-ready designs |
| [Coteach](https://coteach.ai/) | K-12 math diagrams |
| [Diffit](https://web.diffit.me/) | Adapted instructional materials |
| [Eedi](https://www.eedi.com/) | Diagnostic questions (English and Spanish) |
| [MagicSchool](https://www.magicschool.ai/) | Classroom-ready instructional content |
| [Snorkl](https://snorkl.app/) | Class and assignment insights |
| [TeachFX](https://teachfx.com/) | Personalized instructional feedback from classroom talk |

**AI Fluency course.** A [free course](https://anthropic.skilljar.com/path/ai-fluency-for-pk-12-educators) co-created with **Teach for America** and a train-the-trainer module co-created with the **American Federation of Teachers**. Both are model-agnostic and Creative Commons-licensed ([Anthropic, 2026-07-14](https://www.anthropic.com/news/claude-for-teachers)).

## The open-source release

Anthropic open-sourced the [k12-teacher-skills](https://github.com/anthropics/k12-teacher-skills) repository under Apache-2.0. It contains two skills (`k12-lesson-planning` and `k12-lesson-differentiation`), an evaluation rubric framework in `evals/`, and a plugin that bundles teacher-focused third-party MCP servers. Notable: as of 2026-07-15, the repo has 1 commit on `main` — this is a launch-day release, not a mature codebase. The Learning Commons connector and partnership agreements are not open.

## Privacy, safety, and the 18+ posture

- **18+ only.** Consistent with Claude's age policy. Claude for Teachers is for educators, not students.
- **No model training.** Training on educator data is off by default. Student data is protected by a K-12 Data Processing Addendum written to FERPA ([Teacher Terms, 2026-07-14](https://support.claude.com/en/articles/15926041)).
- **AFT Gold Standard (in development).** Anthropic is working with the American Federation of Teachers on a privacy Gold Standard. Randi Weingarten, AFT President: *"We've been working with Anthropic on a Gold Standard that sets out industry best practices for safety and privacy in K-12 education."* This is an alignment commitment, not a completed certification.

## The pilots, the partners, the cutoff

- **Detroit Public Schools Community District.** Anthropic committed to a pilot studying impact on educator wellbeing and practice. The announcement describes intent, not results ([Anthropic, 2026-07-14](https://www.anthropic.com/news/claude-for-teachers)).
- **Gates Foundation.** The May 2026 [$200M partnership](https://www.anthropic.com/news/gates-foundation-partnership) covers education, global health, life sciences, and economic mobility — Claude for Teachers is the first visible education output.
- **Playlab.** Supporting a national network of lab schools implementing AI.
- **Cutoff.** Sign up by **June 30, 2027** for a full year of free access ([Claude for Teachers, 2026-07-14](https://claude.com/solutions/teachers)).

## Practical advice for builders and readers

- **Who qualifies.** Individual US K-12 educators only. Districts use [Claude for Nonprofits](https://claude.com/solutions/nonprofits) for now.
- **What to read first.** The [tutorial](https://claude.com/resources/tutorials/claude-for-teachers-in-action) and the [k12-teacher-skills README](https://github.com/anthropics/k12-teacher-skills).
- **What to verify.** Pedagogical quality claims are Anthropic's own. The AFT Gold Standard is in development.
- **What to skip.** The repo has 1 commit — a launch-day scaffold, not mature tooling.

## Why it matters

**This is Anthropic's first purpose-built education product.** Unlike general Claude access, it couples premium capabilities with domain-specific tooling — curriculum-aware lesson planning, differentiation scaffolds, and scheduled Cowork tasks that map to real teacher workflows.

**The privacy architecture is the differentiator.** No training on educator data by default, FERPA-aligned terms, and an AFT Gold Standard under development give this a privacy posture most consumer AI tools lack. For a skeptical K-12 buyer, the terms are the buying condition.

**The AFT and Gates partnerships buy institutional credibility.** Labor buy-in plus philanthropic backing reduces adoption risk for a district that has never deployed a frontier model.

## Risks and caveats

1. **US-only, individual educators only.** No timeline for district offering.
2. **All pedagogical quality claims are Anthropic's.** No independent evaluation published.
3. **Usage limits apply.** "Extra usage limits" — no specifics.
4. **AFT Gold Standard in development.** Not a completed certification.
5. **Detroit pilot results pending.** Intent to study, not results.
6. **No RCT evidence.** Unlike [DeepMind's Sierra Leone RCT](/articles/deepmind-sierra-leone-rct-gemini-guided-learning/) (Jun 10, 2026).

## What to watch

1. **District adoption.** First deployment beyond Detroit signals whether privacy terms clear procurement.
2. **International rollout.** Gates Foundation Global South programs could expand reach.
3. **Independent evaluation.** Third-party RCT would carry more weight than internal assessment.
4. **AFT Gold Standard.** A published privacy standard would unlock district-wide adoption.
5. **Connector growth.** Nine partners is a start; pace of new additions shows momentum.

## Sources

1. [Anthropic — Introducing Claude for Teachers (Jul 14, 2026)](https://www.anthropic.com/news/claude-for-teachers)
2. [Claude for Teachers product page (Jul 14, 2026)](https://claude.com/solutions/teachers)
3. [GitHub — anthropics/k12-teacher-skills (Jul 14, 2026)](https://github.com/anthropics/k12-teacher-skills)
4. [AI Fluency for K-12 Teachers course (Jul 14, 2026)](https://anthropic.skilljar.com/path/ai-fluency-for-pk-12-educators)
5. [Teacher Terms — K-12 Data Privacy (Jul 14, 2026)](https://support.claude.com/en/articles/15926041)
6. [Claude for Teachers in Action — tutorial (Jul 14, 2026)](https://claude.com/resources/tutorials/claude-for-teachers-in-action)
7. [Anthropic — Gates Foundation partnership (May 14, 2026)](https://www.anthropic.com/news/gates-foundation-partnership)
8. [Stanford SCALE — Evidence Base for AI in K-12 Education](https://scale.stanford.edu/research-in-action/understanding-evidence-base-ai-k12-education)
9. [AFT — American Federation of Teachers](https://www.aft.org/)
10. [FERPA — US Department of Education](https://studentprivacy.ed.gov/)
