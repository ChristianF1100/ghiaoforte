// tier: main | official | partner. Aggiungi il logo in public/images/sponsors/ e inseriscilo in "logo". Nomi di fantasia.
export interface Sponsor { name: string; tier: 'main' | 'official' | 'partner'; logo: string; description: string; url?: string }
export const tierLabels = { main: 'Main sponsor', official: 'Sponsor ufficiali', partner: 'Partner' } as const
export const sponsors: Sponsor[] = [
  { name: 'Cave Riunite Valdora', tier: 'main', logo: 'sponsors/sp1.svg', description: 'Inerti e materiali per l\'edilizia: legata al club fin dalle origini.', url: '#/sponsor' },
]
