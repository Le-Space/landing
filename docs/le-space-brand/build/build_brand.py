#!/usr/bin/env python3
"""Le-Space brand asset builder: new logo (SVG + PNG + favicons)."""
import math, os, struct
import cairo
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen
from fontTools.pens.boundsPen import BoundsPen

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SVG_DIR = os.path.join(OUT, "logo", "svg")
PNG_DIR = os.path.join(OUT, "logo", "png")
FAV_DIR = os.path.join(OUT, "favicon")
for d in (SVG_DIR, PNG_DIR, FAV_DIR):
    os.makedirs(d, exist_ok=True)

# ---------------- palette (refreshed) ----------------
DEEP_SPACE = "#0B0E15"
STARLIGHT  = "#EDF1F8"
INK        = "#141B2E"   # text on light bg
CORAL      = "#FF6B5B"   # dark-bg primary
CORAL_LT   = "#E8503F"   # light-bg primary
SYNC       = "#58C7F3"   # dark-bg cyan
SYNC_LT    = "#0E86C4"   # light-bg cyan

def hex_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16)/255 for i in (0, 2, 4))

# ---------------- font -> path ops ----------------
class RecPen(BasePen):
    def __init__(self, glyphSet):
        super().__init__(glyphSet)
        self.ops = []
    def _moveTo(self, p):        self.ops.append(("M", p))
    def _lineTo(self, p):        self.ops.append(("L", p))
    def _curveToOne(self, p1, p2, p3): self.ops.append(("C", p1, p2, p3))
    def _qCurveToOne(self, p1, p2):    self.ops.append(("Q", p1, p2))
    def _closePath(self):        self.ops.append(("Z",))

FONT_PATH = "/usr/share/fonts/truetype/noto/NotoSansMono-Bold.ttf"
font = TTFont(FONT_PATH)
UPM = font["head"].unitsPerEm
cmap = font.getBestCmap()
glyphset = font.getGlyphSet()

def glyph_ops(ch):
    name = cmap[ord(ch)]
    pen = RecPen(glyphset)
    glyphset[name].draw(pen)
    adv = font["hmtx"][name][0]
    return pen.ops, adv

def xheight():
    pen = BoundsPen(glyphset)
    glyphset[cmap[ord("x")]].draw(pen)
    return pen.bounds[3]
XH = xheight()  # font units

def transform_ops(ops, ox, oy, s):
    """font units -> px, y flipped, origin at baseline (ox,oy)."""
    def t(p): return (ox + p[0]*s, oy - p[1]*s)
    out = []
    for op in ops:
        out.append((op[0], *[t(p) for p in op[1:]]))
    return out

def wordmark_ops(text, size, ox, oy, tracking=0.0):
    """returns list of (char, ops_px) and total width"""
    s = size / UPM
    x = ox
    result = []
    for ch in text:
        ops, adv = glyph_ops(ch)
        result.append((ch, transform_ops(ops, x, oy, s)))
        x += adv*s + tracking
    return result, x - ox - tracking

# ---------------- ops -> svg path d ----------------
def fmt(v): return f"{v:.2f}".rstrip("0").rstrip(".")

def ops_to_d(ops):
    parts = []
    for op in ops:
        c = op[0]
        if c == "Z":
            parts.append("Z")
        else:
            coords = " ".join(f"{fmt(px)} {fmt(py)}" for (px, py) in op[1:])
            parts.append(f"{c}{coords}")
    return "".join(parts)

# ---------------- ops -> cairo ----------------
def draw_ops(ctx, ops):
    cur = start = None
    for op in ops:
        c = op[0]
        if c == "M":
            ctx.move_to(*op[1]); cur = start = op[1]
        elif c == "L":
            ctx.line_to(*op[1]); cur = op[1]
        elif c == "C":
            ctx.curve_to(*op[1], *op[2], *op[3]); cur = op[3]
        elif c == "Q":
            q, p2 = op[1], op[2]
            c1 = (cur[0] + 2/3*(q[0]-cur[0]), cur[1] + 2/3*(q[1]-cur[1]))
            c2 = (p2[0] + 2/3*(q[0]-p2[0]), p2[1] + 2/3*(q[1]-p2[1]))
            ctx.curve_to(*c1, *c2, *p2); cur = p2
        elif c == "Z":
            ctx.close_path(); cur = start

