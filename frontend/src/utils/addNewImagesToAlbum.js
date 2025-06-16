import axios from "axios"
import { response } from "express";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function addNewImagesToAlbum(files,albumId){
  const form = new FormData();
  files.forEach(file => {
    form.append("uploadedFile",file)
  });
  try {
    const reponse = axios.put(BACKEND_URL+"/api/v1/album/"+albumId,
      form,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials:true
      }
    );

    console.log('response.data = '+response.data);
    return response.data
  } catch (error) {
    return error.reponse.data
  }
}

export {addNewImagesToAlbum}