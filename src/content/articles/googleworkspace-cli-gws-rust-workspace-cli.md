---
title: "Google Workspace CLI (gws): Rust CLI for Workspace APIs"
description: "googleworkspace/cli (gws) is a first-party Rust CLI for every Workspace API, built dynamically from the Google Discovery Service, with 95 skill directories and opt-in Model Armor sanitization."
pubDate: 2026-06-18
author: "AI Newsroom"
tags: ["google-workspace", "gws", "cli", "rust", "google-api", "gemini-cli", "agent-skills", "model-armor", "prompt-injection", "oauth2", "discovery-service", "npm", "developer-tools", "repository-feature"]
image: "https://opengraph.githubassets.com/1/googleworkspace/cli"
imageAlt: "Google Workspace CLI open-source repository social preview card"
imageCredit: "Image: GitHub / googleworkspace/cli repository (Apache 2.0)"
sources:
  - title: "googleworkspace/cli — GitHub repository metadata (stars, forks, license, dates)"
    url: "https://api.github.com/repos/googleworkspace/cli"
    date: 2026-06-18
    type: primary
  - title: "googleworkspace/cli — main README.md (binary name, install paths, auth flows, NOTE blocks, Model Armor, Gemini extension)"
    url: "https://raw.githubusercontent.com/googleworkspace/cli/main/README.md"
    date: 2026-06-18
    type: primary
  - title: "googleworkspace/cli — Releases (30 tags between 2026-03-05 and 2026-03-31, latest v0.22.5)"
    url: "https://api.github.com/repos/googleworkspace/cli/releases"
    date: 2026-06-18
    type: primary
  - title: "googleworkspace/cli — LICENSE (Apache-2.0)"
    url: "https://raw.githubusercontent.com/googleworkspace/cli/main/LICENSE"
    date: 2026-06-18
    type: primary
  - title: "googleworkspace/cli — docs/skills.md (17 services + 29 helpers + 10 personas + 41 recipes breakdown)"
    url: "https://raw.githubusercontent.com/googleworkspace/cli/main/docs/skills.md"
    date: 2026-06-18
    type: primary
  - title: "googleworkspace/cli — skills/ directory listing (95 skill directories)"
    url: "https://api.github.com/repos/googleworkspace/cli/contents/skills"
    date: 2026-06-18
    type: primary
  - title: "googleworkspace/cli — contributors (jpoehnelt 124, googleworkspace-bot 62, github-actions[bot] 12)"
    url: "https://api.github.com/repos/googleworkspace/cli/contributors?per_page=10"
    date: 2026-06-18
    type: primary
  - title: "googleworkspace/cli — open issues + PRs search (84 issues + 16 PRs ≈ 103 open)"
    url: "https://api.github.com/search/issues?q=repo:googleworkspace/cli+is:open+is:issue"
    date: 2026-06-18
    type: primary
  - title: "@googleworkspace/cli — npm registry metadata (latest 0.22.5, created 2026-03-03)"
    url: "https://registry.npmjs.org/@googleworkspace/cli"
    date: 2026-06-18
    type: primary
  - title: "@googleworkspace/cli — npm weekly downloads (31,992, week ending 2026-06-16)"
    url: "https://api.npmjs.org/downloads/point/last-week/@googleworkspace/cli"
    date: 2026-06-16
    type: primary
  - title: "Google API Discovery Service — official documentation (the architectural hook `gws` is built on)"
    url: "https://developers.google.com/discovery"
    date: 2026-06-18
    type: primary
  - title: "Google Cloud — Model Armor product page (prompt-injection and unsafe-content sanitization)"
    url: "https://cloud.google.com/security/products/model-armor"
    date: 2026-06-18
    type: primary
highRiskClaims: false
---

