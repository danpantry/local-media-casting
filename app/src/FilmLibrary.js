import React from 'react'
import * as http from './http'
import * as util from './util'
import Film from './Film'
import Clickable from './Clickable'

function FilmLibrary({ films }) {
  return (
    <ol>
      {films.map(film => (
        <li key={film.id}>
          <Clickable
            path="/films/:filmId"
            parameters={{ filmId: film.id }}
            state={{ film }}
          >
            <Film film={film} />
          </Clickable>
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
