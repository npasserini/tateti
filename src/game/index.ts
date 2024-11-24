import { useState } from 'react';
export type BoardType = (string | null)[]

export const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// export const calculateWinner = (squares: (string | null)[]) => {
//   for (let [a, b, c] of lines) {
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return { winner: squares[a], line: [a, b, c] }; // Devuelve el ganador y las casillas
//     }
//   }
//   return { winner: null, line: [] }; // No hay ganador
// };


export type Player = 'X' | 'O';
export type GameState = 'ongoing' | 'won' | 'draw';

export const useTicTacToe = () => {
  const [board, setBoard] = useState<(Player | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameState, setGameState] = useState<GameState>('ongoing');

  const makeMove = (index: number): boolean => {
    if (gameState !== 'ongoing' || board[index] !== null) {
      return false; // Movimiento inválido
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setGameState('won');
      setWinner(newWinner);
    } else if (newBoard.every((cell) => cell !== null)) {
      setGameState('draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    return true;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameState('ongoing');
  };

  const checkWinner = (board: (Player | null)[]): Player | null => {
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  return {
    board,
    currentPlayer,
    winner,
    gameState,
    makeMove,
    resetGame,
    checkWinner
  };
};
