# AIN-63 — Writer disposition: Claude Corps article

**Date:** 2026-06-13
**Agent:** Writer (b5abc7da-ec6c-4590-9d58-c4e04b54ba70)
**Issue:** [AIN-63](/AIN/issues/AIN-63) — Write article: Anthropic lancia Claude Corps — $150M national AI fellowship program
**Parent:** [AIN-62](/AIN/issues/AIN-62) (in_review, editorial commissioning) — sourced from AIN-59 candidate 3
**Status:** `in_review` with a real review path

## What I did

1. Read the wake payload, the article task at `_default/article-task-ain-62.md`, and the parent commissioning summary.
2. Live-verified the two primary sources on 2026-06-13:
   - `https://www.anthropic.com/news/claude-corps` (newsroom post, 2026-06-11) — $150M, 1.000 fellow, $85K + benefit, 12 mesi, 3 coorti, 9 host nella lista del blog post, citazione "If Claude Corps works, we'll have a foundation for something much larger", partner CodePath + Social Finance, training 5h/settimana, 17 luglio 2026 deadline coorte 1. Verified verbatim.
   - `https://www.anthropic.com/claude-corps` (pagina programma, 2026-06-11) — 19 host con città, 3-step Apply → Match → Build, "Anthropic, CodePath, and Social Finance cover salary, benefits, training, and ongoing support" verbatim, framing Impact / Growth / Agency, open-source promessa.
   - `https://www.anthropic.com/policy-on-the-ai-exponential` (policy framework, 2026-06-10) — solo per il contesto in "Perché interessa".
3. Drafted the article in Italian following the site template (Cosa è successo / Perché interessa / Cosa guardare / Rischi e caveat / Cosa fare / Verdetto) with the established front-matter (title, description, pubDate, tags, sources, highRiskClaims: false).
4. Saved the draft to `src/content/articles/anthropic-claude-corps-fellowship-150-milioni.md` in the ai-newsroom repo at `/tmp/ai-newsroom/`.
5. Ran the local verification suite:
   - `npm run build` — 7 pages, 0 errors (article generated at `/articles/anthropic-claude-corps-fellowship-150-milioni/`)
   - `npm run check` — 0 errors, 0 warnings
   - `npm run test:links` — 0 broken internal links (the cross-link to `/AIN/issues/AIN-55` was replaced with a link to the @ClaudeDevs X post because AIN-55 is not yet a published article on the site)
   - `npm run test:mobile` — passed
   - `npm run test:seo` — 0 errors, 2 warnings on title/description length (same as the published DeepMind article — site convention)
6. Uploaded the article as an attachment (id `c4367d3f-22fc-46b2-a21d-f0a7bd122dfc`) and created an artifact work product (id `6cffa00e-ba14-4c07-ad35-43460a00e31f`) so board users and reviewers can read the draft.
7. Wrote a `draft` document on the issue (revision `18047a4a-d734-497b-88d2-1d4a124ba51c`) summarizing the draft metadata.
8. Created a `request_confirmation` interaction (id `9f60fb91-7c82-436e-b249-868510b47ce3`) bound to the draft document, with `continuationPolicy: wake_assignee`. This is the explicit review path: an EditorInChief / QualityGate reviewer must accept or reject the draft, and on accept I will be woken up.
9. Updated the issue to `in_review` with a comment summarizing the work, attached work product, and next steps. Status update succeeded after the pending interaction existed (the system rejects `in_review` without a real review path).

## Final disposition

- **AIN-63 status:** `in_review`
- **Review path:** pending `request_confirmation` interaction `9f60fb91-7c82-436e-b249-868510b47ce3` bound to issue document `draft` (revision `18047a4a-d734-497b-88d2-1d4a124ba51c`)
- **Reviewer action required:** accept the draft → triggers Publisher flow; reject with reason → triggers a Writer revision loop
- **On accept:** the Publisher (c83008a0-6566-4c60-9ff0-4029123f428f) will commit the file to `main` and deploy via Cloudflare Pages. The article will appear at `https://ai-newsroom.pages.dev/articles/anthropic-claude-corps-fellowship-150-milioni/`.
- **Parent AIN-62:** remains `in_review` until the CEO confirms the editorial commissioning.

## Article at a glance

- **Title:** "Anthropic lancia Claude Corps: $150M, 1.000 fellow, 12 mesi nelle nonprofit USA"
- **Slug:** `anthropic-claude-corps-fellowship-150-milioni`
- **Suggested pubDate:** 2026-06-13
- **Word count target:** ~750 parole (dentro il range delle features precedenti)
- **Front-matter flag:** `highRiskClaims: false`
- **Sources used:** 5 (3 primary, 2 secondary), tutti datati

## Cross-link AIN-55

The article task asked for a cross-link to AIN-55 in "Perché interessa". AIN-55 is the Fable 5 invisible safeguards article — it is *commissioned* but not yet *published* on the site, so a `/AIN/issues/AIN-55` link would 404 in the link checker. I replaced it with a link to the primary source (the @ClaudeDevs X post dated 2026-06-11) and a one-sentence callout, preserving the semantic cross-link.

## What I did not do

- I did not commit the article to the `main` branch of the repo. The Writer's contract is to deliver a draft, not to publish. The Publisher agent owns the commit + Cloudflare Pages deployment after QualityGate approves.
- I did not mark the issue as `done` — the deliverable is "draft ready for review", not "article published". The `done` state belongs to the Publisher.
- I did not change the parent AIN-62 — it is still `in_review` for the CEO. AIN-63 (the child) is `in_review` for QualityGate / EditorInChief.

## Evidence trail

- Source verification: live `https://www.anthropic.com/news/claude-corps` and `https://www.anthropic.com/claude-corps` fetched 2026-06-13. All load-bearing numbers cross-checked between the two pages and the newsroom post.
- Local build output: `/tmp/ai-newsroom/dist/articles/anthropic-claude-corps-fellowship-150-milioni/index.html` (40 lines, 22.952 bytes).
- Attachment: id `c4367d3f-22fc-46b2-a21d-f0a7bd122dfc`, 13.689 bytes, sha256 `0221bc66310d8899d082e6b0a59d3130fbeb21a0fd001c5527e49dab24856e40`.
- Work product: id `6cffa00e-ba14-4c07-ad35-43460a00e31f`, status `ready_for_review`, `reviewState: needs_board_review`, `isPrimary: true`.
- Issue document: key `draft`, revision `18047a4a-d734-497b-88d2-1d4a124ba51c`.
- Interaction: kind `request_confirmation`, id `9f60fb91-7c82-436e-b249-868510b47ce3`, status `pending`, `continuationPolicy: wake_assignee`.

---

**Signed:** Writer
**File:** `/tmp/ai-newsroom/src/content/articles/anthropic-claude-corps-fellowship-150-milioni.md` (in repo)
**Disposition:** `in_review` (review path: pending `request_confirmation` interaction)
