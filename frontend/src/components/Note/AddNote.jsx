import React from 'react'
import { useState } from 'react';

import { addNewNoteInAlbum, addNewNoteInThought } from '../../utils/addNewNote';

function AddNote({ thoughtId, albumId ,helperFetch}) {
  const [click, setClick] = useState(false);
  const [note, setNote] = useState("");

  if (!thoughtId && !albumId) {
    return <p className="text-red-500 font-medium">thoughtId or albumId is needed</p>;
  }

  const addHelper = thoughtId ? addNewNoteInThought : addNewNoteInAlbum;

  return (
    <div className="my-6">
      {!click && (
        <button
          onClick={() => setClick(prev => !prev)}
          className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        >
          💌 Add note
        </button>
      )}

      {click && (
        <div className="mt-4 p-4 bg-white/70 rounded-xl shadow-md border border-pink-200 max-w-xl mx-auto">
          <input
            type="text"
            onChange={(e) => setNote(e.target.value)}
            placeholder='Write your sweet memory here...'
            value={note}
            className="w-full px-4 py-2 mb-4 rounded-md border border-rose-200 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-rose-300 text-rose-700"
          />
          <button
            onClick={async () => {
              await addHelper(thoughtId || albumId, note);
              setClick(prev => !prev);
              setTimeout(() => {
                helperFetch();
              }, 1000);
            }}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-md hover:scale-105 transition-transform duration-300"
          >
            ✨ Add Note
          </button>
        </div>
      )}
    </div>
  )
}

export default AddNote

// import React from 'react'
// import { useState } from 'react';

// import { addNewNoteInAlbum,addNewNoteInThought } from '../../utils/addNewNote';

// function AddNote({thoughtId,albumId}) {
//   const [click,setClick] = useState(false);
//   const [note,setNote] = useState("");
//   if(!thoughtId && !albumId){
//     return <p>thoughtId or albumId is needed</p>;
//   }

//   const addHelper=thoughtId?addNewNoteInThought:addNewNoteInAlbum;
  
//   return (
//     <>
//       {!click && (<button onClick={()=>setClick(prev=>!prev)}>Add note</button>)}

//       {click && (
//         <div>
//           <input type="text" onChange={(e)=>setNote(e.target.value)} placeholder='Enter new note here' value={note}/>
//           <button onClick={async()=>{
//             await addHelper(thoughtId||albumId,note)
//             setClick(prev=>!prev);
//             setTimeout(()=>{
//               window.location.reload();
//             },1000)
//           }}>Add Note</button>
//         </div>
//       )}

//     </>
//   )
// }

// export default AddNote