import { useState } from 'react'
import { BoardState, Squares, useBoard, type Player } from './board'

export type Move = {
  board: BoardState
  lastMove: number
  lastPlayer: Player
}

var moves: Move[] = []

export const useTicTacToe = () => {
  const { board, setBoardState, resetBoard, isValidMove } = useBoard()

  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')

  // Función para realizar un movimiento
  const makeMove = (move: number, squares: Squares, currentPlayer: Player) => {
    // Movimiento inválido, abortar
    if (!isValidMove(move)) return null

    const newSquares = [...squares]
    newSquares[move] = currentPlayer
    const newBoard = setBoardState(newSquares)

    moves.push({
      board: newBoard,
      lastMove: move,
      lastPlayer: currentPlayer,
    })

    const nextPlayer: Player = currentPlayer === 'X' ? 'O' : 'X'

    // Cambiar de turno solo si el juego continúa
    if (newBoard.gameState === 'ongoing') {
      setCurrentPlayer(nextPlayer)
    }

    return { newBoard, nextPlayer }
  }

  // Función para reiniciar el juego
  const resetGame = () => {
    moves = []
    resetBoard()
    setCurrentPlayer('X')
  }

  return {
    board,
    moves, // Non reactive
    currentPlayer,
    makeMove,
    resetGame,
  }
}
