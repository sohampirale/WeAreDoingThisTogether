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
async function fetchAllAlbums(){
  console.log("Inside fetchAllAlbums");
  
  try {
    const response = await axios.get(BACKEND_URL+"/api/v1/album",{
      withCredentials:true
    })
    console.log('All albums fetched : '+JSON.stringify(response.data));
    return response.data
  } catch (error) {
    console.log("Error while fetching all albums");
    return {
      message:"Error while fetching all albums"
    }
  }
}

async function fetchThought(thoughtId){ 
  try {
    const response = await axios.get(BACKEND_URL+"/api/v1/thought/"+thoughtId,{
      withCredentials:true
    })
    console.log("Thought fetched successfully : "+JSON.stringify(response.data));
    return response.data

  } catch (error) {
    console.log("Couldn't fetch thought");
    return error.response || {
      success:false,
      message:"Couldn't fetch thought"
    }
  }
}

async function fetchAllThoughts(){
  try {
    const response = await axios.get(BACKEND_URL+"/api/v1/thought",{
      withCredentials:true
    })

    console.log('all thoughts fetched successfully : '+JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("Error : "+JSON.stringify(error));
    return error.response ||{
      success:false,
      message:"Couldn't fetch all thoughts"
    }
  }
}

export {fetchAlbum ,fetchAllAlbums,fetchThought,fetchAllThoughts}