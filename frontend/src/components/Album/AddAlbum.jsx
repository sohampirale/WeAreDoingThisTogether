import React,{useState,useRef} from 'react'

import {createNewAlbum} from "../../utils/createNewAlbum.js"

function AddAlbum({helperFetch}) {
    const [click,setClick] =useState(false);
    const [albumTitle,setAlbumTitle]= useState("")
    const albumTitleRef = useRef();

    return (
        <div className="mb-8">
            {!click && (
                <div className="text-center">
                    <button 
                        onClick={()=>setClick(prev=>!prev)}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-3 mx-auto"
                    >
                        <span className="text-2xl">✨</span>
                        <span className="text-lg">Create New Album</span>
                        <span className="text-2xl">📸</span>
                    </button>
                    <p className="text-rose-600 mt-3 font-medium">
                        Start a new chapter of our story
                    </p>
                </div>
            )}
            
            {click && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-200 max-w-md mx-auto">
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="flex justify-center space-x-2 mb-3">
                            <span className="text-3xl animate-pulse">💕</span>
                            <span className="text-3xl animate-pulse delay-200">📸</span>
                            <span className="text-3xl animate-pulse delay-400">💖</span>
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                            Create New Album
                        </h3>
                        <p className="text-rose-600">
                            Give your precious memories a beautiful home
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-rose-700 font-semibold mb-2">
                                Album Name
                            </label>
                            <input 
                                type="text"  
                                onChange={(e)=>{
                                    setAlbumTitle(e.target.value)
                                }} 
                                placeholder="e.g., Our Paris Adventure, Date Night Memories..." 
                                ref={albumTitleRef} 
                                value={albumTitle}
                                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm placeholder-rose-400"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4">
                            <button 
                                onClick={async()=>{
                                    await createNewAlbum(albumTitle);
                                    setClick(prev=>!prev);
                                    
                                    setTimeout(()=>{
                                        console.log("Calling helperFetch from AddAlbum.jsx");
                                        
                                        helperFetch()
                                    },1000)
                                }}
                                disabled={!albumTitle.trim()}
                                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2"
                            >
                                <span>Create Album</span>
                                <span className="text-lg">💖</span>
                            </button>
                            
                            <button 
                                onClick={()=>setClick(prev=>!prev)}
                                className="px-6 py-3 border-2 border-pink-300 text-rose-600 font-semibold rounded-xl hover:bg-pink-50 transition-all duration-300 transform hover:scale-105"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-pink-200">
                        <span className="text-pink-300 text-sm">💕</span>
                        <span className="text-rose-400 text-xs font-medium">Made with love</span>
                        <span className="text-pink-300 text-sm">💕</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddAlbum

// import React,{useState,useRef} from 'react'

// import {createNewAlbum} from "../../utils/createNewAlbum.js"

// function AddAlbum() {
//     const [click,setClick] =useState(false);
//     const [albumTitle,setAlbumTitle]= useState("")
//     const albumTitleRef = useRef();

//     return (
//         <>
//             {!click && (
//                 <button onClick={()=>setClick(prev=>!prev)}>Create new Album</button>
//             )}     
//             {click && (
//                 <>
//                     <input type="text"  onChange={(e)=>{
//                         setAlbumTitle(e.target.value)
//                     }} placeholder="Enter name for New album" ref={albumTitleRef} value={albumTitle}/>
//                     <button onClick={async()=>{
//                         await createNewAlbum(albumTitle);
//                         setClick(prev=>!prev);

//                         setTimeout(()=>{
//                             window.location.reload();
//                         },1000)
//                     }}>Create Album</button>
//                 </>
//             )}
//         </>
//     )
// }

// export default AddAlbum