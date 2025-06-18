import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border-t-2 border-pink-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4">
          
          {/* Love Quote Section */}
          <div className="text-center">
            <p className="text-rose-600 font-medium italic text-lg">
              "Every moment together is a memory worth treasuring"
            </p>
          </div>
          
          {/* Hearts Decoration */}
          <div className="flex items-center space-x-2">
            <span className="text-pink-400 animate-pulse">💖</span>
            <span className="text-rose-400 animate-pulse delay-100">💕</span>
            <span className="text-pink-500 animate-pulse delay-200">💗</span>
            <span className="text-rose-500 animate-pulse delay-300">💝</span>
            <span className="text-pink-400 animate-pulse delay-400">💖</span>
          </div>
          
          {/* Footer Text */}
          <div className="text-center space-y-2">
            <p className="text-rose-700 font-semibold">
              Made with 💝 for our beautiful journey together
            </p>
            <p className="text-rose-500 text-sm">
              Capturing memories, one moment at a time • {new Date().getFullYear()}
            </p>
          </div>
          
          {/* Decorative Element */}
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer

// import React from 'react'

// function Footer() {
//   return (
//     <div>
//         Footer Componenet
//     </div>
//   )
// }

// export default Footer
