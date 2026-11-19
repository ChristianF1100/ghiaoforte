import { Link } from 'react-router-dom'
import { club } from '../data/club'
import { gallery } from '../data/gallery'
import { sortedNews } from '../data/news'
import { players, roleLabels } from '../data/players'
import { sponsors } from '../data/sponsors'
import { ads } from '../data/ads'
import { comunicazioni, comunicazioneTxt, serviceStatus } from '../data/notices'
import { downloadText, fdate, img, pad, useTitle } from '../lib/util'
import Box from '../components/Box'
import AdBanner from '../components/AdBanner'
import Img from '../components/Img'
const quick = [['/societa', 'La società'], ['/squadre', 'Prima squadra'], ['/news', 'Archivio news'], ['/galleria', 'Galleria'], ['/dove-giochiamo', 'Dove giochiamo'], ['/sponsor', 'Sponsor e partner'], ['/shop', 'Shop ufficiale']]
const VISITS = 4 // contatore visite fisso
export default function Home() {
  useTitle('Sito ufficiale', club.description)
  const all = sortedNews(), n = all[0], com = comunicazioni[0]
  const roster = (Object.keys(roleLabels) as (keyof typeof roleLabels)[]).flatMap(r => players.filter(p => p.role === r).sort((a, b) => a.number - b.number))
  const photos = gallery.flatMap(g => g.photos).slice(0, 4)
  return <div className="home">
    <div className="home-grid">
      <aside className="col-l" aria-label="Accesso rapido">
        <Box title="Accesso rapido"><ul className="quick">{quick.map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul></Box>
        <Box title="Stato dei servizi"><table className="tbl stat"><tbody>{serviceStatus.map(s => <tr key={s.name}><th scope="row">{s.name}</th><td><span className={'dot ' + s.tone} aria-hidden="true" />{s.state}</td></tr>)}</tbody></table></Box>
        <Box title="Contatore visite"><p className="counter" aria-label={`Visitatore numero ${VISITS}`}>{pad(VISITS, 7).split('').map((d, i) => <b key={i}>{d}</b>)}</p><p className="muted small">Visitatori (conteggio indicativo, non verificato).</p></Box>
        <AdBanner ad={ads[0]} variant="tall" />
      </aside>

      <div className="col-c">
        <section className="hero2" aria-label="Presentazione della società"><Img src="home/hero.jpg" alt="" loading="eager" className="hero2-bg" />
          <div className="hero2-in"><img src={img('brand/logo-white.png')} alt={'Stemma ' + club.name} width="70" height="80" />
            <div><p className="kicker">Dal {club.founded}</p><h1>AS {club.name}</h1><p>{club.tagline}</p></div></div>
          <div className="row hero2-btn"><Link className="btn pri" to="/societa">Scopri la società</Link><Link className="btn" to="/squadre">La prima squadra</Link><Link className="btn" to="/shop">Shop ufficiale</Link></div></section>

        <Box title="Comunicazione in evidenza" right={'Prot. ' + com.prot} className="hl"><h3>{com.title}</h3><p>{com.text}</p>
          <p><button type="button" className="link" onClick={() => downloadText(`comunicazione-${com.prot.replace('/', '-')}.txt`, comunicazioneTxt(com))}>📄 Scarica la comunicazione (.txt)</button></p></Box>

        {n && <Box title="Ultima news" right={<Link to="/news">Archivio completo →</Link>}>
          <Link to={`/news/${n.id}`} className="newsf"><Img src={n.img} alt={n.title} /><div><time dateTime={n.date}>{fdate(n.date)}</time><h3>{n.title}</h3><p>{n.excerpt}</p><span className="more">Leggi l’articolo →</span></div></Link></Box>}

        <Box title="Archivio notizie"><ul className="newsl">{all.map(a => <li key={a.id}><time dateTime={a.date}>{fdate(a.date)}</time><Link to={`/news/${a.id}`}>{a.title}</Link></li>)}</ul></Box>

        <AdBanner ad={ads[3]} />

        <Box title="Prima squadra" right={<Link to="/squadre">Rosa completa →</Link>}><div className="tscroll"><table className="tbl"><thead><tr><th>N.</th><th>Giocatore</th><th>Ruolo</th><th>Nazionalità</th></tr></thead>
          <tbody>{roster.map(p => <tr key={p.name}><td>{p.number}</td><td>{p.name}</td><td>{roleLabels[p.role]}</td><td>{p.nat}</td></tr>)}</tbody></table></div></Box>

        <Box title="Dove giochiamo" right={<Link to="/dove-giochiamo">Scheda completa →</Link>}><div className="stad"><Img src={club.venue.images[0]} alt={club.venue.name} /><div><h3>{club.venue.name}</h3><p className="muted">{club.venue.address}</p><ul className="ticks">{club.venue.facts.slice(0, 5).map(f => <li key={f}>{f}</li>)}</ul></div></div></Box>

        {photos.length > 0 && <Box title="Galleria" right={<Link to="/galleria">Tutte le foto →</Link>}><div className="thumbs">{photos.map(p => <Link key={p.src} to="/galleria"><Img src={p.src} alt={p.alt} /></Link>)}</div></Box>}
      </div>

      <aside className="col-r" aria-label="Sponsor e avvisi">
        <AdBanner ad={ads[1]} variant="tall" />
        <Box title="Avviso della segreteria" className="hl"><p>La segreteria informa che gli orari di apertura saranno resi noti all’apertura. Per ogni informazione si invita a consultare il presente sito.</p><p className="muted small">Prot. {comunicazioni[1].prot}</p></Box>
        <Box title="Sponsor e partner" right={<Link to="/sponsor">Tutti →</Link>}><ul className="spl">{sponsors.map(s => <li key={s.name}><Link to="/sponsor"><Img src={s.logo} alt={'Logo ' + s.name} /><span>{s.name}</span><em>{s.tier === 'main' ? 'Main sponsor' : s.tier === 'official' ? 'Sponsor ufficiale' : 'Partner'}</em></Link></li>)}</ul></Box>
        <Box title="Altre comunicazioni"><ul className="comm">{comunicazioni.slice(1).map(c => <li key={c.prot}><b>{c.title}</b><span className="muted small">Prot. {c.prot}</span><p>{c.text}</p></li>)}</ul></Box>
        <AdBanner ad={ads[5]} variant="tall" />
      </aside>
    </div>
  </div>
}
