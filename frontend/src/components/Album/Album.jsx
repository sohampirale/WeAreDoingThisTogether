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

  useEffect(()=>{
    const fetchData=async()=>{
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

    if(albumId){
      fetchData()
    }
  },[albumId])

  return (
    <div>
      <AddNote albumId={albumId}/>
      <AddImage albumId={albumId}/>
      {album ?
        <div>
          Album Component
          <div>
            Album 
            <p>Title : {album?.title}</p>
            <div>
              {album.notes && album.notes.length !=0 ?(
                <div>
                  <AllNotes allNotes={album.notes}/>
                </div>  
              ):(
                <p>Add first note in this album</p>
              )}
            </div>
            <div>
                {album.images && album.images.length>0 ?(
                  <AllImages allImages={album.images}/>
                ):(
                  <p>
                    Upload first image in this album
                  </p>
                )}
            </div>
          </div>
        </div> : "Album not found"
      }
      <TempLoginBtn/>
    </div>
  )
}

export default Album