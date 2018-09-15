import React from 'react'
import './Device.css'

function Device({ device }) {
  return (
    <article className="Device">
      <h1 className="Device__Name">{device.name}</h1>
      <span className="Device__Id">{device.id}</span>
    </article>
  )
}

export default Device
