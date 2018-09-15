import React from 'react'
import invariant from 'invariant'
import './Anchor.css'

const classes = {
  bottomRight: 'Anchor--bottomRight'
}

const validLocations = Object.keys(classes)

function Anchor({ location, children }) {
  invariant(
    location in classes,
    `${location} is not a valid location (acceptable values: ${validLocations.join(
      ', '
    )})`
  )

  const classnames = ['Anchor', classes[location]].join(' ')

  return <aside className={classnames}>{children}</aside>
}

export default Anchor
