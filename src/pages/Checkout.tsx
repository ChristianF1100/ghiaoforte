import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { Order, getOrders, priceOf, saveOrder, useCart } from '../shop/cart'
import { fdate, money, useTitle } from '../lib/util'
type F = Record<string, string>
const steps = ['Dati cliente', 'Spedizione', 'Pagamento', 'Riepilogo']
const fields: [string, string, number, string?][] = [['nome', 'Nome', 0], ['cognome', 'Cognome', 0], ['email', 'Email', 0, 'email'], ['telefono', 'Telefono', 0, 'tel'],
  ['indirizzo', 'Indirizzo', 1], ['civico', 'Numero civico', 1], ['cap', 'CAP', 1], ['citta', 'Città', 1], ['provincia', 'Provincia (sigla)', 1]]
function check(f: F, step: number): F {
  const e: F = {}
  fields.filter(x => x[2] === step).forEach(([k, l]) => { if (!f[k]?.trim()) e[k] = `${l}: campo obbligatorio` })
  if (step === 0) { if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Email non valida'; if (f.telefono && !/^[+\d\s]{6,}$/.test(f.telefono)) e.telefono = 'Telefono non valido' }
  if (step === 1) { if (f.cap && !/^\d{5}$/.test(f.cap)) e.cap = 'CAP non valido (5 cifre)'; if (f.provincia && !/^[A-Za-z]{2}$/.test(f.provincia)) e.provincia = 'Usa la sigla di 2 lettere' }
  if (step === 2 && !f.pagamento) e.pagamento = 'Seleziona un metodo di pagamento'
  return e
}
export function Checkout() {
  useTitle('Checkout'); const c = useCart(), nav = useNavigate()
  const [step, setStep] = useState(0), [f, setF] = useState<F>({ pagamento: 'carta' }), [err, setErr] = useState<F>({})
  if (!c.lines.length) return <div className="wrap empty"><h1>Il carrello è vuoto</h1><Link className="btn" to="/shop">Vai allo shop</Link></div>
  const next = () => { const e = check(f, step); setErr(e); if (!Object.keys(e).length) setStep(step + 1) }
  const confirm = () => {
    for (let s = 0; s < 3; s++) { const e = check(f, s); if (Object.keys(e).length) { setErr(e); setStep(s); return } }
    const code = 'GF-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase()
    const o: Order = { code, date: new Date().toISOString(), customer: f, payment: f.pagamento, subtotal: c.subtotal, shipping: c.shipping, total: c.total,
      lines: c.lines.map(l => ({ name: products.find(p => p.id === l.id)!.name, size: l.size, color: l.color, qty: l.qty, price: priceOf(l.id) })) }
    saveOrder(o); c.clear(); nav(`/ordine/${code}`)
  }
  const inp = (k: string, l: string, type = 'text') => <label className="f" key={k}>{l}<input type={type} value={f[k] ?? ''} aria-invalid={!!err[k]} onChange={e => setF({ ...f, [k]: e.target.value })} />{err[k] && <span className="err" role="alert">{err[k]}</span>}</label>
  return <div className="wrap sec"><h1>Checkout</h1><p className="note">Ambiente di acquisto dimostrativo: nessun pagamento reale verrà effettuato e nessun dato verrà inviato a server.</p>
    <ol className="steps">{steps.map((s, i) => <li key={s} className={i === step ? 'on' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>{s}</li>)}</ol>
    <div className="grid2 cartg"><div className="card pad">
      {(step === 0 || step === 1) && <div className="fgrid">{fields.filter(x => x[2] === step).map(([k, l, , t]) => inp(k, l, t))}{step === 1 && <label className="f wide">Note per la consegna (facoltative)<textarea rows={3} value={f.note ?? ''} onChange={e => setF({ ...f, note: e.target.value })} /></label>}</div>}
      {step === 2 && <fieldset><legend>Metodo di pagamento</legend>{[['carta', 'Carta di pagamento (simulata)'], ['contrassegno', 'Contrassegno dimostrativo']].map(([v, l]) => <label className="radio" key={v}><input type="radio" name="pay" checked={f.pagamento === v} onChange={() => setF({ ...f, pagamento: v })} />{l}</label>)}
        <p className="muted">Modalità simulata: non vengono richiesti né salvati dati di carte o conti bancari.</p>{err.pagamento && <p className="err">{err.pagamento}</p>}</fieldset>}
      {step === 3 && <div><h2>Riepilogo ordine</h2><p><b>{f.nome} {f.cognome}</b><br />{f.email} · {f.telefono}</p><p>{f.indirizzo} {f.civico}, {f.cap} {f.citta} ({f.provincia?.toUpperCase()})</p>{f.note && <p className="muted">Note: {f.note}</p>}<p>Pagamento: {f.pagamento === 'carta' ? 'Carta (simulata)' : 'Contrassegno dimostrativo'}</p></div>}
      <div className="row">{step > 0 && <button className="btn ghost dark" onClick={() => setStep(step - 1)}>Indietro</button>}{step < 3 ? <button className="btn" onClick={next}>Continua</button> : <button className="btn" onClick={confirm}>Conferma ordine</button>}</div></div>
      <aside className="card pad sum"><h2>Il tuo ordine</h2>{c.lines.map((l, i) => { const p = products.find(x => x.id === l.id)!; return <p key={i}><span>{l.qty}× {p.name}{l.size ? ` (${l.size})` : ''}</span><b>{money(p.price * l.qty)}</b></p> })}
        <p><span>Subtotale</span><b>{money(c.subtotal)}</b></p><p><span>Spedizione</span><b>{c.shipping ? money(c.shipping) : 'Gratuita'}</b></p><p className="tot"><span>Totale</span><b>{money(c.total)}</b></p></aside></div></div>
}
export function OrderDone() {
  const { code } = useParams(), o = getOrders().find(x => x.code === code); useTitle('Ordine confermato')
  if (!o) return <div className="wrap empty"><h1>Ordine non trovato</h1><p>Gli ordini sono salvati solo nel browser in cui sono stati effettuati.</p><Link className="btn" to="/shop">Torna allo shop</Link></div>
  const c = o.customer
  return <div className="wrap sec art"><h1>Grazie per il tuo ordine, {c.nome}!</h1><p className="lead dark">Il tuo ordine è stato registrato.</p>
    <div className="card pad"><p>Numero d'ordine: <b className="code">{o.code}</b><br />Data: {fdate(o.date)}</p>
      {o.lines.map((l, i) => <p className="rowp" key={i}><span>{l.qty}× {l.name} {[l.size, l.color].filter(Boolean).join(' · ')}</span><b>{money(l.price * l.qty)}</b></p>)}
      <p className="rowp"><span>Spedizione</span><b>{o.shipping ? money(o.shipping) : 'Gratuita'}</b></p><p className="rowp tot"><span>Totale</span><b>{money(o.total)}</b></p>
      <p><b>Spedizione a:</b> {c.nome} {c.cognome}, {c.indirizzo} {c.civico}, {c.cap} {c.citta} ({c.provincia?.toUpperCase()})</p>
      <p className="muted">Ordine dimostrativo salvato nel tuo browser: nessuna email inviata, nessuna spedizione effettiva.</p></div><p><Link className="btn" to="/shop">Torna allo shop</Link></p></div>
}
