import React,{useState} from 'react'

function AddImages({albumId}) {
  const [click,setClick] = useState(false);
  const [note,setNote] = useState("");
  if(!albumId){
    return <p>thoughtId or albumId is needed</p>;
  }

  // const addHelper=addImagesInAlbum
  
  return (
    <>
      {!click && (<button onClick={()=>setClick(prev=>!prev)}>Add Images</button>)}

      {click && (
        <div>
          <input type="file" multiple/>
          <button onClick={async()=>{
            // await 
            setClick(prev=>!prev);
            window.location.reload();
          }}>Add Images</button>
        </div>
      )}

    </>
  )
}

export default AddImages
