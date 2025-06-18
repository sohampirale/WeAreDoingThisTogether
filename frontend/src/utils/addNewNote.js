import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function addNewNoteInAlbum(albumId,note){
  console.log('Inside addNewNoteInAlbum');
  
  try {
    const response =axios.post(BACKEND_URL+'/api/v1/album/'+albumId,{
      note
    },{
      withCredentials:true
    })
    return response.data;
  } catch (error) {
    return error.response.data || {
      success:false,
      message: "Something went wrong"
    }
  }
}

function addNewNoteInThought(thoughtId,note){
  console.log('Inside addNewNoteInThought');

  try {
    const response =axios.post(BACKEND_URL+'/api/v1/thought/'+thoughtId,{
      note
    },{
      withCredentials:true
    })
    return response.data;
  } catch (error) {
    return error.response.data || {
      success:false,
      message: "Something went wrong"
    }
  }
}

async function addNewNoteForResourceInAlbum(albumId,note,resourceId){
  try {
    const response= await axios.post(BACKEND_URL+"/api/v1/album/"+albumId+"/"+resourceId,{
      note
    },{
      withCredentials:true
    })
    return response.data
  } catch (error) {
    return error.response || {
      success:false,
      message: "Something went wrong"
    }
  }
}

export {addNewNoteInAlbum,addNewNoteInThought,addNewNoteForResourceInAlbum}