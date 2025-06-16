import React from 'react'
import { useNavigate } from 'react-router';



function AlbumCard({albumId,title,thumbnail,createdAt}) {
  const navigate = useNavigate();

  function goToAlbum(albumId){
    console.log('Going to albumId : '+albumId);
    navigate("/albums/"+albumId)
  }
  console.log('thumbnail = '+thumbnail);
  
  return (
      <>
        Rendering Album Card
        <p>albumId : {albumId}</p>
        <p>title : {title}</p>
        <p>thumbnail : {thumbnail}</p>
        <p>createdAt : {createdAt}</p>
        <p><button onClick={()=>{
          goToAlbum(albumId)
        }}>Go to this album</button>
        </p>
      </>
  )
}

export default AlbumCard
