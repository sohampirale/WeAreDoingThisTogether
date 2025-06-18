import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from "axios"

//components
import TempLoginBtn from '../TempLoginBtn.jsx';
import AllNotes from '../Note/AllNotes.jsx';
import Note from "../Note/Note.jsx";
import AddNote from '../Note/AddNote.jsx';

//utils
import { tempLogin } from '../../utils/tempLogin.js';
import { fetchThought } from "../../utils/fetch.utils.js";

function Thought() {
  const { thoughtId } = useParams();
  const [thought, setThought] = useState(null);

  async function helperFetch() {
    try {
      const fetchedThought = await fetchThought(thoughtId);
      if (fetchedThought) {
        setThought(fetchedThought.data);
      }
    } catch (err) {
      console.log('Error fetching the thought');
    }
  }

  useEffect(() => {
    helperFetch();
  }, [thoughtId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Add Note Section */}
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md border border-pink-200">
          <AddNote thoughtId={thoughtId} helperFetch={helperFetch}/>
        </div>

        {/* Main Thought Section */}
        {thought ? (
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-rose-200 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text mb-2">
                💭 {thought.title} 💕
              </h2>
              <p className="text-rose-400 font-medium">
                A special memory we wrote together ✨
              </p>
            </div>

            {/* Notes Section */}
            <div>
              {thought.notes && thought.notes.length !== 0 ? (
                <div className="space-y-6">
                  {thought.notes.map((note, index) => (
                    <div key={index} className="bg-pink-50/70 border border-pink-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                      <Note {...note} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">📝</div>
                  <p className="text-pink-400 font-semibold text-lg">
                    No notes yet...
                  </p>
                  <p className="text-rose-400">Start by adding your first sweet note 💌</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md border border-pink-200">
            <p className="text-xl font-medium text-rose-500">"Thought not found" 💭</p>
          </div>
        )}

        {/* Temporary Login */}
        <div className="text-center">
          <TempLoginBtn />
        </div>
      </div>
    </div>
  );
}

export default Thought;


// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router'
// import axios from "axios"

// //components
// import TempLoginBtn from '../TempLoginBtn.jsx';
// import AllNotes from '../Note/AllNotes.jsx';
// import Note from "../Note/Note.jsx"//
// import AddNote from '../Note/AddNote.jsx';

// //utils
// import { tempLogin } from '../../utils/tempLogin.js';
// import {fetchThought} from "../../utils/fetch.utils.js"


// function Thought() {
//   const { thoughtId } = useParams();
//   console.log('thoughtId = ' + thoughtId);
//   const [thought, setThought] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedThought = await fetchThought(thoughtId);
//         if (fetchedThought) {
//           setThought(fetchedThought.data)
//           console.log('setThought done successfully : ' + JSON.stringify(fetchedThought.data));
//         }
//       } catch (err) {
//         console.log('Error fetching the thought');
//       }
//     }

//     fetchData()
//   }, [thoughtId])

//   return (
//     <div>
//       <AddNote thoughtId={thoughtId} />
//       {thought ? (
//         <div>
//           Thought Component
//           <div>
//             Thought
//             <p>Title : {thought?.title}</p>
//             <div>
//               {thought.notes && thought.notes.length != 0 ? (
//                 <div>
//                   <AllNotes allNotes={thought.notes} />
//                 </div>
//               ) : (
//                 <p>Add first note in this Thought</p>
//               )}
//             </div>

//           </div>
//         </div>) : (<p>"Thought not found"</p>)
//       }
//       <TempLoginBtn />
//     </div>
//   )
// }

// export default Thought


// /**
//  *<div>
//     {album.images && album.images.length>0 ?(
//       <AllImages allImages={album.images}/>
//     ):(
//       <p>
//         Upload first image in this album
//       </p>
//     )}
// </div>
//  */