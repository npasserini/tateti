import React, { useState } from 'react';
import Board from './Board';
import styles from '../styles/Game.module.scss';

const Game: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

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
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Ganador: ${winner}`
    : squares.every((sq) => sq)
    ? `Empate`
    : `Turno: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className={`${styles.game} container`}>
      <h1 className="text-primary text-center">Tateti</h1>
      <p className="text-center fw-bold">{status}</p>
      <Board squares={squares} onClick={handleClick} />
      <div className="text-center">
        <button className="btn btn-danger mt-3" onClick={resetGame}>
          Reiniciar Juego
        </button>
      </div>
    </div>
  );
};

export default Game;