# ---------------- mark geometry ----------------
# concept "First Node": solid local node, hollow peers, sync edges
LOCAL  = (30, 62, 15)          # solid coral disc
PEER1  = (68, 26, 8, 5)        # hollow, stroke 5
PEER2  = (74, 66, 6.5, 4.5)    # hollow, stroke 4.5
SAT    = (17, 21, 2.6)         # small discovering dot

def edge(c1, r1, c2, r2):
    dx, dy = c2[0]-c1[0], c2[1]-c1[1]
    L = math.hypot(dx, dy)
    ux, uy = dx/L, dy/L
    return ((c1[0]+r1*ux, c1[1]+r1*uy), (c2[0]-r2*ux, c2[1]-r2*uy))

E1 = edge(LOCAL[:2], LOCAL[2]+2.5, PEER1[:2], PEER1[2]+PEER1[3]/2+2.5)   # solid
E2 = edge(LOCAL[:2], LOCAL[2]+2.5, PEER2[:2], PEER2[2]+PEER2[3]/2+2.5)   # dotted
E3 = edge(PEER1[:2], PEER1[2]+PEER1[3]/2+2, PEER2[:2], PEER2[2]+PEER2[3]/2+2)  # thin dotted

def mark_svg_elems(coral, sync, indent="  "):
    e = []
    (a1, b1), (a2, b2), (a3, b3) = E1, E2, E3
    e.append(f'<line x1="{fmt(a1[0])}" y1="{fmt(a1[1])}" x2="{fmt(b1[0])}" y2="{fmt(b1[1])}" stroke="{sync}" stroke-width="4" stroke-linecap="round"/>')
    e.append(f'<line x1="{fmt(a2[0])}" y1="{fmt(a2[1])}" x2="{fmt(b2[0])}" y2="{fmt(b2[1])}" stroke="{sync}" stroke-width="4" stroke-linecap="round" stroke-dasharray="0.1 8"/>')
    e.append(f'<line x1="{fmt(a3[0])}" y1="{fmt(a3[1])}" x2="{fmt(b3[0])}" y2="{fmt(b3[1])}" stroke="{sync}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6" opacity="0.65"/>')
    e.append(f'<circle cx="{LOCAL[0]}" cy="{LOCAL[1]}" r="{LOCAL[2]}" fill="{coral}"/>')
    e.append(f'<circle cx="{PEER1[0]}" cy="{PEER1[1]}" r="{PEER1[2]}" fill="none" stroke="{sync}" stroke-width="{PEER1[3]}"/>')
    e.append(f'<circle cx="{PEER2[0]}" cy="{PEER2[1]}" r="{PEER2[2]}" fill="none" stroke="{sync}" stroke-width="{PEER2[3]}"/>')
    e.append(f'<circle cx="{SAT[0]}" cy="{SAT[1]}" r="{SAT[2]}" fill="{sync}" opacity="0.55"/>')
    return ("\n"+indent).join(e)

