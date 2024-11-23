import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (index: number) => void;
  winningSquares: number[];
  lastMoveIndex: number | null;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningSquares, lastMoveIndex }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinningSquare={winningSquares.includes(index)}
          isLastMove={lastMoveIndex === index}
        />
      ))}
    </div>
  );
};

export default Board;
