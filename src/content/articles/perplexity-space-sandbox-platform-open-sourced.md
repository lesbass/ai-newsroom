---
title: "Perplexity open-sourced SPACE, the sandbox layer behind Computer"
description: "Perplexity open-sourced SPACE, the Firecracker microVM layer behind Computer. The code is inspectable; its security and speed numbers remain vendor-reported."
pubDate: 2026-10-22
author: "AI Newsroom"
tags:
  - perplexity
  - space
  - firecracker
  - sandboxes
  - agent-infrastructure
  - security
  - open-source
highRiskClaims: true
image: "/images/articles/perplexity-space-sandbox-platform-open-sourced/hero.png"
imageAlt: "Screenshot of the Perplexity blog post 'Open-sourcing SPACE, the sandbox platform behind Computer', showing the three-line headline, the dek about safer autonomous AI agents, and the date OCT 15, 2026."
imageCredit: "Source: https://www.perplexity.ai/hub/blog/open-sourcing-space · Captured 2026-10-21 with headless Chromium · Credit: Perplexity · License: no license stated for the page; screenshot by AI Newsroom"
canonicalURL: "https://news.lesbass.com/articles/perplexity-space-sandbox-platform-open-sourced/"
sources:
  - title: "Perplexity: Open-sourcing SPACE, the sandbox platform behind Computer"
    url: "https://www.perplexity.ai/hub/blog/open-sourcing-space"
    date: 2026-10-15
    type: primary
  - title: "Perplexity Engineering: Making SPACE — secure and efficient runtimes for long-running agents"
    url: "https://www.perplexity.ai/hub/blog/making-space-secure-and-efficient-runtimes-for-long-running-agents"
    date: 2026-07-15
    type: primary
  - title: "perplexityai/SPACE repository (README, LICENSE, docs)"
    url: "https://github.com/perplexityai/SPACE"
    date: 2026-10-21
    type: primary
  - title: "SPACE docs: Architecture"
    url: "https://github.com/perplexityai/SPACE/blob/main/docs/architecture.md"
    date: 2026-10-21
    type: primary
  - title: "SPACE docs: Installation and configuration"
    url: "https://github.com/perplexityai/SPACE/blob/main/docs/installation.md"
    date: 2026-10-21
    type: primary
  - title: "SPACE docs: E2B Compatibility Wrapper"
    url: "https://github.com/perplexityai/SPACE/blob/main/docs/ecw.md"
    date: 2026-10-21
    type: primary
  - title: "SPACE docs: Operator egress profiles"
    url: "https://github.com/perplexityai/SPACE/blob/main/docs/egress-profiles.md"
    date: 2026-10-21
    type: primary
  - title: "SPACE SECURITY.md: supported versions"
    url: "https://github.com/perplexityai/SPACE/blob/main/SECURITY.md"
    date: 2026-10-21
    type: primary
  - title: "SPACE docs: Versioning and compatibility"
    url: "https://github.com/perplexityai/SPACE/blob/main/docs/versioning.md"
    date: 2026-10-21
    type: primary
  - title: "SPACE hosted guide"
    url: "https://space.docs.perplexity.ai/guide/index.html"
    date: 2026-10-15
    type: primary
---

Perplexity published SPACE (Sandboxed Platform for Agentic Code Execution) under Apache-2.0 on October 15, 2026. It is the Firecracker microVM layer behind Computer: one VM per task with pause, branch, restore, and credentials outside the guest. The code is auditable; the speed and security numbers remain Perplexity's own.

## What happened

