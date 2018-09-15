import React from 'react'
import Device from './Device'
import './DeviceList.css'

function DeviceList({ devices = [] }) {
  return (
    <ol className="DeviceList">
      {devices.map(device => (
        <li className="DeviceList__Item" key={device.id}>
          <Device device={device} />
        </li>
      ))}
    </ol>
  )
}

export default DeviceList
