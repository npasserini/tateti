import React, { useState } from 'react';
import Board from './Board';
import '../styles/components/Game.scss';

const calculateWinner = (squares: (string | null)[]) => {
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }; // Devuelve el ganador y las casillas
    }
  }
  return { winner: null, line: [] }; // No hay ganador
};

const Game: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null); // Índice de la última jugada

  const { winner, line } = calculateWinner(squares);

  const handleComputerMove = (squares: (string | null)[]) => {
    const emptyIndices = squares
      .map((sq, idx) => (sq === null ? idx : null))
      .filter((idx) => idx !== null) as number[];
  
    if (emptyIndices.length === 0) return;
  
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    squares[randomIndex] = 'O'; // La computadora juega como 'O'
  };
  
  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares).winner) return;
  
    const newSquares = squares.slice();
    newSquares[index] = 'X';
    setLastMoveIndex(index); // Marca la jugada del jugador
    setSquares(newSquares);
  
    const result = calculateWinner(newSquares);
    if (result.winner) return;
  
    // Deja que la computadora juegue
    setTimeout(() => {
      const emptyIndices = newSquares
        .map((sq, idx) => (sq === null ? idx : null))
        .filter((idx) => idx !== null) as number[];
  
      const move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      newSquares[move] = 'O';
      setLastMoveIndex(move); // Marca la jugada de la computadora
      setSquares([...newSquares]);
    }, 500);
  };
  
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const status = winner
    ? `Ganador: ${winner}`
    : squares.every((sq) => sq)
    ? `Empate`
    : `Turno: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className={`game container`}>
      <h1 className="text-primary text-center">Tateti</h1>
      <p className="text-center fw-bold">{status}</p>
      <Board
        squares={squares}
        onClick={handleClick}
        winningSquares={line}
        lastMoveIndex={lastMoveIndex} // Pasar la propiedad requerida
      />
      <div className="text-center">
        <button className="btn btn-danger mt-3" onClick={resetGame}>
          Reiniciar Juego
        </button>
      </div>
    </div>
  );
};

export default Game;
