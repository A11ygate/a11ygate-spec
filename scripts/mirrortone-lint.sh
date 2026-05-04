#!/usr/bin/env bash
# MirrorTone Lint — A11yGate GAAD Outreach Enforcer v0.1
# Usage: bash mirrortone-lint.sh "post content" [platform]
# Exit 0 = PASS · Exit 1 = FAIL

CONTENT="$1"
PLATFORM="${2:-unknown}"
FAIL=0; WARN=0

echo ""
echo "MirrorTone Lint · A11yGate · $PLATFORM"
echo "────────────────────────────────────────"

# Required hashtags
for TAG in "GAAD2026" "A11yGate" "AccessIsTheGate"; do
  if echo "$CONTENT" | grep -qi "$TAG"; then
    echo "✅ #$TAG"
  else
    echo "❌ #$TAG MISSING"; FAIL=1
  fi
done

# Banned: pricing in initial posts
if echo "$CONTENT" | grep -qE '\$[0-9]+|per month|costs [0-9]|founding cohort|50% off'; then
  echo "❌ PRICING DETECTED — initial posts only, DMs for pricing"; FAIL=1
else echo "✅ No pricing leak"; fi

# Banned: defensive language
if echo "$CONTENT" | grep -qiE 'people are wrong|actually we|contrary to|disagree with|to be clear we'; then
  echo "❌ DEFENSIVE LANGUAGE — no reactive engagement in posts"; FAIL=1
else echo "✅ No defensive language"; fi

# Banned: overclaims
if echo "$CONTENT" | grep -qiE 'guaranteed|fully accessible|ADA compliant in minutes|lawsuit.proof|eliminates.*risk|zero.*issue'; then
  echo "❌ OVERCLAIM detected — scope all claims"; FAIL=1
else echo "✅ No overclaims"; fi

# Banned: marketing speak
if echo "$CONTENT" | grep -qiE 'unlock|revolutionize|magic|game.changer|instantly|AI.powered revolution'; then
  echo "❌ BANNED VERB — state, don't convince"; FAIL=1
else echo "✅ No banned verbs"; fi

# Warning: no Standard citation
if echo "$CONTENT" | grep -qiE 'Standard v0\.1|§5\.|AG-AA|novel requirement'; then
  echo "✅ Standard cited"
else
  echo "⚠️  No Standard section cited (required for substantive replies)"; WARN=1
fi

echo "────────────────────────────────────────"
if [ $FAIL -eq 0 ]; then
  echo "PASS ✅ → Ready for V review"
  [ $WARN -gt 0 ] && echo "(1 warning — review before posting)"
  exit 0
else
  echo "FAIL ❌ → Fix issues before V review"
  exit 1
fi
