---
title: "NVIDIA ENPIRE: real-robot coding agents hit 99% pass@8"
description: "NVIDIA GEAR, CMU, and UC Berkeley published ENPIRE, a four-module harness that puts coding agents in a closed loop on real robots. Three frontier agents hit 99% pass@8 on five manipulation tasks."
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

On **2026-06-16**, NVIDIA GEAR, CMU LeCAR Lab, and UC Berkeley published **ENPIRE** — a four-module harness that puts coding agents in a fully automatic closed loop on real robots, with auto-reset and auto-verify ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). Three frontier coding agents — **Codex with GPT-5.5, Claude Code with Opus 4.7, and Kimi Code with Kimi K2.6** — reach **99% pass@8** on five manipulation tasks. The catch: 99% is *not* best-of-8 sampling, and the code is not yet open-sourced.

## What it is

ENPIRE is named for four modules ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)):

- **Environment (EN)** — reset, safety, verification, and logging interfaces. Includes auto-evaluation (reward functions per task) and auto-reset (restores randomized initial states without manual intervention).
- **Policy Improvement (PI)** — generates and revises policy code from rewards, videos, traces, and failure cases. Supports heuristic learning, behavior cloning, offline RL, online RL, and tool calling.
- **Rollout (R)** — runs budgeted robot trials across one or more physical robots in parallel, preserving state, action, video, and result for audit.
- **Evolution (E)** — coding agents compare branches, reuse successful recipes, and prune failed hypotheses. The project page visualizes this as a "hypothesis git-tree."

## The five tasks

All are real-world manipulation tasks on physical hardware ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)):

- **Push-T** — pushing a T-shaped block into a target zone ([huggingface/gym-pusht](https://github.com/huggingface/gym-pusht))
- **Pin Insertion** — picking pins and organizing them into a pin box
- **Tie Zip-tie** — manipulating a zip-tie so the strap passes through the head
- **GPU Insertion** — picking a GPU and inserting it into a board
- **Cut Zip-tie** — using a cutter to cut a zip-tie

## What 99% pass@8 actually means

The project page is explicit: pass@8 is *not* best-of-8 i.i.d. samples. Within a single long-horizon rollout, the agentic loop gets up to **8 in-context retries per subtask, each conditioned on the previous failures**. A policy that cannot recover stays near pass@1 — a 13% policy stays ~13%, not 99%. The 99% over 8 retries is itself the capability the team reports ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)).

The baseline grounds the number. When the three agents are given a heuristic-only task on Push-T with no neural network training, **all three report 0% coverage** in 43–73 steps.

## New metrics: MRU and MTU

The paper introduces **Mean Robot Utilization (MRU)** and **Mean Token Utilization (MTU)** for multi-agent physical autoresearch. MRU measures robot time usage; MTU measures token throughput normalized against a linear scaling reference. The team publishes resource-utilization plots comparing 1, 4, and 8 agents ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)).

## Team-size scaling

Larger fleets reach success sooner on wall-clock time, but the speedup is **not free**. The Limitations section states: *"Scaling the robot fleet drives higher token consumption: as more agents read logs, summarize peer branches, and coordinate, the total token budget required to reach a successful policy grows with fleet size."* MRU *decreases* as the fleet grows ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)).

## Simulation parallel

The paper pairs real-world results with **RoboCasa**, a large-scale kitchen-manipulation framework supporting Diffusion Policy, π₀, and GR00T ([RoboCasa, 2026-06-19](https://robocasa.ai/); [NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)).

## Why it matters

ENPIRE turns "run a policy on a robot, check the result, edit the code, run it again" into a callable harness — the missing abstraction for autonomous robotics research. It is also the first time three frontier coding agents have been compared on the same physical manipulation tasks with the same evaluation harness (AutoEnvBench).

## Risks and caveats

1. **99% pass@8 is not best-of-8.** It measures emergent retry-and-recovery, not sampling luck. The article must lead with this caveat.
2. **The benchmark is the project's own.** AutoEnvBench is introduced in the same paper. No independent reproduction exists.
3. **The harness code is not yet open-sourced.** The authors state plans to open-source; no public repository is provided as of 2026-06-19.
4. **Larger fleets trade speed for tokens.** Total token consumption grows with fleet size, and MRU decreases.
5. **Generalization beyond five tasks is not established.** Do not extrapolate to "any manipulation task."

## What to watch

- Public release of the ENPIRE harness code
- Independent reproduction of 99% pass@8
- Larger fleet sizes (16, 32 agents)
- Newer model families in AutoEnvBench (GPT-5.6, Claude Opus 4.8)
- Adoption of MRU/MTU as cross-paper standards
- Transfer of auto-reset/auto-verify to other task families

## Verdict

ENPIRE is the clearest signal yet that the coding-agent closed-loop workflow has crossed the digital-physical boundary. The code is not open-sourced, the 99% is a self-report, and fleet scaling is not free — but the four-module harness and the three-agent comparison on real hardware are a genuine contribution ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)).
