import React from 'react'
import { useNavigate } from 'react-router';

function AlbumCard({albumId,title,thumbnail,createdAt}) {
  const navigate = useNavigate();

  function goToAlbum(albumId){
    console.log('Going to albumId : '+albumId);
    alert("going to albumId : "+albumId)
    navigate("/albums/"+albumId)
  }
  console.log('thumbnail = '+thumbnail);

  // Format the date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200 overflow-hidden group">
      
      {/* Thumbnail Section */}
      <div className="relative h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-2 text-pink-400">📸</div>
            <p className="text-rose-500 font-medium">No Preview</p>
          </div>
        )}
        
        {/* Overlay with heart */}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-pink-500 text-lg">💕</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-rose-800 mb-2 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center text-rose-600 text-sm">
            <span className="mr-2">📅</span>
            <span>Created {formatDate(createdAt)}</span>
          </div>
        </div>

        {/* Album ID (styled as a tag) */}
        <div className="mb-4">
          <span className="inline-block bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full">
            Album #{albumId}
          </span>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => goToAlbum(albumId)}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <span>Open Album</span>
          <span className="text-lg">💖</span>
        </button>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400"></div>
    </div>
  )
}

export default AlbumCard

// import React from 'react'
// import { useNavigate } from 'react-router';



// function AlbumCard({albumId,title,thumbnail,createdAt}) {
//   const navigate = useNavigate();

//   function goToAlbum(albumId){
//     console.log('Going to albumId : '+albumId);
//     navigate("/albums/"+albumId)
//   }
//   console.log('thumbnail = '+thumbnail);
  
//   return (
//       <>
//         Rendering Album Card
//         <p>albumId : {albumId}</p>
//         <p>title : {title}</p>
//         <p>thumbnail : {thumbnail}</p>
//         <p>createdAt : {createdAt}</p>
//         <p><button onClick={()=>{
//           goToAlbum(albumId)
//         }}>Go to this album</button>
//         </p>
//       </>
//   )
// }

// export default AlbumCard
