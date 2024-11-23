import { getEasyMove } from './easy';
import { getMediumMove } from './medium';
import { getHardMove } from './hard';

export type Level = "Fácil" | "Intermedio" | "Difícil"

export const getComputerMove = (
  squares: (string | null)[],
  level: 'Fácil' | 'Intermedio' | 'Difícil'
): number | null => {
  if (level === 'Fácil') return getEasyMove(squares);
  if (level === 'Intermedio') return getMediumMove(squares);
  if (level === 'Difícil') return getHardMove(squares);
  return null;
};
