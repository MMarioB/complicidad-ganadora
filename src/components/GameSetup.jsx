import React, { useState } from 'react';

function GameSetup({ onStartGame }) {
  const [teamAName, setTeamAName] = useState('Equipo A');
  const [teamBName, setTeamBName] = useState('Equipo B');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGame(teamAName, teamBName);
  };

  return (
    <div className="configuration-container">
      <h2 className="title-configuration">Configuración del Juego</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamA"></label>
          <input
            className="input-a"
            type="text"
            id="teamA"
            value={teamAName}
            onChange={(e) => setTeamAName(e.target.value)}
            required
          />
        </div>
        <div className="input-configuration">
          <label htmlFor="teamB"></label>
          <input
            className="input-b"
            type="text"
            id="teamB"
            value={teamBName}
            onChange={(e) => setTeamBName(e.target.value)}
            required
          />
        </div>
        <button className="primary-button" type="submit">Iniciar Juego</button>
      </form>
    </div>
  );
}

export default GameSetup;