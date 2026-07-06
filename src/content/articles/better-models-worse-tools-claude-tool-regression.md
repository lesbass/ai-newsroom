---
title: "Better Models, Worse Tools: Claude tool calls regress on Sonnet 5 and Opus 4.8"
description: "Armin Ronacher's controlled tests show Claude Opus 4.8 and Sonnet 5 produce ~20% malformed tool calls against Pi's edit tool; older models are clean."
slug: better-models-worse-tools-claude-tool-regression
pubDate: 2026-07-05
author: "AI Newsroom"
tags:
  - anthropic
  - claude-opus-4-8
  - claude-sonnet-5
  - tool-use
  - claude-code
  - ai-agents
  - pi
  - agentic-ai
  - developer-tools
image: "/images/articles/better-models-worse-tools-claude-tool-regression/hero-desktop.png"
imageAlt: "Screenshot of the 'The Failure' section of Armin Ronacher's blog post showing two invented-key JSON examples (requireUnique, oldText2, newText2) and the bulleted list of trailing keys Claude Opus 4.8 and Sonnet 5 produced against Pi's edit tool schema (pocoo.org, 2026-07-04)."
imageCredit: "Source: Armin Ronacher's blog post 'Better Models: Worse Tools' — https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/ (2026-07-04). Screenshot of the 'The Failure' section, captured 2026-07-05 via Playwright Chromium using the AI Newsroom browser helper. License: no license stated; editorial use of a single screenshot from a public analysis post for news commentary, with full attribution to the author."
canonicalURL: "https://news.lesbass.com/articles/better-models-worse-tools-claude-tool-regression/"
sources:
  - title: "Armin Ronacher — Better Models: Worse Tools (pocoo.org, 2026-07-04)"
    url: "https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/"
    date: 2026-07-04
    type: primary
  - title: "Pi issue #6278 — New Claude models work poorly with the current Pi's edit tool, failing about 20% edits in some sessions (2026-07-03)"
    url: "https://github.com/earendil-works/pi/issues/6278"
    date: 2026-07-03
    type: primary
  - title: "pasky reproducer gist — in-Pi replay, out-of-Pi replay, A/B harness test (2026-07-04)"
    url: "https://gist.github.com/pasky/18f04581d4e74097279a6b4dd52ab261"
    date: 2026-07-04
    type: primary
  - title: "Anthropic — Tool use / function calling overview (current docs)"
    url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview"
    type: secondary
  - title: "AI Newsroom — Sonnet 5 narrows gap to Opus (cycle predecessor, 2026-07-01)"
    url: "https://news.lesbass.com/articles/claude-sonnet-5-narrows-gap-to-opus/"
    date: 2026-07-01
    type: secondary
highRiskClaims: false
---

Open-source developer Armin Ronacher published a reproducible finding on 2026-07-04: newer Claude models — **Opus 4.8** and **Sonnet 5** — emit malformed tool calls against Pi's `replacements[]` array schema roughly 20% of the time in long sessions, while older Claude models stay clean. The failure is specific. The argument's `oldText` and `newText` are byte-correct; the model just adds a junk key after closing the object and the schema validator rejects the call.

![Two side-by-side examples of Claude emitting schema-invalid edit tool arguments, with the bulleted list of invented trailing keys that Ronacher collected.](/images/articles/better-models-worse-tools-claude-tool-regression/hero-desktop.png)

*Source: [Armin Ronacher, "Better Models: Worse Tools" (pocoo.org, 2026-07-04)](https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/) — Screenshot, no license stated, used editorially for news commentary.*

## What happened