def mark_cairo(ctx, coral, sync, ox=0, oy=0, s=1.0):
    ctx.save(); ctx.translate(ox, oy); ctx.scale(s, s)
    cr, sy = hex_rgb(coral), hex_rgb(sync)
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    (a1, b1), (a2, b2), (a3, b3) = E1, E2, E3
    ctx.set_source_rgb(*sy)
    ctx.set_line_width(4); ctx.set_dash([])
    ctx.move_to(*a1); ctx.line_to(*b1); ctx.stroke()
    ctx.set_dash([0.1, 8])
    ctx.move_to(*a2); ctx.line_to(*b2); ctx.stroke()
    ctx.set_line_width(2.5); ctx.set_dash([0.1, 6])
    ctx.push_group()
    ctx.set_source_rgb(*sy)
    ctx.set_line_width(2.5)
    ctx.move_to(*a3); ctx.line_to(*b3); ctx.stroke()
    ctx.pop_group_to_source(); ctx.paint_with_alpha(0.65)
    ctx.set_dash([])
    ctx.set_source_rgb(*cr)
    ctx.arc(LOCAL[0], LOCAL[1], LOCAL[2], 0, 2*math.pi); ctx.fill()
    ctx.set_source_rgb(*sy)
    ctx.set_line_width(PEER1[3])
    ctx.arc(PEER1[0], PEER1[1], PEER1[2], 0, 2*math.pi); ctx.stroke()
    ctx.set_line_width(PEER2[3])
    ctx.arc(PEER2[0], PEER2[1], PEER2[2], 0, 2*math.pi); ctx.stroke()
    ctx.push_group()
    ctx.set_source_rgb(*sy)
    ctx.arc(SAT[0], SAT[1], SAT[2], 0, 2*math.pi); ctx.fill()
    ctx.pop_group_to_source(); ctx.paint_with_alpha(0.55)
    ctx.restore()

# ---------------- SVG writers ----------------
def write_svg(path, w, h, body):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(w)} {fmt(h)}" width="{fmt(w)}" height="{fmt(h)}">\n  {body}\n</svg>\n'
    with open(path, "w") as f:
        f.write(svg)
    print("svg:", os.path.basename(path))

def wordmark_svg(text, size, ox, baseline, text_col, accent_col, tracking=0.0):
    glyphs, width = wordmark_ops(text, size, ox, baseline, tracking)
    parts = []
    for ch, ops in glyphs:
        if not ops:
            continue
        col = accent_col if ch == "-" else text_col
        parts.append(f'<path d="{ops_to_d(ops)}" fill="{col}"/>')
    return "\n  ".join(parts), width

def measure(text, size, tracking=0.0):
    s = size / UPM
    w = 0
    for ch in text:
        _, adv = glyph_ops(ch)
        w += adv*s + tracking
    return w - tracking

# mark alone (96x96)
for suffix, coral, sync in (("dark", CORAL, SYNC), ("light", CORAL_LT, SYNC_LT)):
    write_svg(os.path.join(SVG_DIR, f"le-space-mark-{suffix}.svg"), 96, 96,
              mark_svg_elems(coral, sync))

# horizontal lockup
WM_TEXT = "Le-Space"
WM_SIZE = 46
MARK_S = 0.80           # mark scaled to ~77px
mark_h = 96*MARK_S
wm_w = measure(WM_TEXT, WM_SIZE)
GAP = 18
H = 96
total_w = 96*MARK_S + GAP + wm_w + 12
baseline = H/2 + (XH * WM_SIZE/UPM)/2
for suffix, coral, sync, tcol in (("dark", CORAL, SYNC, STARLIGHT), ("light", CORAL_LT, SYNC_LT, INK)):
    wm, _ = wordmark_svg(WM_TEXT, WM_SIZE, 96*MARK_S+GAP, baseline, tcol, coral)
    body = (f'<g transform="translate(0 {fmt((H-mark_h)/2)}) scale({MARK_S})">\n    '
            + mark_svg_elems(coral, sync, indent="    ") + "\n  </g>\n  " + wm)
    write_svg(os.path.join(SVG_DIR, f"le-space-logo-horizontal-{suffix}.svg"), total_w, H, body)

