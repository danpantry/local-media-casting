import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import * as reactRouterDom from 'react-router-dom'
import FilmLibrary from './FilmLibrary'
import NotFoundView from './NotFoundView'
import FilmView from './FilmView'
import DeviceBox from './DeviceBox'
import Anchor from './Anchor'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <reactRouterDom.BrowserRouter>
          <Switch>
            <Route path="/films/:filmId" component={FilmView} />
            <Route path="/library" component={FilmLibrary} />
            <Route exact strict path="/" component={FilmLibrary} />
            <Route component={NotFoundView} />
          </Switch>
        </reactRouterDom.BrowserRouter>
        <Anchor location="bottomRight">
          <DeviceBox />
        </Anchor>
      </React.Fragment>
    )
  }
}

export default App
