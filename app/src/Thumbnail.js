import React from 'react'

function Thumbnail({ url, alt = url }) {
  return (
    <picture>
      <img src={url} alt={alt} />
    </picture>
  )
}

export default Thumbnail