# stacked lockup
ST_WM_SIZE = 34
st_wm_w = measure(WM_TEXT, ST_WM_SIZE)
ST_W = max(120, st_wm_w + 8)
ST_H = 150
st_mark_s = 0.92
st_mark_w = 96*st_mark_s
st_baseline = 96*st_mark_s + 10 + (XH * ST_WM_SIZE/UPM)
for suffix, coral, sync, tcol in (("dark", CORAL, SYNC, STARLIGHT), ("light", CORAL_LT, SYNC_LT, INK)):
    wm, _ = wordmark_svg(WM_TEXT, ST_WM_SIZE, (ST_W-st_wm_w)/2, st_baseline, tcol, coral)
    body = (f'<g transform="translate({fmt((ST_W-st_mark_w)/2)} 0) scale({st_mark_s})">\n    '
            + mark_svg_elems(coral, sync, indent="    ") + "\n  </g>\n  " + wm)
    write_svg(os.path.join(SVG_DIR, f"le-space-logo-stacked-{suffix}.svg"), ST_W, ST_H, body)

# app icon 512 (full-bleed deep space + stars + mark)
STARS = [(60,72,3,.5),(140,40,2,.35),(300,60,2.5,.45),(430,100,2,.3),(470,220,3,.4),
         (80,300,2,.3),(50,430,2.5,.35),(200,470,2,.3),(400,430,2.5,.4),(460,330,2,.3),
         (250,120,1.6,.25),(360,180,1.8,.3),(120,180,1.8,.3),(180,90,1.5,.25)]
def app_icon_svg():
    stars = "\n  ".join(
        f'<circle cx="{x}" cy="{y}" r="{r}" fill="{STARLIGHT}" opacity="{o}"/>' for x,y,r,o in STARS)
    s = 512*0.72/96
    off = (512 - 96*s)/2
    return (f'<rect width="512" height="512" fill="{DEEP_SPACE}"/>\n  {stars}\n  '
            f'<g transform="translate({fmt(off)} {fmt(off)}) scale({fmt(s)})">\n    '
            + mark_svg_elems(CORAL, SYNC, indent="    ") + "\n  </g>")
write_svg(os.path.join(SVG_DIR, "le-space-app-icon.svg"), 512, 512, app_icon_svg())

# favicon mark (simplified: local node + 1 peer + edge), 32 viewbox
def favicon_svg():
    c1 = (11.5, 20.5, 7.5)      # local
    c2 = (23.5, 9.5, 4.2, 2.8)  # peer hollow
    (a, b) = edge(c1[:2], c1[2]+1.4, c2[:2], c2[2]+c2[3]/2+1.4)
    return (f'<rect width="32" height="32" rx="7" fill="{DEEP_SPACE}"/>\n  '
            f'<line x1="{fmt(a[0])}" y1="{fmt(a[1])}" x2="{fmt(b[0])}" y2="{fmt(b[1])}" stroke="{SYNC}" stroke-width="2.2" stroke-linecap="round"/>\n  '
            f'<circle cx="{c1[0]}" cy="{c1[1]}" r="{c1[2]}" fill="{CORAL}"/>\n  '
            f'<circle cx="{c2[0]}" cy="{c2[1]}" r="{c2[2]}" fill="none" stroke="{SYNC}" stroke-width="{c2[3]}"/>')
write_svg(os.path.join(SVG_DIR, "le-space-favicon.svg"), 32, 32, favicon_svg())

# ---------------- PNG rendering (cairo) ----------------
def surface(w, h):
    return cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h)

def render_mark_png(path, px, coral, sync, bg=None):
    s = surface(px, px); ctx = cairo.Context(s)
    if bg:
        ctx.set_source_rgb(*hex_rgb(bg)); ctx.paint()
    mark_cairo(ctx, coral, sync, 0, 0, px/96)
    s.write_to_png(path); print("png:", os.path.basename(path))

def render_wordmark(ctx, text, size, ox, baseline, tcol, accent, tracking=0.0):
    glyphs, w = wordmark_ops(text, size, ox, baseline, tracking)
    for ch, ops in glyphs:
        if not ops: continue
        ctx.set_source_rgb(*hex_rgb(accent if ch == "-" else tcol))
        ctx.new_path(); draw_ops(ctx, ops)
        ctx.set_fill_rule(cairo.FILL_RULE_WINDING)
        ctx.fill()
    return w

