import { useEffect, useState } from 'react'
import { gallery } from '../data/gallery'
import { useTitle } from '../lib/util'
import Img from '../components/Img'
export default function Gallery() {
  useTitle('Galleria', 'Le fotografie della vita del Ghiaoforte, stagione per stagione.')
  const [lb, setLb] = useState<{ s: number; i: number } | null>(null)
  const photos = lb ? gallery[lb.s].photos : [], n = photos.length
  useEffect(() => {
    if (!lb) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setLb(null); if (e.key === 'ArrowRight') setLb(l => l && { ...l, i: (l.i + 1) % n }); if (e.key === 'ArrowLeft') setLb(l => l && { ...l, i: (l.i - 1 + n) % n }) }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [lb, n])
  return <div className="wrap sec"><h1>Galleria</h1>
    {gallery.length === 0 && <p className="empty">Nessuna fotografia disponibile.</p>}
    {gallery.map((g, s) => <section key={g.season}><h2>Stagione {g.season}</h2><div className="grid3">{g.photos.map((p, i) => <button key={p.src} className="ph" onClick={() => setLb({ s, i })} aria-label={'Apri: ' + p.alt}><Img src={p.src} alt={p.alt} /></button>)}</div></section>)}
    {lb && <div className="lb" role="dialog" aria-modal="true" aria-label="Fotografia ingrandita" onClick={() => setLb(null)}>
      <button className="x" aria-label="Chiudi" autoFocus onClick={() => setLb(null)}>✕</button>
      <button className="pv" aria-label="Precedente" onClick={e => { e.stopPropagation(); setLb({ ...lb, i: (lb.i - 1 + n) % n }) }}>‹</button>
      <figure onClick={e => e.stopPropagation()}><Img key={photos[lb.i].src} src={photos[lb.i].src} alt={photos[lb.i].alt} loading="eager" /><figcaption>{photos[lb.i].alt} — {lb.i + 1}/{n}</figcaption></figure>
      <button className="nx" aria-label="Successiva" onClick={e => { e.stopPropagation(); setLb({ ...lb, i: (lb.i + 1) % n }) }}>›</button></div>}</div>
}
