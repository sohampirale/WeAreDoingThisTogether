import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from "axios"

//components
import TempLoginBtn from '../TempLoginBtn.jsx';
import AllNotes from '../Note/AllNotes.jsx';
import Note from "../Note/Note.jsx"//
import AddNote from '../Note/AddNote.jsx';

//utils
import { tempLogin } from '../../utils/tempLogin.js';
import {fetchThought} from "../../utils/fetch.utils.js"


function Thought() {
  const { thoughtId } = useParams();
  console.log('thoughtId = ' + thoughtId);
  const [thought, setThought] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedThought = await fetchThought(thoughtId);
        if (fetchedThought) {
          setThought(fetchedThought.data)
          console.log('setThought done successfully : ' + JSON.stringify(fetchedThought.data));
        }
      } catch (err) {
        console.log('Error fetching the thought');
      }
    }

    fetchData()
  }, [thoughtId])

  return (
    <div>
      <AddNote thoughtId={thoughtId} />
      {thought ? (
        <div>
          Thought Component
          <div>
            Thought
            <p>Title : {thought?.title}</p>
            <div>
              {thought.notes && thought.notes.length != 0 ? (
                <div>
                  <AllNotes allNotes={thought.notes} />
                </div>
              ) : (
                <p>Add first note in this Thought</p>
              )}
            </div>

          </div>
        </div>) : (<p>"Thought not found"</p>)
      }
      <TempLoginBtn />
    </div>
  )
}

export default Thought


/**
 *<div>
    {album.images && album.images.length>0 ?(
      <AllImages allImages={album.images}/>
    ):(
      <p>
        Upload first image in this album
      </p>
    )}
</div>
 */