import React from 'react'
import Image from './Image.jsx'

function AllImages({ allImages }) {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-semibold text-rose-600 mb-4 flex items-center">
        📸 Our Lovely Moments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allImages.map((imageUrl, index) => (
          <Image key={index} imageUrl={imageUrl} />
        ))}
      </div>
    </div>
  )
}

export default AllImages

// import React from 'react'
// import Image from './Image.jsx'

// function AllImages({allImages}) {
//   return (
//     <>
//       <p>Images</p>
//       {allImages.map(imageUrl=>
//         <Image imageUrl={imageUrl}/>
//       )}
//     </>
//   )
// }

// export default AllImages
