
import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="btn btn-outline-dark square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
