import { useState } from 'react'

import { Square } from './Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './board.js'
import { WinnerModule } from './WinnerMudule.jsx'

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  
  const updateBoard = (index) => {
    // no actualizamos esta posicion
    // si ya tiene algo
    if (board[index] || winner) return
    //actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner) // si esto fuese sincrono que no lo es
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }
  
  return (
    <main className='board'>
      <h1>tres en raya</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModule resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
