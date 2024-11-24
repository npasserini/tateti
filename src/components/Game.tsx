import React, { useEffect, useState } from 'react';
import { useTicTacToe } from '../game/useTicTacToe';
import Board from './Board';
import Menu from './Menu';
import { getComputerMove, handleEndGame, initializeBot, Level } from '../bot';
import { Squares } from '../game/board';
import { Player } from '../game';

const Game: React.FC = () => {
  const { board, currentPlayer, makeMove, resetGame } = useTicTacToe();
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null); // Índice de la última jugada
  const [level, setLevel] = useState<Level>('ML'); // Nivel inicial

  useEffect(() => { initializeBot() }, []);

  const handleComputerMove = async (squares: Squares, player: Player) => {
    const move = await getComputerMove(squares, level);
    if (move !== null) {
      makeMove(move, squares, player)
      setLastMoveIndex(move);
    }
  };

  const handleClick = (move: number) => {
    const newGameState = makeMove(move, squares, currentPlayer)
    if (!newGameState) return;
    
    setLastMoveIndex(move);
    const { newBoard, nextPlayer } = newGameState!
    if (newBoard.gameState === 'ongoing') {
      // Deja que la computadora juegue
      setTimeout(() => {
        handleComputerMove(newBoard.squares, nextPlayer)
      }, 250);
    }
    else {
      handleEndGame(newBoard, lastMoveIndex!)
    }
  };

  const { squares, winner, gameState, winningLine } = board;

  return (
    <div className={`game container`}>
      <div className="header">
        <h1 className="title">Tateti</h1>
        <Menu onLevelChange={setLevel} />
      </div>
      <p>Turno del jugador: {currentPlayer}</p>
      {gameState === 'won' && <p>¡El ganador es {winner}!</p>}
      {gameState === 'draw' && <p>Empate.</p>}
      <Board
        squares={squares}
        onClick={handleClick}
        winningSquares={winningLine}
        lastMoveIndex={lastMoveIndex} // Pasar la propiedad requerida
      />
      <div className="text-center">
        <button onClick={resetGame}>Reiniciar Juego</button>
      </div>
      <p className="text-center mt-3">Nivel actual: {level}</p>
    </div>
  );
};

export default Game;
