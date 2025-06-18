import HeaderDecoration from "./HeaderDecoration.jsx"

function Home(){
    return (<>
        <HeaderDecoration/>
        <main className="flex-1 relative z-10">
        {/* Welcome Message for Home Page (when no specific route) */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-200">
              <div className="flex justify-center space-x-2 mb-4">
                <span className="text-4xl animate-pulse">💕</span>
                <span className="text-4xl animate-pulse delay-200">💖</span>
                <span className="text-4xl animate-pulse delay-400">💗</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Welcome to Our Love Story
              </h1>
              <p className="text-rose-700 text-lg font-medium mb-6">
                A beautiful space to capture and cherish every precious moment we share together
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div  className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-xl border border-pink-200 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl mb-3">📸</div>
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">Our Albums</h3>
                  <p className="text-rose-600">Store photos and notes from our adventures, dates, and special moments</p>
                </div>
                <div  className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl border border-pink-200 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl mb-3">💭</div>
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">Our Thoughts</h3>
                  <p className="text-rose-600">Capture fleeting thoughts, feelings, and memories in written form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Router Outlet for other pages */}
      </main>

    </>)
}

export default Home