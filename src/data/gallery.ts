// Una voce per stagione. Per un nuovo album copia un blocco e cambia "season" e le foto.
export interface Photo { src: string; alt: string }
export const gallery: { season: string; photos: Photo[] }[] = [
{ 
  photos: [
    { 
      src: 'gallery/g1.jpeg', 
      alt: 'Carlo Cartone impartisce lezioni di tattica ai primi tesserati su un terreno demaniale occupato abusivamente, ignorando completamente i regolamenti sportivi e le norme di sicurezza.' 
    }, 
    { 
      src: 'gallery/g2.jpeg', 
      alt: 'La storica stretta di mano tra Carlo Cartone e Mr. Fistiggi, momento in cui il club passa ufficialmente da un progetto abusivo tollerato dalle istituzioni a una realtà calcistica regolarizzata grazie a concessioni comunali tanto rapide quanto inspiegabili.' 
    }
  ] 
},
]
