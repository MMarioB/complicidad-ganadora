import React, { useState } from 'react'

function PlayerView({ player, word, isGuessingPlayer, onAddHint }) {
  const [hint, setHint] = useState('')

  const handleHintSubmit = (e) => {
    e.preventDefault()
    if (hint.trim()) {
      onAddHint(hint.trim())
      setHint('')
    }
  }

  return (
    <div className="player-view">
      <h3>Jugador {player} {isGuessingPlayer ? "(Adivinando)" : ""}</h3>
      {!isGuessingPlayer && word && (
        <div>
          <p>Palabra: {word}</p>
          <form onSubmit={handleHintSubmit}>
            <input 
              type="text" 
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="Añadir pista"
            />
            <button type="submit">Añadir</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PlayerView