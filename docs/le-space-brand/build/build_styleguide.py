#!/usr/bin/env python3
"""Le-Space Brand Style Guide PDF (reportlab canvas, on-brand dark design)."""
import math, os
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PNG = os.path.join(OUT, "logo", "png")
FAV = os.path.join(OUT, "favicon")
PDF_PATH = os.path.join(OUT, "Le-Space-Brand-Style-Guide.pdf")

W, H = A4  # 595 x 842

# fonts
pdfmetrics.registerFont(TTFont("Sans", "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold", "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Mono", "/usr/share/fonts/truetype/noto/NotoSansMono-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Mono-Bold", "/usr/share/fonts/truetype/noto/NotoSansMono-Bold.ttf"))

# palette
DEEP   = "#0B0E15"
NEBULA = "#141926"
HORIZON= "#232B3D"
STAR   = "#EDF1F8"
DUST   = "#A8B3C7"
COMET  = "#6B7690"
CORAL  = "#FF6B5B"
CORAL_L= "#E8503F"
CYAN   = "#58C7F3"
CYAN_L = "#0E86C4"
MINT   = "#3EDC97"
AMBER  = "#FFC24B"
VIOLET = "#A78BFA"
ERROR  = "#FF4D6A"
INK    = "#141B2E"

c = pdfcanvas.Canvas(PDF_PATH, pagesize=A4)
c.setTitle("Le-Space Brand Style Guide")
c.setAuthor("Le-Space")

MARGIN = 56
page_num = [0]

STARS = [(70,780,1.2,.35),(180,810,0.9,.25),(320,790,1.4,.3),(470,815,1.0,.25),(545,760,1.3,.3),
         (520,700,0.8,.2),(60,120,1.1,.25),(300,60,1.0,.2),(500,90,1.3,.3),(150,70,0.8,.2),
         (420,50,1.0,.22),(560,180,0.9,.2),(40,400,0.9,.18),(570,430,0.9,.18)]

def hexc(x): return HexColor(x)

def stars():
    for x, y, r, o in STARS:
        c.saveState()
        c.setFillColor(hexc(STAR), alpha=o)
        c.circle(x, y, r, stroke=0, fill=1)
        c.restoreState()

def page_bg(dark=True):
    page_num[0] += 1
    c.setFillColor(hexc(DEEP if dark else "#FFFFFF"))
    c.rect(0, 0, W, H, stroke=0, fill=1)
    if dark:
        stars()

def footer(section=""):
    c.setFont("Mono", 6.5)
    c.setFillColor(hexc(COMET))
    c.drawString(MARGIN, 30, "LE-SPACE BRAND STYLE GUIDE — V1.0 — JULI 2026")
    c.drawRightString(W-MARGIN, 30, f"{section.upper()}  ·  {page_num[0]:02d}")

def eyebrow(x, y, text, col=CORAL):
    c.setFont("Mono-Bold", 8.5)
    c.setFillColor(hexc(col))
    c.drawString(x, y, text.upper())

def h1(x, y, text, col=STAR, size=26):
    c.setFont("Sans-Bold", size)
    c.setFillColor(hexc(col))
    c.drawString(x, y, text)

def h3(x, y, text, col=STAR, size=12):
    c.setFont("Sans-Bold", size)
    c.setFillColor(hexc(col))
    c.drawString(x, y, text)

def body(x, y, lines, col=DUST, size=9.5, leading=14.5, font="Sans", maxw=None):
    """lines: list of strings OR a single string to wrap at maxw"""
    c.setFont(font, size)
    c.setFillColor(hexc(col))
    if isinstance(lines, str):
        lines = wrap(lines, font, size, maxw or (W - 2*MARGIN))
    for ln in lines:
        c.drawString(x, y, ln)
        y -= leading
    return y

def wrap(text, font, size, maxw):
    words = text.split()
    out, cur = [], ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if pdfmetrics.stringWidth(t, font, size) <= maxw:
            cur = t
        else:
            out.append(cur); cur = w_
    if cur: out.append(cur)
    return out

def rule(x, y, w_, col=HORIZON, lw=0.8):
    c.setStrokeColor(hexc(col)); c.setLineWidth(lw)
    c.line(x, y, x+w_, y)

def panel(x, y, w_, h_, fill=NEBULA, r=10, stroke=None):
    c.setFillColor(hexc(fill))
    if stroke:
        c.setStrokeColor(hexc(stroke)); c.setLineWidth(1)
    c.roundRect(x, y, w_, h_, r, stroke=1 if stroke else 0, fill=1)

