import { useState } from 'react'
import { Board, Squares, useBoard, type Player } from './board'

export type Move = {
  board: Board
  lastMove: number
  lastPlayer: Player
}

var moves: Move[] = []

export const useTicTacToe = () => {
  const { board, setBoard, resetBoard } = useBoard()

  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')

  // Función para realizar un movimiento
  const makeMove = (move: number, currentBoard: Board, currentPlayer: Player) => {
    console.log('makeMove', currentBoard)
    // Movimiento inválido, abortar
    if (!board.isValidMove(move)) return null

    const newBoard = currentBoard.makeMove(move, currentPlayer)
    console.log('newBoard', newBoard)
    setBoard(newBoard)

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
