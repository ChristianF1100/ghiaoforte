import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { Order, getOrders, priceOf, saveOrder, useCart } from '../shop/cart'
import { downloadText, fdate, money, useTitle } from '../lib/util'
import { usePopupBlock } from '../popups/PopupContext'
import { Notice } from '../components/Box'

// Checkout = pratica amministrativa. Simulazione solo frontend: nessun pagamento, nessun invio, nessun dato personale salvato.
type F = Record<string, string>
interface Field { k: string; l: string; step: number; type?: string; hint?: string; test?: (v: string) => string }
const alnum = (n: number, m = n) => (v: string) => new RegExp(`^[A-Za-z0-9]{${n},${m}}$`).test(v.replace(/\s/g, ''))
const FIELDS: Field[] = [
  { k: 'nome', l: 'Nome', step: 0 }, { k: 'cognome', l: 'Cognome', step: 0 },
  { k: 'email', l: 'Email', step: 0, type: 'email', test: v => /^\S+@\S+\.\S+$/.test(v) ? '' : 'Email non valida' },
  { k: 'telefono', l: 'Telefono', step: 0, type: 'tel', test: v => /^[+\d\s]{6,}$/.test(v) ? '' : 'Telefono non valido' },
  { k: 'indirizzo', l: 'Indirizzo', step: 1 }, { k: 'civico', l: 'Numero civico', step: 1 },
  { k: 'cap', l: 'CAP', step: 1, test: v => /^\d{5}$/.test(v) ? '' : 'CAP non valido (5 cifre)' }, { k: 'citta', l: 'Città', step: 1 },
  { k: 'provincia', l: 'Provincia (sigla)', step: 1, test: v => /^[A-Za-z]{2}$/.test(v) ? '' : 'Usa la sigla di 2 lettere' },
  { k: 'cfBisnonno', l: 'Codice fiscale del bisnonno paterno', step: 2, hint: '16 caratteri alfanumerici. In caso di smarrimento, indicare quello presunto.', test: v => alnum(16)(v) ? '' : 'Il codice fiscale deve contenere 16 caratteri alfanumerici' },
  { k: 'targa', l: 'Targa dell’ultima automobile posseduta', step: 2, test: v => alnum(5, 8)(v) ? '' : 'Targa non valida (da 5 a 8 caratteri)' },
  { k: 'allenatore', l: 'Luogo di nascita del primo allenatore', step: 2 },
  { k: 'tessera', l: 'Numero della tessera elettorale', step: 2, hint: 'Anche scaduta.', test: v => alnum(6, 12)(v) ? '' : 'Numero non valido (da 6 a 12 caratteri)' },
  { k: 'profBisnonno', l: 'Professione del bisnonno materno', step: 2 },
  { k: 'capBisnonno', l: 'CAP del luogo di nascita del bisnonno', step: 2, test: v => /^\d{5}$/.test(v) ? '' : 'CAP non valido (5 cifre)' },
  { k: 'scarpe', l: 'Numero di scarpe indossato nel 2008', step: 2, type: 'number', test: v => { const n = Number(v); return n >= 18 && n <= 52 ? '' : 'Indicare un numero compreso tra 18 e 52' } },
]
const DECL: [string, string][] = [
  ['d1', 'Dichiaro di aver letto il regolamento, che non è stato reso disponibile.'],
  ['d2', 'Dichiaro di essere consapevole che l’ordine potrebbe non essere evaso.'],
  ['d3', 'Dichiaro che i dati inseriti sono veritieri o, comunque, verosimili.'],
  ['d4', 'Accetto che la società declini ogni responsabilità per eventuali ritardi.'],
]
const PAY: [string, string][] = [['carta', 'Carta di pagamento (simulata)'], ['contrassegno', 'Contrassegno dimostrativo'], ['mandarini', 'Pagamento in natura (mandarini, simulato)']]
const STEPS = ['Dati del richiedente', 'Recapito', 'Dati integrativi', 'Dichiarazioni', 'Verifica e invio']
const num = (s: string) => { const t = s.replace(/[€\s]/g, ''); return parseFloat(t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t) }

