---
title: "Cloudflare `wrangler deploy --temporary` for AI agents"
description: "Cloudflare shipped `wrangler deploy --temporary` on 2026-06-19: a CLI flag that provisions a temporary Cloudflare account, deploys a Worker, and prints a claim URL — 60 minutes to claim, no human in the loop."
pubDate: 2026-06-22
author: "AI Newsroom"
tags: ["cloudflare", "cloudflare-workers", "wrangler", "ai-agents", "agentic-ai", "developer-tools", "cli", "deployment", "temporary-accounts", "workers-dev", "auth", "agent-auth", "frictionless-deploy", "simon-willison", "gpt-5-5"]
image: "https://cf-assets.www.cloudflare.com/zkvhlag99gkb/60PB1NmcYFywT5TDlwDR0v/a9e72c980e108702e00b57343ea1ccb2/OG_Share_2024-2025-2026__39_.png"
imageAlt: "Cloudflare Temporary Accounts for AI agents social card"
imageCredit: "Image: Cloudflare blog / Temporary Accounts announcement (June 19, 2026)"
sources:
  - title: "Cloudflare blog — 'Temporary Cloudflare Accounts for AI agents' (Sid Chatterjee, Celso Martinho, Brendan Irvine-Broque)"
    url: "https://blog.cloudflare.com/temporary-accounts/"
    date: 2026-06-19
    type: primary
  - title: "Cloudflare developer docs — 'Claim deployments (temporary accounts)' (page last modified 2026-06-19)"
    url: "https://developers.cloudflare.com/workers/platform/claim-deployments/"
    date: 2026-06-19
    type: primary
  - title: "Simon Willison — 'Temporary Cloudflare Accounts for AI agents' (independent test with GPT-5.5 xhigh in Codex Desktop)"
    url: "https://simonwillison.net/2026/Jun/21/temporary-cloudflare-accounts/"
    date: 2026-06-21
    type: secondary
  - title: "Simon Willison — GPT-5.5 xhigh in Codex Desktop session gist (the model-side evidence for the --temporary flag)"
    url: "https://gist.github.com/simonw/264bd6b8a39fc34c91c9c867454c64b9"
    date: 2026-06-21
    type: secondary
  - title: "Simon Willison — cloudflare-redirect-resolver test repo (the Worker Simon's agent deployed)"
    url: "https://github.com/simonw/cloudflare-redirect-resolver"
    date: 2026-06-21
    type: secondary
  - title: "Cloudflare developer docs — 'Install and update' the Wrangler CLI (4.102.0 minimum)"
    url: "https://developers.cloudflare.com/workers/wrangler/install-and-update/"
    date: 2026-06-19
    type: primary
  - title: "Cloudflare developer docs — Wrangler `deploy` command reference (the --temporary flag spec)"
    url: "https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy"
    date: 2026-06-19
    type: primary
  - title: "Cloudflare blog — Cloudflare + Stripe partnership for agent provisioning (referenced from the temporary-accounts post)"
    url: "https://blog.cloudflare.com/agents-stripe-projects/"
    date: 2026-06-19
    type: secondary
  - title: "WorkOS — auth.md (OAuth-based agent provisioning protocol co-designed with Cloudflare, referenced from the temporary-accounts post)"
    url: "https://workos.com/auth-md"
    date: 2026-06-19
    type: secondary
  - title: "Hacker News discussion on the temporary-accounts announcement (context only)"
    url: "https://news.ycombinator.com/item?id=48608394"
    date: 2026-06-21
    type: secondary
highRiskClaims: false
---

