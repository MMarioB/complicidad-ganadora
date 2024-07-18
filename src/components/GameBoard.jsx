import React, { useState, useEffect } from 'react'
import TeamView from './TeamView'
import ScoreBoard from './ScoreBoard'
import Timer from './Timer'
import './GameBoard.css'

function GameBoard({ teamAName, teamBName }) {
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
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
  const [usedWords, setUsedWords] = useState([])
  const [isGameActive, setIsGameActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [currentTeam, setCurrentTeam] = useState('A')
  const [wildcardsLeft, setWildcardsLeft] = useState(3)
  const [guessInput, setGuessInput] = useState('')
  const [roundsPlayed, setRoundsPlayed] = useState(0)
  const [showGameOverScreen, setShowGameOverScreen] = useState(false)

  useEffect(() => {
    let timer
    if (isGameActive && !isPaused && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (isGameActive && timeLeft === 0) {
      endTurn()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, isGameActive, isPaused])

  const startGame = () => {
    setIsGameActive(true)
    setRoundsPlayed(0)
    setScoreA(0)
    setScoreB(0)
    startNewTurn('A')
  }

  const startNewTurn = (team) => {
    setCurrentTeam(team)
    setTimeLeft(90)
    setWildcardsLeft(3)
    selectRandomWord()
    setIsPaused(true)
  }

  const endTurn = () => {
    const currentScore = currentTeam === 'A' ? scoreA : scoreB
    const currentTeamName = currentTeam === 'A' ? teamAName : teamBName
    alert(`Turno terminado.\nPuntuación de ${currentTeamName}: ${currentScore}`)
    
    if (words.length === 0 && usedWords.length === 0) {
      alert("¡Se han agotado todas las palabras! El juego ha terminado.")
      setIsGameActive(false)
      return
    }
    
    if (currentTeam === 'A') {
      startNewTurn('B')
      setRoundsPlayed(roundsPlayed + 1)
    } else {
      if (roundsPlayed === 1) {
        setShowGameOverScreen(true)
        setIsGameActive(false)
      } else {
        startNewTurn('A')
      }
    }
  }

  const selectRandomWord = () => {
    if (words.length === 0) {
      const shuffled = usedWords.sort(() => 0.5 - Math.random())
      setWords(shuffled)
      setUsedWords([])
    }
    
    const randomIndex = Math.floor(Math.random() * words.length)
    const selectedWord = words[randomIndex]
    
    setCurrentWord(selectedWord)
    setWords(words.filter((_, index) => index !== randomIndex))
    setUsedWords([...usedWords, selectedWord])

    if (words.length < 10) {
      console.log("Pocas palabras restantes. Deberíamos cargar más.")
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

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const useWildcard = () => {
    if (wildcardsLeft > 0) {
      setWildcardsLeft(wildcardsLeft - 1)
      selectRandomWord()
    }
  }

  const determineWinner = () => {
    if (scoreA > scoreB) return teamAName
    if (scoreB > scoreA) return teamBName
    return "Empate"
  }

  if (showGameOverScreen) {
    return (
      <div className="game-over-screen">
        <h2>Fin del Juego</h2>
        <ScoreBoard scoreA={scoreA} scoreB={scoreB} teamAName={teamAName} teamBName={teamBName} />
        <p>Ganador: {determineWinner()}</p>
        <button onClick={() => {
          setShowGameOverScreen(false)
          startGame()
        }}>Jugar de Nuevo</button>
      </div>
    )
  }

  return (
    <div className="game-board">
      <h2>Complicidad Ganadora</h2>
      <ScoreBoard scoreA={scoreA} scoreB={scoreB} teamAName={teamAName} teamBName={teamBName} />
      <Timer timeLeft={timeLeft} isPaused={isPaused} />
      <TeamView 
        team={currentTeam}
        word={currentWord}
        teamAName={teamAName}
        teamBName={teamBName}
      />
      {!isGameActive && (
        <button onClick={startGame}>Iniciar Juego</button>
      )}
      {isGameActive && (
        <div className="game-controls">
          <button onClick={togglePause}>{isPaused ? 'Iniciar' : 'Pausar'}</button>
          <button onClick={useWildcard} disabled={wildcardsLeft === 0}>
            Pasar Palabra ({wildcardsLeft} restantes)
          </button>
          <div>
            <input 
              type="text" 
              value={guessInput}
              onChange={(e) => setGuessInput(e.target.value)}
              placeholder="Adivina la palabra" 
            />
            <button onClick={handleGuess}>Enviar Respuesta</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameBoard