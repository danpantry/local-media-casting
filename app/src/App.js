import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import * as reactRouterDom from 'react-router-dom'
import FilmLibrary from './FilmLibrary'
import NotFoundView from './NotFoundView'
import CastView from './CastView'

class App extends Component {
  render() {
    return (
      <reactRouterDom.BrowserRouter>
        <Switch>
          <Route path="/cast/:filmId" component={CastView} />
          <Route path="/library" component={FilmLibrary} />
          <Route exact strict path="/" component={FilmLibrary} />
          <Route component={NotFoundView} />
        </Switch>
      </reactRouterDom.BrowserRouter>
    )
  }
}

export default App