def render_horizontal_png(path, target_w, coral, sync, tcol, bg=None):
    scale = target_w/total_w
    Wp, Hp = int(round(total_w*scale)), int(round(H*scale))
    s = surface(Wp, Hp); ctx = cairo.Context(s)
    if bg:
        ctx.set_source_rgb(*hex_rgb(bg)); ctx.paint()
    ctx.scale(scale, scale)
    mark_cairo(ctx, coral, sync, 0, (H-mark_h)/2, MARK_S)
    render_wordmark(ctx, WM_TEXT, WM_SIZE, 96*MARK_S+GAP, baseline, tcol, coral)
    s.write_to_png(path); print("png:", os.path.basename(path))

def render_stacked_png(path, target_w, coral, sync, tcol, bg=None):
    scale = target_w/ST_W
    Wp, Hp = int(round(ST_W*scale)), int(round(ST_H*scale))
    s = surface(Wp, Hp); ctx = cairo.Context(s)
    if bg:
        ctx.set_source_rgb(*hex_rgb(bg)); ctx.paint()
    ctx.scale(scale, scale)
    mark_cairo(ctx, coral, sync, (ST_W-st_mark_w)/2, 0, st_mark_s)
    render_wordmark(ctx, WM_TEXT, ST_WM_SIZE, (ST_W-st_wm_w)/2, st_baseline, tcol, coral)
    s.write_to_png(path); print("png:", os.path.basename(path))

render_mark_png(os.path.join(PNG_DIR, "le-space-mark-dark@1024.png"), 1024, CORAL, SYNC)
render_mark_png(os.path.join(PNG_DIR, "le-space-mark-light@1024.png"), 1024, CORAL_LT, SYNC_LT)
render_horizontal_png(os.path.join(PNG_DIR, "le-space-logo-horizontal-dark@2048.png"), 2048, CORAL, SYNC, STARLIGHT)
render_horizontal_png(os.path.join(PNG_DIR, "le-space-logo-horizontal-light@2048.png"), 2048, CORAL_LT, SYNC_LT, INK)
render_stacked_png(os.path.join(PNG_DIR, "le-space-logo-stacked-dark@1024.png"), 1024, CORAL, SYNC, STARLIGHT)
render_stacked_png(os.path.join(PNG_DIR, "le-space-logo-stacked-light@1024.png"), 1024, CORAL_LT, SYNC_LT, INK)
# preview on brand background
render_horizontal_png(os.path.join(PNG_DIR, "preview-horizontal-on-deep-space.png"), 1600, CORAL, SYNC, STARLIGHT, bg=DEEP_SPACE)

# app icon pngs
def render_app_icon(path, px):
    s = surface(px, px); ctx = cairo.Context(s)
    k = px/512
    ctx.scale(k, k)
    ctx.set_source_rgb(*hex_rgb(DEEP_SPACE))
    ctx.rectangle(0, 0, 512, 512); ctx.fill()
    for x, y, r, o in STARS:
        ctx.push_group()
        ctx.set_source_rgb(*hex_rgb(STARLIGHT))
        ctx.arc(x, y, r, 0, 2*math.pi); ctx.fill()
        ctx.pop_group_to_source(); ctx.paint_with_alpha(o)
    sc = 512*0.72/96
    off = (512-96*sc)/2
    mark_cairo(ctx, CORAL, SYNC, off, off, sc)
    s.write_to_png(path); print("png:", os.path.basename(path))

render_app_icon(os.path.join(FAV_DIR, "android-chrome-512x512.png"), 512)
render_app_icon(os.path.join(FAV_DIR, "android-chrome-192x192.png"), 192)
render_app_icon(os.path.join(FAV_DIR, "apple-touch-icon.png"), 180)

