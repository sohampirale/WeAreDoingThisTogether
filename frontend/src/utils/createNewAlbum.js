import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function createNewAlbum(albumTitle){
    try {
        const reponse = await axios.post(BACKEND_URL+"/api/v1/album",{
            title:albumTitle
        },{
            withCredentials:true
        })
        console.log("New album created successfully : "+JSON.stringify(reponse.data));
        return response.data
    } catch (error) {
        console.log("Failed to create the album");
        return error.response || {
            success:false,
            message: "Couldn't create album"
        }
    }
}

export {createNewAlbum}