import React, { useState } from 'react';
import './GameSetup.css';

function GameSetup({ onStartGame }) {
  const [teamAName, setTeamAName] = useState('');
  const [teamBName, setTeamBName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGame(teamAName || 'Equipo A', teamBName || 'Equipo B');
  };

  return (
    <div className="game-setup-container">
      <div className="game-setup-card">
        <h2 className="title-configuration">Complicidad Ganadora</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-team input-team-a"
            type="text"
            placeholder="Equipo A"
            value={teamAName}
            onChange={(e) => setTeamAName(e.target.value)}
          />
          <input
            className="input-team input-team-b"
            type="text"
            placeholder="Equipo B"
            value={teamBName}
            onChange={(e) => setTeamBName(e.target.value)}
          />
          <button className="start-game-button" type="submit">Iniciar Juego</button>
        </form>
      </div>
    </div>
  );
}

export default GameSetup;