The repository is Rust, created October 1, 2026, with no tags or releases; its versioning doc still calls "SPACE 0.8.0" the public baseline ([GitHub, accessed 2026-10-21](https://github.com/perplexityai/SPACE)). Perplexity says SPACE replaced a commercial provider in July and now handles "millions of sandbox creations per day"; by July 15, all Computer sessions ran on it.

Partner help is limited: Akamai "has tested and launched" it; Crusoe "is partnering" to add it to Managed AI Services; CoreWeave "has published setup guidance" for evaluation on CKS. None is a generally available third-party deployment.

Perplexity's latency comparison ran on the same production traffic across launch week:

| Metric | Previous provider | SPACE | Improvement |
|---|---|---|---|
| Median create | 185 ms | 60 ms | 3.1x |
| p90 create | 447 ms | 89 ms | 5.0x |

Perplexity summarizes this as "three to five times faster." Security is also self-reported: "no escape from the virtual machine to the host in 108 attempts," though "some found ways around network restrictions," which Perplexity says it fixed. Neither succeeded on retest, and no independent party has reproduced either result.

## Why it matters

Containers assume short-lived, stateless jobs. Agent sessions can run for months with a live filesystem. A per-task microVM gives each workload its own kernel, so a guest-kernel exploit stays inside that VM. SPACE is a rare public reference for reconciliation, snapshots, and egress policy.

## How it works

Each sandbox is a microVM with its own guest kernel. An in-guest `space` daemon brokers filesystem and process access but never talks to clients directly; it uses a private in-VM channel, leaving the sandbox network for workload traffic. A network gateway forces egress through one policy point ([architecture](https://github.com/perplexityai/SPACE/blob/main/docs/architecture.md)).

- **Control plane:** stateless; PostgreSQL holds desired state. Controllers reconcile, and lifecycle calls are asynchronous, returning an operation ID.
- **Node services:** the sandbox manager runs unprivileged; the node manager is the single root broker. Credential manager, network gateway, and volume manager handle injection, egress, and object storage.
- **Lifecycle:** running keeps memory and filesystem; paused keeps memory resident on the worker, not durable; suspended snapshots the VM and can restore on any node.
- **Snapshots:** disk snapshots are frequent, full VM checkpoints less so. A snapshot becomes restorable only after every artifact lands, preventing a corrupt resume.
- **Secrets and egress:** the credential store sits outside the sandbox, scopes credentials hierarchically, rate-limits and audits access, and injects at the network layer or browser fill; BYOK/KMS keys never enter the guest. Egress profiles are additive allowlists chosen at create via header, immutable, and not stored with the sandbox ([egress profiles](https://github.com/perplexityai/SPACE/blob/main/docs/egress-profiles.md)).
- **Efficiency:** warm pools keep pods with materialized templates ready; writable roots are copy-on-write clones.

## Practical implications

- **Audit the boundary.** Ask where the daemon is reachable, which service holds root, and whether credentials can enter the VM.
- **Reuse the invariants.** Artifact-complete snapshots and desired-state reconciliation are portable beyond Firecracker.
- **Treat E2B compatibility as a bridge, not parity.** Tested with Python `e2b==2.21.1` and `e2b-code-interpreter==2.6.2`; not a versioned E2B spec, the JavaScript SDK is untested, and only the latest minor is supported ([ECW guide](https://github.com/perplexityai/SPACE/blob/main/docs/ecw.md)).
- **Budget for the host.** Needs apt-based Linux x86_64 with KVM, nested virtualization, privileged Docker, btrfs, and loop devices; not macOS; Kind is the documented path ([installation](https://github.com/perplexityai/SPACE/blob/main/docs/installation.md)).

## Risks and caveats

A bad egress profile, credential path, or over-privileged role turns isolation into exposure. Cluster operators, node manager, and object storage are in the trusted base.

- **No releases, but a supported-version promise.** `SECURITY.md` fixes only "the most recent minor release"; with zero tagged releases, that promise maps to nothing downloadable.
- **Template provenance is yours.** `SPACE_TRUSTED_TEMPLATE_STORAGE_BUCKETS` restricts new artifacts but does not audit existing releases or replace publisher authorization. Pin template digests.
- **It is young and self-reported.** Three weeks in public means churn; the 108-attempt result is a vendor claim, not an audit.

## What to watch

First tagged release and a matching supported-version policy. Independent review or reproduction of the escape and egress tests. Whether partner deployments preserve the isolation model. Windows and local-machine targets, intended but not shipped.

## Sources

- [Perplexity, "Open-sourcing SPACE," 2026-10-15](https://www.perplexity.ai/hub/blog/open-sourcing-space)
- [Perplexity Engineering, "Making SPACE," 2026-07-15](https://www.perplexity.ai/hub/blog/making-space-secure-and-efficient-runtimes-for-long-running-agents)
- [perplexityai/SPACE, Apache-2.0, accessed 2026-10-21](https://github.com/perplexityai/SPACE), plus [architecture](https://github.com/perplexityai/SPACE/blob/main/docs/architecture.md), [installation](https://github.com/perplexityai/SPACE/blob/main/docs/installation.md), [ECW](https://github.com/perplexityai/SPACE/blob/main/docs/ecw.md), [egress profiles](https://github.com/perplexityai/SPACE/blob/main/docs/egress-profiles.md), [SECURITY.md](https://github.com/perplexityai/SPACE/blob/main/SECURITY.md), [versioning](https://github.com/perplexityai/SPACE/blob/main/docs/versioning.md), and the [hosted guide](https://space.docs.perplexity.ai/guide/index.html)

![GitHub page for perplexityai/SPACE on 2026-10-21, showing Apache-2.0, 1.8k stars, 149 forks, 0 tags, and "No releases published."](/images/articles/perplexity-space-sandbox-platform-open-sourced/github-repo.png)

*Screenshot: [github.com/perplexityai/SPACE](https://github.com/perplexityai/SPACE), captured 2026-10-21. Credit: Perplexity. License: Apache-2.0 for repository content; no license stated for the page layout.*
