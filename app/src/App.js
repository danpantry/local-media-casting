import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import FilmLibrary from './FilmLibrary'
import NotFoundView from './NotFoundView'
import CastView from './CastView'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/cast/:filmId" component={CastView} />
        <Route path="/library" component={FilmLibrary} />
        <Route exact strict path="/" component={FilmLibrary} />
        <Route component={NotFoundView} />
      </Switch>
    )
  }
}

export default App
