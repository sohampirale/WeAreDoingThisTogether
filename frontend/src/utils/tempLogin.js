import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function tempLogin(){
  const response = await axios.post(
     BACKEND_URL+'/api/v1/user/login',
      {
        username: 'soham',
        password: 'Soham@1234'
      },
      {
        withCredentials: true // ✅ Important if you want cookies to be sent/received
      }
    );
    window.location.reload();
}

export {tempLogin}