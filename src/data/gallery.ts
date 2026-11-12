// Una voce per stagione. Per un nuovo album copia un blocco e cambia "season" e le foto.
export interface Photo { src: string; alt: string }
export const gallery: { season: string; photos: Photo[] }[] = [
  { season: '2026/2027', photos: [{ src: 'gallery/g1.svg', alt: 'Allenamento serale al Comunale' }, { src: 'gallery/g2.svg', alt: 'Tifosi in tribuna' }, { src: 'gallery/g3.svg', alt: 'Presentazione della maglia' }] },
  { season: '2025/2026', photos: [{ src: 'gallery/g4.svg', alt: 'Azione di gioco' }, { src: 'gallery/g5.svg', alt: 'Cena del tifoso' }, { src: 'gallery/g6.svg', alt: 'Spogliatoio prima della partita' }] },
  { season: '2024/2025', photos: [{ src: 'gallery/g7.svg', alt: 'Festa dei sessant\'anni' }, { src: 'gallery/g8.svg', alt: 'Palloni a bordo campo' }, { src: 'gallery/g9.svg', alt: 'Curva durante la partita' }] },
]
