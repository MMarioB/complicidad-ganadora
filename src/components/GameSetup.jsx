import React, { useState } from 'react';

function GameSetup({ onStartGame }) {
  const [teamAName, setTeamAName] = useState('Equipo A');
  const [teamBName, setTeamBName] = useState('Equipo B');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGame(teamAName, teamBName);
  };

  return (
    <div className="game-setup">
      <h2>Configuración del Juego</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamA">Nombre del Equipo A:</label>
          <input
            type="text"
            id="teamA"
            value={teamAName}
            onChange={(e) => setTeamAName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="teamB">Nombre del Equipo B:</label>
          <input
            type="text"
            id="teamB"
            value={teamBName}
            onChange={(e) => setTeamBName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Juego</button>
      </form>
    </div>
  );
}

export default GameSetup;