On **2026-03-02**, the `googleworkspace` organization on GitHub published [`googleworkspace/cli`](https://github.com/googleworkspace/cli). The binary, **`gws`**, is a Rust command-line client for every Workspace API surface (Drive, Gmail, Calendar, Sheets, Docs, Slides, Forms, Tasks, Chat, Meet, Keep, Classroom, People, Admin, Model Armor, Script, Events, Workflow). The CLI is built dynamically against Google's [Discovery Service](https://developers.google.com/discovery): it does not ship a static method list, but instead fetches each service's Discovery Document at runtime, builds the `clap::Command` tree from it, and re-parses `argv` ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md)). As of **2026-06-18**, the repository carries **27,134 stars, 1,426 forks, 95 skill directories, and 31,992 weekly npm downloads** — and the README opens with two caveats the article must lead with: *"This is **not** an officially supported Google product"* and *"This project is under active development. Expect breaking changes as we march toward v1.0"* ([`googleworkspace/cli` repository, 2026-06-18](https://api.github.com/repos/googleworkspace/cli); [npm weekly downloads, week ending 2026-06-16](https://api.npmjs.org/downloads/point/last-week/@googleworkspace/cli)).

## What it is

**The `gws` binary.** The binary name is `gws`; the recommended install path is a pre-built binary from GitHub Releases. The npm package is `@googleworkspace/cli`. The repository is **98.5% Rust** and the license is **Apache-2.0** ([repository metadata, 2026-06-18](https://api.github.com/repos/googleworkspace/cli); [LICENSE, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/LICENSE)). The top contributor is `jpoehnelt` (Jeremy Poehnelt, Google Workspace Developer Relations) with 124 contributions, followed by `googleworkspace-bot` (62) and `github-actions[bot]` (12) ([contributors API, 2026-06-18](https://api.github.com/repos/googleworkspace/cli/contributors?per_page=10)).

**Install paths.** Five install paths: a pre-built binary from GitHub Releases (recommended), `npm install -g @googleworkspace/cli`, `cargo install gws`, Nix, and `brew install googleworkspace-cli`. The npm package was created on **2026-03-03**, one day after the repository itself ([npm registry, 2026-06-18](https://registry.npmjs.org/@googleworkspace/cli)).

**Auth flows.** Four OAuth2 / credential flows: (1) **interactive login** via `gws auth login`, (2) **headless CI** via `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE`, (3) **service-account** credentials, and (4) a **pre-obtained token** flow. Credentials are encrypted at rest with **AES-256-GCM** under a passphrase-derived key ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md)). Nine `GOOGLE_WORKSPACE_CLI_*` environment variables override defaults for paths, the Model Armor template, the sanitize mode, the OAuth client ID, and the credential passphrase.

**The Discovery Service hook — the genuine technical claim.** On first invocation of `gws <service>`, the CLI reads the service name, fetches that service's Google Discovery Document over HTTPS, builds a `clap::Command` tree from the Discovery Document's `methods[*]` array, and re-parses `argv` against that tree before performing OAuth and HTTP ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md); [Google API Discovery Service, 2026-06-18](https://developers.google.com/discovery)). When Google adds a new Workspace API method, `gws` picks it up on the next invocation without a code change and without a release — the architectural differentiator that justifies the "first first-party unified CLI" framing.

**`+helper` shortcuts.** The project ships **24 hand-curated `+helper` commands** prefixed with `+` so they never collide with auto-generated method names: `+agenda`, `+today`, `+inbox`, `+unread`, `+upload`, `+append`, and so on. The CLI supports `--page-all` for full-payload NDJSON streaming and `--format json` for structured output ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md)).

## Why it matters

**First first-party unified CLI for Workspace.** Until now, Workspace power users had to choose between `curl` plus a hand-rolled Discovery Document parser, the per-language `google-api-python-client` and `googleapis` Node libraries, or third-party CLIs like `gcloud` (which covers Admin but does not go deep on Gmail / Calendar / Sheets). `gws` is the first project published under the `googleworkspace` org that ships a single binary covering all 18+ Workspace surfaces, with structured JSON output, five install paths, four auth flows, and an Apache-2.0 license. The 31,992 weekly npm downloads and 27,134 stars confirm real adoption ([npm weekly downloads, 2026-06-16](https://api.npmjs.org/downloads/point/last-week/@googleworkspace/cli)).

**Agent-native out of the box.** The project ships **95 skill directories** indexed in [`docs/skills.md`](https://raw.githubusercontent.com/googleworkspace/cli/main/docs/skills.md): 17 service skills, 29 helper skills, 10 persona bundles, and 41 multi-step recipes. The install path is the cleanest "give your agent the entire Workspace surface" path in the open-source ecosystem: **`npx skills add https://github.com/googleworkspace/cli`**. The first-party **Gemini CLI extension** ships in the same repository and is installed with `gemini extensions install https://github.com/googleworkspace/cli` ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md)).

**Model Armor integration — the under-reported story.** Most third-party coverage focuses on the agent-skill / Gemini-extension angle. The load-bearing differentiator for AI agent safety is the **Model Armor integration**. The README documents a dedicated `modelarmor` service skill with three helper commands: `+sanitize-prompt` (sanitize a user prompt), `+sanitize-response` (sanitize a model response), and `+create-template`. The mechanism is `--sanitize "projects/P/locations/L/templates/T"` (or the `GOOGLE_WORKSPACE_CLI_SANITIZE_TEMPLATE` and `GOOGLE_WORKSPACE_CLI_SANITIZE_MODE` env vars) ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md); [Model Armor product page, 2026-06-18](https://cloud.google.com/security/products/model-armor)).

For an AI Newsroom primary reader — an ML engineer using Workspace as an agent data source — this is the most important feature. A Workspace API can return attacker-controlled content (an email body, a Doc comment, a Chat message) that the agent will then read. With Model Armor enabled in `block` mode, `gws` refuses to return content that Model Armor flags.

## What to watch

1. The next release tag (currently **v0.22.5, dated 2026-03-31**; no new release in 11 weeks).
2. Whether `GOOGLE_WORKSPACE_CLI_SANITIZE_MODE` defaults flip from `warn` to `block`.
3. More helper commands beyond the current 24 `+helper` shortcuts.
4. Workspace API surface additions auto-tracked via the Discovery Service hook.

## Risks and caveats

1. **Not officially supported by Google.** *"This is **not** an officially supported Google product"* is the first line of the README, repeated in the closing line ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md)). There is no SLA.
2. **v0.22.x, not v1.** *"This project is under active development. Expect breaking changes as we march toward v1.0"* is the second `> NOTE` block ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md)). The latest tag is v0.22.5 from 2026-03-31.
3. **No release since 2026-03-31.** The repository shipped **30 release tags between 2026-03-05 and 2026-03-31** and no further release tag in the 11 weeks since ([releases API, 2026-06-18](https://api.github.com/repos/googleworkspace/cli/releases)). Commits are still landing, but the release pause is real.
4. **OAuth2 testing-mode scope limits.** The `recommended` scope preset has 85+ scopes, which exceeds the ~25-scope cap for unverified apps in OAuth testing mode — especially for `@gmail.com` accounts. The fix is `gws auth login -s drive,gmail,sheets` to pick scopes per service ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md)).
5. **Model Armor is opt-in, default `warn`.** The default `GOOGLE_WORKSPACE_CLI_SANITIZE_MODE` is `warn`, not `block` ([README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md)). In an agent context, set `GOOGLE_WORKSPACE_CLI_SANITIZE_MODE=block` explicitly.

## Verdict

`googleworkspace/cli` is the first first-party unified CLI for Google Workspace: a single Rust binary built dynamically against the [Google Discovery Service](https://developers.google.com/discovery), with 95 skill directories, a Gemini CLI extension, and an opt-in [Model Armor](https://cloud.google.com/security/products/model-armor) integration that scans API responses for prompt injection. The 27,134 stars, 1,426 forks, and **31,992 weekly npm downloads** confirm real adoption ([repository metadata, 2026-06-18](https://api.github.com/repos/googleworkspace/cli); [npm weekly downloads, 2026-06-16](https://api.npmjs.org/downloads/point/last-week/@googleworkspace/cli)). The 30 release tags from v0.4.4 to v0.22.5 — all between 2026-03-05 and 2026-03-31, with no new release in 11 weeks — and the README's `> NOTE` blocks set the honest frame ([releases API, 2026-06-18](https://api.github.com/repos/googleworkspace/cli/releases); [README, 2026-06-18](https://raw.githubusercontent.com/googleworkspace/cli/main/README.md)).
