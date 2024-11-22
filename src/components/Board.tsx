import React from 'react';
import '../styles/components/Board.scss';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (index: number) => void;
  winningSquares: number[];
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningSquares }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinningSquare={winningSquares.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;
