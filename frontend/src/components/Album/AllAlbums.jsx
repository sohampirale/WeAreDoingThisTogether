import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Album from './Album'
import AlbumCard from './AlbumCard.jsx'
import AddAlbum from "./AddAlbum.jsx"

//utils
import { fetchAllAlbums } from "../../utils/fetch.utils.js"

import checkIsLoggedIn from "../../utils/checkIsLoggedIn.js"

function AllAlbums() {
  checkIsLoggedIn();
  const [allAlbums, setAllAlbums] = useState(false)

  async function helperFetch(){
    console.log("Inside helperFetch");
    
    const fetchedAllAlbums = await fetchAllAlbums();

    if (fetchedAllAlbums) {
      setAllAlbums(fetchedAllAlbums);
      setTimeout(() => {
        // window.location.reload();
      }, 2000)
    } else {
      console.log("Couldn't fetch all albums");
    }
  }

  useEffect(() => {
    helperFetch();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-25 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <span className="text-4xl">📸</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Our Memory Albums
            </h1>
            <span className="text-4xl">💕</span>
          </div>
          <p className="text-rose-600 text-lg font-medium">
            Every picture tells our story, every album holds our hearts
          </p>
        </div>

        {/* Add Album Component */}
        <div className="mb-8">
          <AddAlbum helperFetch={helperFetch}/>
        </div>

        {/* Albums Grid */}
        <div className="space-y-6">
          {allAlbums && allAlbums.length != 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allAlbums.data?.map(album => (
                <div key={album.albumId} className="transform hover:scale-105 transition-all duration-300">
                  <AlbumCard 
                    albumId={album.albumId} 
                    title={album.title} 
                    thumbnail={album.thumbnail} 
                    createdAt={album.createdAt} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-200 max-w-md mx-auto">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-2xl font-semibold text-rose-700 mb-2">No Albums Yet</h3>
                <p className="text-rose-600 mb-4">
                  Start creating beautiful memories together! Click the button above to create your first album.
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="text-pink-400 animate-pulse">💕</span>
                  <span className="text-rose-400 animate-pulse delay-200">💖</span>
                  <span className="text-pink-400 animate-pulse delay-400">💕</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllAlbums


// import React, { useEffect, useState } from 'react'
// import { Outlet } from 'react-router'
// import Album from './Album'
// import AlbumCard from './AlbumCard.jsx'
// import AddAlbum from "./AddAlbum.jsx"

// //utils
// import { fetchAllAlbums } from "../../utils/fetch.utils.js"

// function AllAlbums() {

//   const [allAlbums, setAllAlbums] = useState(false)

//   useEffect(() => {
//     const fetchAlbums = async () => {
//       const fetchedAllAlbums = await fetchAllAlbums();
//       if (fetchedAllAlbums) {
//         setAllAlbums(fetchedAllAlbums);
//         setTimeout(() => {
//           // window.location.reload();
//         }, 2000)
//       } else {
//         console.log("COuldn't fetch all albums");
//       }
//     }
//     fetchAlbums();
//   }, [])

//   return (
//     <>
//       <AddAlbum />
      
//       <p  className="text-blue-500 underline cursor-pointer hover:text-blue-700">All Albums component - Going to render all Albums</p>
//       {allAlbums && allAlbums.length != 0 ? (allAlbums.data.map(album => {
//         return (
//           <>
//             <p>-------------------</p>
//             <AlbumCard albumId={album.albumId} title={album.title} thumbnail={album.thumbnail} createdAt={album.createdAt} />
//             <p>-------------------</p>
//           </>
//         )
//       })) : (
//         <p>Couldn't fetch all albums</p>
//       )}
//     </>
//   )
// }

// export default AllAlbums
