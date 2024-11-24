import { getEasyMove } from './easy';
import { getMediumMove } from './medium';
import { getHardMove } from './hard';
import { getMLMove, initializeModel, trainModel } from './ml';
import { BoardState } from '../game/board';

export type Level = "Fácil" | "Intermedio" | "Difícil" | "ML"

export const getComputerMove = async (
  squares: (string | null)[],
  level: 'Fácil' | 'Intermedio' | 'Difícil' | 'ML'
): Promise<number | null> => {

  if (level === 'Fácil') return getEasyMove(squares);
  if (level === 'Intermedio') return getMediumMove(squares);
  if (level === 'Difícil') return getHardMove(squares);
  if (level === 'ML') return getMLMove(squares);

  return null;
};

const trainingData: number[][] = []
const targetData: number[][] = []

export const initializeBot = async (): Promise<void> => {
  await initializeModel();
};

export const handleEndGame = ({ squares, gameState, winner }: BoardState, lastMoveIndex: number) => {
  const reward = winner === 'X' ? -1 : winner === 'O' ? 1 : 0; // Recompensa basada en el resultado
  const training = squares.map((sq) => (sq === 'X' ? 1 : sq === 'O' ? -1 : 0));
  const targets = squares.map((sq, idx) => (idx === lastMoveIndex ? reward : 0));

  trainingData.push(training);
  targetData.push(targets);

  setTimeout(() => trainBot(trainingData, targetData), 0);
};

export const trainBot = async (
  trainingData: number[][],
  targetData: number[][]
): Promise<void> => {
  await trainModel(trainingData, targetData);
};

