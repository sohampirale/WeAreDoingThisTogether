import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function checkIsLoggedIn(){
   try {
        const reponse= await axios.get(BACKEND_URL+"/api/v1/user",{
            withCredentials:true
        })
        return true
   } catch (error) {
        return false
   }
}

export default checkIsLoggedIn