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
