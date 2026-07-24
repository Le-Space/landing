# Build-Skripte

Regenerieren alle Brand-Assets (Pfade relativ zum Paketordner):

| Skript | Erzeugt |
|---|---|
| build_brand.py | Logo-SVGs, PNGs, Favicons, OG-Image |
| build_styleguide.py | Le-Space-Brand-Style-Guide.pdf |
| build_stationery.py | Visitenkarten-PDFs (+ alte personalisierte Briefköpfe) |
| build_letterhead_company.py | Firmen-Briefkopf-PDFs (aktuell) |
| build_docx_letterheads.py | Word-Briefvorlagen (aktuell) |

Abhängigkeiten: Python 3 mit `fonttools`, `pycairo`, `reportlab`, `python-docx`, `pillow`.

Hinweis: Die Skripte referenzieren Linux-Fontpfade
(`/usr/share/fonts/truetype/noto/NotoSansMono-Bold.ttf`, Liberation Sans).
Auf macOS Fontpfade anpassen (z.B. auf JetBrains Mono / Inter, dann stimmen
Wortmarke und Style Guide sogar exakt mit den Original-Brand-Fonts überein).