function check(f: F, step: number, total: number): F {
  const e: F = {}
  FIELDS.filter(x => x.step === step).forEach(x => {
    const v = (f[x.k] ?? '').trim()
    if (!v) e[x.k] = `${x.l}: campo obbligatorio`; else { const m = x.test?.(v); if (m) e[x.k] = m }
  })
  if (step === 3) {
    DECL.forEach(([k]) => { if (f[k] !== '1') e[k] = 'Dichiarazione obbligatoria' })
    if ((f.motivo ?? '').trim().length < 20) e.motivo = 'Indicare una motivazione di almeno 20 caratteri'
    if (!f.pagamento) e.pagamento = 'Seleziona un metodo di pagamento'
  }
  if (step === 4) { const n = num(f.verifica ?? ''); if (!isFinite(n) || Math.abs(n - total) > 0.005) e.verifica = 'L’importo indicato non corrisponde al totale. Si prega di rileggere il riepilogo.' }
  return e
}

const PROC = ['Trasmissione della richiesta', 'Verifica dei dati', 'Consultazione archivio', 'Verifica disponibilità prodotto', 'Richiesta autorizzazione', 'Assegnazione protocollo']
const PROC_NOTE: Record<number, string> = { 2: 'L’archivio è stato individuato.', 4: 'Si prega di attendere: la richiesta è in coda.' }
const OUTCOMES = [
  { status: 'In attesa di autorizzazione', note: 'La richiesta sarà presa in carico.' },
  { status: 'In attesa di autorizzazione', note: 'La richiesta sarà presa in carico. Si consiglia di non sollecitare.' },
  { status: 'In attesa di integrazione documentale', note: 'La società potrà richiedere, in data da definirsi, copia del documento del bisnonno. La pratica risulta comunque trasmessa.' },
  { status: 'Smarrita e successivamente ritrovata', note: 'La pratica è stata temporaneamente smarrita ed è stata ritrovata. La procedura prosegue, salvo verifiche successive.' },
  { status: 'Presa in carico secondo disponibilità', note: 'La pratica sarà esaminata alla prima occasione utile.' },
]
function Processing({ onDone }: { onDone: () => void }) {
  usePopupBlock(true)
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => i >= PROC.length ? onDone() : setI(i + 1), i >= PROC.length ? 800 : 900 + Math.random() * 900)
    return () => clearTimeout(t)
  }, [i]) // eslint-disable-line react-hooks/exhaustive-deps
  const pct = Math.round(Math.min(i, PROC.length) / PROC.length * 100)
  return <div className="wrap sec"><div className="win proc"><div className="win-title"><span>⏳ ELABORAZIONE DELLA PRATICA</span></div><div className="win-body">
    <p>Si comunica che la richiesta è in fase di elaborazione. <b>Si prega di non chiudere la finestra del browser</b>: la società non risponde di eventuali chiusure.</p>
    <ol className="proc-l">{PROC.map((s, k) => <li key={s} className={k < i ? 'done' : k === i ? 'now' : ''}><span aria-hidden="true">{k < i ? '✔' : k === i ? '…' : '○'}</span> {s}{k < i && PROC_NOTE[k] && <em> — {PROC_NOTE[k]}</em>}</li>)}</ol>
    <div className="pbar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><i style={{ width: pct + '%' }} /></div></div></div></div>
}

