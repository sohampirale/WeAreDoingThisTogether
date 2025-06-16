import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_VERSION = import.meta.env.VITE_FIRST_VERSION;

async function fetchAlbum(albumId){
  try{
    const url = BACKEND_URL+"/api/v1/album/"+albumId;

    console.log('Url = '+url);
    console.log("albumId received = "+albumId);
    
    const album = await axios.get(url, {
      withCredentials: true
    });
    console.log('Album fetched : '+JSON.stringify(album.data));
    return album.data;
  }catch(err){
    return null;
  }
}


export {fetchAlbum}