On **2026-06-19**, Cloudflare shipped `wrangler deploy --temporary` — a Wrangler CLI flag that provisions a temporary Cloudflare account, deploys a Worker to a `workers.dev` URL, and prints a claim URL. No human in the loop. No API token. No OAuth. No Cloudflare account. The deployment stays live for **60 minutes**; within that window a human can open the claim URL, sign in or sign up, and convert the temporary account into a permanent one. If nobody claims it, Cloudflare deletes the temporary account and its deployments automatically ([Cloudflare blog, 2026-06-19](https://blog.cloudflare.com/temporary-accounts/); [Cloudflare developer docs, 2026-06-19](https://developers.cloudflare.com/workers/platform/claim-deployments/)). On **2026-06-21**, independent developer [Simon Willison](https://simonwillison.net/2026/Jun/21/temporary-cloudflare-accounts/) confirmed the flow end-to-end with **GPT-5.5 xhigh in Codex Desktop**.

This is the most concrete engineering response so far in 2026 to the *auth wall* that has stalled autonomous deploys. It is also, clearly, a Cloudflare product feature, not an industry standard.

## What shipped

**The blog post (2026-06-19).** ["Temporary Cloudflare Accounts for AI agents"](https://blog.cloudflare.com/temporary-accounts/) was authored by **Sid Chatterjee**, **Celso Martinho**, and **Brendan Irvine-Broque** at Cloudflare. The framing: *"the moment an agent needs to deploy something — and needs to sign up and create an account — it slams face-first into a wall built for humans."* The technical core is the new `wrangler deploy --temporary` flag. When an agent runs `wrangler deploy` without credentials, the CLI now prints a message suggesting `--temporary`, so the agent can discover the flag without being told by a human. Cloudflare provisions a temporary account, gives Wrangler an API token, and prints a claim URL.

**The developer docs (page last modified 2026-06-19).** ["Claim deployments (temporary accounts)"](https://developers.cloudflare.com/workers/platform/claim-deployments/) documents the full flow, the supported-products table, the limits, and the abuse-prevention posture. `--temporary` returns an error if the CLI can already use OAuth, `CLOUDFLARE_API_TOKEN`, or a global API key.

**Simon Willison's independent test (2026-06-21).** Simon ran GPT-5.5 xhigh in Codex Desktop, had the agent build and deploy a [cloudflare-redirect-resolver](https://github.com/simonw/cloudflare-redirect-resolver) Worker. Verdict: *"The temporary deployment worked as advertised."* His [claim-UI screenshot](https://static.simonwillison.net/static/2026/cloudflare-claim.jpg) shows the account-claim page with a 49:26 countdown timer.

## The flow

1. Update Wrangler to **4.102.0 or later** ([install-and-update docs](https://developers.cloudflare.com/workers/wrangler/install-and-update/)).
2. The agent runs `npx wrangler deploy --temporary`. The CLI prints:
   > Temporary account ready: Account: `example-name` (created). Claim within: 60 minutes. Claim URL: `https://dash.cloudflare.com/claim-preview?claimToken=<TOKEN>`. Deployed `example-worker` triggers `https://example-worker.example-name.workers.dev`.
3. Within the 60-minute window, Wrangler caches the temporary account and reuses it for subsequent `wrangler deploy --temporary` runs. The cache is cleared by `wrangler login` or `wrangler logout`.
4. A human opens the claim URL, signs in or signs up, and converts the temporary account into a permanent one. The Worker and its resources attach.

## Supported products and limits

| Product | Temporary preview account limit |
| --- | --- |
| Workers | Deployments on `workers.dev` |
| Workers Static Assets | ≤1,000 files, each ≤5 MiB |
| Workers KV | Commands that use temporary credentials |
| D1 | One database, ≤100 MB |
| Durable Objects | Commands that use temporary credentials |
| Hyperdrive | ≤2 configs, ≤10 connections |
| Queues | ≤10 |
| SSL/TLS | Commands that use temporary credentials |

Anything outside this list (R2, Pages, Stream, Email Workers) is not yet supported via `--temporary`. The docs also call out four behaviors that are easy to miss: a **proof-of-work** check before account creation, **rate limits** on temporary account creation, opaque **abuse prevention** checks, and the fact that **claim URLs are sensitive** — the token in the URL is the credential.

## Why it matters

1. **The auth wall is the single biggest visible blocker for autonomous agents in 2026.** Browser-based OAuth flows, copy-paste of API tokens, and MFA prompts stop background agents cold. `--temporary` is the first widely-deployed CLI-level response from a major platform that does not require the agent to discover a custom protocol.
2. **Tight write → deploy → verify loops are essential for agent productivity.** An agent can write code, deploy, curl the result, and verify the output in a single session without any human interaction.
3. **The industry is converging on a few specific patterns.** The blog references the [Cloudflare + Stripe partnership](https://blog.cloudflare.com/agents-stripe-projects/) for provisioning and the [WorkOS `auth.md`](https://workos.com/auth-md) collaboration. Each is a different shape of the same problem: how does an agent get credentials in a world built for humans?

## Practical implications

- **The invocation is one line.** `npx wrangler deploy --temporary`. Wrangler 4.102.0+ is required.
- **Iteration is supported within the 60-minute window** via cached credentials.
- **The supported products table is the truth.** R2, Pages, Stream, Email Workers are not yet supported.
- **The production path is unchanged.** Use `wrangler login` or `CLOUDFLARE_API_TOKEN` for production and CI/CD.

## Risks and caveats

1. **This is a Cloudflare product, not an industry standard.** Vercel, Netlify, Render, Fly, and Railway do not have a public `--temporary`-equivalent flag as of 2026-06-22.
2. **The 60-minute TTL is short for some real workloads.** Long-running training or multi-day batch jobs will be reclaimed.
3. **Supported products and limits are narrow.** D1 to one database, Hyperdrive to two configurations, Queues to ten.
4. **Claim URLs grant ownership of the temporary account. Treat them as sensitive credentials.**
5. **Abuse prevention is opaque.** Additional abuse checks and rate limits may silently block agents.
6. **Simon Willison's test is a single user, single model, single project.** Generalisation from one test is a classic pitfall.
7. **"For AI agents" is partly marketing.** Simon's own write-up flags: *"the AI hook isn't really necessary."*

## What to watch

1. **Whether other platforms ship equivalent features** and the rough shape (CLI flag vs. dashboard shortcut vs. protocol).
2. **Adoption in agent frameworks** — Claude Code, Codex, Cursor, Aider, smolagents.
3. **Expansion of supported products and limits.**
4. **Abuse and rate-limit behaviour at scale.**
5. **Convergence with WorkOS `auth.md` and the Cloudflare + Stripe partnership.**

## Sources

- [Cloudflare blog — "Temporary Cloudflare Accounts for AI agents" (2026-06-19)](https://blog.cloudflare.com/temporary-accounts/)
- [Cloudflare developer docs — "Claim deployments (temporary accounts)" (2026-06-19)](https://developers.cloudflare.com/workers/platform/claim-deployments/)
- [Cloudflare developer docs — "Install and update" the Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- [Cloudflare developer docs — Wrangler `deploy` command reference](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy)
- [Cloudflare blog — Cloudflare + Stripe partnership for agent provisioning (2026-06-19)](https://blog.cloudflare.com/agents-stripe-projects/)
- [Simon Willison — "Temporary Cloudflare Accounts for AI agents" (2026-06-21)](https://simonwillison.net/2026/Jun/21/temporary-cloudflare-accounts/)
- [Simon Willison — GPT-5.5 xhigh in Codex Desktop session gist (2026-06-21)](https://gist.github.com/simonw/264bd6b8a39fc34c91c9c867454c64b9)
- [Simon Willison — cloudflare-redirect-resolver test repo (2026-06-21)](https://github.com/simonw/cloudflare-redirect-resolver)
- [WorkOS — `auth.md` (2026-06-19)](https://workos.com/auth-md)
- [Hacker News discussion on the temporary-accounts announcement (2026-06-21)](https://news.ycombinator.com/item?id=48608394)
