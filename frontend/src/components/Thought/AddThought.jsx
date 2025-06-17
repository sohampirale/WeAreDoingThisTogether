import React,{useState,useRef} from 'react'

//utils
import {createNewThought} from "../../utils/createNewThought.js"
function AddThought() {

    const [click,setClick] =useState(false);
    const [thoughtTitle,setThoughtTitle]= useState("")
    const thoughtTitleRef = useRef();

  return (
    <>
        {!click && (
            <button onClick={()=>setClick(prev=>!prev)}>Create new Thought</button>
        )}     

        {click && (
            <>
                <input type="text"  onChange={(e)=>{
                    setThoughtTitle(e.target.value)
                }} placeholder="Enter name for New Thought" ref={thoughtTitleRef} value={thoughtTitle}/>
                
                <button onClick={async()=>{
                    await createNewThought(thoughtTitle)
                    setClick(prev=>!prev);
                    setTimeout(()=>{
                        window.location.reload();
                    },1000)
                }}>Create Album</button>
            </>
        )}
    </>
  )
}

export default AddThought