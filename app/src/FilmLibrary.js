import React from 'react'
import * as http from './http'
import * as util from './util'
import Film from './Film'

function FilmLibrary({ films }) {
  return (
    <ol>
      {films.map(film => (
        <li key={film.id}>
          <Film film={film} />
        </li>
      ))}
    </ol>
  )
}

FilmLibrary.fetchData = async () => {
  const films = await http.getJson('/api/films')
  return { films }
}

export default util.connect(FilmLibrary)
