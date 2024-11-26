import React, { useEffect, useState } from 'react'
import BoardView from './Board'
import Menu from './Menu'
import { getComputerMove, handleEndGame, initializeBot, Level } from '../bot'
import { TicTacToe } from '../game'

const Game: React.FC = () => {
  const [level, setLevel] = useState<Level>('ML2') // Nivel inicial
  const [gameState, setGameState] = useState(() => new TicTacToe())

  useEffect(() => {
    initializeBot()
  }, [])

  const handleComputerMove = async (gameState: TicTacToe) => {
    const currentBoard = gameState.board

    const move = await getComputerMove(currentBoard.squares, level)
    if (move !== null) {
      const newGameState = gameState.makeMove(move)!
      setGameState(newGameState)
      if (newGameState.board.gameOutcome !== 'ongoing') handleEndGame(newGameState.moves, level)
    }
  }

  const handleClick = (move: number) => {
    const newGameState = gameState.makeMove(move)

    if (!newGameState) return
    setGameState(newGameState)

    if (newGameState.board.gameOutcome === 'ongoing') {
      // Deja que la computadora juegue
      setTimeout(() => {
        handleComputerMove(newGameState)
      }, 250)
    } else {
      handleEndGame(newGameState.moves, level)
    }
  }

  const resetGame = () => {
    setGameState(new TicTacToe())
  }

  const { board, currentPlayer, lastMove } = gameState
  const { squares, winner, gameOutcome, winningLine } = board

  return (
    <div className={`game container`}>
      <div className="header">
        <h1 className="title">Tateti</h1>
        <Menu onLevelChange={setLevel} />
      </div>
      <p>Turno del jugador: {currentPlayer}</p>
      {gameOutcome === 'won' && <p>¡El ganador es {winner}!</p>}
      {gameOutcome === 'draw' && <p>Empate.</p>}
      <BoardView
        squares={squares}
        onClick={handleClick}
        winningSquares={winningLine}
        lastMoveIndex={lastMove} // Pasar la propiedad requerida
      />
      <div className="text-center">
        <button onClick={resetGame}>Reiniciar Juego</button>
      </div>
      <p className="text-center mt-3">Nivel actual: {level}</p>
    </div>
  )
}

export default Game
