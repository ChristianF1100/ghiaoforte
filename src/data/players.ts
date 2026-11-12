// Rosa prima squadra. role: P=Portiere D=Difensore C=Centrocampista A=Attaccante. photo opzionale (es. 'players/rossi.jpg').
export interface Player { name: string; number: number; role: 'P' | 'D' | 'C' | 'A'; nat: string; born: number; photo?: string }
export const roleLabels = { P: 'Portieri', D: 'Difensori', C: 'Centrocampisti', A: 'Attaccanti' } as const
const t = (name: string, number: number, role: Player['role'], nat: string, born: number): Player => ({ name, number, role, nat, born })
export const players: Player[] = [
  t('Luca Marangi', 1, 'P', 'Italia', 1996), t('Davide Corsetti', 12, 'P', 'Italia', 2001), t('Nico Valenti', 22, 'P', 'Italia', 2004),
  t('Matteo Ferrante', 2, 'D', 'Italia', 1998), t('Andrea Ruggeri', 3, 'D', 'Italia', 1995), t('Tomas Petrov', 4, 'D', 'Bulgaria', 1997),
  t('Simone Bellini', 5, 'D', 'Italia', 1993), t('Karim Haddad', 13, 'D', 'Francia', 2000), t('Giorgio Lanza', 15, 'D', 'Italia', 2002),
  t('Edoardo Sartori', 6, 'C', 'Italia', 1999), t('Marco Vitale', 8, 'C', 'Italia', 1994), t('Ivan Kovač', 10, 'C', 'Croazia', 1996),
  t('Paolo Greco', 14, 'C', 'Italia', 2003), t('Luis Moreno', 16, 'C', 'Spagna', 1998), t('Fabio Serra', 18, 'C', 'Italia', 2000),
  t('Diego Costa Lima', 7, 'A', 'Brasile', 1997), t('Riccardo Neri', 9, 'A', 'Italia', 1995), t('Samuele Orsi', 11, 'A', 'Italia', 2001),
  t('Cristian Mele', 17, 'A', 'Italia', 1999), t('Yassine Amrani', 19, 'A', 'Marocco', 2002),
]
