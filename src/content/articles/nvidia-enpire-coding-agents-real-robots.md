---
title: "NVIDIA ENPIRE: real-robot coding agents hit 99% pass@8"
description: "On 2026-06-16, NVIDIA GEAR, CMU LeCAR Lab, and UC Berkeley published ENPIRE, a four-module harness (Environment, Policy Improvement, Rollout, Evolution) that puts coding agents (Codex with GPT-5.5, Claude Code with Opus 4.7, Kimi Code with Kimi K2.6) in a fully automatic closed loop on real robots, with auto-reset and auto-verify. The team reports 99% pass@8 across five hard manipulation tasks (Push-T, Pin Insertion, Tie Zip-tie, GPU Insertion, Cut Zip-tie), team-size scaling 1/4/8, and two new multi-agent physical-autoresearch efficiency metrics — Mean Robot Utilization (MRU) and Mean Token Utilization (MTU). The 99% figure is the team's emergent retry-and-recovery capability, not best-of-8 sampling; a heuristic-policy baseline reports 0% coverage in 43–73 steps. The harness code is not yet open-sourced as of 2026-06-19."
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

On **2026-06-16**, NVIDIA GEAR, the CMU LeCAR Lab, and UC Berkeley published **ENPIRE — "Agentic Robot Policy Self-Improvement in the Real World"** — a four-module harness (Environment, Policy Improvement, Rollout, Evolution) that puts coding agents in a fully automatic closed loop on real robots, with **auto-reset** and **auto-verify** ([NVIDIA GEAR, ENPIRE project page, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). The headline number is striking: three frontier coding agents — **Codex with GPT-5.5, Claude Code with Opus 4.7, and Kimi Code with Kimi K2.6** — reach a **99% pass@8 success rate** on five hard manipulation tasks: **Push-T, Pin Insertion, Tie Zip-tie, GPU Insertion, and Cut Zip-tie** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). The paper also introduces two new efficiency metrics for multi-agent physical autoresearch — **Mean Robot Utilization (MRU)** and **Mean Token Utilization (MTU)** — and reports clean team-size scaling across **1, 4, and 8 agents** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). The result is the clearest signal yet that the coding-agent closed-loop workflow has crossed the digital-physical boundary. **Two caveats lead the article:** the 99% is *not* best-of-8 sampling, and the harness code is *not yet open-sourced*.

## What it is

**The four-module architecture.** ENPIRE is named for the four modules that wrap around a real robot cell ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)):

1. **Environment (EN).** Constructs the **reset, safety, verification, and logging interfaces** the coding agent can call. EN is what turns a manual robot experiment into a callable API. Two of the load-bearing capabilities live here: **Auto Evaluation** (the autoresearch-derived reward function for each task — for example, on the zip-tie insertion task, a detector draws bounding boxes around the zip-tie head and strap, a segmentation model resolves the same parts into masks, and each camera view independently judges whether the strap passes through the head, with the per-camera verdicts fused into a final binary reward) and **Auto Reset** (each task is returned to a known randomized initial state without manual intervention, with verification that the reset succeeded).
2. **Policy Improvement (PI).** Generates and revises **policy code** from rewards, videos, traces, and failure cases. The paper explicitly supports multiple PI regimes — **heuristic learning, behavior cloning, offline RL, online RL, and tool calling** — so the same harness can host very different algorithm families side by side.
3. **Rollout (R).** Runs **budgeted robot trials** across one or more physical robots in parallel, preserving the state, action, video, and result for audit.
4. **Evolution (E).** The module where the agent-driven search happens. Coding agents **compare branches, reuse successful recipes, and prune hypotheses that fail on hardware**. The project page visualizes the result as a "hypothesis git-tree" — one branch per agent, one node per idea tried — plotted on the same wall-clock-time axis as the team-avg success-rate curve.

The four modules are the same pattern that has worked for coding-agent loops in digital environments (literature review, propose algorithm variant, optimize infra, summarize experiment result, repeat) — the contribution is to make that pattern callable on a *physical* robot cell whose state can be reset and verified by software.

**The five showcased tasks.** All five are real-world manipulation tasks evaluated on physical hardware, with four of them paired with an auto-reset policy ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)):

