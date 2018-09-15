import React from 'react'
import DeviceList from './DeviceList'
import * as http from './http'
import Info from './Info'
import './DeviceBox.css'

class DeviceBox extends React.Component {
  state = {
    isFetching: false,
    devices: []
  }

  async fetchData() {
    this.setState({ isFetching: true })
    const devices = await http.getJson('/api/devices')
    this.setState({ isFetching: false, devices })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const infoBox = (
      <Info>
        These are the devices that were detected on your network. If your device
        is not listed, ensure that the device is connected on the same network
        as this computer.
      </Info>
    )

    return (
      <div className="DeviceBox">
        <h1 className="DeviceBox__Title">Your devices {infoBox}</h1>
        <div className="DeviceBox__DeviceList">
          <DeviceList devices={this.state.devices} />
        </div>
        <div className="DeviceBox__StatusBar">
          <button
            onClick={() => this.fetchData()}
            disabled={this.state.isFetching}
            className="DeviceBox__RefreshButton"
          >
            Refresh
          </button>

          {this.state.isFetching && (
            <span className="DeviceBox__FetchingText">Loading..</span>
          )}
        </div>
      </div>
    )
  }
}

export default DeviceBox
