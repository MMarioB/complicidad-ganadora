import React, { useState } from 'react'
import GameSetup from './components/GameSetup'
import GameBoard from './components/GameBoard'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [teamAName, setTeamAName] = useState('')
  const [teamBName, setTeamBName] = useState('')

  const handleStartGame = (teamA, teamB) => {
    setTeamAName(teamA)
    setTeamBName(teamB)
    setGameStarted(true)
  }

  return (
    <div className="App">
      {!gameStarted ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <GameBoard teamAName={teamAName} teamBName={teamBName} />
      )}
    </div>
  )
}

export default App