- **Push-T** — pushing a T-shaped block into a target zone. Push-T is a benchmark originally adapted by the [huggingface/gym-pusht](https://github.com/huggingface/gym-pusht) Gymnasium environment; the ENPIRE project page uses the same canonical task description and the page's "Push-T setup" box points to `huggingface/gym-pusht` as the reference repo.
- **Pin Insertion** — picking a set of pins and organizing them into a pin box.
- **Tie Zip-tie** — manipulating a zip-tie so the strap passes through the head.
- **GPU Insertion** — picking a GPU from the table and inserting it into a board.
- **Cut Zip-tie** — using a cutter to cut a zip-tie.

**The headline metric — and what it does and does not mean.** The 99% pass@8 figure is one specific quantity: within a single long-horizon rollout, the agentic loop gets up to **8 in-context retries per subtask, each conditioned on the previous failures** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). The project page is explicit:

> "pass@8 is *not* best-of-8 i.i.d. samples on the task. Within a single long-horizon rollout, the agentic loop gets up to 8 in-context retries per subtask, each conditioned on the previous failures — so it measures emergent retry and recovery, not sampling luck. Retries only help to the extent the policy can recover: a policy that can't stays near pass@1 (a 13% policy stays ~13%, not 99%). Reaching 99% over 8 in-context retries is itself the capability we report — which is why we show the uncut 5-minute rollout here rather than a cherry-picked clip."

In other words, the 99% is the **team's emergent retry-and-recovery capability** — the result of eight in-context retries on a single long-horizon trajectory, where each retry can see the previous failures. A policy that cannot recover does not jump to 99%; a 13% policy stays near 13% even with 8 retries. The 99% over 8 in-context retries is itself the headline result, and the project page is unusually honest about why: "this is why we show the uncut 5-minute rollout here rather than a cherry-picked clip."

**The baseline that grounds the 99%.** The same project page publishes the Push-T heuristic-policy rollouts side by side. When the three coding agents are given a heuristic-only task — "write a heuristic policy, with no neural network training, to achieve a 100% success rate in the Push-T environment over at least 50 continuous episodes" — and asked to fan out a subagent team to try approaches, the **single-run coverage is 0% for all three** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)):

| Agent | Push-T heuristic-only rollout | Coverage | Steps |
|---|---|---|---|
| Codex with GPT-5.5 | single-run, in-distribution + OOD random init | **0%** | 43 |
| Claude Code with Opus 4.7 | single-run, in-distribution + OOD random init | **0%** | 73 |
| Kimi Code with Kimi K2.6 | single-run, in-distribution + OOD random init | **0%** | 66 |

The 99% is not a single-model single-run result; it is what the ENPIRE team achieves once the agents iterate through the closed loop. The uncut 5-minute Push-T rollout on the page is the visible evidence.

**The two new metrics — MRU and MTU.** The paper proposes **Mean Robot Utilization (MRU)** and **Mean Token Utilization (MTU)** as efficiency metrics for multi-agent physical autoresearch ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). MRU captures how much of the available robot time is actually being used to run policy trials (as opposed to the agents reading logs, writing code, or waiting on the language-model backbone). MTU captures the same idea on the *token-throughput* axis, normalized against a linear scaling reference. The team publishes resource-utilization plots that compare 1, 4, and 8 agent teams on the same task and a "Tokens to Success" plot that pairs total token spend against time-to-success. The metric vocabulary is new and useful — it gives the multi-agent physical-autoresearch community something other than a single scalar success rate to argue about.

**The simulation parallel — RoboCasa.** The paper pairs the real-world evaluation with simulation results in **RoboCasa**, a large-scale kitchen-manipulation framework that supports popular policy-learning models (Diffusion Policy, π₀, GR00T) and a RoboCasa365 expansion to 2,500 kitchen environments and 365 everyday tasks ([RoboCasa, 2026-06-19](https://robocasa.ai/); [NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). The simulation parallel is what lets the team run denser ablations and compare PI regimes under controlled resets, and it is also where the Coffee Setup Mug rollouts in the published figures come from.

## Why it matters

**The missing abstraction for autonomous robotics research is here.** Real-world robot learning has been bottlenecked by human supervision and algorithmic engineering, and the missing piece — repeatability — has been waiting for a **callable interface to the reset-execute-verify-refine loop** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). ENPIRE's claim is precise: it turns "run a policy on a robot, check the result, edit the code, run it again" into a callable harness, and the harness in turn lets frontier coding agents run the same basic workflow on physical hardware that they already run in digital environments. The paper's own framing is *"frontier coding agents can autonomously develop a policy to achieve a 99% success rate on challenging, dexterous manipulation tasks in the real world"* — that is the load-bearing claim, and it is the one the article should lead with ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)).

