#!/usr/bin/env sh
# Renders the favicon/app-icon set for a site from the brand SVG sources.
#
#   tools/render-icons.sh <site>     # site = local-first | le-space
#
# Sources (docs/le-space-brand/logo/svg/):
#   le-space-favicon.svg   — simplified mark, legible down to 16px → favicon PNGs + .ico
#   le-space-app-icon.svg  — full mark on a starfield → apple-touch + android-chrome
#
# The site keeps favicon.svg as the primary icon; these are the fallbacks for
# browsers and platforms that ignore SVG favicons (older browsers, iOS
# home screen, Android install prompt).
set -eu

site=${1:-}
[ -n "$site" ] || { echo "usage: $0 <site>" >&2; exit 1; }

root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
brand="$root/docs/le-space-brand/logo/svg"
out="$root/sites/$site/public"
[ -d "$out" ] || { echo "no such site: $site" >&2; exit 1; }

if command -v rsvg-convert >/dev/null 2>&1; then
  render() { rsvg-convert -w "$2" -h "$2" "$1" -o "$3"; }
elif command -v inkscape >/dev/null 2>&1; then
  render() { inkscape "$1" --export-type=png --export-filename="$3" -w "$2" -h "$2"; }
else
  echo "need rsvg-convert or inkscape" >&2
  exit 1
fi

render "$brand/le-space-favicon.svg" 16 "$out/favicon-16x16.png"
render "$brand/le-space-favicon.svg" 32 "$out/favicon-32x32.png"
render "$brand/le-space-app-icon.svg" 180 "$out/apple-touch-icon.png"
render "$brand/le-space-app-icon.svg" 192 "$out/android-chrome-192x192.png"
render "$brand/le-space-app-icon.svg" 512 "$out/android-chrome-512x512.png"

# .ico carries all three classic sizes in one file, so declare it as such in
# the <link sizes> attribute rather than claiming a single resolution.
if command -v magick >/dev/null 2>&1; then
  tmp48=$(mktemp -t ls-icon48).png
  render "$brand/le-space-favicon.svg" 48 "$tmp48"
  magick "$out/favicon-16x16.png" "$out/favicon-32x32.png" "$tmp48" "$out/favicon.ico"
  rm -f "$tmp48"
else
  echo "note: magick missing — favicon.ico not regenerated" >&2
fi

echo "wrote icons to $out"
