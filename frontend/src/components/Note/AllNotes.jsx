import React from 'react'
import Note from './Note.jsx'

function AllNotes({allNotes}) {
  return (
    <>
      <p>Notes</p>
      {
        allNotes.map(oneNote=>{
          return(
            <Note note={oneNote.note}/>
          )
        })
      }
    </>
  )
}

export default AllNotes
