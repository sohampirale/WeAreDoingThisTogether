import React from 'react'
import Image from './Image.jsx'

function AllImages({allImages}) {
  return (
    <>
      <p>Images</p>
      {allImages.map(imageUrl=>
        <Image imageUrl={imageUrl}/>
      )}
    </>
  )
}

export default AllImages
