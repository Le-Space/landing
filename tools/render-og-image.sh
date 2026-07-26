#!/usr/bin/env sh
# Renders tools/og-image.svg to sites/local-first/public/og-image.png (1200x630).
# Uses whichever SVG renderer is installed — no npm dependency.
set -eu

root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
src="$root/tools/og-image.svg"
out="$root/sites/local-first/public/og-image.png"

if command -v rsvg-convert >/dev/null 2>&1; then
  rsvg-convert -w 1200 -h 630 "$src" -o "$out"
elif command -v inkscape >/dev/null 2>&1; then
  inkscape "$src" --export-type=png --export-filename="$out" -w 1200 -h 630
elif command -v magick >/dev/null 2>&1; then
  magick -background none -density 96 "$src" -resize 1200x630 "$out"
else
  echo "need one of: rsvg-convert, inkscape, magick" >&2
  exit 1
fi

# The card is opaque and flat-coloured, so drop the alpha channel and squeeze
# it — crawlers refetch this file often and the raw render is ~4x larger.
if command -v magick >/dev/null 2>&1; then
  magick "$out" -background "#0b0e15" -alpha remove -alpha off -strip \
    -define png:compression-level=9 "$out"
fi
command -v optipng >/dev/null 2>&1 && optipng -quiet -o5 "$out"

echo "wrote $out"
