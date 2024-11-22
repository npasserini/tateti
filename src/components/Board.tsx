import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  return (
    <div className="d-flex flex-wrap board">
      {squares.map((square, index) => (
        <div key={index} className="col-4 p-1">
          <Square value={square} onClick={() => onClick(index)} />
        </div>
      ))}
    </div>
  );
};

export default Board;
