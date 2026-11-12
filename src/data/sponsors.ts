// tier: main | official | partner. Aggiungi il logo in public/images/sponsors/ e inseriscilo in "logo". Nomi di fantasia.
export interface Sponsor { name: string; tier: 'main' | 'official' | 'partner'; logo: string; description: string; url?: string }
export const tierLabels = { main: 'Main sponsor', official: 'Sponsor ufficiali', partner: 'Partner' } as const
export const sponsors: Sponsor[] = [
  { name: 'Cave Riunite Valdora', tier: 'main', logo: 'sponsors/sp1.svg', description: 'Inerti e materiali per l\'edilizia: legata al club fin dalle origini.', url: '#/sponsor' },
  { name: 'Officine Tessarin', tier: 'official', logo: 'sponsors/sp2.svg', description: 'Carpenteria e lavorazioni meccaniche del territorio.' },
  { name: 'Forno San Rocco', tier: 'official', logo: 'sponsors/sp3.svg', description: 'Pane e prodotti da forno, presenti a ogni festa del club.' },
  { name: 'Autofficina Dellera', tier: 'partner', logo: 'sponsors/sp4.svg', description: 'Assistenza e manutenzione per i mezzi della società.' },
  { name: 'Studio Fisio Moretti', tier: 'partner', logo: 'sponsors/sp5.svg', description: 'Centro di fisioterapia e riabilitazione sportiva.' },
  { name: 'Trattoria Al Mulino', tier: 'partner', logo: 'sponsors/sp6.svg', description: 'Cucina del territorio, sede delle cene sociali.' },
]
