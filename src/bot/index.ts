import { getEasyMove } from './easy';
import { getMediumMove } from './medium';
import { getHardMove } from './hard';
import { getMLMove, initializeModel, trainModel } from './ml';

export type Level = "Fácil" | "Intermedio" | "Difícil" | "ML"

export const initializeBot = async (): Promise<void> => {
  await initializeModel();
};

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

export const trainBot = async (
  trainingData: number[][],
  targetData: number[][]
): Promise<void> => {
  await trainModel(trainingData, targetData);
};
