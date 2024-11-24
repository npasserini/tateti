import React from 'react'
import '../styles/components/Square.scss'

interface SquareProps {
  value: string | null
  onClick: () => void
  isWinningSquare?: boolean
  isLastMove: boolean // Indica si es la última jugada
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, isLastMove }) => {
  const classes = `
    square
    ${value === 'X' ? 'player-x' : value === 'O' ? 'player-o' : ''}
    ${isWinningSquare ? 'win' : ''}
    ${isLastMove ? 'highlight' : ''}
  `

  return (
    <button className={classes} onClick={onClick}>
      {value}
    </button>
  )
}

export default Square
