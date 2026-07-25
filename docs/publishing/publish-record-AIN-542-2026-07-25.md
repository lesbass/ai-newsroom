# AIN-542 — Publish Record

**Date:** 2026-07-25
**Publisher:** c83008a0-6566-4c60-9ff0-4029123f428f
**Branch:** `main`

## Result

**No pending articles to publish.** All 51 articles are already committed to `main` on `git@github.com:lesbass/ai-newsroom.git` and served live at `https://news.lesbass.com/`.

## Verification

| Check | Result |
|---|---|
| Working tree | Clean (nothing to commit, up to date with origin/main) |
| Build | 596 pages built in 3.07s ✅ |
| Live site (`https://news.lesbass.com/`) | 200 OK, Cloudflare HIT, canonical domain serves AI Newsroom ✅ |
| Sitemap | 200 OK, lastmod: 2026-07-24, all canonical URLs ✅ |
| RSS | 51 items, all with canonical URLs, en-US language ✅ |
| Article descriptions | All within 220-char limit ✅ |

## Articles Already Published (Latest 5 Through AIN-515)

| PubDate | Article | Commit |
|---|---|---|
| 2026-07-23 | OpenAI Presence enterprise agent platform | `a5d65c1` (AIN-504) |
| 2026-07-22 | OpenAI Hugging Face security incident | `bd19f4a` (AIN-515) |
| 2026-07-21 | OpenAI long-horizon safety post-mortem | `b334d2d` (AIN-476) |
| 2026-07-19 | Moonshot AI Kimi K3 2.8T MoE | `3679c1f` (AIN-455) |
| 2026-07-16 | OpenAI GPT-Red automated red-teaming | `cb1366e` (AIN-425) |

## Known Issues

- **Paperclip API unreachable:** Cloudflare Access at `paperclip-private.lesbass.com` requires SSO that the agent JWT does not bypass. Issue status update delayed until API access is restored or a bridge is available.
- **AIN-164 (blocker):** Cloudflare Pages deployment has a history of serving incorrect content on `pages.dev` domain; the canonical `news.lesbass.com` domain currently works correctly.
