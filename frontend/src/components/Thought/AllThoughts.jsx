
import React, { useState, useEffect } from 'react'
import { fetchAllThoughts } from "../../utils/fetch.utils.js"

import ThoughtCard from "./ThoughtCard.jsx"
import AddThought from "./AddThought.jsx"

function AllThoughts() {
  const [allThoughts, setAllThoughts] = useState(false)

  useEffect(() => {
    const fetchThoughts = async () => {
      const fetchedThoughts = await fetchAllThoughts()
      if (fetchedThoughts) {
        setAllThoughts(fetchedThoughts)
      } else {
        console.log("Couldn't fetch thoughts")
      }
    }
    fetchThoughts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
            💭 All Our Thoughts 💕
          </h1>
          <p className="text-rose-500 text-lg font-medium">
            Every precious thought we've shared ✨
          </p>
        </div>

        <div className="mb-8">
          <AddThought />
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-6">
          {allThoughts && allThoughts.data && allThoughts.data.length !== 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allThoughts.data.map((thought) => (
                <ThoughtCard
                  key={thought._id}
                  thoughtId={thought.thoughtId}
                  title={thought.title}
                  createdBy={thought.createdBy?.username || "Unknown"} // ✅ FIX
                  createdAt={thought.createdAt}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💭</div>
              <p className="text-rose-400 text-xl font-medium mb-2">
                Couldn't load all thoughts
              </p>
              <p className="text-pink-400">
                Our precious memories are taking a moment to appear 💕
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllThoughts


/*
import React,{useState,useEffect} from 'react'
import {fetchAllThoughts} from "../../utils/fetch.utils.js"

//components
import ThoughtCard from "./ThoughtCard.jsx"
import AddThought from "./AddThought.jsx"

function AllThoughts() {
  const [allThoughts,setAllThoughts]=useState(false);

  useEffect(()=>{
    const fetchThoughts=async()=>{
      const fetchedThoughts = await fetchAllThoughts();
      if(fetchedThoughts){
        setAllThoughts(fetchedThoughts);
      } else {
        console.log("Couldn't fetch thoughts");
      }
    }
    fetchThoughts();
  },[])

  return (
    <div>
      All Thoughts Component
        <AddThought/>
        {allThoughts && allThoughts.data && allThoughts.data.length!=0 ? (
          <>
            {
              allThoughts.data.map((thought)=>{
                return <ThoughtCard thoughtId={thought.thoughtId} title={thought.title} createdBy={thought.createdBy.username} createdAt={thought.createdAt}/> 
              })}
          </>
        ):(
          <p>Couldn't load all thoughts</p>
        )}
    </div>
  )
}

export default AllThoughts
*/