**Head-to-head coding-agent evaluation on real hardware, with a public comparison surface.** Three frontier coding agents — **Codex with GPT-5.5, Claude Code with Opus 4.7, and Kimi Code with Kimi K2.6** — are run on the same five tasks under the same evaluation harness, with research-progress curves plotted on a wall-clock-time axis ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/); [Codex, 2026-06-19](https://openai.com/codex/); [Claude Code, 2026-06-19](https://www.anthropic.com/claude-code); [Anthropic, Claude Opus model index, 2026-06-19](https://www.anthropic.com/claude/opus); [Kimi Platform, 2026-06-19](https://platform.kimi.ai/)). The team's new evaluation harness is called **AutoEnvBench**, and it tracks agent-driven research progress — not just a final success rate — across Push-T and Pin Insertion. The team-size scaling is reported in the same harness, with team sizes **1, 4, and 8 agents** compared head-to-head. The result is the first time three frontier coding agents have been compared on the same physical manipulation tasks with the same evaluation harness, and the comparison surface is reusable — future model families (GPT-5.6, Claude Opus 4.8 — which Anthropic released on 2026-05-28 — Gemini 3.x, Kimi K3.x) can be added on the same AutoEnvBench plot.

**A clean team-size scaling story — with a real cost.** The Push-T and Pin Insertion scaling-law plots compare 1, 4, and 8 agents on the same axes ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). Larger fleets reach success sooner on the wall-clock-time axis, but the speedup is **not free**: the **Limitations** section of the project page is explicit that *"Scaling the robot fleet drives higher token consumption: as more agents read logs, summarize peer branches, and coordinate, the total token budget required to reach a successful policy grows with fleet size. Larger fleets can reach success sooner, but the additional speedup comes at the cost of higher token consumption."* The same section also notes that MRU *decreases* as the fleet grows, because agents spend more time summarizing peer branches and less time operating the robot. Fleet scaling is a real knob with a real cost curve; it is not the same as "throw more agents at the problem."

## What to watch

Six follow-up signals to track over the next quarter:

