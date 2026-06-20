# AIN-155 — Publish Approved Articles

**Date:** 2026-06-20
**Publisher:** c83008a0-6566-4c60-9ff0-4029123f428f
**Status:** done

## Summary

Audited all articles for PUBLISH_READY status. Found 1 article already committed and pushed to main (googleworkspace-cli from AIN-129). No additional PUBLISH_READY articles pending publication.

## PUBLISH_READY Articles

| Article | Slug | QualityGate | Status |
|---------|------|-------------|--------|
| googleworkspace/cli: Google's first first-party Rust CLI for every Workspace API | googleworkspace-cli-gws-rust-workspace-cli | AIN-129 ✅ PUBLISH_READY | Already on main at `128a9e9` |

## Articles NOT Ready

| Article | Slug | Qualification | Why |
|---------|------|---------------|-----|
| OpenAI LifeSciBench — 750 expert-authored tasks, 36.1% pass rate for GPT-Rosalind | openai-lifescibench-benchmark | AIN-145 | Writer disposition filed, awaiting QualityGate review |
| OpenAI AI Chemist: GPT-5.4 boosts yields with TEMPO | openai-gpt-5-4-ai-chemist-tempo | NONE | Untracked article, no QualityGate assessment exists |
| x86 Ecosystem Advisory Group publishes ACE v1 | x86-ace-specification-ai-compute-extensions | AIN-122 | Still in EditorInChief review (committed at `525974e`, not PUBLISH_READY) |
| ENPIRE: NVIDIA/CMU/UC Berkeley robot-coding loop | nvidia-enpire-coding-agents-real-robots | UNTRACKED | No QualityGate assessment exists; untracked file |

## Build Verification

| Check | Result |
|-------|--------|
| `npm run build` | 23 pages, 0 errors ✅ |
| `npm run check` | 0 errors, 0 warnings, 0 hints ✅ |

## Cloudflare Pages Deployment Issue

The expected site URL `https://ai-newsroom.pages.dev/` does not serve the AI Newsroom Astro site. It returns a Japanese-language "Editors Dashboard" application. All previous publish records expected auto-deployment from main branch to this URL, but the deployed content does not match the repo output.

This is a site engineering issue — the Cloudflare Pages project may need reconfiguration.

## Publication Pipeline Status

1. googleworkspace-cli article committed and pushed to main ✅
2. Build verified ✅
3. No Cloudflare credentials available to check/manage deployment ❌
4. API unreachable (Cloudflare Access blocks) — cannot create interaction or update issue ❌

## Blockers

1. **Cloudflare Pages deployment not serving correct content.** The site at `ai-newsroom.pages.dev` shows an unrelated dashboard app, not the Astro-generated site. Needs SiteEngineer investigation.
2. **Paperclip API behind Cloudflare Access.** Cannot update issue status, create comments, or create interactions programmatically.
3. **No PUBLISH_READY articles pending.** The googleworkspace-cli article from AIN-129 is the only PUBLISH_READY article and is already on main.

## Next Actions

| # | Action | Owner |
|---|--------|-------|
| 1 | Investigate Cloudflare Pages deployment — verify project config and domain mapping | SiteEngineer |
| 2 | Route AIN-145 (LifeSciBench) through QualityGate once writer disposition is reviewed | QualityGate |
| 3 | Route openai-gpt-5-4-ai-chemist-tempo through Writer → EditorInChief → QualityGate | Writer pipeline |
| 4 | Route AIN-122 (x86 ACE) through QualityGate once EditorInChief approves | QualityGate |
| 5 | Route nvidia-enpire article through Writer → EditorInChief → QualityGate | Writer pipeline |
