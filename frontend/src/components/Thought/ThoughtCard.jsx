import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router"

function ThoughtCard({ thoughtId, title, createdBy, createdAt }) {
  const navigate = useNavigate();
  
  function visitThought(thoughtId) {
    navigate("/thoughts/" + thoughtId)
  }
  
  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-pink-200 hover:border-pink-300 transform hover:scale-105 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl">💭</div>
          <div className="text-xs text-rose-400 font-medium bg-pink-100 px-2 py-1 rounded-full">
            Thought
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-rose-700 mb-1">
              💖 {title}
            </h3>
          </div>
          
          <div className="text-sm text-pink-600 space-y-1">
            <div className="flex items-center">
              <span className="font-medium text-rose-600">ID:</span>
              <span className="ml-2 font-mono text-xs bg-pink-100 px-2 py-1 rounded">
                {thoughtId}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-rose-600">💕 By:</span>
              <span className="ml-2 text-pink-700 font-medium">
                {createdBy}
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-rose-600">✨ Created:</span>
              <span className="ml-2 text-pink-700">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => visitThought(thoughtId)}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          💫 Explore This Thought
        </button>
      </div>
      
      <div className="h-1 bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300"></div>
    </div>
  )
}

export default ThoughtCard

// import React, { useState, useEffect } from 'react'
// import { useNavigate } from "react-router"

// function ThoughtCard({ thoughtId, title, createdBy, createdAt }) {
//   const navigate = useNavigate();

//   function visitThought(thoughtId) {
//     navigate("/thoughts/" + thoughtId)
//   }

//   return (
//     <>
//       <p>--------------------</p>
//       <p>Thought Card</p>
//       <p>title : {title}</p>
//       <p>thoughtId : {thoughtId}</p>
//       <p>createdBy : {createdBy}</p>
//       <p>createdAt : {createdAt}</p>
//       <button onClick={() => visitThought(thoughtId)}>
//         Go to this thought</button>
//       <p>--------------------</p>
//     </>
//   )
// }

// export default ThoughtCard
