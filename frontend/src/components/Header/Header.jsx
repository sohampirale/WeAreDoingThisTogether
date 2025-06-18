import React from 'react'
import {useNavigate} from "react-router"

function Header() {
  const navigate=useNavigate();

  return (
    <header className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 shadow-lg border-b-2 border-pink-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo/Title Section */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl">💕</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Our Journey
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <span 
              onClick={()=>navigate("/")} 
              className="relative cursor-pointer px-4 py-2 text-rose-700 hover:text-rose-800 font-medium transition-all duration-300 hover:scale-105 group"
            >
              🏠 Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
            </span>
            
            <span 
              onClick={()=>navigate("/albums")} 
              className="relative cursor-pointer px-4 py-2 text-rose-700 hover:text-rose-800 font-medium transition-all duration-300 hover:scale-105 group"
            >
              📸 Albums
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
            </span>
            
            <span 
              onClick={()=>navigate("/thoughts")} 
              className="relative cursor-pointer px-4 py-2 text-rose-700 hover:text-rose-800 font-medium transition-all duration-300 hover:scale-105 group"
            >
              💭 Thoughts
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
// import React from 'react'
// import {useNavigate} from "react-router"

// function Header() {
//   const navigate=useNavigate();

//   return (
//     <div>
//       <p>
//         <span onClick={()=>navigate("/")} >Home</span>
//         <span onClick={()=>navigate("/albums")}>Albums</span>
//         <span onClick={()=>navigate("/thoughts")}>Thoughts</span>
//        </p>
//     </div>
//   )
// }

// export default Header

