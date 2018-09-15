import React from 'react'
import * as reactRouter from 'react-router'

/**
 * A component that creates a container around its children. A user can click anywhere on that component to visit the given url
 */
function Clickable({ history, path, parameters, state = undefined, children }) {
  const url = reactRouter.generatePath(path, parameters)
  return <div onClick={_ => history.push(url, state)}>{children}</div>
}

export default reactRouter.withRouter(Clickable)
