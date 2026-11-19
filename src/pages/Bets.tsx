import { useMemo, useState } from 'react'
import { club } from '../data/club'
import { useTitle } from '../lib/util'
import Box, { Notice } from '../components/Box'

type Sign = '1' | '1X' | 'X' | 'X2' | '2'
type Outcome = '1' | 'X' | '2'
const SIGNS: Sign[] = ['1', '1X', 'X', 'X2', '2']
const COVERS: Record<Sign, Outcome[]> = { '1': ['1'], '1X': ['1', 'X'], X: ['X'], X2: ['X', '2'], '2': ['2'] }

const TEAMS = ['A.S. Ghiaoforte', 'A.S. Furbolandia', 'Villinia Calcio', 'Legione Nera', 'Uniti per Palanca', 'Stella Azzurra', 'Dark Neto']
const PALANCA = 'Uniti per Palanca'

const LOSS = [
  'Grazie per i tuoi soldi, li utilizzeremo per corrompere gli arbitri.',
  'Hai perso. La società ringrazia e prenota già il pullman nuovo con la tua puntata.',
  'Puntata incassata! Servirà a pagare le multe per i cori della tribuna.',
  'Ci spiace, ha vinto il banco. Il banco, come sempre, siamo noi.',
  'Il tuo contributo verrà investito in palloni da gioco (uno, forse due).',
  'Hai perso, ma stai sostenendo il vivaio. Il vivaio ringrazia: è un orto.',
]
const WIN = [
  'Al momento non è possibile trasferire i soldi sul tuo conto: la società promette di spenderli bene.',
  'Hai vinto! Il premio è in lavorazione presso la segreteria (aperta il terzo martedì di ogni mese bisestile).',
  'Complimenti! Per riscuotere basta compilare il modulo 27-B, che non esiste.',
  'Vincita registrata. La cassa è momentaneamente in trasferta: ti terremo aggiornato.',
  'Hai vinto, ma il premio è stato reinvestito d’ufficio nella nuova rete da porta.',
  'Vincita confermata! Verrà versata appena il bancomat della sede smetterà di essere un’idea.',
]
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]
const rnd = (a: number, b: number) => Math.round((a + Math.random() * (b - a)) * 100) / 100
const eur = (n: number) => n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })

interface Match { home: string; away: string; odds: Record<Sign, number> }

const dc = (x: number, y: number) => Math.max(1.05, Math.round((1 / (1 / x + 1 / y)) * 0.92 * 100) / 100)

// Ogni giornata: squadre rimescolate (7 squadre: 3 partite, una riposa) e quote nuove.
function makeDay(n: number): { n: number; matches: Match[]; rest: string } {
  const t = [...TEAMS].sort(() => Math.random() - 0.5)
  const matches = [0, 2, 4].map(k => {
    const home = t[k], away = t[k + 1]
    let o1 = rnd(1.2, 4.5), o2 = rnd(1.2, 6), oX = rnd(2.8, 4.2)
    // Uniti per Palanca: quota di vittoria sempre altissima.
    if (home === PALANCA) { o1 = rnd(9, 18); o2 = rnd(1.1, 1.5); oX = rnd(5, 7) }
    if (away === PALANCA) { o2 = rnd(9, 18); o1 = rnd(1.1, 1.5); oX = rnd(5, 7) }
    return { home, away, odds: { '1': o1, X: oX, '2': o2, '1X': dc(o1, oX), X2: dc(oX, o2) } }
  })
  return { n, matches, rest: t[6] }
}

// Esito casuale, con probabilità leggermente pesate dalle quote.
function simulate(m: Match) {
  const w = { '1': 1 / m.odds['1'], X: 1 / m.odds.X, '2': 1 / m.odds['2'] }
  const tot = w['1'] + w.X + w['2']
  let r = Math.random() * tot
  const outcome: Outcome = (r -= w['1']) < 0 ? '1' : (r -= w.X) < 0 ? 'X' : '2'
  const g = () => Math.floor(Math.random() * 4)
  let h = g(), a = g()
  if (outcome === 'X') a = h
  else if (outcome === '1') h = a + 1 + g()
  else a = h + 1 + g()
  return { outcome, h, a }
}