# favicon pngs (simplified mark)
def render_favicon(path, px):
    s = surface(px, px); ctx = cairo.Context(s)
    k = px/32
    ctx.scale(k, k)
    # rounded rect bg
    r = 7
    ctx.new_sub_path()
    ctx.arc(32-r, r, r, -math.pi/2, 0)
    ctx.arc(32-r, 32-r, r, 0, math.pi/2)
    ctx.arc(r, 32-r, r, math.pi/2, math.pi)
    ctx.arc(r, r, r, math.pi, 3*math.pi/2)
    ctx.close_path()
    ctx.set_source_rgb(*hex_rgb(DEEP_SPACE)); ctx.fill()
    c1 = (11.5, 20.5, 7.5)
    c2 = (23.5, 9.5, 4.2, 2.8)
    a, b = edge(c1[:2], c1[2]+1.4, c2[:2], c2[2]+c2[3]/2+1.4)
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.set_source_rgb(*hex_rgb(SYNC))
    ctx.set_line_width(2.2)
    ctx.move_to(*a); ctx.line_to(*b); ctx.stroke()
    ctx.set_source_rgb(*hex_rgb(CORAL))
    ctx.arc(c1[0], c1[1], c1[2], 0, 2*math.pi); ctx.fill()
    ctx.set_source_rgb(*hex_rgb(SYNC))
    ctx.set_line_width(c2[3])
    ctx.arc(c2[0], c2[1], c2[2], 0, 2*math.pi); ctx.stroke()
    s.write_to_png(path); print("png:", os.path.basename(path))

for px in (16, 32, 48):
    render_favicon(os.path.join(FAV_DIR, f"favicon-{px}x{px}.png"), px)

# favicon.ico via Pillow
from PIL import Image
imgs = [Image.open(os.path.join(FAV_DIR, f"favicon-{p}x{p}.png")) for p in (16, 32, 48)]
imgs[2].save(os.path.join(FAV_DIR, "favicon.ico"),
             sizes=[(16, 16), (32, 32), (48, 48)],
             append_images=[])
# Pillow ICO: save largest with sizes list
Image.open(os.path.join(FAV_DIR, "favicon-48x48.png")).save(
    os.path.join(FAV_DIR, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("ico: favicon.ico")

# OG image 1200x630
def render_og(path):
    W2, H2 = 1200, 630
    s = surface(W2, H2); ctx = cairo.Context(s)
    ctx.set_source_rgb(*hex_rgb(DEEP_SPACE)); ctx.paint()
    og_stars = [(90,80,2.5,.4),(220,180,2,.3),(340,60,3,.45),(520,130,2,.3),(700,70,2.5,.4),
                (900,150,2,.3),(1080,90,3,.45),(1140,300,2,.3),(1000,480,2.5,.35),(820,560,2,.3),
                (600,540,2.5,.35),(380,560,2,.3),(160,480,2.5,.4),(60,300,2,.3),(760,300,1.6,.22),
                (460,260,1.6,.22),(280,380,1.8,.25),(940,380,1.8,.25)]
    for x, y, r, o in og_stars:
        ctx.push_group()
        ctx.set_source_rgb(*hex_rgb(STARLIGHT))
        ctx.arc(x, y, r, 0, 2*math.pi); ctx.fill()
        ctx.pop_group_to_source(); ctx.paint_with_alpha(o)
    # mark + wordmark centered
    msc = 2.4
    total = 96*msc + 40 + measure(WM_TEXT, 110)
    ox = (W2-total)/2
    mark_cairo(ctx, CORAL, SYNC, ox, (H2-96*msc)/2 - 40, msc)
    bl = H2/2 - 40 + (96*msc)/2 - (96*msc - (XH*110/UPM))/2 + 20
    bl = H2/2 + (XH*110/UPM)/2 - 40
    render_wordmark(ctx, WM_TEXT, 110, ox + 96*msc + 40, bl, STARLIGHT, CORAL)
    # tagline
    tag = "No servers. No accounts. No passwords."
    tsize = 34
    tw = measure(tag, tsize)
    render_wordmark(ctx, tag, tsize, (W2-tw)/2, H2/2 + 150, "#A8B3C7", "#A8B3C7")
    s.write_to_png(path); print("png:", os.path.basename(path))
render_og(os.path.join(PNG_DIR, "og-image-1200x630.png"))

print("DONE")
