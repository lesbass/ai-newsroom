#!/usr/bin/env bash
# One-command production deploy used when Cloudflare Workers Builds is failing.
#
# Requires:
#   CLOUDFLARE_API_TOKEN  account API token with Workers Scripts:Edit
#   CLOUDFLARE_ACCOUNT_ID Cloudflare account id
#
# Usage:
#   CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... scripts/deploy-fallback.sh

set -euo pipefail

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" || -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "error: set CLOUDFLARE_API_TOKEN (Workers Scripts:Edit) and CLOUDFLARE_ACCOUNT_ID" >&2
  exit 1
fi

CHECK_URL="${CHECK_URL:-https://news.lesbass.com}"

# Deploy only reviewed content. The build reads the working tree, so an
# uncommitted article draft or image would otherwise go straight to production.
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "error: run this script from a git checkout of ai-newsroom" >&2
  exit 1
fi
if [[ "${ALLOW_DIRTY:-0}" != "1" ]]; then
  dirty="$(git status --porcelain --untracked-files=all -- src/content public)"
  if [[ -n "$dirty" ]]; then
    echo "error: uncommitted content under src/content or public; commit or clean it before deploying:" >&2
    echo "$dirty" | sed 's/^/  /' >&2
    echo "       (set ALLOW_DIRTY=1 only for a deliberate local deploy)" >&2
    exit 1
  fi
fi

npm ci
npm run build
npm run test:seo
npm run test:dates
npm run test:mobile
npx wrangler deploy

for attempt in 1 2 3 4 5; do
  if CHECK_URL="$CHECK_URL" npm run test:deploy-freshness; then
    exit 0
  fi
  if [[ "$attempt" == "5" ]]; then
    echo "error: production did not become fresh at $CHECK_URL" >&2
    exit 1
  fi
  sleep 15
done
