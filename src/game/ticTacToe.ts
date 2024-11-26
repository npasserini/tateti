import { Board, type Player } from './board'

export type Move = {
  board: Board
  lastMove: number
  lastPlayer: Player
}

export class TicTacToe {
  board: Board
  moves: Move[]
  currentPlayer: Player
  lastMove?: number

  constructor(board: Board = new Board(), moves: Move[] = [], currentPlayer: Player = 'X') {
    this.board = board
    this.moves = moves
    this.currentPlayer = currentPlayer
    this.lastMove = moves[0] && moves[moves.length - 1].lastMove
  }

  // Realizar un movimiento
  makeMove(move: number): TicTacToe | null {
    // Movimiento inválido, abortar
    if (!this.board.isValidMove(move)) return null

    // Crear un nuevo estado del tablero
    const newBoard = this.board.makeMove(move, this.currentPlayer)

    const newMoves = [
      ...this.moves,
      {
        board: newBoard,
        lastMove: move,
        lastPlayer: this.currentPlayer,
      },
    ]

    // Cambiar al próximo jugador
    const nextPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    return new TicTacToe(newBoard, newMoves, nextPlayer)
  }

  // Reiniciar el juego
  resetGame(): TicTacToe {
    return new TicTacToe()
  }
}
