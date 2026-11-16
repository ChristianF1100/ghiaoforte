// Una voce per stagione. Per un nuovo album copia un blocco e cambia "season" e le foto.
export interface Photo { src: string; alt: string }
export const gallery: { season: string; photos: Photo[] }[] = [
{ 
  season: '2009/2010', 
  photos: [
    { 
      src: 'gallery/g2.jpeg', 
      alt: 'La storica stretta di mano tra Carlo Cartone e Mr. Fistiggi, momento in cui il club passa ufficialmente da un progetto abusivo tollerato dalle istituzioni a una realtà calcistica regolarizzata grazie a concessioni comunali tanto rapide quanto inspiegabili.' 
    }
  ] 
},
{ 
  season: '1981/1982', 
  photos: [
    { 
      src: 'gallery/g1.jpeg', 
      alt: 'Carlo Cartone impartisce lezioni di tattica ai primi tesserati su un terreno occupato abusivamente, ignorando ogni norma di sicurezza.' 
    },
    { 
      src: 'gallery/g3.jpeg', 
      alt: 'Pausa a bordo campo: Carlo Cartone studia gli schemi su una sedia impagliata sottratta al bar, divorando l’intero budget alimentare della squadra in mandarini[cite: 1].' 
    },
    { 
      src: 'gallery/g4.jpeg', 
      alt: 'La rosa 1981/1982 schierata sulla ghiaia: pettorine spaiate, numeri dipinti a mano e Carlo Cartone al centro con sigaretta d’ordinanza[cite: 2].' 
    }
  ] 
},
]
