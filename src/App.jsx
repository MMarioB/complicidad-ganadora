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

  const handleGameEnd = () => {
    setGameStarted(false);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <GameBoard
          teamAName={teamAName}
          teamBName={teamBName}
          onGameEnd={handleGameEnd}
        />
      )}
    </div>
  );
}

export default App