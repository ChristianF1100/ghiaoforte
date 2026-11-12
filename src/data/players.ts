// Rosa prima squadra. role: P=Portiere D=Difensore C=Centrocampista A=Attaccante. photo opzionale (es. 'players/rossi.jpg').
export interface Player { name: string; number: number; role: 'P' | 'D' | 'C' | 'A'; nat: string; born: number; photo?: string }
export const roleLabels = { P: 'Portieri', D: 'Difensori', C: 'Centrocampisti', A: 'Attaccanti' } as const
const t = (name: string, number: number, role: Player['role'], nat: string, born: number): Player => ({ name, number, role, nat, born })
export const players: Player[] = [
  t('Luca Marangi', 1, 'P', 'Italia', 1996), t('Davide Corsetti', 12, 'P', 'Italia', 2001), t('Nico Valenti', 22, 'P', 'Italia', 2004),
]
