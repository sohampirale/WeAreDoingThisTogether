import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function createNewThought(thoughtTitle){
    try {
        const reponse = await axios.post(BACKEND_URL+"/api/v1/thought",{
            title:thoughtTitle
        },{
            withCredentials:true
        })
        
        console.log("New thought created successfully : "+JSON.stringify(reponse.data));
        return response.data
    } catch (error) {
        console.log("Failed to create the thought");
        return error.response || {
            success:false,
            message: "Couldn't create thought"
        }
    }
}

export {createNewThought}