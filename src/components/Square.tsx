import React from 'react';
import '../styles/components/Square.scss';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  const classes = `square ${isWinningSquare ? 'win' : ''}`;

  return (
    <button className={classes} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
