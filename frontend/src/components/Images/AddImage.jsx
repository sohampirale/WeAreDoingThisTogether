import React,{useState,useRef} from 'react'
import {addNewImagesToAlbum}  from "../../utils/addNewImagesToAlbum.js"

function AddImage({albumId}) {
  const [click,setClick] = useState(false);
  const [note,setNote] = useState("");
  const fileInputRef = useRef();
  if(!albumId){
    return <p>thoughtId or albumId is needed</p>;
  }
  

  return (
    <>
      {!click && (<button onClick={()=>setClick(prev=>!prev)}>Add Images</button>)}

      {click && (
        <div>
          <input type="file" multiple  ref={fileInputRef}/>
          <button onClick={async()=>{
            const files=Array.from(fileInputRef.current.files);
            await addNewImagesToAlbum(files,albumId);            
            setClick(prev=>!prev);
            setTimeout(()=>{
              window.location.reload();
            },1000)
          }}>Add Images</button>
        </div>
      )}

    </>
  )
}

export default AddImage
