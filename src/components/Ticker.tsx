import { tickerMessages } from '../data/notices'
export default function Ticker() {
  const items = [...tickerMessages, ...tickerMessages]
  return <div className="ticker" role="region" aria-label="Comunicazioni della società">
    <span className="ticker-label">COMUNICAZIONI</span>
    <div className="ticker-view"><div className="ticker-track">{items.map((m, i) => <span key={i} aria-hidden={i >= tickerMessages.length || undefined}>{m}<i> ◆ </i></span>)}</div></div>
  </div>
}