export default function Bets() {
  useTitle('Scommesse', 'Gioca la tua schedina sulle partite del Ghiaoforte. Gioco simulato, nessun denaro reale.')
  const [day, setDay] = useState(() => makeDay(1)), { matches, rest } = day
  const [sel, setSel] = useState<Record<number, Sign | undefined>>({})
  const [stake, setStake] = useState('10')
  const [res, setRes] = useState<null | { rows: { h: number; a: number; outcome: Outcome }[]; won: boolean; stake: number; prize: number; msg: string }>(null)

  const chosen = Object.entries(sel).filter(([, s]) => s) as [string, Sign][]
  const total = useMemo(() => chosen.reduce((p, [i, s]) => p * matches[+i].odds[s], 1), [chosen, matches])
  const st = parseFloat(stake.replace(',', '.'))
  const stakeOk = isFinite(st) && st >= 1 && st <= 1000
  const prize = stakeOk && chosen.length ? st * total : 0
  const canPlace = !res && stakeOk && chosen.length > 0

  const toggle = (i: number, s: Sign) => { if (!res) setSel({ ...sel, [i]: sel[i] === s ? undefined : s }) }
  const place = () => {
    const rows = matches.map(simulate)
    const won = chosen.every(([i, s]) => COVERS[s].includes(rows[+i].outcome))
    setRes({ rows, won, stake: st, prize, msg: pick(won ? WIN : LOSS) })
  }
  const again = () => { setRes(null); setSel({}); setDay(makeDay(day.n + 1)) }

  return <div className="wrap sec"><h1>Scommesse</h1>
    <Notice title="Gioco responsabile">si gioca con denaro immaginario. Nessuna vincita è riscuotibile, nessuna perdita è rimborsabile, nessun arbitro è stato corrotto (per ora).</Notice>
    <p className="lead dark">Scegli l’esito delle partite della giornata (a ogni giornata le squadre si rimescolano) (1, 1X, X, X2, 2), imposta la puntata e piazza la schedina. Le quote cambiano a ogni nuova giornata, secondo criteri che la società preferisce non divulgare.</p>
    <div className="bet-grid">
      <Box title={`Giornata ${day.n} — 3 partite`} right={`Riposa: ${rest}`}>
        <div className="bet-matches">{matches.map((m, i) => { const r = res?.rows[i]; const s = sel[i]
          return <div className={'bet-m' + (r && s ? (COVERS[s].includes(r.outcome) ? ' hit' : ' miss') : '')} key={i}>
            <div className="bet-teams"><b>{m.home}</b> <span>–</span> <b>{m.away}</b>{r && <span className="bet-score"> {r.h}-{r.a}</span>}</div>
            <div className="bet-odds" role="group" aria-label={`${m.home} contro ${m.away}`}>{SIGNS.map(g =>
              <button type="button" key={g} disabled={!!res} aria-pressed={s === g} className={'bet-o' + (s === g ? ' on' : '') + (r && COVERS[g].includes(r.outcome) ? ' won' : '')} onClick={() => toggle(i, g)}>
                <span>{g}</span><b>{m.odds[g].toFixed(2)}</b></button>)}</div></div> })}</div>
      </Box>
      <Box title="La tua schedina">
        {chosen.length === 0 ? <p className="muted">Nessuna selezione. Clicca su una quota per aggiungerla.</p> :
          <ul className="bet-slip">{chosen.map(([i, s]) => <li key={i}><span>{matches[+i].home} – {matches[+i].away}</span><b>{s} @ {matches[+i].odds[s].toFixed(2)}</b></li>)}</ul>}
        <label className="bet-f">Puntata (€ 1 – 1000)<input type="text" inputMode="decimal" value={stake} disabled={!!res} onChange={e => setStake(e.target.value)} /></label>
        {!stakeOk && <span className="err">Inserisci una puntata tra 1 e 1000 euro.</span>}
        <dl className="bet-sum"><dt>Quota totale</dt><dd>{chosen.length ? total.toFixed(2) : '—'}</dd><dt>Puntata</dt><dd>{stakeOk ? eur(st) : '—'}</dd><dt>Vincita potenziale</dt><dd className="big">{prize ? eur(prize) : '—'}</dd></dl>
        {!res ? <button type="button" className="btn pri big" disabled={!canPlace} onClick={place}>Piazza la scommessa</button>
          : <button type="button" className="btn big" onClick={again}>Nuova schedina</button>}
      </Box>
    </div>
    {res && <div className={'bet-res ' + (res.won ? 'won' : 'lost')} role="status"><h2>{res.won ? 'SCHEDINA VINCENTE!' : 'Schedina perdente'}</h2>
      <p>{res.won ? <>Hai puntato {eur(res.stake)} e vinto <b>{eur(res.prize)}</b>.</> : <>Hai perso la puntata di <b>{eur(res.stake)}</b>.</>}</p>
      <p className="bet-msg">{res.msg}</p></div>}
  </div>
}
