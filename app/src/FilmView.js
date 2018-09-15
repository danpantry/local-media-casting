import React from 'react'
import * as util from './util'
import { getJson } from './http'
import CastButton from './CastButton'

function FilmView({ film }) {
  return (
    <div>
      <h1>{film.name}</h1>
      <CastButton filmId={film.id} />
    </div>
  )
}

FilmView.fetchData = async incomingProps => {
  const { location, match } = incomingProps
  // No need to make an expensive fetch if the previous location already handed us the film!
  const maybeFilm = util.getPropFromLocationState(location, 'film')
  if (maybeFilm) {
    return Promise.resolve({
      film: maybeFilm
    })
  }

  return {
    film: await getJson('/api/films/:filmId', { filmId: match.params.filmId })
  }
}

export default util.connect(FilmView)
