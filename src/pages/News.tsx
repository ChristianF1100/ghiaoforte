import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { sortedNews } from '../data/news'
import { fdate, useTitle } from '../lib/util'
import Img from '../components/Img'
export function Archive() {
  useTitle('News', 'Tutte le notizie del Ghiaoforte.')
  const [q, setQ] = useState(''), [tag, setTag] = useState('')
  const all = sortedNews(), tags = [...new Set(all.flatMap(a => a.tags))].sort()
  const list = useMemo(() => { const s = q.trim().toLowerCase(); return all.filter(a => (!tag || a.tags.includes(tag)) && (!s || [a.title, a.excerpt, ...a.body, ...a.tags].join(' ').toLowerCase().includes(s))) }, [q, tag, all])
  return <div className="wrap sec"><h1>News</h1>
    <div className="search"><label htmlFor="q" className="sr">Cerca negli articoli</label><input id="q" type="search" placeholder="Cerca per titolo, contenuto o parola chiave…" value={q} onChange={e => setQ(e.target.value)} />
      {(q || tag) && <button className="btn ghost sm" onClick={() => { setQ(''); setTag('') }}>Rimuovi filtri</button>}</div>
    <div className="tags" role="group" aria-label="Filtra per tag">{tags.map(t => <button key={t} aria-pressed={tag === t} className={'chip' + (tag === t ? ' on' : '')} onClick={() => setTag(tag === t ? '' : t)}>#{t}</button>)}</div>
    <p className="muted" aria-live="polite">{all.length === 0 ? 'Nessun articolo pubblicato.' : `${list.length} articol${list.length === 1 ? 'o' : 'i'}`}</p>
    {list.length === 0 && all.length > 0 && <div className="empty"><p>Nessun risultato per la tua ricerca.</p></div>}
    <div className="list">{list.map(a => <article key={a.id} className="card feat"><Link to={`/news/${a.id}`}><Img src={a.img} alt="" /></Link><div><time dateTime={a.date}>{fdate(a.date)}</time><h2><Link to={`/news/${a.id}`}>{a.title}</Link></h2><p>{a.excerpt}</p><p>{a.tags.map(t => <button key={t} className="chip" onClick={() => setTag(t)}>#{t}</button>)}</p></div></article>)}</div></div>
}
export function ArticlePage() {
  const { id } = useParams(), all = sortedNews(), i = all.findIndex(a => a.id === id), a = all[i]
  useTitle(a?.title ?? 'Articolo non trovato', a?.excerpt)
  if (!a) return <div className="wrap empty"><h1>Articolo non trovato</h1><Link className="btn" to="/news">Torna all'archivio</Link></div>
  const newer = all[i - 1], older = all[i + 1]
  return <article className="wrap sec art"><Link to="/news" className="more">← Torna all'archivio</Link><h1>{a.title}</h1><time dateTime={a.date}>{fdate(a.date)}</time>
    <Img src={a.img} alt={a.title} className="rounded cover" loading="eager" />{a.body.map((p, k) => <p key={k}>{p}</p>)}
    <p>{a.tags.map(t => <span key={t} className="chip">#{t}</span>)}</p>
    <nav className="pn" aria-label="Altri articoli">{older ? <Link to={`/news/${older.id}`}>← {older.title}</Link> : <span />}{newer && <Link to={`/news/${newer.id}`}>{newer.title} →</Link>}</nav></article>
}
