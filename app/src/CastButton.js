import React from 'react'
import * as http from './http'
import PropTypes from 'prop-types'

class CastButton extends React.Component {
  state = {
    isFetching: false
  }

  static defaultProps = {
    deviceId: 'default'
  }

  static propTypes = {
    deviceId: PropTypes.string.isRequired,
    filmId: PropTypes.string.isRequired
  }

  async requestCastStart(deviceId, filmId) {
    this.setState({ isFetching: true })
    try {
      await http.postJson('/api/devices/:deviceId/cast/:filmId', {
        deviceId,
        filmId
      })
    } finally {
      this.setState({ isFetching: false })
    }
  }

  render() {
    const { deviceId, filmId } = this.props
    return (
      <button
        disabled={this.state.isFetching}
        onClick={_ => this.requestCastStart(deviceId, filmId)}
      >
        Cast
      </button>
    )
  }
}

export default CastButton
