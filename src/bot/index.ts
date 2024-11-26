import { getEasyMove } from './easy'
import { getMediumMove } from './medium'
import { getHardMove } from './hard'
import { getMLMove, initializeModel, trainModel } from './ml'
import { Board, Squares } from '../game'
import logRewards from '../util/logRewards'
import { Move } from '../game'

export type Level = 'Fácil' | 'Intermedio' | 'Difícil' | 'ML1' | 'ML2'

export const getComputerMove = async (squares: Squares, level: Level): Promise<number | null> => {
  if (level === 'Fácil') return getEasyMove(squares)
  if (level === 'Intermedio') return getMediumMove(squares)
  if (level === 'Difícil') return getHardMove(squares)
  if (level.startsWith('ML')) return getMLMove(squares)

  return null
}

export const initializeBot = async (): Promise<void> => {
  await initializeModel()
}

// Asume que el último en jugar fue el humano, la computadora perdió.
export const handleEndGame = (board: Board, moves: Move[], level: Level) => {
  if (!level.startsWith('ML')) return

  const trainingData: number[][] = []
  const targetData: number[][] = []

  // const sublevel = Number(level[2])

  var reward = 1
  for (var index = moves.length - 1; index > 0; index -= 2) {
    // moves[index] tiene la última jugada del contrario (que gana)
    const oppositeMove = moves[index].lastMove

    // moves[index - 1] tiene la última jugada propia (perdedora)
    const squares = moves[index - 1].board.squares
    const ownMove = moves[index - 1].lastMove

    const { training, targets } = punishMove(squares, ownMove, oppositeMove, reward)
    trainingData.push(training)
    targetData.push(targets)

    // La última jugada se penaliza al máximo, cada jugada se reduce un 50% la penalidad
    reward /= 2
  }

  setTimeout(() => trainModel(trainingData, targetData), 0)
}

const punishMove = (squares: Squares, ownMove: number, oppositeMove: number, reward: number) => {
  const training = squares.map(sq => (sq === 'X' ? 1 : sq === 'O' ? -1 : 0))

  const targets = Array(9).fill(0)

  // Penalizar lo que jugó
  targets[ownMove] = -reward

  // Premiar lo que debió haber jugado.
  targets[oppositeMove] = reward

  logRewards(squares, targets)

  return { training, targets }
}
