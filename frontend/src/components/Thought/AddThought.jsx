import React,{useState,useRef} from 'react'

//utils
import {createNewThought} from "../../utils/createNewThought.js"

function AddThought({helperFetch}) {
    const [click,setClick] =useState(false);
    const [thoughtTitle,setThoughtTitle]= useState("")
    const thoughtTitleRef = useRef();

  return (
    <div className="mb-8">
        {!click && (
            <div className="text-center">
                <button 
                    onClick={() => setClick(prev=>!prev)}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
                >
                    💭 Create New Thought ✨
                </button>
                <p className="text-rose-400 mt-2 text-sm">
                    Share what's on your heart 💕
                </p>
            </div>
        )}     

        {click && (
            <div className="max-w-md mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200 p-8">
                    <div className="text-center mb-6">
                        <div className="text-4xl mb-2">💭</div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            New Thought
                        </h2>
                        <p className="text-rose-500 text-sm mt-1">
                            Capture this precious moment 💖
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-rose-700 font-medium mb-2">
                                💝 Thought Title
                            </label>
                            <input 
                                type="text"
                                onChange={(e) => setThoughtTitle(e.target.value)} 
                                placeholder="What's on your mind, love? 💕" 
                                ref={thoughtTitleRef} 
                                value={thoughtTitle}
                                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 bg-pink-50/50 placeholder-pink-400 text-rose-800"
                            />
                        </div>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={async () => {
                                    await createNewThought(thoughtTitle)
                                    setClick(prev=>!prev);
                                    setTimeout(()=>{
                                        helperFetch();
                                    },1000)
                                }}
                                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                ✨ Create Thought
                            </button>
                            
                            <button 
                                onClick={() => setClick(prev=>!prev)}
                                className="px-4 py-3 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300 font-medium"
                            >
                                💔 Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default AddThought

// import React,{useState,useRef} from 'react'

// //utils
// import {createNewThought} from "../../utils/createNewThought.js"
// function AddThought() {

//     const [click,setClick] =useState(false);
//     const [thoughtTitle,setThoughtTitle]= useState("")
//     const thoughtTitleRef = useRef();

//   return (
//     <>
//         {!click && (
//             <button onClick={()=>setClick(prev=>!prev)}>Create new Thought</button>
//         )}     

//         {click && (
//             <>
//                 <input type="text"  onChange={(e)=>{
//                     setThoughtTitle(e.target.value)
//                 }} placeholder="Enter name for New Thought" ref={thoughtTitleRef} value={thoughtTitle}/>
                
//                 <button onClick={async()=>{
//                     await createNewThought(thoughtTitle)
//                     setClick(prev=>!prev);
//                     setTimeout(()=>{
//                         window.location.reload();
//                     },1000)
//                 }}>Create Album</button>
//             </>
//         )}
//     </>
//   )
// }

// export default AddThought