def img(path, x, y, w_=None, h_=None):
    im = ImageReader(path)
    iw, ih = im.getSize()
    if w_ and not h_: h_ = w_*ih/iw
    if h_ and not w_: w_ = h_*iw/ih
    c.drawImage(im, x, y, w_, h_, mask='auto')
    return w_, h_

def header(section, title, sub=None):
    eyebrow(MARGIN, H-72, section)
    h1(MARGIN, H-100, title)
    yy = H-122
    if sub:
        yy = body(MARGIN, yy, sub, maxw=W-2*MARGIN) - 4
    rule(MARGIN, yy, W-2*MARGIN)
    return yy - 24

# ================= COVER =================
page_bg()
img(os.path.join(PNG, "le-space-mark-dark@1024.png"), W/2-80, H/2+60, w_=160)
c.setFont("Mono-Bold", 30)
c.setFillColor(hexc(STAR))
t = "Le"; t2 = "-"; t3 = "Space"
w1 = pdfmetrics.stringWidth(t, "Mono-Bold", 30)
w2 = pdfmetrics.stringWidth(t2, "Mono-Bold", 30)
w3 = pdfmetrics.stringWidth(t3, "Mono-Bold", 30)
x0 = W/2 - (w1+w2+w3)/2
c.drawString(x0, H/2, t)
c.setFillColor(hexc(CORAL)); c.drawString(x0+w1, H/2, t2)
c.setFillColor(hexc(STAR)); c.drawString(x0+w1+w2, H/2, t3)
c.setFont("Mono", 10.5)
c.setFillColor(hexc(DUST))
c.drawCentredString(W/2, H/2-28, "Der Local-First Peer-to-Peer Stack")
eyebrow(W/2-58, H/2-90, "Brand Style Guide", CORAL)
c.setFont("Mono", 8)
c.setFillColor(hexc(COMET))
c.drawCentredString(W/2, H/2-108, "Version 1.0 · Juli 2026 · le-space.de")
c.drawCentredString(W/2, 40, "No servers. No accounts. No passwords.")
c.showPage()

# ================= 2: MARKENKERN =================
page_bg()
y = header("01 · Markenkern", "Wer wir sind",
    "Le-Space ist der offene Local-First-Peer-to-Peer-Stack für Anwendungen, die ihren Nutzern gehören. "
    "Daten leben auf dem eigenen Gerät, Zusammenarbeit passiert direkt zwischen Geräten.")
h3(MARGIN, y, "Positionierung"); y -= 18
y = body(MARGIN, y, "Software you can keep: Le-Space steht für digitale Selbstbestimmung. "
    "Keine Server, keine Accounts, keine Passwörter — Identität über Passkeys, Daten über OrbitDB, "
    "Sync über libp2p, Infrastruktur auf Knopfdruck, Archivierung auf dezentralem Speicher.", maxw=W-2*MARGIN)
