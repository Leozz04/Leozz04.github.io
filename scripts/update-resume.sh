#!/usr/bin/env bash
# Pull the latest resume PDF from the private codex-ziqian repo into assets/resume.pdf,
# then commit and push if it changed. Needs `gh` logged in as Leozz04.
#   ./scripts/update-resume.sh            # sync + push
#   ./scripts/update-resume.sh --no-push  # sync only
set -euo pipefail

SRC_REPO="${RESUME_REPO:-Leozz04/codex-ziqian}"
SRC_PATH="${RESUME_PATH:-projects/resume/Ziqian_Zhang_Resume_2027_Corrected.pdf}"

cd "$(dirname "$0")/.."
tmp="$(mktemp)"
gh api -H "Accept: application/vnd.github.raw" "repos/$SRC_REPO/contents/$SRC_PATH" > "$tmp"
head -c 4 "$tmp" | grep -q '%PDF' || { echo "Downloaded file is not a PDF: $SRC_REPO/$SRC_PATH" >&2; exit 1; }

if cmp -s "$tmp" assets/resume.pdf; then
  echo "Resume unchanged."; rm -f "$tmp"; exit 0
fi
mv "$tmp" assets/resume.pdf
echo "Resume updated from $SRC_REPO/$SRC_PATH"

[ "${1:-}" = "--no-push" ] && exit 0
git add assets/resume.pdf
git commit -m "Update resume from $SRC_REPO"
git push
