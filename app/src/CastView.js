import React from 'react'
import { getJson } from './http'
import { connect } from './util'

class CastView extends React.Component {
  static async fetchData(incomingProps) {
    const [devices, film] = await Promise.all([
      getJson('/api/devices'),
      getJson('/api/films/:filmId', {
        filmId: incomingProps.match.params.filmId
      })
    ])

    return { devices, film }
  }

  render() {
    if (this.props.devices.length === 0) {
      // no devices. :(
      return <h1>There are no chromecast devices on your network.</h1>
    }

    if (this.props.film === null) {
      // film couldn't be found. :(
      return <h1>Could not find film with that id :(</h1>
    }

    return null
  }
}

export default connect(CastView)
