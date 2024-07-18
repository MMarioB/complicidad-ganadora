import React from 'react'

function WordList({ words }) {
  return (
    <div className="word-list">
      <h3>Palabras restantes:</h3>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  )
}

export default WordList