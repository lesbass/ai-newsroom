---
title: "NVIDIA ENPIRE: real-robot coding agents hit 99% pass@8"
description: "NVIDIA GEAR + CMU LeCAR + UC Berkeley harness putting coding agents (Codex GPT-5.5, Claude Code Opus 4.7, Kimi Code K2.6) in a closed loop on real robots. 99% pass@8 on five tasks; code not yet public."
pubDate: 2026-06-19
author: "AI Newsroom"
tags: ["nvidia", "cmu", "uc-berkeley", "enpire", "robotics", "manipulation", "coding-agents", "codex", "claude-code", "kimi-code", "physical-autoresearch", "autoenvbench", "mean-robot-utilization", "mean-token-utilization", "push-t", "robocasa", "gpt-5-5", "opus-4-7", "kimi-k2-6", "closed-loop", "robot-learning", "research-paper"]
image: "https://opengraph.githubassets.com/1/NVIDIAGameWorks/kaolin-wisp"
imageAlt: "NVIDIA research social preview card"
imageCredit: "Image: GitHub / NVlabs organization page"
sources:
  - title: "NVIDIA GEAR — ENPIRE project page (title, authors, institutions, 99% pass@8, four modules, task list, MRU/MTU, Limitations)"
    url: "https://research.nvidia.com/labs/gear/enpire/"
    date: 2026-06-19
    type: primary
  - title: "NVIDIA GEAR — ENPIRE paper (drive folder linked from the project page)"
    url: "https://drive.google.com/drive/folders/1J8w1yQux9ODYqTNZ2ynOIFjerBIQtw1V?usp=sharing"
    date: 2026-06-19
    type: primary
  - title: "huggingface/gym-pusht — the canonical Push-T Gymnasium environment referenced on the ENPIRE project page"
    url: "https://github.com/huggingface/gym-pusht"
    date: 2026-06-19
    type: primary
  - title: "RoboCasa — large-scale simulation framework for everyday-task manipulation (used as the simulation parallel)"
    url: "https://robocasa.ai/"
    date: 2026-06-19
    type: primary
  - title: "OpenAI — Codex product page (the Codex coding agent cited as 'Codex with GPT-5.5' on the ENPIRE project page)"
    url: "https://openai.com/codex/"
    date: 2026-06-19
    type: primary
  - title: "Anthropic — Claude Code product page (the Claude Code coding agent cited as 'Claude Code with Opus 4.7' on the ENPIRE project page)"
    url: "https://www.anthropic.com/claude-code"
    date: 2026-06-19
    type: primary
  - title: "Anthropic — Claude Opus model index (Opus 4.7 released 2026-04-16, confirmed by Anthropic news index)"
    url: "https://www.anthropic.com/claude/opus"
    date: 2026-06-19
    type: primary
  - title: "Moonshot AI — Kimi Platform (the Kimi Code agent and Kimi K2.6 model cited on the ENPIRE project page)"
    url: "https://platform.kimi.ai/"
    date: 2026-06-19
    type: primary
highRiskClaims: false
---

On **2026-06-16**, NVIDIA GEAR, the CMU LeCAR Lab, and UC Berkeley published **ENPIRE** — *"Agentic Robot Policy Self-Improvement in the Real World"* — a four-module harness that puts coding agents in a fully automatic closed loop on real robots with **auto-reset** and **auto-verify** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). Three frontier coding agents — **Codex with GPT-5.5, Claude Code with Opus 4.7, and Kimi Code with Kimi K2.6** — reach a **99% pass@8 success rate** on five hard manipulation tasks: **Push-T, Pin Insertion, Tie Zip-tie, GPU Insertion, and Cut Zip-tie**. The paper also introduces two efficiency metrics — **Mean Robot Utilization (MRU)** and **Mean Token Utilization (MTU)** — and reports team-size scaling at 1, 4, and 8 agents. **Two caveats lead:** the 99% is *not* best-of-8 sampling, and the harness code is *not yet open-sourced*.

## What it is

**The four-module architecture.** ENPIRE is named for the four modules that wrap a real robot cell:

1. **Environment (EN).** The reset, safety, verification, and logging interfaces the agent can call. Two load-bearing capabilities: **Auto Evaluation** (a detector + segmentation model judge whether the task succeeded; per-camera verdicts are fused into a binary reward) and **Auto Reset** (each task is returned to a randomized initial state without manual intervention, with reset-verification).
2. **Policy Improvement (PI).** Generates and revises **policy code** from rewards, videos, traces, and failure cases. Supports heuristic learning, behavior cloning, offline RL, online RL, and tool calling.
3. **Rollout (R).** Runs **budgeted robot trials** across one or more physical robots in parallel, preserving state, action, video, and result for audit.
4. **Evolution (E).** Coding agents compare branches, reuse successful recipes, and prune hypotheses that fail on hardware.