The first signal came from Petr Baudis, who opened [Pi issue #6278](https://github.com/earendil-works/pi/issues/6278) on 2026-07-03 after Claude started returning arguments like `{ "oldText": "...", "newText": "...", "in_file": "..." }`, or with `requireUnique`, `oldText2` / `newText2`, or `closeenough` — none of them permitted by Pi's edit-tool schema. Pi rejects the call, the model retries, and the loop eats turns.

Ronacher reproduced it in a controlled harness and collected the full set of invented trailing keys: `type`, `id`, `kind`, `unique`, `requireUnique`, `matchCase`, `in_file`, `forceMatchCount`, `children`, `notes`, `cost`, `oldText2`, `newText2`, `oldText_2`, `newText_2`, and `event.0.additionalProperties`. A [reproducer gist by pasky](https://gist.github.com/pasky/18f04581d4e74097279a6b4dd52ab261) replays a verbatim Anthropic Messages API payload without `strict: true` and finds the defect across transports: 4/11 invalid with OAuth + streaming, 4/20 OAuth without, 2/10 API key + streaming, 2/16 non-streaming with documented fields only.

The failure is context-dependent. A fresh single-turn prompt like "edit this file" reproduces it rarely or not at all. The failure rate climbs in long agentic sessions where the model has read files, diagnosed a problem, and composed a multi-line edit — exactly the workflow Claude Code is trained to do well.

## Why it matters

This is a counterintuitive regression. The same family that shipped Sonnet 5's effort-level API dial and a $2/$10 → $3/$15 per-MTok price cut on 2026-06-30 — see [Sonnet 5 narrows gap to Opus](/articles/claude-sonnet-5-narrows-gap-to-opus/) — is *worse* at a basic contract every Claude developer relies on: emit a tool call that matches the declared schema.

Pi's `replacements[]` shape is not exotic. Any tool that exposes a nested array of objects sits in the same risk band: batch updates, multi-file edits, multi-message dispatches, list-shaped APIs. If your Claude-facing schema has a "list of objects" anywhere, this finding is directly relevant to you.

## What is going on (root-cause hypothesis)

Ronacher proposes a four-step mechanism. It is his hypothesis, not an Anthropic engineering statement, and he is explicit about that framing.

1. **Tool calls are text the model emits.** Anthropic uses in-band `ANTML` markers — they look like XML but are a tokenization convention, and Anthropic has not published a spec for them.
2. **The sampling distribution over tool-call shapes was historically broad.** Older Claude models spread probability mass across a wide range of plausible shapes; nested-array shapes were one valid path.
3. **RL post-training inside Claude Code's harness rewards the canonical shape and penalises alternatives.** Claude Code's edit tool is flat — `file_path`, `old_string`, `new_string`, optional `replace_all` — and its client silently filters unknown keys.
4. **The model develops a strong prior that edits look a specific way.** When a nested-array shape goes off-distribution and the model is sampling after a long escaped string, it generates a plausible-looking extra key rather than the closing brace.

## The "slop harness" effect

Two factors are mutually reinforcing. The model is loose; the harness is forgiving. Claude Code filters unexpected keys, repairs Unicode escapes, and does not default to `strict: true`. Anthropic's API does offer a `strict: true` tool mode that constrains the sampler to the declared schema — Ronacher's runs show it eliminates the bug — but it applies complexity caps (per [Pi PR #6266](https://github.com/earendil-works/pi/pull/6266), 20 strict tools, 24 optional parameters, 16 union parameters per request). The fix is not a one-line toggle for anyone with a non-trivial tool surface.

## Practical implications for builders

- **Enable `strict: true`** on Anthropic API tool definitions where your schema fits the complexity budget. Every object must declare `additionalProperties: false` and you must stay inside the caps.
- **Keep tool JSON schemas shallow when possible.** A single object with scalar fields travels closer to the Claude Code training distribution than a nested array of objects.
- **Treat the post-training prior as Claude-Code-shaped.** Tools that resemble Bash, Edit, Read, Write, Glob, or Grep work better than tools that resemble a domain API. If you can flatten to that shape, do.
- **Regression-test new Claude model releases against your real tool schemas before swapping.** Sonnet 5 and Opus 4.8 are not drop-in replacements for Sonnet 4.6 or Opus 4.5 on tool-calling workloads.
- **For `edit`-style tools, prefer a single object with a `replacement` string field** over a structured object inside an array. That is the shape the model has been trained on.

## Risks and caveats

- This is a single-author analysis with reproducible experiments but no vendor response.
- The root-cause mechanism is a hypothesis, not an Anthropic-confirmed engineering explanation.
- The ~20% figure is the worst-case number in long sessions; a fresh single-turn prompt like "edit this file" reproduces it rarely or not at all.
- The Pi `replacements[]` schema is specific; results may not generalise to every nested-array tool.
- Anthropic has not, at the time of writing, published a statement, a system-card update, or a fix.

## What to watch

- Anthropic's official response: a system-card update, a blog post, or a default change to `strict: true` for the tool-use API.
- Community reproductions on other tool shapes, especially non-edit operations.
- Whether the same regression appears in tool-call evaluations published alongside the next Anthropic model release.
- Pi's own fix path — already tracked in [issue #6278](https://github.com/earendil-works/pi/issues/6278).
- Comparable analyses for other vendors: OpenAI's strict-mode behaviour, Google's function-calling on Gemini.

## Sources

- [Armin Ronacher, *Better Models: Worse Tools* — 2026-07-04](https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/)
- [Pi issue #6278 — 2026-07-03](https://github.com/earendil-works/pi/issues/6278)
- [pasky reproducer gist — 2026-07-04](https://gist.github.com/pasky/18f04581d4e74097279a6b4dd52ab261)
- [Anthropic — Tool use / function calling overview](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview)
- [AI Newsroom — *Sonnet 5 narrows gap to Opus* (2026-07-01)](/articles/claude-sonnet-5-narrows-gap-to-opus/)
