import React from 'react'
import * as reactRouter from 'react-router'

export default function Film({ film }) {
  const url = reactRouter.generatePath('/cast/:filmId', { filmId: film.id })
  return (
    <article className="Film">
      <h1>{film.name}</h1>
      <a href={url}>Start casting</a>
    </article>
  )
}
