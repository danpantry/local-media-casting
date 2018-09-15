import React from 'react'

export default function Film({ film }) {
  return (
    <article className="Film">
      <h1>{film.name}</h1>
    </article>
  )
}
