import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdVideo, siteConfig } from '../config/site'
import { adById } from '../data/ads'
import { loadAdVideos } from './adVideos'
import { PopupDef, kindLabel, popupById, popups } from './popupData'
import { useScrollLock } from './useScrollLock'
import VideoAd from './VideoAd'

interface Ctx { open: (id: string) => void; block: (on: boolean) => void }
const PopupCtx = createContext<Ctx>({ open: () => {}, block: () => {} })
export const usePopups = () => useContext(PopupCtx)
// Sospende i popup automatici finché il componente è montato (CAPTCHA, checkout…).
export function usePopupBlock(active = true) {
  const { block } = usePopups()
  useEffect(() => { if (!active) return; block(true); return () => block(false) }, [active, block])
}

interface PState { shown: Record<string, number>; total: number }
const KEY = 'ghiaoforte.popups', SEEN = 'ghiaoforte.videoad'
const readState = (): PState => { try { const v = JSON.parse(sessionStorage.getItem(KEY) || ''); if (v && typeof v.total === 'number') return v } catch { /* nessuno stato */ } return { shown: {}, total: 0 } }
const writeState = (s: PState) => { try { sessionStorage.setItem(KEY, JSON.stringify(s)) } catch { /* sessionStorage non disponibile */ } }

function pick(cands: PopupDef[]) {
  const top = cands.filter(p => p.priority >= 90)
  if (top.length) return top[0]
  const total = cands.reduce((s, p) => s + p.priority, 0); let r = Math.random() * total
  for (const p of cands) { r -= p.priority; if (r <= 0) return p }
  return cands[0]
}

export function PopupProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [phase, setPhase] = useState<'init' | 'video' | 'ready'>('init')
  const [videos, setVideos] = useState<AdVideo[]>([])
  const [current, setCurrent] = useState<PopupDef | null>(null)
  const blockers = useRef(0), state = useRef<PState>(readState()), lastEnd = useRef(Date.now())
  const cfg = siteConfig

  // 1) video pubblicitario iniziale (se attivo, se ci sono video e se non già visto in questa sessione)
  useEffect(() => {
    let alive = true
    let seen = false; try { seen = cfg.videoAd.frequency === 'session' && !!sessionStorage.getItem(SEEN) } catch { /* ignora */ }
    if (!cfg.videoAd.enabled || seen) { setPhase('ready'); return }
    loadAdVideos().then(list => { if (!alive) return; if (list.length) { setVideos(list); setPhase('video') } else setPhase('ready') }).catch(() => alive && setPhase('ready'))
    return () => { alive = false }
  }, [cfg])
  const videoDone = useCallback(() => { try { sessionStorage.setItem(SEEN, '1') } catch { /* ignora */ } lastEnd.current = Date.now(); setPhase('ready') }, [])

  // 2) popup automatici: uno alla volta, con pausa minima, priorità e tetto per sessione
  useEffect(() => {
    if (!cfg.popups.enabled || phase !== 'ready' || current) return
    const id = setInterval(() => {
      if (blockers.current > 0 || document.hidden) return
      const st = state.current
      if (st.total >= cfg.popups.maxPerSession) return
      const gap = (st.total === 0 ? cfg.popups.firstDelaySeconds : cfg.popups.minGapSeconds) * 1000
      if (Date.now() - lastEnd.current < gap) return
      const cands = popups.filter(p => p.auto && (st.shown[p.id] || 0) < (p.max ?? 1) && (!p.onlyRoutes || p.onlyRoutes.some(r => pathname.startsWith(r))))
      if (!cands.length) return
      const p = pick(cands)
      st.shown[p.id] = (st.shown[p.id] || 0) + 1; st.total += 1; writeState(st)
      setCurrent(p)
    }, 1000)
    return () => clearInterval(id)
  }, [cfg, phase, current, pathname])

  const open = useCallback((id: string) => { const p = popupById(id); if (p) setCurrent(p) }, [])
  const block = useCallback((on: boolean) => { blockers.current = Math.max(0, blockers.current + (on ? 1 : -1)) }, [])
  const closeCurrent = useCallback(() => { lastEnd.current = Date.now(); setCurrent(null) }, [])
  const value = useMemo(() => ({ open, block }), [open, block])

  return <PopupCtx.Provider value={value}>{children}
    {phase === 'video' && <VideoAd videos={videos} onDone={videoDone} />}
    {phase !== 'video' && current && <PopupWindow key={current.id} def={current} onClose={closeCurrent} onOpen={open} />}
  </PopupCtx.Provider>
}

function PopupWindow({ def, onClose, onOpen }: { def: PopupDef; onClose: () => void; onOpen: (id: string) => void }) {
  const nav = useNavigate(), ref = useRef<HTMLDivElement>(null)
  const [wait, setWait] = useState(def.lockSeconds ?? 0), ad = def.adId ? adById(def.adId) : undefined
  useScrollLock()
  useEffect(() => { if (wait <= 0) return; const t = setTimeout(() => setWait(w => w - 1), 1000); return () => clearTimeout(t) }, [wait])
  useEffect(() => { const prev = document.activeElement as HTMLElement | null; ref.current?.focus(); return () => prev?.focus?.() }, [])
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Escape' && wait <= 0) onClose() }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [wait, onClose])
  const act = (b: NonNullable<PopupDef['buttons']>[number]) => { if (b.open) onOpen(b.open); else { onClose(); if (b.to) nav(b.to) } }
  return <div className="pop-back" onClick={() => { if (wait <= 0 && def.kind !== 'privacy') onClose() }}>
    <div className={'win pop pop-' + def.kind} role="dialog" aria-modal="true" aria-labelledby="pop-t" tabIndex={-1} ref={ref} onClick={e => e.stopPropagation()}>
      <div className="win-title"><span id="pop-t">{def.kind === 'ad' ? '📢' : '⚠'} {kindLabel[def.kind].toUpperCase()}</span>
        <button className="win-x" aria-label={wait > 0 ? `Chiusura disponibile tra ${wait} secondi` : 'Chiudi'} disabled={wait > 0} onClick={onClose}>{wait > 0 ? wait : '✕'}</button></div>
      <div className="win-body">
        {ad ? <div className="pop-ad" style={{ background: ad.bg, color: ad.fg }}><span className="pop-ad-icon" aria-hidden="true">{ad.icon}</span><div><b className="pop-ad-name">{ad.name}</b><p className="pop-ad-slogan">{ad.slogan}</p><p>{ad.detail}</p></div></div>
          : <><h2 className="pop-h">{def.title}</h2>{def.body.map((p, i) => <p key={i}>{p}</p>)}</>}
        <div className="pop-btns">{(def.buttons ?? [{ label: 'CHIUDI' }]).map(b => <button key={b.label} className={'btn' + (b.primary ? ' pri' : '')} disabled={wait > 0 && !b.open} onClick={() => act(b)}>{b.label}{wait > 0 && !b.open ? ` (${wait})` : ''}</button>)}</div>
      </div>
    </div>
  </div>
}