**The five tasks.** All evaluated on physical hardware, with four paired with an auto-reset policy: **Push-T** (the [gym-pusht](https://github.com/huggingface/gym-pusht) Gymnasium environment), **Pin Insertion**, **Tie Zip-tie**, **GPU Insertion**, **Cut Zip-tie**.

**The headline metric — and what it does and does not mean.** The 99% pass@8 is one specific quantity: within a single long-horizon rollout, the agentic loop gets up to **8 in-context retries per subtask, each conditioned on the previous failures**. The project page:

> "pass@8 is *not* best-of-8 i.i.d. samples on the task. Within a single long-horizon rollout, the agentic loop gets up to 8 in-context retries per subtask, each conditioned on the previous failures — so it measures emergent retry and recovery, not sampling luck. Retries only help to the extent the policy can recover: a policy that can't stays near pass@1."

**The 99% is the team's emergent retry-and-recovery capability.** A policy that cannot recover does not jump to 99%; a 13% policy stays near 13% even with 8 retries. The project page: *"this is why we show the uncut 5-minute rollout here rather than a cherry-picked clip."*

**The baseline that grounds the 99%.** When the three coding agents are given a heuristic-only task on Push-T — *"write a heuristic policy, with no neural network training, to achieve a 100% success rate"* — the **single-run coverage is 0% for all three** (43 / 73 / 66 steps). The 99% is what ENPIRE achieves once the agents iterate through the closed loop.

**The two new metrics.** **MRU** captures how much available robot time is actually used to run policy trials. **MTU** captures the same idea on the token-throughput axis, normalized against a linear scaling reference. Resource-utilization plots compare 1, 4, and 8 agent teams; a "Tokens to Success" plot pairs total token spend against time-to-success.

**The simulation parallel.** Real-world results are paired with simulation runs in [RoboCasa](https://robocasa.ai/) (Diffusion Policy, π₀, GR00T; RoboCasa365 expansion to 2,500 kitchens / 365 tasks).

## Why it matters

**The missing abstraction for autonomous robotics research is here.** Real-world robot learning has been bottlenecked by human supervision and algorithmic engineering, and the missing piece — repeatability — has been waiting for a **callable interface to the reset-execute-verify-refine loop**. ENPIRE's claim: it turns "run a policy on a robot, check the result, edit the code, run it again" into a callable harness. The paper: *"frontier coding agents can autonomously develop a policy to achieve a 99% success rate on challenging, dexterous manipulation tasks in the real world."* **Head-to-head coding-agent evaluation on real hardware, with a public comparison surface.** Three frontier coding agents on the same five tasks under the same harness, with research-progress curves on a wall-clock-time axis. The team's new evaluation harness is **AutoEnvBench**; team-size scaling is reported at 1, 4, and 8 agents. **A clean team-size scaling story — with a real cost.** The Limitations section: *"Scaling the robot fleet drives higher token consumption … Larger fleets can reach success sooner, but the additional speedup comes at the cost of higher token consumption."* MRU *decreases* as the fleet grows.

## Practical implications

- **Robotics researchers and PhD students:** the auto-reset / auto-verify pattern is the load-bearing abstraction. Start with EN (build the auto-reset and auto-verify interface for one task) and only then layer PI on top. The PI module's support for **heuristic learning, behavior cloning, offline RL, online RL, and tool calling** means the same harness can host heterogeneous algorithm families.
- **AI agent / coding-tool builders:** MRU and MTU are useful metrics. Instrumenting robot utilization and token throughput at the team level (not just per-agent) is meaningful. The Push-T ablation compares Codex with native vision, VLM-as-vision-tool, and GoFE vision — vision-stack choice is non-trivial.
- **Operators evaluating "autonomous robotics" claims:** the open-source question is the right first check. **The ENPIRE harness is not yet public as of 2026-06-19**; replication outside NVIDIA / CMU / UC Berkeley is not possible from the paper alone.

## Risks and caveats

- **99% pass@8 is not best-of-8.** A policy that cannot recover stays near pass@1.
- **The 99% is the project's own benchmark, not an independent reproduction.** AutoEnvBench is introduced in the same paper.
- **The harness code is not yet open-sourced.** The project page states plans to open-source; the public link is not yet live as of 2026-06-19.
- **Larger fleets trade speed for tokens.** Total token consumption grows with fleet size; MRU decreases as agents spend more time summarizing peer branches.
- **Generalization beyond the five tasks is not established.** Do not extrapolate to "any manipulation task" or "general-purpose robotics."

## What to watch

1. **Public release of the ENPIRE harness code** — watch for a repository under the NVIDIA GitHub organization or an academic project page.
2. **Independent reproduction of the 99% pass@8 numbers** — academic lab reproductions, arXiv replications, or community AutoEnvBench runs.
3. **Larger fleet sizes (16, 32 agents)** — to test how the MRU / token-consumption cost curve behaves.
4. **Newer model families in AutoEnvBench** — Anthropic released Claude Opus 4.8 on 2026-05-28; Kimi Platform now lists K2.7; GPT-5.6, Claude Opus 4.8, Gemini 3.x, Kimi K3.x are the natural next additions.
5. **Adoption of MRU and MTU as a cross-paper standard** — both are introduced in this paper and have not been adopted externally as of 2026-06-19.

## Sources

- [NVIDIA GEAR — ENPIRE project page](https://research.nvidia.com/labs/gear/enpire/)
- [NVIDIA GEAR — ENPIRE paper (drive folder)](https://drive.google.com/drive/folders/1J8w1yQux9ODYqTNZ2ynOIFjerBIQtw1V?usp=sharing)
- [GitHub — huggingface/gym-pusht](https://github.com/huggingface/gym-pusht)
- [RoboCasa](https://robocasa.ai/)
- [OpenAI — Codex](https://openai.com/codex/)
- [Anthropic — Claude Code](https://www.anthropic.com/claude-code)
- [Anthropic — Claude Opus model index](https://www.anthropic.com/claude/opus)
- [Moonshot AI — Kimi Platform](https://platform.kimi.ai/)
