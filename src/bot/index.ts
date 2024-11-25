import { getEasyMove } from './easy'
import { getMediumMove } from './medium'
import { getHardMove } from './hard'
import { getMLMove, initializeModel, trainModel } from './ml'
import { BoardState } from '../game/board'
import logRewards from '../util/logRewards'
import { Move } from '../game/useTicTacToe'

export type Level = 'Fácil' | 'Intermedio' | 'Difícil' | 'ML1' | 'ML2'

export const getComputerMove = async (squares: (string | null)[], level: Level): Promise<number | null> => {
  if (level === 'Fácil') return getEasyMove(squares)
  if (level === 'Intermedio') return getMediumMove(squares)
  if (level === 'Difícil') return getHardMove(squares)
  if (level.startsWith('ML')) return getMLMove(squares)

  return null
}

export const initializeBot = async (): Promise<void> => {
  await initializeModel()
}

// Asume que el último en jugar fue el humano, la computadora empató o perdió.
export const handleEndGame = (board: BoardState, moves: Move[], level: Level) => {
  if (!level.startsWith('ML')) return

  // const sublevel = Number(level[2])
  rewardLastComputerMove(moves)
}

const rewardLastComputerMove = (moves: Move[]) => {
  // Asume 'O' = bot / 'X' = humano
  console.log(moves)
  const { winner } = moves[moves.length - 1].board

  if (winner === 'X') {
    // Castigo por perder
    const squares = moves[moves.length - 2].board.squares
    const training = squares.map(sq => (sq === 'X' ? 1 : sq === 'O' ? -1 : 0))

    const targets = Array(9).fill(0)

    // Penalizar lo que jugó
    const lastOwnMove = moves[moves.length - 2].lastMove
    targets[lastOwnMove] = -1

    // Premiar lo que debió haber jugado.
    const lastOppositeMove = moves[moves.length - 1].lastMove
    targets[lastOppositeMove] = 1

    logRewards(squares, targets)

    setTimeout(() => trainModel([training], [targets]), 0)
  }
}
