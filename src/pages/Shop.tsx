import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { ads } from '../data/ads'
import { FREE_SHIP, priceOf, useCart } from '../shop/cart'
import { money, useTitle } from '../lib/util'
import Img from '../components/Img'
import Box, { Notice } from '../components/Box'
import AdBanner from '../components/AdBanner'
const avail = (s: number) => s < 1 ? 'Non disponibile' : s < 10 ? `Ultimi ${s} pezzi` : 'Disponibile'
export function Shop() {
  useTitle('Shop ufficiale', 'Il merchandising ufficiale del Ghiaoforte.')
  const [q, setQ] = useState(''), [sort, setSort] = useState('def'), [only, setOnly] = useState(false)
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    const l = products.filter(p => (!s || (p.name + ' ' + p.desc).toLowerCase().includes(s)) && (!only || p.stock > 0))
    return sort === 'asc' ? [...l].sort((a, b) => a.price - b.price) : sort === 'desc' ? [...l].sort((a, b) => b.price - a.price) : l
  }, [q, sort, only])
  return <div className="wrap sec"><h1>Shop ufficiale</h1>
    <Notice>La società informa che le richieste saranno evase secondo disponibilità. La verifica anti-robot è stata superata.</Notice>
    <p className="lead">Maglie, abbigliamento e accessori per vivere i colori del club ogni giorno.</p>
    <div className="shop-grid">
      <aside><Box title="Filtri del catalogo"><label className="f">Cerca nel catalogo<input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Nome o descrizione" /></label>
        <label className="f">Ordina per<select value={sort} onChange={e => setSort(e.target.value)}><option value="def">Ordine del catalogo</option><option value="asc">Prezzo crescente</option><option value="desc">Prezzo decrescente</option></select></label>
        <label className="radio"><input type="checkbox" checked={only} onChange={e => setOnly(e.target.checked)} />Solo prodotti disponibili</label></Box>
        <Box title="Condizioni di vendita"><p className="small">La disponibilità è indicativa. Le spedizioni sono gratuite da {money(FREE_SHIP)}; sotto tale soglia si applica un contributo. La procedura d’acquisto prevede la compilazione di un modulo.</p></Box>
        <AdBanner ad={ads[2]} variant="tall" /></aside>
      <div>{list.length === 0 && <p className="empty">Nessun prodotto corrisponde ai criteri indicati.</p>}
        <div className="plist">{list.map(p => <article className="pcard" key={p.id}><Link to={`/shop/${p.id}`}><Img src={p.img} alt={p.name} /></Link>
          <div><h3><Link to={`/shop/${p.id}`}>{p.name}</Link></h3><p className="price">{money(p.price)}</p><p className={p.stock < 1 ? 'muted' : 'ok'}>{avail(p.stock)}</p>
            {p.sizes && <p className="small muted">Taglie: {p.sizes.join(', ')}</p>}<Link className="btn pri sm" to={`/shop/${p.id}`}>SCHEDA PRODOTTO</Link></div></article>)}</div></div>
    </div></div>
}
export function ProductPage() {
  const { id } = useParams(), p = products.find(x => x.id === id), { add } = useCart(), nav = useNavigate()
  const [size, setSize] = useState(''), [color, setColor] = useState(p?.colors?.length === 1 ? p.colors[0] : ''), [qty, setQty] = useState(1), [err, setErr] = useState('')
  useTitle(p?.name ?? 'Prodotto non trovato', p?.desc)
  if (!p) return <div className="wrap empty"><h1>Prodotto non trovato</h1><Link className="btn pri" to="/shop">Torna allo shop</Link></div>
  const go = (buy: boolean) => {
    if (p.sizes && !size) return setErr('Seleziona una taglia.')
    if (p.colors && !color) return setErr('Seleziona un colore.')
    if (!(qty >= 1) || qty > p.stock) return setErr('Quantità non valida.')
    setErr(''); add({ id: p.id, size: size || undefined, color: color || undefined, qty }); if (buy) nav('/checkout')
  }
  return <div className="wrap sec"><Link to="/shop" className="more">← Torna allo shop</Link><div className="grid2 gap"><Img src={p.img} alt={p.name} className="rounded" loading="eager" />
    <div className="box"><h1 className="box-h plain">{p.name}</h1><div className="box-b"><p className="price big">{money(p.price)}</p><p>{p.desc}</p><p className={p.stock < 1 ? 'muted' : 'ok'}>{avail(p.stock)}</p>
      {p.sizes && <fieldset><legend>Taglia</legend>{p.sizes.map(s => <button key={s} type="button" aria-pressed={size === s} className={'chip' + (size === s ? ' on' : '')} onClick={() => setSize(s)}>{s}</button>)}</fieldset>}
      {p.colors && <fieldset><legend>Colore</legend>{p.colors.map(c => <button key={c} type="button" aria-pressed={color === c} className={'chip' + (color === c ? ' on' : '')} onClick={() => setColor(c)}>{c}</button>)}</fieldset>}
      <label className="f">Quantità<input type="number" min={1} max={p.stock} value={qty} onChange={e => setQty(Number(e.target.value))} /></label>
      {err && <p className="err" role="alert">{err}</p>}
      <div className="row"><button className="btn pri" disabled={p.stock < 1} onClick={() => go(false)}>AGGIUNGI AL CARRELLO</button><button className="btn" disabled={p.stock < 1} onClick={() => go(true)}>ACQUISTA ORA</button></div>
      <Notice>l’aggiunta al carrello non costituisce impegno di acquisto né di consegna.</Notice></div></div></div></div>
}
export function CartPage() {
  const c = useCart(); useTitle('Carrello')
  if (!c.lines.length) return <div className="wrap empty"><h1>Il carrello è vuoto</h1><p>Scopri il merchandising ufficiale del club.</p><Link className="btn pri" to="/shop">Vai allo shop</Link></div>
  return <div className="wrap sec"><h1>Carrello</h1><div className="grid2 cartg"><ul className="lines">{c.lines.map((l, i) => { const p = products.find(x => x.id === l.id)!; return <li key={i} className="card line"><Img src={p.img} alt={p.name} />
    <div><h3><Link to={`/shop/${p.id}`}>{p.name}</Link></h3><p className="muted">{[l.size, l.color].filter(Boolean).join(' · ') || 'Taglia unica'} · {money(p.price)}</p>
      <div className="qty"><button aria-label="Diminuisci quantità" onClick={() => c.setQty(i, l.qty - 1)}>−</button><span aria-live="polite">{l.qty}</span><button aria-label="Aumenta quantità" onClick={() => c.setQty(i, l.qty + 1)}>+</button></div></div>
    <div className="end"><b>{money(priceOf(l.id) * l.qty)}</b><button className="link" onClick={() => c.remove(i)}>Rimuovi</button></div></li> })}</ul>
    <aside className="card pad sum"><h2>Riepilogo ordine</h2><p><span>Subtotale</span><b>{money(c.subtotal)}</b></p><p><span>Spedizione</span><b>{c.shipping ? money(c.shipping) : 'Gratuita'}</b></p>{c.shipping > 0 && <p className="muted">Spedizione gratuita da {money(FREE_SHIP)}.</p>}<p className="tot"><span>Totale</span><b>{money(c.total)}</b></p>
      <Link className="btn pri" to="/checkout">PROCEDI CON LA PRATICA</Link> <Link className="more" to="/shop">Continua gli acquisti</Link>
      <p className="small muted">Il carrello è conservato nel browser, salvo smarrimento.</p></aside></div></div>
}
