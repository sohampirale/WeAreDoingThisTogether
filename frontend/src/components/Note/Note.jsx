import React from 'react'

function Note({ note }) {
  return (
    <div className="bg-white/70 border border-pink-200 rounded-xl shadow-md p-4 m-2 hover:shadow-lg transition-shadow duration-300">
      <div className="text-rose-700 text-lg font-medium">
        💌 {note}
      </div>
    </div>
  )
}

export default Note


// import React from 'react'

// function Note({note}) {
//   return (
//     <div>
//       Note is : {note}
//     </div>
//   )
// }

// export default Note