1. **Public release of the ENPIRE harness code.** The project page states the authors' plan to open-source, but as of 2026-06-19 **no public repository link is provided on the project page** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). Watch for a repository under the NVIDIA GitHub organization (or an academic project page) with the four-module harness and the AutoEnvBench evaluation.
2. **Independent reproduction of the 99% pass@8 numbers.** The benchmark is the project's own — AutoEnvBench is introduced in the same paper. Until the code is public and a third party runs the same evaluation, treat the 99% as a project self-report. Watch for arXiv replications, academic lab reproductions, or community AutoEnvBench runs.
3. **Larger fleet sizes.** 1, 4, and 8 agents are compared in the paper. The obvious next step is 16 and 32 agents, both to test how the MRU / token-consumption cost curve behaves and to see whether pass@8 continues to climb with the fleet. Watch for fleet-size ablations in follow-up papers.
4. **Newer model families in AutoEnvBench.** Anthropic released Claude Opus 4.8 on 2026-05-28 ([Anthropic, Claude Opus model index, 2026-06-19](https://www.anthropic.com/claude/opus)); Moonshot AI now lists Kimi K2.7 Code on the platform page alongside Kimi K2.6 ([Kimi Platform, 2026-06-19](https://platform.kimi.ai/)); OpenAI's Codex page advertises GPT-5.5 as the latest advancement ([Codex, 2026-06-19](https://openai.com/codex/)). Watch for AutoEnvBench updates that add GPT-5.6, Claude Opus 4.8, Gemini 3.x, and Kimi K2.7 / K3.x to the comparison.
5. **Adoption of MRU and MTU as a cross-paper standard.** Both metrics are introduced in this paper and have not been adopted externally as of 2026-06-19. Watch for whether the multi-agent physical-autoresearch community picks them up — they are reusable vocabulary, but community adoption is the test of whether they become a standard.
6. **Transfer of auto-reset / auto-verify to other task families.** Manipulation is the showcased family. The same auto-reset / auto-verify pattern is in principle applicable to locomotion, mobile manipulation, and human-robot interaction; the question is whether the engineering cost of building a self-resetting environment is the right one to pay for those families.

## Risks and caveats

Five load-bearing caveats — none of these is a reason not to write the article, but each one has to be in the body, not just a footnote:

1. **99% pass@8 is not best-of-8.** Within a single long-horizon rollout, the agentic loop gets up to **8 in-context retries per subtask, each conditioned on the previous failures**. A policy that cannot recover stays near pass@1 — a 13% policy stays at ~13%, not 99%. The 99% over 8 in-context retries is itself the capability the team reports. The article must lead with this caveat and quote the project page's explanation verbatim ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)).
2. **The 99% is the project's own benchmark, not an independent reproduction.** AutoEnvBench is introduced in the same paper. Until the code is public and a third party runs the same evaluation, treat the 99% as a project self-report. Do not present 99% as a community-validated result.
3. **The harness code is not yet open-sourced.** The project page states the authors' plan to open-source ENPIRE, but **no public repository link is provided on the page as of 2026-06-19** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). Do not claim the code is available; say "the authors state plans to open-source; the public link is not yet live as of 2026-06-19."
4. **Larger fleets trade speed for tokens.** The Limitations section is explicit: total token consumption grows with fleet size, and MRU decreases as agents spend more time summarizing peer branches and coordinating. Do not present fleet scaling as free.
5. **Generalization beyond the five showcased tasks is not established.** The paper evaluates ENPIRE on **Push-T, Pin Insertion, Tie Zip-tie, GPU Insertion, and Cut Zip-tie**. Do not extrapolate to "any manipulation task" or "general-purpose robotics" without independent evidence.

## Practical advice for builders

**Robotics researchers and PhD students.** The auto-reset / auto-verify pattern is the load-bearing abstraction. If you are still doing manual scene resets between trials, you are paying the cost ENPIRE automates. The four-module split (EN / PI / R / E) is a clean separation of concerns you can adopt incrementally: start with EN (build the auto-reset and auto-verify interface for one task) and only then layer PI (the agent's policy-improvement loop) on top. The PI module's support for **heuristic learning, behavior cloning, offline RL, online RL, and tool calling** means the same harness can host very different algorithm families — useful if your lab has heterogeneous projects.

**AI agent / coding-tool builders.** MRU and MTU are useful metrics. If you are running a multi-agent system on physical hardware, instrumenting robot utilization and token throughput at the team level (not just per-agent) is a meaningful contribution to your own evaluation discipline. The Push-T ablation table on the project page — comparing Codex with **native vision**, Codex with **VLM-as-vision-tool**, and Codex with **GoFE vision** — shows that vision-stack choice is a non-trivial variable, and the same axis (input perception, not policy architecture) is the easiest to instrument first.

**Operators and procurement teams evaluating autonomous robotics research claims.** The open-source question is the right first check. As of 2026-06-19, **the ENPIRE harness is not yet public** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)); replication outside NVIDIA / CMU / UC Berkeley is not possible from the paper alone. Treat the 99% pass@8 as a project self-report until independent reproduction is published or the code lands. Ask any vendor making "agent-driven robotics" claims the same two questions: *which benchmark*, and *is the harness public*?

## Verdict

**ENPIRE turns "run a policy on a robot, check the result, edit the code, run it again" into a callable interface, and three frontier coding agents — Codex with GPT-5.5, Claude Code with Opus 4.7, and Kimi Code with Kimi K2.6 — hit 99% pass@8 on hard manipulation tasks in the resulting closed loop** ([NVIDIA GEAR, ENPIRE, 2026-06-19](https://research.nvidia.com/labs/gear/enpire/)). The result is real, the metric is the right one, and the missing abstraction for autonomous robotics research is here. The code is not yet open-sourced, the 99% is the project's own benchmark, and the fleet-scaling story is not free. But for AI Newsroom's primary reader — the robotics and AI researchers running real-world robot learning experiments, the agent-tool builders instrumenting multi-agent physical autoresearch, and the operators sizing up "autonomous robotics research" claims from frontier labs — **ENPIRE is the clearest signal yet that the coding-agent closed-loop workflow has crossed the digital-physical boundary**. The article stays inside the paper; the rest is for the next commissioning cycle.