y -= 16
h3(MARGIN, y, "Markenprinzipien"); y -= 20
prinz = [
    ("Local-First", "Dein Gerät ist die Quelle der Wahrheit. Alles funktioniert offline — das Netz ist Verstärkung, nicht Voraussetzung.", CORAL),
    ("Peer-to-Peer", "Verbindungen entstehen direkt zwischen Menschen und Geräten. Wir zeigen das Mesh, nicht die Cloud.", CYAN),
    ("Offen & nachvollziehbar", "Jede Schicht ist Open Source und einzeln nutzbar. Wir erklären, statt zu verschleiern.", MINT),
    ("Ruhig & präzise", "Space-Ästhetik ohne Sci-Fi-Kitsch: dunkle Fläche, wenige Akzente, technische Klarheit.", VIOLET),
]
col_w = (W-2*MARGIN-16)/2
for i, (t_, d_, col) in enumerate(prinz):
    px = MARGIN + (i % 2)*(col_w+16)
    py = y - (i//2)*92
    panel(px, py-78, col_w, 78)
    c.setFillColor(hexc(col)); c.circle(px+18, py-18, 4, stroke=0, fill=1)
    h3(px+32, py-22, t_, size=11)
    body(px+18, py-40, d_, size=8.5, leading=12, maxw=col_w-34)
y -= 2*92 + 10
h3(MARGIN, y, "Tonalität"); y -= 18
y = body(MARGIN, y, "Wir schreiben direkt, konkret und technisch ehrlich — Du-Ansprache, kurze Sätze, "
    "keine Marketing-Superlative. Fachbegriffe werden benannt und sofort erklärt. "
    "Claims sind knapp und rhythmisch: „Keine Server. Keine Accounts. Keine Passwörter.“", maxw=W-2*MARGIN)
y -= 14
panel(MARGIN, y-46, W-2*MARGIN, 46)
c.setFont("Mono-Bold", 10); c.setFillColor(hexc(CORAL))
c.drawString(MARGIN+18, y-20, "$")
c.setFillColor(hexc(STAR))
c.drawString(MARGIN+32, y-20, "Daten und Software, die dir gehören.")
c.setFont("Mono", 8); c.setFillColor(hexc(COMET))
c.drawString(MARGIN+32, y-36, "Leitidee — überall dort, wo Le-Space sich in einem Satz erklärt.")
footer("Markenkern")
c.showPage()

# ================= 3: LOGO-KONZEPT =================
page_bg()
y = header("02 · Logo", "Der erste Knoten",
    "Das neue Zeichen ersetzt den Planeten durch das, worum es wirklich geht: "
    "ein Peer-to-Peer-Mesh, in dem dein Gerät der erste Knoten ist.")
# big mark + annotations
mx, my, ms = MARGIN+30, y-330, 300/96.0
img(os.path.join(PNG, "le-space-mark-dark@1024.png"), mx, my, w_=300)
def sv(px_, py_):  # svg coords -> pdf
    return (mx + px_*ms, my + (96-py_)*ms)
def lbl(node, lx, ly, title, desc):
    nx, ny = node
    c.setStrokeColor(hexc(COMET)); c.setLineWidth(0.7)
    c.line(nx, ny, lx-4 if lx > nx else lx+90, ly+8)
    c.setFillColor(hexc(STAR)); c.setFont("Sans-Bold", 8.5)
    c.drawString(lx, ly, title)
    c.setFillColor(hexc(DUST)); c.setFont("Sans", 7.5)
    c.drawString(lx, ly-11, desc)
p_local = sv(30, 62); p1 = sv(68, 26); p2 = sv(74, 66); p_sat = sv(17, 21)
lbl((p_sat[0], p_sat[1]+10), 58, my+296, "Discovery", "Ein Peer, der das Mesh gerade findet.")
lbl((p1[0], p1[1]+28), 150, my+316, "Peer", "Hohl: hält Repliken, nie das Original.")
lbl((p2[0], p2[1]-24), 238, my-12, "Peer", "Verbindungen kommen und gehen.")
lbl((p_local[0], p_local[1]-48), 58, my-12, "Lokaler Knoten — dein Gerät", "Gefüllt: Hier leben die Originaldaten.")
# right column text
rx = MARGIN + 360
ry = y - 40
h3(rx, ry, "Die Geschichte im Zeichen", size=11); ry -= 18
for t_, d_ in [
    ("Gefüllt vs. hohl", "Nur der lokale Knoten ist gefüllt — Daten „wohnen“ lokal. Peers sind Ringe: Repliken, kein Besitz."),
    ("Durchgezogene Linie", "Aktive Synchronisation zwischen dir und einem Peer."),
    ("Gepunktete Linien", "Opportunistische P2P-Verbindungen — sie entstehen, brechen ab, entstehen neu."),
    ("Diagonale nach oben", "Vom Lokalen ins Netz: erst dein Gerät, dann die Welt."),
]:
    c.setFillColor(hexc(CORAL)); c.setFont("Mono-Bold", 8)
    c.drawString(rx, ry, "→")
    c.setFillColor(hexc(STAR)); c.setFont("Sans-Bold", 8.5)
    c.drawString(rx+14, ry, t_)
    ry -= 12
    ry = body(rx+14, ry, d_, size=8, leading=11, maxw=W-MARGIN-rx-14) - 6
ry -= 6
panel(rx, ry-58, W-MARGIN-rx, 58)
body(rx+12, ry-16, "Das Zeichen funktioniert als eigenständiges Icon (App, Favicon, Avatar) "
     "und im Lockup mit der Wortmarke.", size=8, leading=11, maxw=W-MARGIN-rx-24)
y = my - 56
h3(MARGIN, y, "Wortmarke"); y -= 16
y = body(MARGIN, y, "Die Wortmarke „Le-Space“ ist in JetBrains Mono Bold gesetzt — der Schrift des Terminals. "
    "Der Bindestrich steht immer in Signal Coral: Er ist die Verbindung zwischen „Le“ und „Space“, "
    "das kleinste Symbol für den Sync-Gedanken. Schreibweise in Fließtext: Le-Space.", maxw=W-2*MARGIN)
footer("Logo")
c.showPage()

# ================= 4: LOGO-VARIANTEN =================
page_bg()
y = header("02 · Logo", "Varianten & Einsatz",
    "Drei Grundformen, je in Dark und Light. Dark ist die Hausvariante — Light für helle Medien, Print und Partnerkontexte.")
# horizontal dark
h3(MARGIN, y, "Horizontal — Primärlogo", size=10.5); y -= 12
panel(MARGIN, y-74, W-2*MARGIN, 74, fill=NEBULA)
img(os.path.join(PNG, "le-space-logo-horizontal-dark@2048.png"), MARGIN+24, y-58, h_=44)
y -= 90
panel(MARGIN, y-74, W-2*MARGIN, 74, fill="#FFFFFF")
img(os.path.join(PNG, "le-space-logo-horizontal-light@2048.png"), MARGIN+24, y-58, h_=44)
y -= 98
# stacked + mark row
h3(MARGIN, y, "Stacked — zentrierte Layouts", size=10.5)
h3(MARGIN+300, y, "Bildmarke solo", size=10.5)
y -= 12
panel(MARGIN, y-140, 130, 140, fill=NEBULA)
img(os.path.join(PNG, "le-space-logo-stacked-dark@1024.png"), MARGIN+22, y-126, w_=86)
panel(MARGIN+146, y-140, 130, 140, fill="#FFFFFF")
img(os.path.join(PNG, "le-space-logo-stacked-light@1024.png"), MARGIN+168, y-126, w_=86)
panel(MARGIN+300, y-140, 88, 140, fill=NEBULA)
img(os.path.join(PNG, "le-space-mark-dark@1024.png"), MARGIN+312, y-108, w_=64)
panel(MARGIN+402, y-140, 88, 140, fill="#FFFFFF")
img(os.path.join(PNG, "le-space-mark-light@1024.png"), MARGIN+414, y-108, w_=64)
y -= 164
h3(MARGIN, y, "Wahl der Variante"); y -= 16
y = body(MARGIN, y, [
    "· Horizontal: Website-Header, Dokumente, Signaturen — immer erste Wahl.",
    "· Stacked: Titelseiten, Social-Profile, quadratische Flächen.",
    "· Bildmarke: App-Icons, Favicons, Avatare, überall unter 120 px Breite.",
    "· Auf Fotos oder unruhigen Flächen: nur Bildmarke auf Deep-Space-Kreis oder Panel.",
], leading=15)
footer("Logo")
c.showPage()

# ================= 5: LOGO-REGELN =================
page_bg()
y = header("02 · Logo", "Schutzraum, Größen, Don'ts", None)
# Schutzraum
h3(MARGIN, y, "Schutzraum", size=11); y -= 14
y = body(MARGIN, y, "Der Schutzraum entspricht dem Radius des lokalen Knotens (= „1n“). "
    "Innerhalb dieser Zone stehen keine fremden Elemente, Texte oder Kanten.", maxw=260)
psx, psy = MARGIN+330, y+46
panel(psx-20, psy-90, 190, 120, fill=NEBULA)
c.setStrokeColor(hexc(COMET)); c.setLineWidth(0.7); c.setDash(2, 3)
c.rect(psx, psy-70, 150, 80, stroke=1, fill=0)
c.setDash()
img(os.path.join(PNG, "le-space-logo-horizontal-dark@2048.png"), psx+18, psy-52, h_=36)
c.setFont("Mono", 7); c.setFillColor(hexc(COMET))
c.drawString(psx+2, psy+14, "1n")
c.drawString(psx+2, psy-66, "1n")
y -= 40
# Mindestgrößen
h3(MARGIN, y, "Mindestgrößen", size=11); y -= 14
y = body(MARGIN, y, [
    "· Bildmarke: 20 px / 7 mm — darunter Favicon-Variante (vereinfacht, 2 Knoten) nutzen.",
    "· Horizontales Logo: 120 px / 40 mm Breite.",
    "· Stacked: 64 px / 22 mm Breite.",
], leading=15)
y -= 12
# Don'ts
h3(MARGIN, y, "Don'ts", size=11); y -= 20
donts = [
    "Farben nicht ändern oder neu kombinieren",
    "Nicht rotieren, spiegeln oder verzerren",
    "Keine Schatten, Verläufe, Umrandungen",
    "Wortmarke nie ohne Bindestrich-Akzent",
    "Bildmarke nicht auf kontrastarme Flächen",
    "Alt-Logo (Planet) nicht mit neuem mischen",
]
bx = MARGIN
for i, d_ in enumerate(donts):
    px = MARGIN + (i % 2)*((W-2*MARGIN-16)/2+16)
    py = y - (i//2)*34
    c.setFillColor(hexc(ERROR)); c.setFont("Mono-Bold", 9)
    c.drawString(px, py, "×")
    c.setFillColor(hexc(DUST)); c.setFont("Sans", 9)
    c.drawString(px+14, py, d_)
y -= 3*34 + 6
rule(MARGIN, y, W-2*MARGIN); y -= 24
h3(MARGIN, y, "Dateien", size=11); y -= 16
y = body(MARGIN, y, [
    "logo/svg/   le-space-mark-{dark,light}.svg · le-space-logo-horizontal-{dark,light}.svg",
    "            le-space-logo-stacked-{dark,light}.svg · le-space-app-icon.svg · le-space-favicon.svg",
    "logo/png/   Exporte @1024/@2048 · og-image-1200x630.png",
    "favicon/    favicon.ico · favicon-16/32/48 · apple-touch-icon · android-chrome-192/512",
], font="Mono", size=7.5, leading=13)
footer("Logo")
c.showPage()

# ================= 6: FARBEN KERN =================
page_bg()
y = header("03 · Farben", "Kernpalette",
    "Dunkelraum plus zwei Akzente. Faustregel 60/30/10: 60 % Deep Space, 30 % Flächen & Text, 10 % Akzentfarben.")
def swatch(x, y_, w_, h_, col, name, hexv, usage, text_col=None, border=False):
    panel(x, y_-h_, w_, h_, fill=col, r=8, stroke=HORIZON if border else None)
    tc = text_col or (STAR if col in (DEEP, NEBULA, HORIZON, INK) else INK)
    c.setFont("Sans-Bold", 9); c.setFillColor(hexc(tc))
    c.drawString(x+12, y_-20, name)
    c.setFont("Mono", 7.5)
    c.drawString(x+12, y_-32, hexv.upper())
    c.setFont("Sans", 7.5)
    for i, ln in enumerate(wrap(usage, "Sans", 7.5, w_-24)):
        c.drawString(x+12, y_-46-i*10, ln)
cw = (W-2*MARGIN-16)/2
swatch(MARGIN,        y,     cw, 92, DEEP,   "Deep Space",   DEEP,   "Hintergrund aller dunklen Medien.", STAR, border=True)
swatch(MARGIN+cw+16,  y,     cw, 92, NEBULA, "Nebula",       NEBULA, "Cards, Panels, Codeblöcke.", STAR, border=True)
y -= 108
swatch(MARGIN,        y,     cw, 92, STAR,   "Starlight",    STAR,   "Überschriften, Primärtext auf dunkel.")
swatch(MARGIN+cw+16,  y,     cw, 92, DUST,   "Stardust",     DUST,   "Fließtext, Beschreibungen.")
y -= 108
swatch(MARGIN,        y,     cw, 110, CORAL, "Signal Coral", CORAL,  "Primärakzent: CTAs, lokaler Knoten, Eyebrows, aktive Zustände. Sparsam — eine Coral-Aktion pro Ansicht.")
swatch(MARGIN+cw+16,  y,     cw, 110, CYAN,  "Sync Cyan",    CYAN,   "Links, Verbindungen, Peers, Sync-Status, sekundäre Hervorhebung.")
y -= 126
swatch(MARGIN,        y,     cw, 74, HORIZON, "Horizon",     HORIZON, "Linien, Borders, Dividers.", STAR)
swatch(MARGIN+cw+16,  y,     cw, 74, COMET,  "Comet Grey",   COMET,  "Metatext, Timestamps, Footer.")
y -= 90
y = body(MARGIN, y, "Light-Mode (Print, helle Medien): Hintergrund #FFFFFF, Text Ink #141B2E, "
    "Coral → #E8503F, Cyan → #0E86C4. Kontrast: Starlight auf Deep Space 16,7:1 · "
    "Coral auf Deep Space 6,6:1 — beide AA-konform für Text.", maxw=W-2*MARGIN)
footer("Farben")
c.showPage()

# ================= 7: LAYER & SEMANTIK =================
page_bg()
y = header("03 · Farben", "Stack-Layer & Semantik",
    "Jede Schicht des Stacks hat eine feste Kennfarbe — in Diagrammen, Docs und auf der Website identisch.")
layers = [
    ("Identität",     "WebAuthn / Passkeys / DIDs", MINT),
    ("Daten",         "OrbitDB", AMBER),
    ("Sync",          "libp2p", CYAN),
    ("Infrastruktur", "Relay Button / On-Demand", VIOLET),
    ("Archiv",        "Filecoin / Aleph IPFS", CORAL),
]
for name, tech, col in layers:
    panel(MARGIN, y-40, W-2*MARGIN, 40)
    c.setFillColor(hexc(col)); c.circle(MARGIN+22, y-20, 6, stroke=0, fill=1)
    h3(MARGIN+40, y-24, name, size=10.5)
    c.setFont("Mono", 8); c.setFillColor(hexc(DUST))
    c.drawString(MARGIN+170, y-24, tech)
    c.setFont("Mono", 8); c.setFillColor(hexc(col))
    c.drawRightString(W-MARGIN-16, y-24, col.upper())
    y -= 48
y -= 10
h3(MARGIN, y, "Semantische Farben"); y -= 20
sem = [("Success", MINT), ("Warning", AMBER), ("Error", ERROR), ("Info", CYAN)]
sw_ = (W-2*MARGIN-3*12)/4
for i, (n_, col) in enumerate(sem):
    x_ = MARGIN + i*(sw_+12)
    panel(x_, y-58, sw_, 58, fill=col, r=8)
    c.setFont("Sans-Bold", 9); c.setFillColor(hexc(INK))
    c.drawString(x_+10, y-22, n_)
    c.setFont("Mono", 7); c.drawString(x_+10, y-34, col.upper())
y -= 76
y = body(MARGIN, y, "Error nutzt bewusst ein kühleres Rot (#FF4D6A) als Signal Coral, "
    "damit Fehlzustände nie mit dem Markenakzent verwechselt werden.", maxw=W-2*MARGIN)
footer("Farben")
c.showPage()

# ================= 8: TYPOGRAFIE =================
page_bg()
y = header("04 · Typografie", "Zwei Stimmen: Mono & Sans",
    "JetBrains Mono ist die Markenstimme (Terminal-DNA), Inter die Arbeitsschrift für Lesetexte und UI.")
panel(MARGIN, y-96, W-2*MARGIN, 96)
c.setFont("Mono-Bold", 22); c.setFillColor(hexc(STAR))
c.drawString(MARGIN+20, y-34, "JetBrains Mono")
c.setFont("Mono", 9); c.setFillColor(hexc(DUST))
c.drawString(MARGIN+20, y-52, "Wortmarke · Eyebrows/Labels · Code · Terminal-Zitate · Zahlen in Diagrammen")
c.setFont("Mono", 9); c.setFillColor(hexc(CYAN))
c.drawString(MARGIN+20, y-70, "ABCDEFGHIJKLM abcdefghijklm 0123456789 -> != === // $ #")
c.setFont("Mono", 7); c.setFillColor(hexc(COMET))
c.drawString(MARGIN+20, y-84, "Weights: Regular 400 · Bold 700 — Fallback: ui-monospace, 'Noto Sans Mono', monospace")
y -= 112
panel(MARGIN, y-96, W-2*MARGIN, 96)
c.setFont("Sans-Bold", 22); c.setFillColor(hexc(STAR))
c.drawString(MARGIN+20, y-34, "Inter")
c.setFont("Sans", 9); c.setFillColor(hexc(DUST))
c.drawString(MARGIN+20, y-52, "Headlines · Fließtext · UI-Elemente · Navigation")
c.setFont("Sans", 9); c.setFillColor(hexc(CYAN))
c.drawString(MARGIN+20, y-70, "ABCDEFGHIJKLM abcdefghijklm 0123456789 ÄÖÜ äöü ß")
c.setFont("Sans", 7); c.setFillColor(hexc(COMET))
c.drawString(MARGIN+20, y-84, "Weights: Regular 400 · SemiBold 600 · Bold 700 — Fallback: -apple-system, 'Segoe UI', Roboto, sans-serif")
y -= 116
h3(MARGIN, y, "Typo-Skala (Web, 16 px Basis)"); y -= 8
scale = [
    ("Display", "Inter Bold", "clamp(40–64) px / 1.05", 24),
    ("H1", "Inter Bold", "40 px / 1.1", 19),
    ("H2", "Inter Bold", "28 px / 1.2", 15),
    ("H3", "Inter SemiBold", "20 px / 1.3", 12),
    ("Body", "Inter Regular", "16 px / 1.6", 9.5),
    ("Small / Meta", "Inter Regular", "14 px / 1.5", 8.5),
    ("Eyebrow", "JB Mono Bold", "13 px / caps / +8 % Tracking", 8),
    ("Code", "JB Mono Regular", "14 px / 1.55", 8.5),
]
for name, font_, spec, sz in scale:
    y -= max(sz*1.5, 18)
    f = "Mono-Bold" if "Mono Bold" in font_ else ("Mono" if "Mono" in font_ else ("Sans-Bold" if "Bold" in font_ or "Semi" in font_ else "Sans"))
    c.setFont(f, sz); c.setFillColor(hexc(STAR))
    txt = name.upper()+"  DEIN KNOTEN ZUERST" if name == "Eyebrow" else name
    c.drawString(MARGIN, y, txt if name != "Code" else 'await db.put({ todo: "own your data" })')
    c.setFont("Mono", 7); c.setFillColor(hexc(COMET))
    c.drawRightString(W-MARGIN, y, f"{font_} · {spec}")
y -= 26
y = body(MARGIN, y, "Regeln: Fließtext nie in Mono. Eyebrows immer Mono-Bold, Versalien, Coral oder Layer-Farbe. "
    "Zeilenlänge 60–75 Zeichen. Deutsche Anführungszeichen „…“ in Texten, gerade Zeichen im Code.", maxw=W-2*MARGIN)
footer("Typografie")
c.showPage()

# ================= 9: KOMPONENTEN =================
page_bg()
y = header("05 · UI-Komponenten", "Bausteine",
    "Referenz für Website und Demos. Radius 10 px für Karten, 8 px für Buttons, Border 1 px Horizon.")
h3(MARGIN, y, "Buttons"); y -= 34
# primary
c.setFillColor(hexc(CORAL)); c.roundRect(MARGIN, y-8, 120, 30, 8, stroke=0, fill=1)
c.setFont("Sans-Bold", 9.5); c.setFillColor(hexc("#1A0E0C"))
c.drawCentredString(MARGIN+60, y+2, "Stack erkunden")
# secondary
c.setStrokeColor(hexc(HORIZON)); c.setLineWidth(1)
c.setFillColor(hexc(NEBULA)); c.roundRect(MARGIN+136, y-8, 90, 30, 8, stroke=1, fill=1)
c.setFillColor(hexc(STAR)); c.drawCentredString(MARGIN+181, y+2, "FAQ")
# ghost link
c.setFont("Sans-Bold", 9.5); c.setFillColor(hexc(CYAN))
c.drawString(MARGIN+250, y+2, "GitHub ->")
c.setFont("Mono", 7); c.setFillColor(hexc(COMET))
c.drawString(MARGIN, y-24, "Primary: Signal Coral · Secondary: Nebula + Border Horizon · Tertiär: Cyan-Textlink")
y -= 58
h3(MARGIN, y, "Card"); y -= 12
panel(MARGIN, y-96, (W-2*MARGIN-16)/2, 96, stroke=HORIZON)
c.setFillColor(hexc(MINT)); c.circle(MARGIN+22, y-22, 5, stroke=0, fill=1)
h3(MARGIN+36, y-26, "Identität", size=10.5)
body(MARGIN+22, y-46, "WebAuthn / Passkeys / DIDs — deine Schlüssel, dein Browser, keine Extensions.",
     size=8, leading=11.5, maxw=(W-2*MARGIN-16)/2-40)
c.setFont("Mono", 7.5); c.setFillColor(hexc(CYAN))
c.drawString(MARGIN+22, y-82, "docs ->")
# badge examples
bx = MARGIN + (W-2*MARGIN-16)/2 + 16
h3(bx, y-4, "Badges & Status", size=10.5)
badges = [("SYNCED", MINT), ("SYNCING…", CYAN), ("OFFLINE", COMET), ("TUTORIAL", CORAL)]
byy = y-30
bxx = bx
c.setFont("Mono-Bold", 7)
for t_, col in badges:
    tw = pdfmetrics.stringWidth(t_, "Mono-Bold", 7) + 16
    c.setStrokeColor(hexc(col)); c.setLineWidth(0.8)
    c.setFillColor(hexc(DEEP))
    c.roundRect(bxx, byy-6, tw, 16, 8, stroke=1, fill=1)
    c.setFillColor(hexc(col))
    c.drawString(bxx+8, byy-1, t_)
    bxx += tw + 8
    if bxx > W-MARGIN-70:
        bxx = bx; byy -= 22
body(bx, byy-24, "Outline-Badges in Layer-/Statusfarbe, Mono-Bold, Versalien.", size=7.5, leading=10.5, maxw=W-MARGIN-bx)
y -= 116
h3(MARGIN, y, "Codeblock"); y -= 12
panel(MARGIN, y-64, W-2*MARGIN, 64, fill="#0E1220", stroke=HORIZON)
c.setFont("Mono", 8.5)
c.setFillColor(hexc(COMET));  c.drawString(MARGIN+16, y-20, "# peer-to-peer, kein Server")
c.setFillColor(hexc(CYAN));   c.drawString(MARGIN+16, y-34, "const db = await orbitdb.open('todos')")
c.setFillColor(hexc(STAR));   c.drawString(MARGIN+16, y-48, "await db.add({ text: 'Daten gehören dir' })")
y -= 84
h3(MARGIN, y, "Starfield-Hintergrund"); y -= 16
y = body(MARGIN, y, "Sterne: Starlight-Punkte r 0,8–1,4 px, Opazität 0,15–0,45, Dichte max. 1 Stern / 15.000 px². "
    "Keine Verläufe, keine Nebel-Texturen — der Raum bleibt ruhig und schwarz.", maxw=W-2*MARGIN)
footer("Komponenten")
c.showPage()

# ================= 10: ANWENDUNGEN =================
page_bg()
y = header("06 · Anwendungen", "Icons, Social & Web",
    "Alle Assets liegen als SVG (Quelle) und PNG (Export) im Brand-Paket.")
h3(MARGIN, y, "App-Icon & Favicons"); y -= 14
panel(MARGIN, y-104, W-2*MARGIN, 104)
img(os.path.join(FAV, "android-chrome-512x512.png"), MARGIN+20, y-92, w_=80)
img(os.path.join(FAV, "apple-touch-icon.png"), MARGIN+120, y-80, w_=56)
img(os.path.join(FAV, "favicon-48x48.png"), MARGIN+196, y-70, w_=36)
img(os.path.join(FAV, "favicon-32x32.png"), MARGIN+252, y-64, w_=24)
img(os.path.join(FAV, "favicon-16x16.png"), MARGIN+296, y-58, w_=12)
c.setFont("Mono", 7); c.setFillColor(hexc(COMET))
for tx, t_ in [(MARGIN+20,"512"),(MARGIN+120,"180"),(MARGIN+196,"48"),(MARGIN+252,"32"),(MARGIN+296,"16")]:
    c.drawString(tx, y-100+2, t_)
body(MARGIN+340, y-30, "Ab 48 px abwärts gilt die vereinfachte Favicon-Variante: lokaler Knoten + ein Peer + eine Verbindung.",
     size=8, leading=11.5, maxw=W-MARGIN-MARGIN-350)
y -= 122
h3(MARGIN, y, "Open-Graph / Social (1200 × 630)"); y -= 12
img(os.path.join(PNG, "og-image-1200x630.png"), MARGIN, y-180, w_=(W-2*MARGIN)*0.72)
y -= 200
h3(MARGIN, y, "Einbindung (HTML Head)"); y -= 14
panel(MARGIN, y-74, W-2*MARGIN, 74, fill="#0E1220", stroke=HORIZON)
snippets = [
    '<link rel="icon" href="/favicon.ico" sizes="48x48">',
    '<link rel="icon" href="/le-space-favicon.svg" type="image/svg+xml">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
    '<meta property="og:image" content="https://le-space.de/og-image-1200x630.png">',
]
c.setFont("Mono", 7.5); c.setFillColor(hexc(CYAN))
for i, s_ in enumerate(snippets):
    c.drawString(MARGIN+14, y-18-i*13, s_)
footer("Anwendungen")
c.showPage()

# ================= 11: CHECKLISTE / BACK =================
page_bg()
y = header("07 · Zusammenfassung", "Checkliste für jedes neue Medium", None)
checks = [
    "Deep Space als Grundfläche, Starfield dezent (oder Weiß im Light-Mode)",
    "Genau ein Coral-Akzent pro Ansicht — Cyan für Links & Verbindungen",
    "Logo mit Schutzraum 1n, nie unter Mindestgröße, nie verzerrt",
    "Eyebrow in JetBrains Mono Bold + Versalien über jeder Sektion",
    "Fließtext in Inter, 60–75 Zeichen Zeilenlänge",
    "Stack-Layer immer in ihren festen Kennfarben",
    "Terminal-Motive ($, ->, Code) als Stilmittel, sparsam eingesetzt",
    "Du-Ansprache, kurze Sätze, technische Ehrlichkeit",
]
for i, t_ in enumerate(checks):
    c.setStrokeColor(hexc(MINT)); c.setLineWidth(1.6)
    c.setLineCap(1)
    c.line(MARGIN, y+3, MARGIN+3.2, y)
    c.line(MARGIN+3.2, y, MARGIN+9, y+7)
    c.setFillColor(hexc(DUST)); c.setFont("Sans", 9.5)
    c.drawString(MARGIN+18, y, t_)
    y -= 22
y -= 14
rule(MARGIN, y, W-2*MARGIN); y -= 30
img(os.path.join(PNG, "le-space-mark-dark@1024.png"), W/2-36, y-100, w_=72)
c.setFont("Mono", 8); c.setFillColor(hexc(COMET))
c.drawCentredString(W/2, y-124, "kontakt@le-space.de · le-space.de · local-first.le-space.de")
c.drawCentredString(W/2, y-140, "Dieses Dokument: Le-Space-Brand-Style-Guide.pdf · V1.0 · Juli 2026")
footer("Zusammenfassung")
c.showPage()

c.save()
print("PDF written:", PDF_PATH)
