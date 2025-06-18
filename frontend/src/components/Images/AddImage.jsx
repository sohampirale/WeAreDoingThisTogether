import React, { useState, useRef } from 'react'
import { addNewImagesToAlbum } from "../../utils/addNewImagesToAlbum.js"

function AddImage({ albumId ,helperFetch}) {
  const [click, setClick] = useState(false);
  const fileInputRef = useRef();

  if (!albumId) {
    return <p className="text-red-500 font-medium">albumId is required</p>;
  }

  return (
    <div className="my-6">
      {!click && (
        <button
          onClick={() => setClick(prev => !prev)}
          className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        >
          📸 Add Images
        </button>
      )}

      {click && (
        <div className="mt-4 p-4 bg-white/70 rounded-xl shadow-md border border-pink-200 max-w-xl mx-auto">
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="w-full mb-4 text-pink-600 bg-pink-50 border border-rose-200 rounded-md p-2 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-200 file:text-rose-700 hover:file:bg-pink-300"
          />
          <button
            onClick={async () => {
              const files = Array.from(fileInputRef.current.files);
              await addNewImagesToAlbum(files, albumId);
              setClick(prev => !prev);
              setTimeout(() => {
                helperFetch();
              }, 1000);
            }}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-md hover:scale-105 transition-transform duration-300"
          >
            ✨ Upload Images
          </button>
        </div>
      )}
    </div>
  )
}

export default AddImage


// import React,{useState,useRef} from 'react'
// import {addNewImagesToAlbum}  from "../../utils/addNewImagesToAlbum.js"

// function AddImage({albumId}) {
//   const [click,setClick] = useState(false);
//   const [note,setNote] = useState("");
//   const fileInputRef = useRef();
//   if(!albumId){
//     return <p>thoughtId or albumId is needed</p>;
//   }
  

//   return (
//     <>
//       {!click && (<button onClick={()=>setClick(prev=>!prev)}>Add Images</button>)}

//       {click && (
//         <div>
//           <input type="file" multiple  ref={fileInputRef}/>
//           <button onClick={async()=>{
//             const files=Array.from(fileInputRef.current.files);
//             await addNewImagesToAlbum(files,albumId);            
//             setClick(prev=>!prev);
//             setTimeout(()=>{
//               window.location.reload();
//             },1000)
//           }}>Add Images</button>
//         </div>
//       )}

//     </>
//   )
// }

// export default AddImage
