import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import Login from "./components/Login/Login.jsx"
//components
import HeaderDecoration from "./components/Home/HeaderDecoration.jsx"

import checkIsLoggedIn from "./utils/checkIsLoggedIn.js"

function App() {
  const [loggedIn, setLoggedIn] = useState(null)
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  console.log('loggedIn = '+loggedIn);
  
  useEffect(() => {
    async function check() {
      if (await checkIsLoggedIn()) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }
    check()
  }, [])

  return (
    <>
    { loggedIn && (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-25 to-purple-50 flex flex-col">
        <Header />
        <Outlet />
        <Footer />
      </div>
    )}

    {(loggedIn==false) && <Login setLoggedIn={setLoggedIn}/>}

    </>
  )
}

export default App

// import { useState } from 'react'
// import { Outlet } from 'react-router-dom'
// import Header from "./components/Header/Header.jsx"
// import Footer from "./components/Footer/Footer.jsx"

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Header/>
//       <Outlet/>
//       <Footer/>      
//     </>
//   )
// }

// export default App
