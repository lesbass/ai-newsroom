---
title: "walgit turns an S3 bucket into a stateless Git server — the open-source implementation of Cursor's \"Continuity\" design"
description: "walgit turns any S3 or GCS bucket into a stateless Git server — one Rust binary, MIT-licensed, an open implementation of Cursor's 'Continuity' design."
pubDate: 2026-08-26
author: "AI Newsroom"
tags:
  - walgit
  - git
  - rust
  - s3
  - gcs
  - object-storage
  - stateless
  - cursor
  - continuity
  - tobias-lutke
  - shopify
  - git-hosting
  - open-source
image: "/images/articles/walgit-cursor-continuity/hero.svg"
imageAlt: "Generated editorial diagram showing walgit's architecture: three stateless walgit instances push and read from an S3/GCS bucket via CAS on a manifest, with UDP gossip between instances. The bucket is the source of truth; each instance is a disposable cache."
imageCredit: "Generated editorial image · Model/tool: hand-authored SVG · Disclosure: AI-generated, not source evidence"
sources:
  - title: "tobi/walgit — GitHub repository (MIT, Rust, ~1.7K stars, 92 forks, created 2026-08-23, owner: Tobias Lütke)"
    url: "https://github.com/tobi/walgit"
    date: 2026-08-26
    type: primary
  - title: "tobi/walgit — README (capabilities, architecture, configuration, explicit lineage to Cursor's Continuity post)"
    url: "https://github.com/tobi/walgit#readme"
    date: 2026-08-26
    type: primary
  - title: "Cursor engineering blog — 'Git at any scale' (Vicent Martí, 2026-08-18, Continuity architecture, scale figures)"
    url: "https://cursor.com/blog/git-at-any-scale"
    date: 2026-08-18
    type: primary
  - title: "tobi/walgit — docs/reference/cursor-git-at-any-scale.md (verbatim copy of Cursor post kept in-tree)"
    url: "https://github.com/tobi/walgit/blob/main/docs/reference/cursor-git-at-any-scale.md"
    date: 2026-08-26
    type: primary
  - title: "GitHub API — tobi/walgit repo metadata (stars, forks, license, language, dates)"
    url: "https://api.github.com/repos/tobi/walgit"
    date: 2026-08-26
    type: secondary
highRiskClaims: false
---

