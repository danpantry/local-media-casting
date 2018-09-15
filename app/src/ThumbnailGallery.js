import React from 'react'
import Thumbnail from './Thumbnail'

function ThumbnailGallery({ thumbnails }) {
  return (
    <div className="ThumbnailGallery">
      {thumbnails.map(url => (
        <Thumbnail key={url} url={url} />
      ))}
    </div>
  )
}

export default ThumbnailGallery
