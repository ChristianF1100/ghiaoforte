import { Ad } from '../data/ads'
import { usePopups } from '../popups/PopupContext'
// Banner di inserzionisti di fantasia. Il clic porta a un messaggio di servizio.
export default function AdBanner({ ad, variant = 'wide' }: { ad: Ad; variant?: 'wide' | 'tall' }) {
  const { open } = usePopups()
  return <button type="button" className={'adb adb-' + variant} style={{ background: ad.bg, color: ad.fg, borderColor: ad.accent }} onClick={() => open('ad-unavailable')} aria-label={`Pubblicità: ${ad.name}. ${ad.slogan}`}>
    <span className="adb-tag">pubblicità</span>
    <span className="adb-icon" aria-hidden="true">{ad.icon}</span>
    <span className="adb-txt"><b>{ad.name}</b><em>{ad.slogan}</em>{variant === 'tall' && <span className="adb-d">{ad.detail}</span>}</span>
    <span className="adb-go" style={{ background: ad.accent }}>CLICCA QUI</span>
  </button>
}
