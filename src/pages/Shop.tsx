import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { FREE_SHIP, priceOf, useCart } from '../shop/cart'
import { money, useTitle } from '../lib/util'
import Img from '../components/Img'
const avail = (s: number) => s < 1 ? 'Non disponibile' : s < 10 ? `Ultimi ${s} pezzi` : 'Disponibile'
export function Shop() {
  useTitle('Shop ufficiale', 'Il merchandising ufficiale del Ghiaforte.')
  return <div className="wrap sec"><h1>Shop ufficiale</h1><p className="lead dark">Maglie, abbigliamento e accessori per vivere i colori del club ogni giorno.</p>
    <div className="grid4">{products.map(p => <article className="card prod" key={p.id}><Link to={`/shop/${p.id}`}><Img src={p.img} alt={p.name} /></Link><div className="pad"><h3>{p.name}</h3><p className="price">{money(p.price)}</p><p className={p.stock < 1 ? 'muted' : 'ok'}>{avail(p.stock)}</p><Link className="btn sm" to={`/shop/${p.id}`}>Vedi prodotto</Link></div></article>)}</div></div>
}
export function ProductPage() {
  const { id } = useParams(), p = products.find(x => x.id === id), { add } = useCart(), nav = useNavigate()
  const [size, setSize] = useState(''), [color, setColor] = useState(p?.colors?.length === 1 ? p.colors[0] : ''), [qty, setQty] = useState(1), [err, setErr] = useState('')
  useTitle(p?.name ?? 'Prodotto non trovato', p?.desc)
  if (!p) return <div className="wrap empty"><h1>Prodotto non trovato</h1><Link className="btn" to="/shop">Torna allo shop</Link></div>
  const go = (buy: boolean) => {
    if (p.sizes && !size) return setErr('Seleziona una taglia.')
    if (p.colors && !color) return setErr('Seleziona un colore.')
    if (!(qty >= 1) || qty > p.stock) return setErr('Quantità non valida.')
    setErr(''); add({ id: p.id, size: size || undefined, color: color || undefined, qty }); if (buy) nav('/checkout')
  }
  return <div className="wrap sec"><Link to="/shop" className="more">← Torna allo shop</Link><div className="grid2 gap"><Img src={p.img} alt={p.name} className="rounded" loading="eager" />
    <div><h1>{p.name}</h1><p className="price big">{money(p.price)}</p><p>{p.desc}</p><p className={p.stock < 1 ? 'muted' : 'ok'}>{avail(p.stock)}</p>
      {p.sizes && <fieldset><legend>Taglia</legend>{p.sizes.map(s => <button key={s} type="button" aria-pressed={size === s} className={'chip' + (size === s ? ' on' : '')} onClick={() => setSize(s)}>{s}</button>)}</fieldset>}
      {p.colors && <fieldset><legend>Colore</legend>{p.colors.map(c => <button key={c} type="button" aria-pressed={color === c} className={'chip' + (color === c ? ' on' : '')} onClick={() => setColor(c)}>{c}</button>)}</fieldset>}
      <label className="f">Quantità<input type="number" min={1} max={p.stock} value={qty} onChange={e => setQty(Number(e.target.value))} /></label>
      {err && <p className="err" role="alert">{err}</p>}
      <div className="row"><button className="btn" disabled={p.stock < 1} onClick={() => go(false)}>Aggiungi al carrello</button><button className="btn ghost dark" disabled={p.stock < 1} onClick={() => go(true)}>Acquista ora</button></div></div></div></div>
}
export function CartPage() {
  const c = useCart(); useTitle('Carrello')
  if (!c.lines.length) return <div className="wrap empty"><h1>Il carrello è vuoto</h1><p>Scopri il merchandising ufficiale del club.</p><Link className="btn" to="/shop">Vai allo shop</Link></div>
  return <div className="wrap sec"><h1>Carrello</h1><div className="grid2 cartg"><ul className="lines">{c.lines.map((l, i) => { const p = products.find(x => x.id === l.id)!; return <li key={i} className="card line"><Img src={p.img} alt={p.name} />
    <div><h3><Link to={`/shop/${p.id}`}>{p.name}</Link></h3><p className="muted">{[l.size, l.color].filter(Boolean).join(' · ') || 'Taglia unica'} · {money(p.price)}</p>
      <div className="qty"><button aria-label="Diminuisci quantità" onClick={() => c.setQty(i, l.qty - 1)}>−</button><span aria-live="polite">{l.qty}</span><button aria-label="Aumenta quantità" onClick={() => c.setQty(i, l.qty + 1)}>+</button></div></div>
    <div className="end"><b>{money(priceOf(l.id) * l.qty)}</b><button className="link" onClick={() => c.remove(i)}>Rimuovi</button></div></li> })}</ul>
    <aside className="card pad sum"><h2>Riepilogo</h2><p><span>Subtotale</span><b>{money(c.subtotal)}</b></p><p><span>Spedizione</span><b>{c.shipping ? money(c.shipping) : 'Gratuita'}</b></p>{c.shipping > 0 && <p className="muted">Spedizione gratuita da {money(FREE_SHIP)}.</p>}<p className="tot"><span>Totale</span><b>{money(c.total)}</b></p>
      <Link className="btn" to="/checkout">Procedi al checkout</Link> <Link className="more" to="/shop">Continua gli acquisti</Link></aside></div></div>
}
