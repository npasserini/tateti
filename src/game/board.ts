import { useState, useEffect } from 'react';

export type Player = 'X' | 'O';
export type GameState = 'ongoing' | 'won' | 'draw';
export type Squares = (Player | null)[]
export type BoardState = {
  squares: Squares
  winner?: Player,
  gameState: GameState,
  winningLine?: number[]
}

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Función para verificar si hay un ganador
const checkWinner = (squares: Squares) => {
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], winningLine: line };
    }
  }

  if (squares.every((cell) => cell !== null)) {
    return { isDraw: true };
  }

  return {};
};

const computeBoardState = (squares: Squares): BoardState => {
  const { winner, winningLine, isDraw } = checkWinner(squares);

  const newBoard = winner ?
    { squares, winner, gameState: 'won', winningLine }
    : isDraw ?
      { squares, gameState: 'draw' }
      : { squares, gameState: 'ongoing' };
  
  return newBoard as BoardState
}

export const useBoard = () => {
  const [squares, setSquares] = useState<(Player | null)[]>(Array(9).fill(null));
  const [gameState, setGameState] = useState<GameState>('ongoing');

  const isValidMove = (index: number) =>
    gameState === 'ongoing' || !squares[index]

  // Efecto para verificar el estado del juego cada vez que cambian los squares
  useEffect(() => {}, [squares]);

  // Función para resetear los squares
  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    setGameState('ongoing');
  };

  const setBoardState = (squares: Squares) => {
    setSquares(squares)
    const newBoard = computeBoardState(squares)
    if (newBoard.gameState !== 'ongoing')
      setGameState(newBoard.gameState)
    return newBoard
  }
  
  return {
    board: computeBoardState(squares),
    setBoardState,
    resetBoard,
    isValidMove
  };
};
