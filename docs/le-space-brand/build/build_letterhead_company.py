#!/usr/bin/env python3
"""Le-Space company letterhead (no personal name), DE/EN — PDF version."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "briefkopf")
PNG = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logo", "png")
os.makedirs(OUT, exist_ok=True)

pdfmetrics.registerFont(TTFont("Sans", "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold", "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Mono", "/usr/share/fonts/truetype/noto/NotoSansMono-Regular.ttf"))

INK="#141B2E"; CORAL_L="#E8503F"; CYAN_L="#0E86C4"; GREY="#4A5468"; LIGHT="#6B7690"; RULE="#D8DEE9"
def hexc(x): return HexColor(x)

COMPANY = "Le-Space"
STREET = "Lichtenberg 44"
CITY = "D-84307 Eggenfelden"
COUNTRY = "Germany"
PHONE = "+49 174 9 89 19 49"
MAIL = "nico.krause@le-space.de"
WEB = "le-space.de"

STR = {
 "de": {"claim": "Der Local-First Peer-to-Peer Stack",
        "date": "Eggenfelden, __.__.____"},
 "en": {"claim": "The Local-First Peer-to-Peer Stack",
        "date": "Eggenfelden, ____-__-__"},
}

def build(lang):
    path = os.path.join(OUT, f"briefkopf-le-space-{lang}.pdf")
    c = pdfcanvas.Canvas(path, pagesize=A4)
    c.setTitle(f"Le-Space Briefkopf ({lang})")
    W, H = A4
    M = 25*mm
    # header logo
    img = ImageReader(os.path.join(PNG, "le-space-logo-horizontal-light@2048.png"))
    iw, ih = img.getSize()
    lw = 52*mm; lh_ = lw*ih/iw
    c.drawImage(img, M, H - 18*mm - lh_, lw, lh_, mask='auto')
    c.setFont("Sans", 7); c.setFillColor(hexc(LIGHT))
    c.drawString(M, H - 20*mm - lh_ - 2, STR[lang]["claim"])
    # right company block
    rx = W - M; ry = H - 16*mm
    c.setFont("Sans-Bold", 8.5); c.setFillColor(hexc(INK))
    c.drawRightString(rx, ry, COMPANY); ry -= 10
    c.setFont("Sans", 7.5); c.setFillColor(hexc(GREY))
    for t in (STREET, CITY, COUNTRY):
        c.drawRightString(rx, ry, t); ry -= 9.4
    ry -= 3
    c.setFont("Mono", 6.6); c.setFillColor(hexc(GREY))
    for t in (PHONE, MAIL, WEB):
        c.drawRightString(rx, ry, t); ry -= 8.8
    # rule
    yline = H - 23*mm - lh_
    c.setStrokeColor(hexc(RULE)); c.setLineWidth(0.8)
    c.line(M, yline, W - M, yline)
    c.setStrokeColor(hexc(CORAL_L)); c.setLineWidth(1.6)
    c.line(M, yline, M + 18*mm, yline)
    # DIN 5008 sender line above address window (~45mm from top)
    c.setFont("Sans", 6.5); c.setFillColor(hexc(LIGHT))
    c.drawString(M, H - 45*mm, f"{COMPANY} · {STREET} · {CITY} · {COUNTRY}")
    # recipient placeholder
    c.setFont("Sans", 9); c.setFillColor(hexc("#B4BccA".replace("cc","CC")))
    c.setFillColor(hexc("#B4BCCA"))
    yy = H - 52*mm
    for ln in (["[Empfängeradresse]"] if lang == "de" else ["[Recipient address]"]):
        c.drawString(M, yy, ln); yy -= 12
    # date
    c.setFont("Sans", 9); c.setFillColor(hexc("#9AA3B5"))
    c.drawRightString(W - M, H - 85*mm, STR[lang]["date"])
    # footer
    fy = 16*mm
    c.setStrokeColor(hexc(RULE)); c.setLineWidth(0.8)
    c.line(M, fy + 8*mm, W - M, fy + 8*mm)
    c.setStrokeColor(hexc(CYAN_L)); c.setLineWidth(1.6)
    c.line(W - M - 18*mm, fy + 8*mm, W - M, fy + 8*mm)
    c.setFont("Mono", 6.3); c.setFillColor(hexc(LIGHT))
    c.drawString(M, fy + 3.2*mm, f"{COMPANY} — {STR[lang]['claim']}")
    c.drawString(M, fy, f"{STREET} · {CITY} · {COUNTRY} · {PHONE} · {MAIL} · {WEB}")
    # mesh motif
    bx, by = W - M - 2*mm, fy + 1*mm
    c.setFillColor(hexc(CORAL_L))
    c.circle(bx - 8*mm, by, 1.9*mm, stroke=0, fill=1)
    c.setStrokeColor(hexc(CYAN_L)); c.setLineWidth(1.1)
    c.circle(bx, by + 4.5*mm, 1.1*mm, stroke=1, fill=0)
    c.line(bx - 6.3*mm, by + 1.4*mm, bx - 1.2*mm, by + 3.8*mm)
    c.showPage()
    c.save()
    print("letterhead:", os.path.basename(path))

for lang in ("de", "en"):
    build(lang)
print("DONE")
