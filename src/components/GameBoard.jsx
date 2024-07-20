import React, { useState, useEffect } from 'react'
import './GameBoard.css'

function GameBoard({ teamAName, teamBName, onGameEnd }) {
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [currentWord, setCurrentWord] = useState('')
  const [words, setWords] = useState([
    'coche', 'ordenador', 'television', 'telefono', 'libro', 'pelota', 'guitarra',
    'mesa', 'silla', 'lampara', 'ventana', 'puerta', 'teclado', 'raton',
    'pantalla', 'cafe', 'agua', 'reloj', 'calendario', 'lapiz', 'papel',
    'mochila', 'zapatos', 'camisa', 'pantalon', 'gorra', 'sol', 'luna',
    'estrella', 'nube', 'lluvia', 'nieve', 'viento', 'arbol', 'flor',
    'perro', 'gato', 'pajaro', 'pez', 'elefante', 'leon', 'tigre',
    'mono', 'jirafa', 'cebra', 'oso', 'lobo', 'zorro', 'conejo'
  ])
  const [isGameActive, setIsGameActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [currentTeam, setCurrentTeam] = useState('A')
  const [wildcardsLeft, setWildcardsLeft] = useState(3)
  const [guessInput, setGuessInput] = useState('')
  const [roundsPlayed, setRoundsPlayed] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    let timer
    if (isGameActive && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      endTurn()
    }
    return () => clearInterval(timer)
  }, [isGameActive, isPaused, timeLeft])

  const startGame = () => {
    setIsGameActive(true)
    setIsPaused(false)
    setTimeLeft(60)
    selectRandomWord()
  }

  const selectRandomWord = () => {
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length)
      setCurrentWord(words[randomIndex])
      setWords(words.filter((_, index) => index !== randomIndex))
    }
  }

  const handleGuess = () => {
    if (guessInput.toLowerCase() === currentWord.toLowerCase()) {
      if (currentTeam === 'A') {
        setScoreA(scoreA + 1)
      } else {
        setScoreB(scoreB + 1)
      }
    } else {
      if (currentTeam === 'A') {
        setScoreA(Math.max(0, scoreA - 1))
      } else {
        setScoreB(Math.max(0, scoreB - 1))
      }
    }
    setGuessInput('')
    selectRandomWord()
  }

  const useWildcard = () => {
    if (wildcardsLeft > 0) {
      setWildcardsLeft(wildcardsLeft - 1)
      selectRandomWord()
    }
  }

  const endTurn = () => {
    setIsPaused(true)
    setTimeLeft(60)
    setWildcardsLeft(3)
    setRoundsPlayed(roundsPlayed + 1)
    if (roundsPlayed === 1) {
      setGameOver(true)
    } else {
      setCurrentTeam(currentTeam === 'A' ? 'B' : 'A')
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const determineWinner = () => {
    if (scoreA > scoreB) return teamAName
    if (scoreB > scoreA) return teamBName
    return "Empate"
  }

  if (gameOver) {
    return (
      <div className="game-over-container">
        <div className="game-over-card">
          <h2 className="game-over-title">Fin del Juego</h2>
          <div className="final-scores">
            <p>{teamAName}: {scoreA}</p>
            <p>{teamBName}: {scoreB}</p>
          </div>
          <p className="winner">Ganador: {determineWinner()}</p>
          <button className="return-button" onClick={onGameEnd}>
            Volver a Selección de Equipos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-board">
      <div className="team-name">{currentTeam === 'A' ? teamAName : teamBName}</div>
      <div className="score-display">
        <span>{teamAName}: {scoreA}</span>
        <span>{teamBName}: {scoreB}</span>
      </div>
      <div className="wildcards">
        {[...Array(3)].map((_, index) => (
          <button
            key={index}
            className={`wildcard ${index < wildcardsLeft ? 'active' : ''}`}
            onClick={useWildcard}
            disabled={index >= wildcardsLeft || !isGameActive || isPaused}
          >
            P
          </button>
        ))}
      </div>
      <div className="main-display">
        <div className="timer">{timeLeft}</div>
        <div className="word-to-guess">
          {isGameActive ? (isPaused ? currentWord : currentWord) : "Pulsa Iniciar"}
        </div>
        <div className="current-score">{currentTeam === 'A' ? scoreA : scoreB}</div>
      </div>
      <div className="controls">
        <button onClick={isGameActive ? togglePause : startGame}>
          {isGameActive ? (isPaused ? 'Reanudar' : 'Pausar') : 'Iniciar'}
        </button>
        <input
          type="text"
          value={guessInput}
          onChange={(e) => setGuessInput(e.target.value)}
          placeholder="Adivina la palabra"
          disabled={!isGameActive}
        />
        <button onClick={handleGuess} disabled={!isGameActive}>Enviar</button>
      </div>
    </div>
  )
}

export default GameBoard