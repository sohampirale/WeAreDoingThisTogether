import React from 'react'
import { useState } from 'react';

import { addNewNoteInAlbum,addNewNoteInThought } from '../../utils/addNewNote';

function AddNote({thoughtId,albumId}) {
  const [click,setClick] = useState(false);
  const [note,setNote] = useState("");
  if(!thoughtId && !albumId){
    return <p>thoughtId or albumId is needed</p>;
  }

  const addHelper=thoughtId?addNewNoteInThought:addNewNoteInAlbum;
  
  return (
    <>
      {!click && (<button onClick={()=>setClick(prev=>!prev)}>Add note</button>)}

      {click && (
        <div>
          <input type="text" onChange={(e)=>setNote(e.target.value)} placeholder='Enter new note here' value={note}/>
          <button onClick={async()=>{
            await addHelper(thoughtId||albumId,note)
            setClick(prev=>!prev);
            setTimeout(()=>{
              window.location.reload();
            },1000)
          }}>Add Note</button>
        </div>
      )}

    </>
  )
}

export default AddNote