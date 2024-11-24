import { getEasyMove } from './easy'
import { getMediumMove } from './medium'
import { getHardMove } from './hard'
import { getMLMove, initializeModel, trainModel } from './ml'
import { BoardState } from '../game/board'
import logRewards from '../util/logRewards'

export type Level = 'Fácil' | 'Intermedio' | 'Difícil' | 'ML1' | 'ML2'

export const getComputerMove = async (squares: (string | null)[], level: Level): Promise<number | null> => {
  if (level === 'Fácil') return getEasyMove(squares)
  if (level === 'Intermedio') return getMediumMove(squares)
  if (level === 'Difícil') return getHardMove(squares)
  if (level.startsWith('ML')) return getMLMove(squares)

  return null
}

const trainingData: number[][] = []
const targetData: number[][] = []

export const initializeBot = async (): Promise<void> => {
  await initializeModel()
}

// Asume que el último en jugar fue el humano, la computadora empató o perdió.
export const handleEndGame = (board: BoardState, secondToLastMove: number, level: Level) => {
  if (!level.startsWith('ML')) return

  // const sublevel = Number(level[2])
  rewardLastComputerMove(board, [secondToLastMove, -1])

  setTimeout(() => trainModel(trainingData, targetData), 0)
}

const rewardLastComputerMove = ({ squares, winner }: BoardState, moves: number[]) => {
  const reward = winner === 'X' ? -1 : winner === 'O' ? 1 : 0 // Recompensa basada en la última jugada propia
  const lastComputerMove = moves[moves.length - (winner === 'O' ? 1 : 2)]

  const training = squares.map(sq => (sq === 'X' ? 1 : sq === 'O' ? -1 : 0))
  const targets = squares.map((sq, idx) => (idx === lastComputerMove ? reward : 0))

  logRewards(squares, targets)

  trainingData.push(training)
  targetData.push(targets)
}
