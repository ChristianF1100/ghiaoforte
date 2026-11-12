import { club } from '../data/club'
import { players, roleLabels } from '../data/players'
import { sponsors, tierLabels } from '../data/sponsors'
import { useTitle } from '../lib/util'
import Img from '../components/Img'
export function Club() {
  useTitle('La società', club.description)
  return <div className="wrap sec"><h1>La società</h1><p className="lead dark">{club.description}</p>
    <h2>Storia e fondazione</h2><ol className="timeline">{club.story.map(s => <li key={s.year}><b>{s.year}</b><div><h3>{s.title}</h3><p>{s.text}</p></div></li>)}</ol>
    <h2>Identità e valori</h2><div className="grid4">{club.values.map(v => <div className="card pad" key={v.title}><h3>{v.title}</h3><p>{v.text}</p></div>)}</div>
    <h2>Impianto e sede</h2><div className="card feat"><Img src={club.venue.images[0]} alt={club.venue.name} /><div><h3>{club.venue.name}</h3><p>{club.venue.description}</p><p className="muted">{club.venue.address}</p></div></div></div>
}
export function Team() {
  useTitle('Prima squadra', 'La rosa della prima squadra del Ghiaforte.')
  return <div className="wrap sec"><h1>Prima squadra</h1><p className="lead dark">Il gruppo che porta i colori del {club.name} in campo: esperienza, giovani e senso di appartenenza.</p>
    {(Object.keys(roleLabels) as (keyof typeof roleLabels)[]).map(r => <section key={r}><h2>{roleLabels[r]}</h2><div className="grid4">
      {players.filter(p => p.role === r).sort((a, b) => a.number - b.number).map(p => <article className="card player" key={p.name}><Img src={p.photo ?? 'players/placeholder.svg'} alt={p.name} /><span className="num">{p.number}</span><div className="pad"><h3>{p.name}</h3><p className="muted">{p.nat} · {p.born}</p></div></article>)}</div></section>)}</div>
}
export function Sponsors() {
  useTitle('Sponsor e partner', 'Le aziende che sostengono il Ghiaforte.')
  return <div className="wrap sec"><h1>Sponsor e partner</h1><p className="lead dark">Aziende del territorio che camminano al fianco del club: a loro va il nostro ringraziamento.</p>
    {(Object.keys(tierLabels) as (keyof typeof tierLabels)[]).map(t => <section key={t}><h2>{tierLabels[t]}</h2><div className={t === 'main' ? 'grid1' : 'grid3'}>
      {sponsors.filter(s => s.tier === t).map(s => <article className="card sp" key={s.name}><Img src={s.logo} alt={'Logo ' + s.name} /><div className="pad"><h3>{s.name}</h3><p>{s.description}</p>{s.url && <a className="more" href={s.url}>Sito web →</a>}</div></article>)}</div></section>)}</div>
}
export function Stadium() {
  const v = club.venue; useTitle('Dove giochiamo', v.description)
  return <div className="wrap sec"><h1>Dove giochiamo</h1><h2>{v.name}</h2><p className="lead dark">{v.description}</p><p><b>Indirizzo:</b> {v.address}</p>
    <div className="grid2">{v.images.map((i, k) => <Img key={i} src={i} alt={`${v.name}, foto ${k + 1}`} className="rounded" />)}</div>
    <div className="grid2 gap"><div><h3>La struttura</h3><ul className="ticks">{v.facts.map(f => <li key={f}>{f}</li>)}</ul></div>
      <div><h3>Orari degli allenamenti</h3><table className="tbl"><tbody>{v.training.map(t => <tr key={t.day}><th scope="row">{t.day}</th><td>{t.time}</td></tr>)}</tbody></table></div></div>
    <h3>Mappa</h3>
<Img
  src="stadium/mappa.jpeg"
  alt="Mappa illustrativa dello stadio"
  className="map"
}
