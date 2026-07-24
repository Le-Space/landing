#!/usr/bin/env python3
"""Le-Space business cards (85x55mm +3mm bleed, 2-sided) and A4 letterheads."""
import os, math
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PNG = os.path.join(OUT, "logo", "png")
CARD_DIR = os.path.join(OUT, "visitenkarten")
LH_DIR = os.path.join(OUT, "briefkopf")
os.makedirs(CARD_DIR, exist_ok=True)
os.makedirs(LH_DIR, exist_ok=True)

pdfmetrics.registerFont(TTFont("Sans", "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold", "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Mono", "/usr/share/fonts/truetype/noto/NotoSansMono-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Mono-Bold", "/usr/share/fonts/truetype/noto/NotoSansMono-Bold.ttf"))

DEEP="#0B0E15"; NEBULA="#141926"; HORIZON="#232B3D"; STAR="#EDF1F8"; DUST="#A8B3C7"
COMET="#6B7690"; CORAL="#FF6B5B"; CORAL_L="#E8503F"; CYAN="#58C7F3"; CYAN_L="#0E86C4"; INK="#141B2E"
def hexc(x): return HexColor(x)

NAME = "Nico Krause"
PHONE = "+49 174 9 89 19 49"
MAIL = "nico.krause@le-space.de"
WEB = "le-space.de"
COUNTRY = "Germany"

VARIANTS = [
    ("ceo-de", "de", ["Geschäftsführer"]),
    ("ceo-en", "en", ["CEO"]),
    ("research-de", "de", ["Research- & Incubation-Engineer für", "P2P-Konnektivität und Local-First-Speicher"]),
    ("research-en", "en", ["Research and Incubation Engineer for Peer-to-Peer", "Connectivity and Local-First Storage"]),
    ("ai-guide-de", "de", ["AI Walking & Coding Guide"]),
    ("ai-guide-en", "en", ["AI Walking & Coding Guide"]),
]
TAGLINE = {"de": "Daten und Software, die dir gehören.",
           "en": "Software you can keep."}

# ---------------- business cards ----------------
BLEED = 3*mm
CW, CH = 85*mm + 2*BLEED, 55*mm + 2*BLEED   # page incl. bleed
TX, TY = BLEED, BLEED                        # trim origin
CARD_STARS = [(0.15,0.85,0.9,.3),(0.45,0.92,0.7,.22),(0.78,0.88,1.0,.28),(0.92,0.65,0.7,.2),
              (0.85,0.28,0.9,.25),(0.6,0.12,0.7,.2),(0.08,0.35,0.8,.22),(0.3,0.2,0.6,.18)]

def card_bg(c):
    c.setFillColor(hexc(DEEP)); c.rect(0, 0, CW, CH, stroke=0, fill=1)
    for fx, fy, r, o in CARD_STARS:
        c.saveState(); c.setFillColor(hexc(STAR), alpha=o)
        c.circle(CW*fx, CH*fy, r, stroke=0, fill=1); c.restoreState()

def build_card(key, lang, title_lines):
    path = os.path.join(CARD_DIR, f"visitenkarte-{key}.pdf")
    c = pdfcanvas.Canvas(path, pagesize=(CW, CH))
    c.setTitle(f"Le-Space Visitenkarte {key}")
    # ---- front ----
    card_bg(c)
    in_l = TX + 7*mm; in_t = CH - TY - 7*mm
    # mark top-left + wordmark
    img = ImageReader(os.path.join(PNG, "le-space-mark-dark@1024.png"))
    msz = 11*mm
    c.drawImage(img, in_l - 1.5*mm, in_t - msz + 1*mm, msz, msz, mask='auto')
    c.setFont("Mono-Bold", 10.5); c.setFillColor(hexc(STAR))
    wx = in_l + msz + 0.5*mm; wy = in_t - msz/2 - 3
    w1 = pdfmetrics.stringWidth("Le", "Mono-Bold", 10.5)
    w2 = pdfmetrics.stringWidth("-", "Mono-Bold", 10.5)
    c.drawString(wx, wy, "Le")
    c.setFillColor(hexc(CORAL)); c.drawString(wx+w1, wy, "-")
    c.setFillColor(hexc(STAR)); c.drawString(wx+w1+w2, wy, "Space")
    # name + title
    ny = TY + 24*mm
    c.setFont("Sans-Bold", 13); c.setFillColor(hexc(STAR))
    c.drawString(in_l, ny, NAME)
    c.setFillColor(hexc(CORAL))
    ty_ = ny - 11
    fs = 6.3 if len(title_lines) > 1 else 7.5
    c.setFont("Sans", fs)
    for ln in title_lines:
        c.drawString(in_l, ty_, ln)
        ty_ -= fs + 2.2
    # contact block bottom
    c.setFont("Mono", 6.4)
    cy = TY + 12.2*mm
    for label, val, col in (("M", PHONE, DUST), ("@", MAIL, DUST), ("W", WEB, DUST)):
        c.setFillColor(hexc(CYAN)); c.drawString(in_l, cy, {"M":"tel","@":"mail","W":"web"}[label])
        c.setFillColor(hexc(col)); c.drawString(in_l + 11*mm, cy, val)
        cy -= 9.2
    c.setFillColor(hexc(COMET)); c.drawString(in_l + 11*mm, cy, COUNTRY)
    c.showPage()
    # ---- back ----
    card_bg(c)
    img2 = ImageReader(os.path.join(PNG, "le-space-logo-stacked-dark@1024.png"))
    iw, ih = img2.getSize()
    bw = 30*mm; bh = bw*ih/iw
    c.drawImage(img2, (CW-bw)/2, (CH-bh)/2 + 3*mm, bw, bh, mask='auto')
    c.setFont("Mono", 6.2); c.setFillColor(hexc(DUST))
    c.drawCentredString(CW/2, (CH-bh)/2 - 2*mm, TAGLINE[lang])
    c.showPage()
    c.save()
    print("card:", os.path.basename(path))

