import { AdVideo, siteConfig } from '../config/site'
const base = import.meta.env.BASE_URL
const norm = (v: unknown): AdVideo | null => {
  if (typeof v === 'string' && v.trim()) return { src: v.trim() }
  if (v && typeof v === 'object' && typeof (v as AdVideo).src === 'string' && (v as AdVideo).src.trim()) return { src: (v as AdVideo).src.trim(), sponsor: (v as AdVideo).sponsor }
  return null
}
export const videoUrl = (src: string) => /^(https?:)?\/\//.test(src) ? src : base + 'videos/ads/' + src.replace(/^\/+/, '')
// Elenco dei video: prima la configurazione, poi il manifest in public/videos/ads/manifest.json.
// Se non c'è nulla (o il manifest manca/è illeggibile) restituisce una lista vuota, senza errori.
export async function loadAdVideos(): Promise<AdVideo[]> {
  const cfg = siteConfig.videoAd
  const fromCfg = cfg.videos.map(norm).filter((x): x is AdVideo => !!x)
  if (fromCfg.length) return fromCfg
  if (!cfg.manifest) return []
  try {
    const r = await fetch(base + cfg.manifest, { cache: 'no-cache' })
    if (!r.ok) return []
    const j = await r.json()
    const arr: unknown[] = Array.isArray(j) ? j : Array.isArray(j?.videos) ? j.videos : []
    return arr.map(norm).filter((x): x is AdVideo => !!x)
  } catch { return [] }
}
