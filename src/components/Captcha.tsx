import { useEffect, useMemo, useState } from 'react'
import { siteConfig } from '../config/site'
import { club } from '../data/club'
import { usePopupBlock } from '../popups/PopupContext'

// CAPTCHA simulato, interamente locale. Tre verifiche a rotazione; dopo troppi errori la "segreteria" si fida.
const KEY = 'ghiaoforte.captcha'
export const captchaValid = () => {
  if (!siteConfig.captcha.enabled) return true
  try { const t = Number(sessionStorage.getItem(KEY)); return !!t && Date.now() - t < siteConfig.captcha.rememberMinutes * 60000 } catch { return false }
}
const remember = () => { try { sessionStorage.setItem(KEY, String(Date.now())) } catch { /* ignora */ } }
type Kind = 'frutta' | 'codice' | 'anni'
const rnd = (n: number) => Math.floor(Math.random() * n)
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = rnd(i + 1); [b[i], b[j]] = [b[j], b[i]] } return b }
const nextKind = (k?: Kind): Kind => { const all: Kind[] = ['frutta', 'codice', 'anni']; const o = all.filter(x => x !== k); return o[rnd(o.length)] }

function Fruit({ onResult }: { onResult: (ok: boolean) => void }) {
  const tiles = useMemo(() => { const dec = ['🍋', '🍑', '🥭', '🍎', '🥕', '🍅', '🏀', '🥝']; const m = 2 + rnd(3); return shuffle([...Array(m).fill('🍊'), ...shuffle(dec).slice(0, 9 - m)]) }, [])
  const [sel, setSel] = useState<number[]>([])
  const ok = () => tiles.every((t, i) => (t === '🍊') === sel.includes(i))
  return <div><p>Seleziona <b>tutti i mandarini</b>, simbolo storico della società. I palloni e gli altri agrumi non sono ammessi.</p>
    <div className="cap-grid">{tiles.map((t, i) => <button type="button" key={i} className={'cap-tile' + (sel.includes(i) ? ' on' : '')} aria-pressed={sel.includes(i)} aria-label={t === '🍊' ? 'Mandarino' : 'Altro frutto o oggetto'} onClick={() => setSel(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])}>{t}</button>)}</div>
    <button className="btn pri" onClick={() => onResult(ok())}>VERIFICA</button></div>
}
function Code({ onResult }: { onResult: (ok: boolean) => void }) {
  const mk = () => Array.from({ length: 5 }, () => 'ABCDEFGHJKLMNPRSTUVXYZ23456789'[rnd(30)]).join('')
  const [code, setCode] = useState(mk), [v, setV] = useState('')
  const glyphs = useMemo(() => code.split('').map(() => ({ r: rnd(31) - 15, y: 38 + rnd(10), f: 30 + rnd(8) })), [code])
  return <div><p>Digita i caratteri mostrati, <b>senza spazi</b>. Le lettere sono maiuscole; la società non risponde di eventuali dubbi tra la O e lo zero (qui non compaiono).</p>
    <svg className="cap-svg" viewBox="0 0 220 64" role="img" aria-label="Codice di verifica distorto"><rect width="220" height="64" fill="#efe6c9" />
      {[8, 22, 40, 54].map((y, i) => <line key={i} x1="0" y1={y} x2="220" y2={y + (i % 2 ? -9 : 9)} stroke="#9a9a80" strokeWidth="1.5" />)}
      {code.split('').map((ch, i) => <text key={i} x={18 + i * 40} y={glyphs[i].y + 10} fontSize={glyphs[i].f} fontFamily="Georgia,serif" fontWeight="bold" fill="#1d4a2e" transform={`rotate(${glyphs[i].r} ${18 + i * 40} 32)`}>{ch}</text>)}
      <path d="M0 30 Q55 6 110 34 T220 28" stroke="#e8760f" strokeWidth="2" fill="none" /></svg>
    <label className="f">Codice<input value={v} autoComplete="off" autoCapitalize="characters" onChange={e => setV(e.target.value)} /></label>
    <div className="row"><button className="btn pri" onClick={() => onResult(v.replace(/\s/g, '').toUpperCase() === code)}>VERIFICA</button><button className="btn" onClick={() => { setCode(mk()); setV('') }}>Codice illeggibile</button></div></div>
}
function Years({ onResult }: { onResult: (ok: boolean) => void }) {
  const [v, setV] = useState(''), y = new Date().getFullYear() - club.founded
  return <div><p>Indicare <b>quanti anni</b> sono trascorsi dalla fondazione della società (l’anno è riportato alla pagina «La società»).</p>
    <label className="f">Anni (in cifre)<input inputMode="numeric" value={v} autoComplete="off" onChange={e => setV(e.target.value)} /></label>
    <button className="btn pri" onClick={() => { const n = parseInt(v, 10); onResult(n === y || n === y - 1) }}>VERIFICA</button></div>
}

export default function Captcha({ onPass }: { onPass: () => void }) {
  usePopupBlock(true)
  const [stage, setStage] = useState<'declare' | 'challenge' | 'verify'>('declare')
  const [agree, setAgree] = useState(false), [kind, setKind] = useState<Kind>(() => nextKind()), [tries, setTries] = useState(0), [msg, setMsg] = useState(''), [n, setN] = useState(0)
  useEffect(() => { if (stage !== 'verify') return; const t = setTimeout(() => { remember(); onPass() }, 2200); return () => clearTimeout(t) }, [stage, onPass])
  const result = (ok: boolean) => {
    if (ok) { setMsg(''); setStage('verify'); return }
    const t = tries + 1; setTries(t)
    if (t >= siteConfig.captcha.maxAttempts) { setMsg('Dopo ripetuti tentativi la segreteria ha deciso di fidarsi.'); setStage('verify'); return }
    setMsg(`Verifica non superata (tentativo ${t} di ${siteConfig.captcha.maxAttempts}). Si prega di riprovare con una nuova verifica.`); setKind(k => nextKind(k)); setN(x => x + 1)
  }
  return <div className="wrap sec"><div className="win cap-win">
    <div className="win-title"><span>VERIFICA ANTI-ROBOT — Accesso allo shop</span></div>
    <div className="win-body">
      {stage === 'declare' && <>
        <p>Si comunica che l’accesso allo shop ufficiale è subordinato a una verifica anti-robot, ai sensi delle disposizioni societarie. La procedura è gratuita e dura pochi istanti, salvo imprevisti.</p>
        <label className="radio"><input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />Dichiaro sotto la mia responsabilità di non essere un robot.</label>
        <button className="btn pri" disabled={!agree} onClick={() => setStage('challenge')}>CONTINUA</button></>}
      {stage === 'challenge' && <>
        {msg && <p className="err" role="alert">{msg}</p>}
        <p className="muted">Verifica {Math.min(tries + 1, siteConfig.captcha.maxAttempts)} di massimo {siteConfig.captcha.maxAttempts}</p>
        <div key={kind + n}>{kind === 'frutta' ? <Fruit onResult={result} /> : kind === 'codice' ? <Code onResult={result} /> : <Years onResult={result} />}</div></>}
      {stage === 'verify' && <div role="status">
        {msg && <p className="err">{msg}</p>}
        <p><b>Consultazione del registro dei non robot…</b></p><div className="pbar"><i className="indet" /></div>
        <p className="muted">Si prega di non chiudere la finestra del browser.</p></div>}
    </div></div></div>
}