**walgit** is a single Rust binary that turns an S3 or GCS bucket into a stateless Git server. Created on **August 23, 2026** by [Tobias Lütke](https://github.com/tobi) (Shopify CEO), it implements the architecture Cursor described in [*Git at any scale*](https://cursor.com/blog/git-at-any-scale) — the system Cursor calls Continuity ([README, 2026-08-26](https://github.com/tobi/walgit#readme)). The repository has **~1,700 GitHub stars** and **92 forks** in three days ([GitHub API, 2026-08-26](https://api.github.com/repos/tobi/walgit)).

## Why it matters

Git hosting at scale has been stuck on Spokes: application-level replication with three-phase commit across a fixed replica set, a routing database, and local NVMe as the source of truth. Cursor's Continuity post ([cursor.com/blog/git-at-any-scale, 2026-08-18](https://cursor.com/blog/git-at-any-scale)) laid out a different design: **make a write-ahead log in object storage the source of truth, and make every on-disk repository a cache.** A push is stored as an immutable object and becomes visible only when a tiny manifest is rewritten with compare-and-swap (CAS). That CAS *is* the consensus — no election, no quorum, no primary.

walgit takes that architecture and ships it as open-source Rust ([README, 2026-08-26](https://github.com/tobi/walgit#readme)). For developers running agent-heavy workloads — throwaway repos per task, burst CI on monorepos, read replicas without a routing DB — this is the first self-hostable implementation of the pattern.

## How it works

The repository stores everything under `repos/<owner>/<repo>/` in the bucket ([README, 2026-08-26](https://github.com/tobi/walgit#readme)):

- **manifest.pb** — tiny, CAS-rewritten. Head sequence, live pack set, checkpoint pointer, settings. The linearization point.
- **log/*.pb** — immutable entries: PUSH, COMPACT, CHECKPOINT, SETTINGS.
- **wal/*.pack** — content-addressed packs with side-files (idx, rev, bitmap, commit-graph).
- **checkpoints/** — folded ref snapshot + pack inventory for cold starts.
- **bundles/** — `bundles/list` for clones, `bundles/catchup` for fetches.
- **leases/** — CAS with TTL, the only cross-instance mutex.

**A push** indexes the pack, checks connectivity and policy, uploads pack + idx + log entry, then CASes the manifest. On a 412 (concurrent conflict), it re-reads, re-validates every ref, and retries ([README, 2026-08-26](https://github.com/tobi/walgit#readme)).

**A read** does one conditional GET of the manifest. A 304 means serve from local cache; a 200 means apply new entries before serving. Reads are consistent without coordination.

**The bucket is the repository.** Every local disk is a cache. Kill all instances and you lose warmth, nothing else.

## What it does

walgit supports ([README, 2026-08-26](https://github.com/tobi/walgit#readme)):

- **Smart HTTP v0/v2** — fetch (filter/shallow/deepen/sideband-all), push (atomic, deletes, tags, push options, report-status-v2), `owner/repo` namespaces, SHA-1 and SHA-256 repos.
- **bundle-uri** — fresh clones download a full + chain from the bucket; catch-ups download exactly the slots missed. Static files the bucket or CDN hands out.
- **LFS** — batch API, objects in the bucket, optional read-through from an upstream server.
- **Web UI + API** — React tree/blob/commits/diffs UI, JSON API under `/{owner}/{repo}/api/*`, streaming SSE for long answers. `repos.js` SDK for pages, agents, and scripts.
- **Per-repo push policy** — protected refs, groups, fast-forward only, bypass lists.
- **Auth** — `none` (loopback), `token` (static tokens), `oidc` (any OpenID Connect issuer).
- **Stores** — S3, S3-compatible (AWS, MinIO, rustfs, R2, Ceph), GCS, in-memory (test only). No SSH transport.

## Practical implications

- **One-binary deployment.** `walgit serve --config walgit.toml`. No database, no routing table, no local state that matters.
- **Disposable replicas.** Agent workloads creating millions of throwaway repos get one replica each. Idle repos are garbage-collected; the next fetch materializes from the WAL.
- **Burst CI for monorepos.** Scale read replicas horizontally — the Continuity design Cursor tested with 100 replicas and saw consistent linear scaling for reads ([Cursor blog, 2026-08-18](https://cursor.com/blog/git-at-any-scale)).
- **Cost model.** Round trips to the bucket are the budget. Cursor reports ~120 pushes/s on S3 Standard, ~300 on S3 Express One Zone ([Cursor blog, 2026-08-18](https://cursor.com/blog/git-at-any-scale)). walgit implements the same pattern.
- **repos.js SDK.** Dependency-free SDK for building pages, agent interfaces, and scripts against the API.

## Risks and caveats

- **Three days old.** Created August 23, 2026. No tagged releases, 3 contributors, 3 open issues as of August 26 ([GitHub API](https://api.github.com/repos/tobi/walgit)). Treat as early-stage.
- **Owner-centric early project.** The repository is owned by a single GitHub user, tobi (Tobias Lütke), with two other contributors so far. Supply-chain caution applies — no multi-maintainer review gate yet.
- **Requires object storage.** You need S3/GCS credentials and a bucket. Token or OIDC auth only; no org RBAC UI.
- **Scale figures are Cursor's, not walgit's.** The ~120 pushes/s and ~300 pushes/s numbers come from Cursor's stress tests of the Continuity design, not from walgit benchmarks ([Cursor blog, 2026-08-18](https://cursor.com/blog/git-at-any-scale)).
- **Architecture lineage is explicit.** walgit keeps a verbatim copy of the Cursor post under `docs/reference/` and credits it in the README. This is an implementation of Cursor's design, not an independent invention.

## What to watch

- **First tagged release** — when does walgit ship a versioned binary?
- **First independent benchmark** — someone other than Cursor measuring push throughput on the walgit binary.
- **First non-Lütke major feature** — community contribution that shapes the project's direction.
- **Agent-harness adoption** — does walgit show up as the Git backend in dsh, Codex CLI, or similar tooling?
- **Cursor publishing Continuity details** walgit doesn't reproduce — the blog post is the public spec; the implementation may diverge.
- **bundle-uri config for multi-tenant buckets** — how walgit handles shared storage across organizations.

## Sources

| # | Source | Type | Date | URL |
|---|---|---|---|---|
| 1 | tobi/walgit — GitHub repository (MIT, Rust, ~1.7K stars, 92 forks) | Primary | 2026-08-26 | https://github.com/tobi/walgit |
| 2 | tobi/walgit — README (capabilities, architecture, Cursor lineage) | Primary | 2026-08-26 | https://github.com/tobi/walgit#readme |
| 3 | Cursor engineering blog — "Git at any scale" (Vicent Martí, Continuity architecture) | Primary | 2026-08-18 | https://cursor.com/blog/git-at-any-scale |
| 4 | tobi/walgit — docs/reference/cursor-git-at-any-scale.md (verbatim copy) | Primary | 2026-08-26 | https://github.com/tobi/walgit/blob/main/docs/reference/cursor-git-at-any-scale.md |
| 5 | GitHub API — tobi/walgit repo metadata | Secondary | 2026-08-26 | https://api.github.com/repos/tobi/walgit |