export function Checkout() {
  useTitle('Checkout'); usePopupBlock(true)
  const c = useCart(), nav = useNavigate()
  const [step, setStep] = useState(0), [f, setF] = useState<F>({ pagamento: 'carta' }), [err, setErr] = useState<F>({}), [proc, setProc] = useState(false)
  const result = useRef<{ code: string; o: (typeof OUTCOMES)[number] } | null>(null)
  if (!c.lines.length && !proc) return <div className="wrap empty"><h1>Il carrello è vuoto</h1><Link className="btn pri" to="/shop">Vai allo shop</Link></div>
  const go = (to: number) => { setStep(to); setErr({}); window.scrollTo(0, 0) }
  const next = () => { const e = check(f, step, c.total); setErr(e); if (!Object.keys(e).length) go(step + 1) }
  const confirm = () => {
    for (let s = 0; s < 5; s++) { const e = check(f, s, c.total); if (Object.keys(e).length) { setErr(e); setStep(s); return } }
    result.current = { code: `GF-${new Date().getFullYear()}-${100000 + Math.floor(Math.random() * 900000)}`, o: OUTCOMES[Math.floor(Math.random() * OUTCOMES.length)] }
    setProc(true); window.scrollTo(0, 0)
  }
  const finish = () => {
    const r = result.current; if (!r) return
    // Nell’ordine salvato nel browser restano solo nome, cognome e righe d’ordine: nessun dato integrativo.
    const o: Order = { code: r.code, date: new Date().toISOString(), status: r.o.status, note: r.o.note, customer: { nome: f.nome ?? '', cognome: f.cognome ?? '' }, payment: f.pagamento, subtotal: c.subtotal, shipping: c.shipping, total: c.total,
      lines: c.lines.map(l => ({ name: products.find(p => p.id === l.id)!.name, size: l.size, color: l.color, qty: l.qty, price: priceOf(l.id) })) }
    saveOrder(o); c.clear(); nav(`/ordine/${r.code}`, { replace: true })
  }
  if (proc) return <Processing onDone={finish} />
  const inp = (x: Field) => <label className={'f' + (x.step === 2 ? ' wide' : '')} key={x.k}>{x.l}<input type={x.type ?? 'text'} value={f[x.k] ?? ''} autoComplete="off" aria-invalid={!!err[x.k]} onChange={e => setF({ ...f, [x.k]: e.target.value })} />
    {x.hint && <span className="hint">{x.hint}</span>}{err[x.k] && <span className="err" role="alert">{err[x.k]}</span>}</label>
  return <div className="wrap sec"><h1>Pratica di acquisto</h1>
    <Notice title="Modulo dimostrativo">ai sensi delle disposizioni societarie si raccomanda di inserire dati di fantasia: la società non ne verificherà l’esattezza né la veridicità. Nessun pagamento reale verrà effettuato e nessun dato lascerà il browser.</Notice>
    <p className="muted small">Modulo GF-3/B — pagina {step + 1} di {STEPS.length}</p>
    <ol className="steps">{STEPS.map((s, i) => <li key={s} className={i === step ? 'on' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>{s}</li>)}</ol>
    <div className="grid2 cartg"><div className="card pad">
      {step <= 2 && <div className="fgrid">{FIELDS.filter(x => x.step === step).map(inp)}{step === 1 && <label className="f wide">Note per la consegna (facoltative)<textarea rows={3} value={f.note ?? ''} onChange={e => setF({ ...f, note: e.target.value })} /></label>}</div>}
      {step === 3 && <div>
        <fieldset><legend>Dichiarazioni obbligatorie</legend>{DECL.map(([k, t]) => <div key={k}><label className="radio"><input type="checkbox" checked={f[k] === '1'} onChange={e => setF({ ...f, [k]: e.target.checked ? '1' : '' })} />{t}</label>{err[k] && <span className="err" role="alert">{err[k]}</span>}</div>)}</fieldset>
        <label className="f">Motivazione dell’acquisto (almeno 20 caratteri)<textarea rows={4} value={f.motivo ?? ''} onChange={e => setF({ ...f, motivo: e.target.value })} />{err.motivo && <span className="err" role="alert">{err.motivo}</span>}</label>
        <fieldset><legend>Metodo di pagamento</legend>{PAY.map(([v, l]) => <label className="radio" key={v}><input type="radio" name="pay" checked={f.pagamento === v} onChange={() => setF({ ...f, pagamento: v })} />{l}</label>)}
          <p className="muted small">Modalità simulata: non vengono richiesti né salvati dati di carte o conti bancari.</p>{err.pagamento && <p className="err">{err.pagamento}</p>}</fieldset></div>}
      {step === 4 && <div><h2>Riepilogo della pratica</h2>
        <p><b>{f.nome} {f.cognome}</b><br />{f.email} · {f.telefono}</p><p>{f.indirizzo} {f.civico}, {f.cap} {f.citta} ({f.provincia?.toUpperCase()})</p>{f.note && <p className="muted">Note: {f.note}</p>}
        <p>Pagamento: {PAY.find(p => p[0] === f.pagamento)?.[1]}</p><p className="muted small">Motivazione: {f.motivo}</p>
        <label className="f">Verifica dell’ordine: riportare l’importo totale in cifre (es. 69,90)<input inputMode="decimal" value={f.verifica ?? ''} autoComplete="off" aria-invalid={!!err.verifica} onChange={e => setF({ ...f, verifica: e.target.value })} />{err.verifica && <span className="err" role="alert">{err.verifica}</span>}</label></div>}
      <div className="row">{step > 0 && <button className="btn" onClick={() => go(step - 1)}>INDIETRO</button>}{step < 4 ? <button className="btn pri" onClick={next}>CONTINUA</button> : <button className="btn pri" onClick={confirm}>TRASMETTI LA PRATICA</button>}</div></div>
      <aside className="card pad sum"><h2>Il tuo ordine</h2>{c.lines.map((l, i) => { const p = products.find(x => x.id === l.id)!; return <p key={i}><span>{l.qty}× {p.name}{l.size ? ` (${l.size})` : ''}</span><b>{money(p.price * l.qty)}</b></p> })}
        <p><span>Subtotale</span><b>{money(c.subtotal)}</b></p><p><span>Spedizione</span><b>{c.shipping ? money(c.shipping) : 'Gratuita'}</b></p><p className="tot"><span>Totale</span><b>{money(c.total)}</b></p></aside></div></div>
}

export function OrderDone() {
  const { code } = useParams(), o = getOrders().find(x => x.code === code); useTitle('Pratica trasmessa')
  if (!o) return <div className="wrap empty"><h1>Pratica non trovata</h1><p>Le pratiche sono conservate solo nel browser in cui sono state trasmesse.</p><Link className="btn pri" to="/shop">Torna allo shop</Link></div>
  const c = o.customer, righe = o.lines.map(l => `${l.qty}x ${l.name} ${[l.size, l.color].filter(Boolean).join(' ')} — ${money(l.price * l.qty)}`).join('\n')
  const ricevuta = `AS GHIAOFORTE — Ricevuta di trasmissione pratica\nProtocollo: ${o.code}\nData: ${fdate(o.date)}\nStato: ${o.status ?? 'In attesa di autorizzazione'}\n\n${righe}\nTotale: ${money(o.total)}\n\nPratica simulata: nessun pagamento effettuato, nessuna spedizione prevista.\nLa società declina ogni responsabilità per eventuali ritardi.\n`
  return <div className="wrap sec art"><div className="stamp" role="status">PRATICA TRASMESSA CORRETTAMENTE</div>
    <h1>Grazie, {c.nome}.</h1><p className="lead">La procedura è stata completata, salvo verifiche successive.</p>
    <div className="card pad"><p>Numero di protocollo: <b className="code">{o.code}</b><br />Data: {fdate(o.date)}<br />Stato della pratica: <b>{o.status ?? 'In attesa di autorizzazione'}</b></p>{o.note && <p className="muted">{o.note}</p>}
      {o.lines.map((l, i) => <p className="rowp" key={i}><span>{l.qty}× {l.name} {[l.size, l.color].filter(Boolean).join(' · ')}</span><b>{money(l.price * l.qty)}</b></p>)}
      <p className="rowp"><span>Spedizione</span><b>{o.shipping ? money(o.shipping) : 'Gratuita'}</b></p><p className="rowp tot"><span>Totale</span><b>{money(o.total)}</b></p>
      <p><b>Richiedente:</b> {c.nome} {c.cognome}</p>
      <p className="muted small">Pratica dimostrativa salvata nel tuo browser: nessuna email inviata, nessun pagamento effettuato, nessuna spedizione effettiva.</p></div>
    <div className="row"><button className="btn" onClick={() => downloadText(`ricevuta-${o.code}.txt`, ricevuta)}>📄 SCARICA LA RICEVUTA (.txt)</button><Link className="btn pri" to="/shop">TORNA ALLO SHOP</Link></div></div>
}
