#!/bin/sh
# Copies the clinic site into the repo. If you see "Permission denied":
#   sudo chown -R "$(whoami)" src index.html package.json package-lock.json public
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
D="$ROOT/_clinic_site_files"
copy() {
  if ! cp "$1" "$2"; then
    echo "Copy failed: $1 -> $2"
    echo "Fix ownership, then re-run:"
    echo "  sudo chown -R \"\$(whoami)\" \"$ROOT/src\" \"$ROOT/index.html\" \"$ROOT/package.json\" \"$ROOT/public\""
    exit 1
  fi
}
for f in siteContent.ts seoJsonLd.ts vite-env.d.ts App.tsx; do
  copy "$D/src/$f" "$ROOT/src/$f"
done
copy "$D/src/App.css" "$ROOT/src/App.css"
copy "$D/src/index.css" "$ROOT/src/index.css"
copy "$D/index.html" "$ROOT/index.html"
copy "$D/package.json" "$ROOT/package.json"
copy "$D/.env.example" "$ROOT/.env.example" 2>/dev/null || true
if [ -w "$ROOT/public" ] 2>/dev/null; then
  copy "$D/robots.txt" "$ROOT/public/robots.txt"
  copy "$D/sitemap.xml" "$ROOT/public/sitemap.xml"
else
  echo "Note: could not write public/robots.txt or sitemap.xml (permission). Copy from _clinic_site_files/ manually if needed."
fi
echo "Applied. Next: npm install && npm run dev"
echo "Optional: cp .env.example .env and set VITE_SITE_URL to your live URL."
