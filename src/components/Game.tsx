import React, { useEffect, useState } from 'react'
import { useTicTacToe } from '../game/useTicTacToe'
import BoardView from './Board'
import Menu from './Menu'
import { getComputerMove, handleEndGame, initializeBot, Level } from '../bot'
import { Board, Player, Squares } from '../game'

const Game: React.FC = () => {
  const { board, moves, currentPlayer, makeMove, resetGame } = useTicTacToe()
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null) // Índice de la última jugada
  const [level, setLevel] = useState<Level>('ML2') // Nivel inicial

  useEffect(() => {
    initializeBot()
  }, [])

  const handleComputerMove = async (currentBoard: Board, player: Player) => {
    console.log('handleComputerMove', currentBoard)
    const move = await getComputerMove(currentBoard.squares, level)
    if (move !== null) {
      const newGameState = makeMove(move, currentBoard, player)
      const newBoard = newGameState!.newBoard
      if (newBoard.gameState !== 'ongoing') handleEndGame(newBoard, moves, level)
      setLastMoveIndex(move)
    }
  }

  const handleClick = (move: number) => {
    const newGameState = makeMove(move, board, currentPlayer)
    console.log('handleClick', newGameState?.newBoard)
    if (!newGameState) return

    setLastMoveIndex(move)
    const { newBoard, nextPlayer } = newGameState!
    console.log('handleClick', newBoard)
    if (newBoard.gameState === 'ongoing') {
      // Deja que la computadora juegue
      setTimeout(() => {
        handleComputerMove(newBoard, nextPlayer)
      }, 250)
    } else {
      handleEndGame(newBoard, moves, level)
    }
  }

  const { squares, winner, gameState, winningLine } = board

  return (
    <div className={`game container`}>
      <div className="header">
        <h1 className="title">Tateti</h1>
        <Menu onLevelChange={setLevel} />
      </div>
      <p>Turno del jugador: {currentPlayer}</p>
      {gameState === 'won' && <p>¡El ganador es {winner}!</p>}
      {gameState === 'draw' && <p>Empate.</p>}
      <BoardView
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
  )
}

export default Game
