import { useState } from 'react'

export type Player = 'X' | 'O'
export type GameState = 'ongoing' | 'won' | 'draw'
export type Squares = (Player | null)[]

export const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

// Clase inmutable para representar el tablero
export class Board {
  squares: Squares
  winner?: Player
  gameState: GameState
  winningLine?: number[]

  constructor(squares: Squares) {
    this.squares = [...squares] // Crear una copia inmutable
    const { winner, winningLine, isDraw } = Board.checkWinner(squares)

    if (winner) {
      this.winner = winner
      this.gameState = 'won'
      this.winningLine = winningLine
    } else if (isDraw) {
      this.gameState = 'draw'
    } else {
      this.gameState = 'ongoing'
    }
  }

  // Método estático para verificar el ganador
  static checkWinner(squares: Squares) {
    for (let line of lines) {
      const [a, b, c] = line
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], winningLine: line }
      }
    }

    if (squares.every(cell => cell !== null)) {
      return { isDraw: true }
    }

    return {}
  }

  // Validar si una jugada es válida
  isValidMove(index: number): boolean {
    return this.gameState === 'ongoing' && this.squares[index] === null
  }

  // Realizar una jugada
  makeMove(index: number, player: Player): Board {
    if (!this.isValidMove(index)) {
      throw new Error('Movimiento inválido.')
    }

    const newSquares = [...this.squares]
    newSquares[index] = player

    return new Board(newSquares)
  }

  // Reiniciar el tablero
  reset(): Board {
    return new Board(Array(9).fill(null))
  }
}

// Hook para manejar el estado del tablero
export const useBoard = () => {
  const [board, setBoard] = useState(() => new Board(Array(9).fill(null)))

  const resetBoard = () => {
    setBoard(() => new Board(Array(9).fill(null)))
  }

  return {
    board,
    setBoard,
    resetBoard,
  }
}
