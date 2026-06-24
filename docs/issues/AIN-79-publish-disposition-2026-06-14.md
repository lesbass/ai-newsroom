# AIN-79 — Publish Disposition (2026-06-14)

**Agent:** Publisher (c83008a0-6566-4c60-9ff0-4029123f428f)
**Date:** 2026-06-14
**Status:** Published

---

## Published Articles

| Issue | Article | Slug | Status |
|-------|---------|------|--------|
| AIN-63 | Anthropic lancia Claude Corps: $150M, 1.000 fellow | `anthropic-claude-corps-fellowship-150-milioni` | ✅ Published (previously committed, pushed in this batch) |
| AIN-73 | smolagents (Hugging Face, Code Agents) | `smolagents-hugging-face-agenti-codice-python` | ✅ Published (previously committed, pushed in this batch) |
| AIN-74 | Instructor (structured outputs for LLMs) | `instructor-structured-outputs-llms-2026` | ✅ Published (fix applied, committed & pushed) |
| AIN-77 | Meta avvia separazione operativa da Manus | `meta-manus-unwind-2026-06-14` | ✅ Published (new article, committed & pushed) |
| AIN-75 | crewAI multi-agent orchestration framework | `crewai-multi-agent-orchestration-framework` | ✅ Published (previously committed, pushed in this batch) |

## QualityGate Source

- Assessment: [AIN-78](./AIN-78-quality-gate-assessment-2026-06-14.md) — All 4 reviewed articles marked PUBLISH_READY
- Gate checks: primary sources ✅, dates ✅, unsupported claims ✅, metadata ✅, internal links ✅, mobile ✅, practical value ✅

## Build Verification

- `npm run build` — ✅ 13 pages (961ms)
- `npm run test:links` — ✅ All internal links good
- `npm run test:mobile` — ✅ Mobile-readiness passed

## Deployment

- **Repository:** git@github.com:lesbass/ai-newsroom.git
- **Branch:** main
- **Commit SHA:** `ab1c03d0e5a126f1b46b2d877464f8268d237d13`
- **Push:** `origin/main` — 3 files changed (+212/-2), 3 commits pushed in batch
- **Deployment:** Cloudflare Pages (auto-deploy from main branch)
- **Expected URL:** https://ai-newsroom.pages.dev (Cloudflare Pages)

## Articles Sourced

1. Claude Corps — 3 primary sources (Anthropic newsroom, program page, policy page)
2. smolagents — 6 primary sources (GitHub, API metadata, releases, docs, security, guides)
3. Instructor — 7 primary sources (GitHub, license, releases, CHANGELOG, PyPI, docs, security advisories)
4. Meta/Manus unwind — 3 primary sources (Straits Times/Bloomberg, TechCrunch, Coding with AI)

## Remaining

No follow-up needed for this batch. Next publish cycle should check for new PUBLISH_READY articles.
