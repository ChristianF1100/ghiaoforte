// Una voce per stagione. Per un nuovo album copia un blocco e cambia "season" e le foto.
export interface Photo { src: string; alt: string }
export const gallery: { season: string; photos: Photo[] }[] = [
  { season: '2026/2027', photos: [{ src: 'gallery/g1.svg', alt: 'Allenamento serale al Comunale' }, { src: 'gallery/g2.svg', alt: 'Tifosi in tribuna' }, { src: 'gallery/g3.svg', alt: 'Presentazione della maglia' }] },
]