for key, lang, tl in VARIANTS:
    build_card(key, lang, tl)

# ---------------- letterheads (A4, light) ----------------
W, H = A4
LH_STR = {
 "de": {"foot": "Le-Space — Der Local-First Peer-to-Peer Software Stack",
        "date": "Germany, ", "tel": "Tel."},
 "en": {"foot": "Le-Space — The Local-First Peer-to-Peer Software Stack",
        "date": "Germany, ", "tel": "Phone"},
}

def build_letterhead(key, lang, title_lines):
    path = os.path.join(LH_DIR, f"briefkopf-{key}.pdf")
    c = pdfcanvas.Canvas(path, pagesize=A4)
    c.setTitle(f"Le-Space Briefkopf {key}")
    M = 25*mm
    # header logo (light)
    img = ImageReader(os.path.join(PNG, "le-space-logo-horizontal-light@2048.png"))
    iw, ih = img.getSize()
    lw = 52*mm; lh_ = lw*ih/iw
    c.drawImage(img, M, H - 18*mm - lh_, lw, lh_, mask='auto')
    # right contact block
    rx = W - M
    ry = H - 16*mm
    c.setFont("Sans-Bold", 8.5); c.setFillColor(hexc(INK))
    c.drawRightString(rx, ry, NAME); ry -= 10
    c.setFont("Sans", 7); c.setFillColor(hexc(CORAL_L))
    for ln in title_lines:
        c.drawRightString(rx, ry, ln); ry -= 8.6
    ry -= 3
    c.setFont("Mono", 6.6); c.setFillColor(hexc("#4A5468"))
    for val in (PHONE, MAIL, WEB, COUNTRY):
        c.drawRightString(rx, ry, val); ry -= 8.8
    # header rule with coral segment
    yline = H - 20*mm - lh_
    c.setStrokeColor(hexc("#D8DEE9")); c.setLineWidth(0.8)
    c.line(M, yline, W - M, yline)
    c.setStrokeColor(hexc(CORAL_L)); c.setLineWidth(1.6)
    c.line(M, yline, M + 18*mm, yline)
    # date placeholder
    c.setFont("Sans", 9); c.setFillColor(hexc("#9AA3B5"))
    c.drawRightString(W - M, yline - 14*mm, LH_STR[lang]["date"] + ("__.__.____" if lang == "de" else "____-__-__"))
    # footer
    fy = 16*mm
    c.setStrokeColor(hexc("#D8DEE9")); c.setLineWidth(0.8)
    c.line(M, fy + 8*mm, W - M, fy + 8*mm)
    c.setStrokeColor(hexc(CYAN_L)); c.setLineWidth(1.6)
    c.line(W - M - 18*mm, fy + 8*mm, W - M, fy + 8*mm)
    c.setFont("Mono", 6.3); c.setFillColor(hexc("#6B7690"))
    c.drawString(M, fy + 3.2*mm, LH_STR[lang]["foot"])
    c.drawString(M, fy, f"{NAME}  ·  {PHONE}  ·  {MAIL}  ·  {WEB}  ·  {COUNTRY}")
    # small mesh motif bottom right
    bx, by = W - M - 2*mm, fy + 1*mm
    c.setStrokeColor(hexc("#C9D1DE")); c.setLineWidth(1)
    c.setFillColor(hexc(CORAL_L))
    c.circle(bx - 8*mm, by, 1.9*mm, stroke=0, fill=1)
    c.setStrokeColor(hexc(CYAN_L)); c.setLineWidth(1.1)
    c.circle(bx, by + 4.5*mm, 1.1*mm, stroke=1, fill=0)
    c.line(bx - 6.3*mm, by + 1.4*mm, bx - 1.2*mm, by + 3.8*mm)
    c.showPage()
    c.save()
    print("letterhead:", os.path.basename(path))

for key, lang, tl in VARIANTS:
    build_letterhead(key, lang, tl)

print("DONE")
