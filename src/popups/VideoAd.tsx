import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AdVideo, siteConfig } from '../config/site'
import { videoUrl } from './adVideos'
import { useScrollLock } from './useScrollLock'

// Popup pubblicitario iniziale: video locale, non saltabile, con countdown e barra di avanzamento.
// L’effetto è solo visivo: nessun rallentamento reale. Se il video non si carica, il portale si apre da solo.
export default function VideoAd({ videos, onDone }: { videos: AdVideo[]; onDone: () => void }) {
  const ad = useMemo(() => videos[Math.floor(Math.random() * videos.length)], [videos])
  const ref = useRef<HTMLVideoElement>(null)
  const last = useRef(0), loaded = useRef(false), began = useRef(false)
  const [st, setSt] = useState<'loading' | 'playing' | 'blocked' | 'ended'>('loading')
  const [dur, setDur] = useState(siteConfig.videoAd.fallbackSeconds), [t, setT] = useState(0), [muted, setMuted] = useState(false)
  useScrollLock()

  const start = useCallback(async () => {
    const v = ref.current; if (!v) return
    try { v.muted = false; await v.play(); setMuted(false); setSt('playing') }
    catch { try { v.muted = true; await v.play(); setMuted(true); setSt('playing') } catch { setSt('blocked') } }
  }, [])

  // Se il video non si carica entro 15 secondi si lascia entrare l’utente: il sito non resta mai bloccato.
  useEffect(() => { const id = setTimeout(() => { if (!loaded.current) onDone() }, 15000); return () => clearTimeout(id) }, [onDone])

  const left = Math.max(0, Math.ceil(dur - t)), pct = dur > 0 ? Math.min(100, (t / dur) * 100) : 0
  return <div className="ad-overlay" role="dialog" aria-modal="true" aria-label="Messaggio pubblicitario">
    <div className="win ad-win">
      <div className="win-title"><span>📺 MESSAGGIO PUBBLICITARIO</span><span className="win-tag">non saltabile</span></div>
      <div className="win-body">
      <p className="ad-top">Questo annuncio non si può saltare. Il sito e la nuova maglia del Ghiaoforte esistono grazie a <b>Electrical Restart s.r.l.s.</b>{ad.sponsor && <> — Inserzione di <b>{ad.sponsor}</b></>}.</p>
        <div className="ad-video">
          <video ref={ref} src={videoUrl(ad.src)} playsInline preload="auto" tabIndex={-1} aria-label="Video pubblicitario"
            onContextMenu={e => e.preventDefault()}
            onLoadedMetadata={e => { const d = e.currentTarget.duration; if (isFinite(d) && d > 0) setDur(d) }}
            onCanPlay={() => { loaded.current = true; if (!began.current) { began.current = true; start() } }}
            onTimeUpdate={e => { last.current = e.currentTarget.currentTime; setT(last.current) }}
            onSeeking={e => { const v = e.currentTarget; if (Math.abs(v.currentTime - last.current) > 0.5) v.currentTime = last.current }}
            onPause={e => { const v = e.currentTarget; if (st === 'playing' && !v.ended) v.play().catch(() => setSt('blocked')) }}
            onEnded={() => { setT(dur); setSt('ended') }}
            onError={onDone} />
          {st === 'blocked' && <div className="ad-cover"><button className="btn pri big" onClick={() => { setSt('loading'); start() }}>▶ AVVIA LA PUBBLICITÀ</button></div>}
          {muted && st === 'playing' && <button className="btn sm ad-unmute" onClick={() => { if (ref.current) ref.current.muted = false; setMuted(false) }}>🔊 Attiva audio</button>}
        </div>
        <div className="pbar" role="progressbar" aria-label="Avanzamento del messaggio" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}><i style={{ width: pct + '%' }} /></div>
        <div className="ad-foot">
          {st === 'ended'
            ? <button className="btn pri big" autoFocus onClick={onDone}>SKIP</button>
            : <p className="ad-count" aria-live="off">{st === 'blocked' ? 'In attesa dell’avvio manuale del messaggio.' : st === 'loading' ? 'Caricamento del messaggio in corso…' : <>L’accesso al portale sarà disponibile tra <b>{left}</b> second{left === 1 ? 'o' : 'i'}.</>}</p>}
        </div>
      </div>
    </div>
  </div>
}
