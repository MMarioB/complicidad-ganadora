function ScoreBoard({ scoreA, scoreB, teamAName, teamBName }) {
  return (
    <div className="score-board">
      <div>{teamAName}: {scoreA}</div>
      <div>{teamBName}: {scoreB}</div>
    </div>
  )
}

export default ScoreBoard