#!/usr/bin/env bash
# One-command production deploy used when Cloudflare Workers Builds is failing.
#
# Requires:
#   CLOUDFLARE_API_TOKEN  account API token with Workers Scripts:Edit
#
# Optional:
#   CLOUDFLARE_ACCOUNT_ID defaults to the ai-newsroom production account
#
# Usage:
#   CLOUDFLARE_API_TOKEN=... scripts/deploy-fallback.sh

set -euo pipefail

CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-4adb3952e18826ca172f446428e1b2a3}"
export CLOUDFLARE_ACCOUNT_ID

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "error: set CLOUDFLARE_API_TOKEN (Workers Scripts:Edit)" >&2
  exit 1
fi

CHECK_URL="${CHECK_URL:-https://news.lesbass.com}"

# Deploy only reviewed content. The build reads the working tree, so an
# uncommitted article draft or image would otherwise go straight to production.
node scripts/check-deploy-clean.mjs

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
