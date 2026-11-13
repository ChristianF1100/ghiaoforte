// tier: main | official | partner. Aggiungi il logo in public/images/sponsors/ e inseriscilo in "logo". Nomi di fantasia.
export interface Sponsor { name: string; tier: 'main' | 'official' | 'partner'; logo: string; description: string; url?: string }
export const tierLabels = { main: 'Main sponsor', official: 'Sponsor ufficiali', partner: 'Partner' } as const
export const sponsors: Sponsor[] = [
{ 
    name: 'Electrical Restart s.r.l.s.', 
    tier: 'main', 
    logo: 'sponsors/sp1.jpeg', 
    description: 'Specializzata in impianti elettrici civili e industriali, è il partner ufficiale che garantisce l\'illuminazione di emergenza per il campo.', 
    url: '#/sponsor' 
  },
]
