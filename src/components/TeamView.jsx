function TeamView({ team, word, teamAName, teamBName }) {
  return (
    <div className="team-view">
      <h3>Turno de {team === 'A' ? teamAName : teamBName}</h3>
      <p>Palabra: {word}</p>
    </div>
  )
}

export default TeamView