// Rosa prima squadra. role: P=Portiere D=Difensore C=Centrocampista A=Attaccante. photo opzionale (es. 'players/rossi.jpg').
export interface Player { name: string; number: number; role: 'P' | 'D' | 'C' | 'A'; nat: string; born: number; photo?: string }
export const roleLabels = { P: 'Portieri', D: 'Difensori', C: 'Centrocampisti', A: 'Attaccanti' } as const
const t = (name: string, number: number, role: Player['role'], nat: string, born: number, photo?: string): Player => ({ name, number, role, nat, born, ...(photo ? { photo } : {}) })
export const players: Player[] = [
  t('Jesus', 9, 'A', 'Brasile', 1999, 'players/igor_jesus.png'), // PC -> Attaccante
  t('Youan', 11, 'A', 'Francia', 1999, 'players/youan.png'), // PC -> Attaccante
  t('Baker', 8, 'C', 'Inghilterra', 2003, 'players/baker.png'), // CS -> Centrocampista
  t('Yarmoliuk', 6, 'C', 'Ucraina', 2004, 'players/yarmoliuk.png'), // M -> Centrocampista
  t('Reijnders', 14, 'C', 'Paesi Bassi', 1998, 'players/reijnders.png'), // CC -> Centrocampista
  t('Martinez', 2, 'D', 'Argentina', 1998, 'players/martinez.png'), // DD -> Difensore
  t('Julian', 10, 'A', 'Argentina', 2000, 'players/julian.png'), // TFS -> Attaccante
  t('Israelov', 4, 'D', 'Israele', 2004, 'players/israelov.png'), // DC -> Difensore
  t('Meissen', 13, 'D', 'Paesi Bassi', 2000, 'players/meissen.png'), // DC -> Difensore
  t('Ewijk', 5, 'D', 'Paesi Bassi', 2000), // DD -> Difensore
  t('Gonzalez', 12, 'P', 'Argentina', 1999, 'players/gonzales.png'), // PDR -> Portiere
]