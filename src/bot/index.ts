import { getEasyMove } from './easy'
import { getMediumMove } from './medium'
import { getHardMove } from './hard'
import { getMLMove, initializeModel, trainModel } from './ml'
import { Squares, TicTacToe } from '../game'
import logRewards from '../util/logRewards'

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

var trainingData: number[][] = []
var targetData: number[][] = []

export const resetTrainingData = () => {
  trainingData = []
  targetData = []
}

// Asume que que la computardora = O / oponente = X
export const handleEndGame = (gameState: TicTacToe, level: Level) => {
  const { moves } = gameState

  if (
    !level.startsWith('ML') ||
    gameState.board.gameOutcome === 'draw' // Por ahora no aprendemos de los empates
  )
    return

  // const sublevel = Number(level[2])

  var reward = 1 // Siempre se premia al ganador, no importa si fue la IA o no.

  for (var index = moves.length - 1; index > 0; index -= 2) {
    // moves[index] tiene la última jugada del contrario (que gana)
    const winnerMove = moves[index].lastMove

    // moves[index - 1] tiene la última jugada propia (perdedora)
    const squares = moves[index - 1].board.squares
    const loserMove = moves[index - 1].lastMove

    rewardMove(squares, winnerMove, loserMove, reward)

    // La última jugada se penaliza al máximo, cada jugada se reduce un 50% la penalidad
    reward /= 2
  }

  setTimeout(() => trainModel(trainingData, targetData), 0)
}

export const rewardMove = (squares: Squares, winnerMove: number | null, loserMove: number, reward: number) => {
  const training = squares.map(sq => (sq === 'X' ? 1 : sq === 'O' ? -1 : 0))

  const targets = Array(9).fill(0)
  if (winnerMove) targets[winnerMove] = reward // Premiar la jugada ganadora
  targets[loserMove] = -reward // Castigar la jugada perdedora

  logRewards(squares, targets)

  trainingData.push(training)
  targetData.push(targets)
}
