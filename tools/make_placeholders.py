"""Genera immagini provvisorie + IMAGE_GUIDE.md. Esegui: python3 tools/make_placeholders.py"""
import os, hashlib
R = os.path.join(os.path.dirname(__file__), '..')
M = [('home/hero.svg',1920,1080,'Hero homepage','Home')]
M += [(f'news/n{i}.svg',1200,750,f'News {i}','News / articolo') for i in range(1,8)]
M += [('players/placeholder.svg',600,750,'Giocatore','Scheda giocatore (usata se manca la foto)')]
M += [(f'gallery/g{i}.svg',1200,800,f'Galleria {i}','Galleria') for i in range(1,10)]
M += [(f'stadium/s{i}.svg',1600,900,f'Impianto {i}','Dove giochiamo / La società') for i in (1,2)]
M += [(f'sponsors/sp{i}.svg',400,240,f'Sponsor {i}','Sponsor (logo)') for i in range(1,7)]
M += [(f'shop/pr{i}.svg',800,800,f'Prodotto {i}','Shop') for i in range(1,13)]
M += [('brand/placeholder.svg',800,600,'Ghiaoforte','Fallback immagini mancanti')]
for p,w,h,l,_ in M:
    hue = int(hashlib.md5(p.encode()).hexdigest()[:4],16) % 40 + 150
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl({hue},45%,18%)"/><stop offset="1" stop-color="hsl({hue+20},40%,32%)"/></linearGradient></defs><rect width="{w}" height="{h}" fill="url(#g)"/><circle cx="{w*.78}" cy="{h*.3}" r="{min(w,h)*.28}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="8"/><path d="M0 {h*.72}H{w}" stroke="#fff" stroke-opacity=".12" stroke-width="6"/><text x="50%" y="52%" text-anchor="middle" font-family="Arial" font-weight="700" font-size="{min(w,h)*.07}" fill="#fff" fill-opacity=".75">{l}</text></svg>'''
    open(os.path.join(R,'public/images',p),'w').write(svg)
try:
    from PIL import Image, ImageDraw
    def logo(path, fg, bg, size=512):
        im = Image.new('RGBA',(size,size),(0,0,0,0)); d = ImageDraw.Draw(im)
        d.rounded_rectangle((size*.08,size*.05,size*.92,size*.95),radius=size*.22,fill=bg,outline=fg,width=size//32)
        d.text((size*.5,size*.5),'GF',fill=fg,anchor='mm',font_size=size*.38) if hasattr(d,'text') else None
        im.save(path)
    logo(os.path.join(R,'public/images/brand/logo.png'),(255,255,255),(17,24,32))
    logo(os.path.join(R,'public/images/brand/logo-white.png'),(17,24,32),(255,255,255))
    logo(os.path.join(R,'public/favicon.png'),(255,255,255),(228,87,46),128)
except Exception as e: print('PIL non disponibile, crea a mano i PNG del brand:', e)
g = '# Guida alle immagini\n\nSostituisci i file mantenendo **nome e percorso** (se cambi estensione, aggiorna il percorso nel file dati). Nessuna modifica al layout necessaria: le immagini vengono ritagliate in automatico (object-fit: cover).\n\n| Percorso (in public/images/) | Sezione | Dimensioni consigliate | Rapporto |\n|---|---|---|---|\n'
for p,w,h,l,s in M: g += f'| `{p}` | {s} | {w}×{h} px | {w//__import__("math").gcd(w,h)}:{h//__import__("math").gcd(w,h)} |\n'
g += '| `brand/logo.png` | Logo su sfondo scuro (header, footer) | 512×512 PNG trasparente | 1:1 |\n| `brand/logo-white.png` | Logo su sfondo chiaro | 512×512 PNG trasparente | 1:1 |\n| `../favicon.png` (public/) | Favicon | 128×128 o 256×256 PNG | 1:1 |\n'
open(os.path.join(R,'IMAGE_GUIDE.md'),'w').write(g)
