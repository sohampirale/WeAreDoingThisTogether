import HeaderDecoration from "./HeaderDecoration.jsx"
import { useState, useEffect } from 'react'

function Home() {
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    
    // Show birthday message after 2 seconds
    const messageTimer = setTimeout(() => setShowBirthdayMessage(true), 2000)
    
    // Create confetti effect
    const confettiArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }))
    setConfetti(confettiArray)

    return () => {
      clearInterval(timer)
      clearTimeout(messageTimer)
    }
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <>
      <HeaderDecoration/>
      
      {/* Confetti Animation */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden">
        {confetti.map(piece => (
          <div
            key={piece.id}
            className="absolute w-2 h-2 animate-bounce"
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              background: ['#ff69b4', '#ff1493', '#ffd700', '#ff6347', '#9370db'][Math.floor(Math.random() * 5)]
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <main className="flex-1 relative z-10">
        {/* Birthday Countdown/Celebration */}
        <div className="fixed top-20 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg z-30">
          <div className="text-sm font-bold">{formatTime(currentTime)}</div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Main Birthday Message */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border-2 border-pink-200 relative overflow-hidden">
              
              {/* Animated Background Hearts */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-pink-200 animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      fontSize: `${1 + Math.random()}rem`
                    }}
                  >
                    💖
                  </div>
                ))}
              </div>

              <div className="relative z-10">
                {/* Animated Emoji Header */}
                <div className="flex justify-center items-center space-x-3 mb-6">
                  <span className="text-6xl animate-bounce">🎉</span>
                  <span className="text-6xl animate-pulse">💝</span>
                  <span className="text-6xl animate-bounce delay-200">🎂</span>
                  <span className="text-6xl animate-pulse delay-300">🌟</span>
                  <span className="text-6xl animate-bounce delay-500">💕</span>
                </div>

                {/* Main Birthday Message */}
                <div className={`transition-all duration-1000 ${showBirthdayMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
                  <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
                    Happy 19th Birthday
                  </h1>
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
                    Vaishnavi! 💖
                  </h2>
                </div>

                {/* Anniversary Message */}
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 mb-8 border border-pink-300">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-4xl mr-3">💕</span>
                    <h3 className="text-3xl font-bold text-rose-800">One Amazing Year Together</h3>
                    <span className="text-4xl ml-3">💕</span>
                  </div>
                  <p className="text-rose-700 text-xl font-medium leading-relaxed">
                    From Soham with all my love ❤️<br/>
                    365 days of laughter, love, and beautiful memories<br/>
                    Here's to many more adventures together! 🌟
                  </p>
                </div>

                {/* Special Message */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-pink-300 shadow-lg">
                  <p className="text-rose-800 text-lg italic font-medium">
                    "Every moment with you feels like a celebration, but today is extra special! 
                    This website is my gift to you - a place where we can keep all our precious memories safe forever. 
                    I love you more than words can express! 💝"
                  </p>
                  <div className="text-right mt-4">
                    <span className="text-rose-600 font-semibold">- Your Soham 💕</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards with Birthday Theme */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="group bg-gradient-to-br from-pink-100 via-white to-rose-100 p-8 rounded-2xl border-2 border-pink-200 hover:border-pink-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4 group-hover:animate-bounce">📸</div>
              <h3 className="text-2xl font-bold text-rose-800 mb-3">Our Memory Albums</h3>
              <p className="text-rose-600 text-lg leading-relaxed">
                Every photo tells our story - from our first date to this very moment. 
                Let's fill this with all our adventures! 🌈
              </p>
              <div className="mt-4 flex space-x-2">
                <span className="text-sm bg-pink-200 text-pink-800 px-3 py-1 rounded-full">📷 Photos</span>
                <span className="text-sm bg-rose-200 text-rose-800 px-3 py-1 rounded-full">💭 Memories</span>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-100 via-white to-pink-100 p-8 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-5xl mb-4 group-hover:animate-bounce">💭</div>
              <h3 className="text-2xl font-bold text-purple-800 mb-3">Our Love Letters</h3>
              <p className="text-purple-600 text-lg leading-relaxed">
                Sweet messages, inside jokes, and all the little things that make us smile. 
                Our digital diary of love! 💌
              </p>
              <div className="mt-4 flex space-x-2">
                <span className="text-sm bg-purple-200 text-purple-800 px-3 py-1 rounded-full">💌 Letters</span>
                <span className="text-sm bg-pink-200 text-pink-800 px-3 py-1 rounded-full">🎵 Songs</span>
              </div>
            </div>
          </div>

          {/* Birthday Stats */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-6">🎂 Birthday Stats 🎂</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">19</div>
                <div className="text-sm">Years of Awesome</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">365</div>
                <div className="text-sm">Days Together</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm">Love for You</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold">💕</div>
                <div className="text-sm">Forever & Always</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home

// import HeaderDecoration from "./HeaderDecoration.jsx"
// import { useState, useEffect } from 'react'

// function Home() {
//   const [showBirthdayMessage, setShowBirthdayMessage] = useState(false)
//   const [showSecondMessage, setShowSecondMessage] = useState(false)
//   const [showFinalMessage, setShowFinalMessage] = useState(false)
//   const [confetti, setConfetti] = useState([])
//   const [currentTime, setCurrentTime] = useState(new Date())
//   const [heartExplosion, setHeartExplosion] = useState(false)
//   const [musicNotes, setMusicNotes] = useState([])
//   const [clickedCard, setClickedCard] = useState(null)
//   const [showLovePoetry, setShowLovePoetry] = useState(false)

//   useEffect(() => {
//     // Update time every second
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    
//     // Staggered message reveals
//     const messageTimer1 = setTimeout(() => setShowBirthdayMessage(true), 1500)
//     const messageTimer2 = setTimeout(() => setShowSecondMessage(true), 3500)
//     const messageTimer3 = setTimeout(() => setShowFinalMessage(true), 5500)
//     const poetryTimer = setTimeout(() => setShowLovePoetry(true), 7000)
    
//     // Heart explosion effect
//     const heartTimer = setTimeout(() => setHeartExplosion(true), 2000)
    
//     // Create enhanced confetti effect
//     const confettiArray = Array.from({ length: 80 }, (_, i) => ({
//       id: i,
//       left: Math.random() * 100,
//       delay: Math.random() * 5,
//       duration: 4 + Math.random() * 3,
//       emoji: ['✨', '💖', '🎉', '🌟', '💕', '🎂', '🎈', '💝'][Math.floor(Math.random() * 8)]
//     }))
//     setConfetti(confettiArray)

//     // Floating music notes
//     const notesArray = Array.from({ length: 20 }, (_, i) => ({
//       id: i,
//       left: Math.random() * 100,
//       delay: Math.random() * 4,
//       duration: 6 + Math.random() * 2
//     }))
//     setMusicNotes(notesArray)

//     return () => {
//       clearInterval(timer)
//       clearTimeout(messageTimer1)
//       clearTimeout(messageTimer2)
//       clearTimeout(messageTimer3)
//       clearTimeout(heartTimer)
//       clearTimeout(poetryTimer)
//     }
//   }, [])

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', { 
//       hour12: true, 
//       hour: '2-digit', 
//       minute: '2-digit',
//       second: '2-digit'
//     })
//   }

//   const handleCardClick = (cardId) => {
//     setClickedCard(cardId)
//     setTimeout(() => setClickedCard(null), 1000)
//   }

//   return (
//     <>
//       <HeaderDecoration/>
      
//       {/* Enhanced Confetti Animation */}
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden">
//         {confetti.map(piece => (
//           <div
//             key={piece.id}
//             className="absolute text-2xl animate-bounce"
//             style={{
//               left: `${piece.left}%`,
//               animationDelay: `${piece.delay}s`,
//               animationDuration: `${piece.duration}s`,
//               animation: `bounce ${piece.duration}s infinite ${piece.delay}s, fadeInOut 8s infinite ${piece.delay}s`
//             }}
//           >
//             {piece.emoji}
//           </div>
//         ))}
//       </div>

//       {/* Floating Music Notes */}
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-15 overflow-hidden">
//         {musicNotes.map(note => (
//           <div
//             key={note.id}
//             className="absolute text-purple-400 opacity-60 animate-pulse"
//             style={{
//               left: `${note.left}%`,
//               animationDelay: `${note.delay}s`,
//               animationDuration: `${note.duration}s`,
//               transform: `translateY(100vh)`,
//               animation: `floatUp ${note.duration}s infinite ${note.delay}s linear`
//             }}
//           >
//             🎵
//           </div>
//         ))}
//       </div>

//       {/* Heart Explosion Effect */}
//       {heartExplosion && (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-25">
//           {[...Array(12)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute text-4xl text-pink-500 animate-ping"
//               style={{
//                 transform: `rotate(${i * 30}deg) translateY(-50px)`,
//                 animationDelay: `${i * 0.1}s`,
//                 animationDuration: '2s'
//               }}
//             >
//               💖
//             </div>
//           ))}
//         </div>
//       )}

//       <main className="flex-1 relative z-10">
//         {/* Magical Time Display */}
//         <div className="fixed top-20 right-4 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-2xl z-30 animate-pulse">
//           <div className="text-lg font-bold">✨ {formatTime(currentTime)} ✨</div>
//           <div className="text-xs text-center opacity-90">Special Moment</div>
//         </div>

//         <div className="max-w-5xl mx-auto px-4 py-8">
//           {/* Epic Birthday Celebration */}
//           <div className="text-center mb-12">
//             <div className="bg-gradient-to-br from-pink-50 via-white via-purple-50 to-rose-50 backdrop-blur-sm rounded-3xl shadow-2xl p-16 border-4 border-pink-300 relative overflow-hidden transform hover:scale-105 transition-all duration-700">
              
//               {/* Animated Background Elements */}
//               <div className="absolute inset-0 overflow-hidden">
//                 {[...Array(25)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="absolute text-pink-200 animate-pulse opacity-30"
//                     style={{
//                       left: `${Math.random() * 100}%`,
//                       top: `${Math.random() * 100}%`,
//                       animationDelay: `${Math.random() * 3}s`,
//                       fontSize: `${0.8 + Math.random() * 1.5}rem`,
//                       transform: `rotate(${Math.random() * 360}deg)`
//                     }}
//                   >
//                     {['💖', '🌟', '✨', '💕', '🎀', '🌸', '💝'][Math.floor(Math.random() * 7)]}
//                   </div>
//                 ))}
//               </div>

//               <div className="relative z-10">
//                 {/* Spectacular Emoji Header */}
//                 <div className="flex justify-center items-center space-x-4 mb-8">
//                   <span className="text-8xl animate-bounce">🎉</span>
//                   <span className="text-8xl animate-pulse">👑</span>
//                   <span className="text-8xl animate-bounce delay-200">🎂</span>
//                   <span className="text-8xl animate-pulse delay-300">🌟</span>
//                   <span className="text-8xl animate-bounce delay-500">💖</span>
//                   <span className="text-8xl animate-pulse delay-700">🎈</span>
//                 </div>

//                 {/* Main Birthday Explosion */}
//                 <div className={`transition-all duration-2000 ${showBirthdayMessage ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-12 scale-75'}`}>
//                   <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white rounded-3xl p-8 mb-8 shadow-2xl">
//                     <h1 className="text-8xl font-black mb-4 animate-pulse">
//                       HAPPY BIRTHDAY
//                     </h1>
//                     <h2 className="text-7xl font-bold mb-4 text-yellow-200">
//                       VAISHNAVI! 🎂
//                     </h2>
//                     <div className="text-3xl font-bold">
//                       🎉 19 YEARS OF PURE MAGIC! 🎉
//                     </div>
//                   </div>
//                 </div>

//                 {/* Love Anniversary Celebration */}
//                 <div className={`transition-all duration-2000 ${showSecondMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
//                   <div className="bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 rounded-3xl p-10 mb-8 border-4 border-pink-300 shadow-xl">
//                     <div className="flex items-center justify-center mb-6">
//                       <span className="text-6xl mr-4 animate-spin">💕</span>
//                       <h3 className="text-4xl font-black bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
//                         ONE INCREDIBLE YEAR OF US
//                       </h3>
//                       <span className="text-6xl ml-4 animate-spin">💕</span>
//                     </div>
//                     <p className="text-rose-800 text-2xl font-bold leading-relaxed">
//                       365 days of pure happiness 🌈<br/>
//                       8,760 hours of endless laughter 😂<br/>
//                       525,600 minutes of loving you more each day 💖<br/>
//                       And infinity moments of pure bliss! ✨
//                     </p>
//                   </div>
//                 </div>

//                 {/* Epic Love Letter */}
//                 <div className={`transition-all duration-2000 ${showFinalMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
//                   <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 mb-8 border-4 border-rose-300 shadow-2xl">
//                     <div className="text-center mb-6">
//                       <span className="text-5xl">💌</span>
//                       <h3 className="text-3xl font-bold text-rose-800 mt-2">From Your Soham's Heart</h3>
//                     </div>
//                     <div className="text-rose-800 text-xl font-medium leading-relaxed space-y-4">
//                       <p className="italic">
//                         "My dearest Vaishnavi, my queen, my everything... 👑"
//                       </p>
//                       <p>
//                         Today isn't just your birthday - it's the celebration of the most beautiful soul I've ever known! 
//                         This website is my love letter to you, a digital shrine to our incredible journey together. 💝
//                       </p>
//                       <p>
//                         From the moment you walked into my life, every day became brighter, every laugh became louder, 
//                         and every dream became more beautiful. You're not just my girlfriend - you're my best friend, 
//                         my partner in crime, my favorite person in the entire universe! 🌟
//                       </p>
//                       <p className="font-bold text-2xl text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
//                         I LOVE YOU MORE THAN ALL THE STARS IN THE SKY! ✨⭐🌙
//                       </p>
//                     </div>
//                     <div className="text-right mt-6">
//                       <span className="text-rose-600 font-bold text-xl">
//                         Forever and Always, Your Soham 💕👨‍❤️‍👩
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Love Poetry Section */}
//           {showLovePoetry && (
//             <div className="mb-12 transform transition-all duration-2000">
//               <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-10 text-white text-center shadow-2xl">
//                 <h3 className="text-4xl font-bold mb-8">🎭 A Birthday Poem for My Love 🎭</h3>
//                 <div className="text-2xl font-medium leading-relaxed space-y-3 italic">
//                   <p>"Nineteen candles burning bright, 🕯️</p>
//                   <p>For the girl who makes everything right,</p>
//                   <p>Vaishnavi, my heart, my dream come true, 💭</p>
//                   <p>This whole universe was made for me and you!</p>
//                   <p>One year together, but feels like forever, ♾️</p>
//                   <p>Through every storm, we'll weather together!</p>
//                   <p>Happy Birthday, my beautiful queen, 👑</p>
//                   <p>You're the most magical thing I've ever seen!" ✨</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Interactive Feature Cards */}
//           <div className="grid md:grid-cols-2 gap-10 mb-12">
//             <div 
//               className={`group cursor-pointer ${clickedCard === 'albums' ? 'animate-pulse' : ''}`}
//               onClick={() => handleCardClick('albums')}
//             >
//               <div className="bg-gradient-to-br from-pink-100 via-white to-rose-100 p-10 rounded-3xl border-4 border-pink-300 hover:border-pink-500 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1">
//                 <div className="text-7xl mb-6 group-hover:animate-bounce">📸</div>
//                 <h3 className="text-3xl font-black text-rose-800 mb-4">Our Epic Memory Vault</h3>
//                 <p className="text-rose-600 text-xl leading-relaxed mb-4">
//                   Every selfie, every adventure, every silly moment - this is where our story lives! 
//                   From our first awkward photo to our cutest couple pics! 🥰
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   <span className="bg-pink-300 text-pink-800 px-4 py-2 rounded-full font-bold">📷 Photos</span>
//                   <span className="bg-rose-300 text-rose-800 px-4 py-2 rounded-full font-bold">🎥 Videos</span>
//                   <span className="bg-purple-300 text-purple-800 px-4 py-2 rounded-full font-bold">💭 Stories</span>
//                 </div>
//                 <div className="mt-4 text-pink-600 font-bold">✨ Click me! ✨</div>
//               </div>
//             </div>

//             <div 
//               className={`group cursor-pointer ${clickedCard === 'letters' ? 'animate-pulse' : ''}`}
//               onClick={() => handleCardClick('letters')}
//             >
//               <div className="bg-gradient-to-br from-purple-100 via-white to-pink-100 p-10 rounded-3xl border-4 border-purple-300 hover:border-purple-500 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:-rotate-1">
//                 <div className="text-7xl mb-6 group-hover:animate-bounce">💌</div>
//                 <h3 className="text-3xl font-black text-purple-800 mb-4">Our Love Letters Archive</h3>
//                 <p className="text-purple-600 text-xl leading-relaxed mb-4">
//                   Sweet texts at 3 AM, our inside jokes, song lyrics that remind us of each other, 
//                   and all the "I love you" messages that make my heart skip! 💕
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   <span className="bg-purple-300 text-purple-800 px-4 py-2 rounded-full font-bold">💌 Messages</span>
//                   <span className="bg-pink-300 text-pink-800 px-4 py-2 rounded-full font-bold">🎵 Our Songs</span>
//                   <span className="bg-rose-300 text-rose-800 px-4 py-2 rounded-full font-bold">🤍 Promises</span>
//                 </div>
//                 <div className="mt-4 text-purple-600 font-bold">✨ Click me too! ✨</div>
//               </div>
//             </div>
//           </div>

//           {/* Epic Birthday Stats Dashboard */}
//           <div className="bg-gradient-to-r from-pink-600 via-purple-600 via-rose-600 to-pink-600 rounded-3xl p-12 text-white text-center shadow-2xl">
//             <h3 className="text-5xl font-black mb-8">🎂 VAISHNAVI'S BIRTHDAY DASHBOARD 🎂</h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//               <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-110 transition-all duration-300">
//                 <div className="text-5xl font-black mb-2">19</div>
//                 <div className="text-lg font-bold">Years of Pure Awesome</div>
//                 <div className="text-2xl mt-2">🌟</div>
//               </div>
//               <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-110 transition-all duration-300">
//                 <div className="text-5xl font-black mb-2">365</div>
//                 <div className="text-lg font-bold">Days of Us Being Perfect</div>
//                 <div className="text-2xl mt-2">💕</div>
//               </div>
//               <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-110 transition-all duration-300">
//                 <div className="text-5xl font-black mb-2">∞</div>
//                 <div className="text-lg font-bold">My Love for You</div>
//                 <div className="text-2xl mt-2">💖</div>
//               </div>
//               <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-110 transition-all duration-300">
//                 <div className="text-5xl font-black mb-2">100%</div>
//                 <div className="text-lg font-bold">Happiness Level</div>
//                 <div className="text-2xl mt-2">😍</div>
//               </div>
//             </div>
//             <div className="mt-8 text-2xl font-bold">
//               🎉 BEST GIRLFRIEND IN THE UNIVERSE AWARD GOES TO... VAISHNAVI! 🏆
//             </div>
//           </div>
//         </div>
//       </main>

//       <style jsx>{`
//         @keyframes floatUp {
//           from {
//             transform: translateY(100vh);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           90% {
//             opacity: 1;
//           }
//           to {
//             transform: translateY(-100px);
//             opacity: 0;
//           }
//         }
        
//         @keyframes fadeInOut {
//           0%, 100% { opacity: 0; }
//           50% { opacity: 1; }
//         }
//       `}</style>
//     </>
//   )
// }

// export default Home



// import HeaderDecoration from "./HeaderDecoration.jsx"

// function Home(){
//     return (<>
//         <HeaderDecoration/>
//         <main className="flex-1 relative z-10">
//         {/* Welcome Message for Home Page (when no specific route) */}
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <div className="text-center mb-8">
//             <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-200">
//               <div className="flex justify-center space-x-2 mb-4">
//                 <span className="text-4xl animate-pulse">💕</span>
//                 <span className="text-4xl animate-pulse delay-200">💖</span>
//                 <span className="text-4xl animate-pulse delay-400">💗</span>
//               </div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent mb-4">
//                 Welcome to Our Love Story
//               </h1>
//               <p className="text-rose-700 text-lg font-medium mb-6">
//                 A beautiful space to capture and cherish every precious moment we share together
//               </p>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div  className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-xl border border-pink-200 hover:shadow-md transition-all duration-300">
//                   <div className="text-3xl mb-3">📸</div>
//                   <h3 className="text-xl font-semibold text-rose-800 mb-2">Our Albums</h3>
//                   <p className="text-rose-600">Store photos and notes from our adventures, dates, and special moments</p>
//                 </div>
//                 <div  className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl border border-pink-200 hover:shadow-md transition-all duration-300">
//                   <div className="text-3xl mb-3">💭</div>
//                   <h3 className="text-xl font-semibold text-rose-800 mb-2">Our Thoughts</h3>
//                   <p className="text-rose-600">Capture fleeting thoughts, feelings, and memories in written form</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Router Outlet for other pages */}
//       </main>

//     </>)
// }

// export default Home