import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function addNewImagesToAlbum(files,albumId){
  console.log("files = "+files);

  const form = new FormData();
  if(!files){
    console.log("Files not found");
    return;
  }
  files.forEach(file => {
    form.append("uploadedImages",file)
  });

  try {
    const response =await axios.put(BACKEND_URL+"/api/v1/album/"+albumId,
      form,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials:true
      }
    );

    console.log('response.data = '+response.data);
    return response.data
  } catch (error) {
    return error.response.data
  }
}


async function extractFiles(e,albumId){
  console.log('inside extractFiles');
  console.log('e = '+e);
  console.log('albumId = '+albumId);
  const files=Array.from(e.target.files)
  await addNewImagesToAlbum(files,albumId)
}

export {addNewImagesToAlbum,extractFiles}