import React from 'react'

function Timer({ timeLeft, isPaused }) {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="timer">
      <h3>
        Tiempo: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        {isPaused}
      </h3>
    </div>
  )
}

export default Timer