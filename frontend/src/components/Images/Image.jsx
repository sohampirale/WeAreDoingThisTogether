import React from 'react'

function Image({ imageUrl }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 m-2">
      <img
        src={imageUrl}
        alt="Memory"
        className="w-full h-auto object-cover rounded-xl border border-pink-200"
      />
    </div>
  )
}

export default Image



// import React from 'react'

// function Image({imageUrl}) {
//   return (
//     <img src={imageUrl}/>
//   )
// }

// export default Image
