import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router'
import { fetchAlbum } from '../../utils/fetch.utils';
import axios from "axios"

//utils
import { tempLogin } from '../../utils/tempLogin.js';
import TempLoginBtn from '../TempLoginBtn.jsx';
import Note from "../Note/Note.jsx"
import AllNotes from '../Note/AllNotes.jsx';
import AllImages from '../Images/AllImages.jsx';

import AddNote from '../Note/AddNote.jsx';
import AddImage from '../Images/AddImage.jsx';

function Album() {
  const { albumId } = useParams();
  console.log('AlbumId = ' + albumId);
  const [album,setAlbum]= useState(null);

  async function helperFetch(){
    try{
      const fetchedAlbum = await fetchAlbum(albumId);
      if(fetchedAlbum){
        setAlbum(fetchedAlbum.data)
        console.log('setAlbum done successfully : '+JSON.stringify(fetchedAlbum.data));
      }
    }catch(err){
      console.log('Error fetching about album');
    }
  }

  useEffect(()=>{
    helperFetch();
  },[albumId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-25 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {album ? (
          <div className="space-y-8">
            
            {/* Album Header */}
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-200">
                <div className="flex justify-center items-center space-x-3 mb-4">
                  <span className="text-4xl">📸</span>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    {album?.title}
                  </h1>
                  <span className="text-4xl">💕</span>
                </div>
                <div className="flex justify-center items-center space-x-2 text-rose-600">
                  <span>Album #{albumId}</span>
                  <span>•</span>
                  <span>Created with 💖</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-pink-200">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">Add a Note</h3>
                  <p className="text-rose-600 text-sm mb-4">Capture thoughts and memories in words</p>
                </div>
                <AddNote albumId={albumId} helperFetch={helperFetch}/>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-pink-200">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">🖼️</div>
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">Add an Image</h3>
                  <p className="text-rose-600 text-sm mb-4">Upload precious moments and photos</p>
                </div>
                <AddImage albumId={albumId} helperFetch={helperFetch}/>
              </div>
            </div>

            {/* Album Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Notes Section */}
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📝</span>
                      <h2 className="text-2xl font-bold text-white">Our Notes</h2>
                      <span className="text-2xl">💭</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {album.notes && album.notes.length != 0 ? (
                      <AllNotes allNotes={album.notes}/>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-6xl mb-4 text-pink-300">📝</div>
                        <h3 className="text-xl font-semibold text-rose-700 mb-2">No Notes Yet</h3>
                        <p className="text-rose-600 mb-4">
                          Add your first note to start documenting this beautiful chapter!
                        </p>
                        <div className="flex justify-center space-x-2">
                          <span className="text-pink-400 animate-pulse">💕</span>
                          <span className="text-rose-400 animate-pulse delay-200">✨</span>
                          <span className="text-pink-400 animate-pulse delay-400">💕</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🖼️</span>
                      <h2 className="text-2xl font-bold text-white">Our Photos</h2>
                      <span className="text-2xl">📸</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {album.images && album.images.length > 0 ? (
                      <AllImages allImages={album.images}/>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-6xl mb-4 text-purple-300">📸</div>
                        <h3 className="text-xl font-semibold text-rose-700 mb-2">No Photos Yet</h3>
                        <p className="text-rose-600 mb-4">
                          Upload your first image to bring this album to life!
                        </p>
                        <div className="flex justify-center space-x-2">
                          <span className="text-purple-400 animate-pulse">💖</span>
                          <span className="text-pink-400 animate-pulse delay-200">✨</span>
                          <span className="text-purple-400 animate-pulse delay-400">💖</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom decorative section */}
            <div className="text-center">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-pink-200">
                <div className="flex justify-center space-x-4 mb-4">
                  <span className="text-2xl animate-bounce delay-0">💕</span>
                  <span className="text-2xl animate-bounce delay-200">📸</span>
                  <span className="text-2xl animate-bounce delay-400">💖</span>
                  <span className="text-2xl animate-bounce delay-600">📝</span>
                  <span className="text-2xl animate-bounce delay-800">✨</span>
                </div>
                <p className="text-rose-600 font-medium italic">
                  "Every memory deserves to be treasured forever"
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-200 max-w-md mx-auto">
              <div className="text-6xl mb-4 text-rose-300">😔</div>
              <h2 className="text-2xl font-bold text-rose-700 mb-2">Album Not Found</h2>
              <p className="text-rose-600 mb-4">
                Oops! We couldn't find this album. It might have been moved or doesn't exist.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="text-pink-400 animate-pulse">💔</span>
                <span className="text-rose-400 animate-pulse delay-200">😢</span>
                <span className="text-pink-400 animate-pulse delay-400">💔</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Temp Login Button */}
        <div className="mt-8">
          <TempLoginBtn/>
        </div>
      </div>
    </div>
  )
}

export default Album

// import React, { useEffect,useState } from 'react'
// import { useParams } from 'react-router'
// import { fetchAlbum } from '../../utils/fetch.utils';
// import axios from "axios"


// //utils
// import { tempLogin } from '../../utils/tempLogin.js';
// import TempLoginBtn from '../TempLoginBtn.jsx';
// import Note from "../Note/Note.jsx"
// import AllNotes from '../Note/AllNotes.jsx';
// import AllImages from '../Images/AllImages.jsx';

// import AddNote from '../Note/AddNote.jsx';
// import AddImage from '../Images/AddImage.jsx';

// function Album() {
//   const { albumId } = useParams();
//   console.log('AlbumId = ' + albumId);
//   const [album,setAlbum]= useState(null);

//   useEffect(()=>{
//     const fetchData=async()=>{
//       try{
//         const fetchedAlbum = await fetchAlbum(albumId);
//         if(fetchedAlbum){
//           setAlbum(fetchedAlbum.data)
//           console.log('setAlbum done successfully : '+JSON.stringify(fetchedAlbum.data));
//         }
//       }catch(err){
//         console.log('Error fetching about album');
//       }
//     }

//     if(albumId){
//       fetchData()
//     }
//   },[albumId])

//   return (
//     <div>
//       <AddNote albumId={albumId}/>
//       <AddImage albumId={albumId}/>
//       {album ?
//         <div>
//           Album Component
//           <div>
//             Album 
//             <p>Title : {album?.title}</p>
//             <div>
//               {album.notes && album.notes.length !=0 ?(
//                 <div>
//                   <AllNotes allNotes={album.notes}/>
//                 </div>  
//               ):(
//                 <p>Add first note in this album</p>
//               )}
//             </div>
//             <div>
//                 {album.images && album.images.length>0 ?(
//                   <AllImages allImages={album.images}/>
//                 ):(
//                   <p>
//                     Upload first image in this album
//                   </p>
//                 )}
//             </div>
//           </div>
//         </div> : "Album not found"
//       }
//       <TempLoginBtn/>
//     </div>
//   )
// }

// export default Album