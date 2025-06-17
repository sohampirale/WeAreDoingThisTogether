import React,{useState,useRef} from 'react'

import {createNewAlbum} from "../../utils/createNewAlbum.js"

function AddAlbum() {
    const [click,setClick] =useState(false);
    const [albumTitle,setAlbumTitle]= useState("")
    const albumTitleRef = useRef();

    return (
        <>
            {!click && (
                <button onClick={()=>setClick(prev=>!prev)}>Create new Album</button>
            )}     
            {click && (
                <>
                    <input type="text"  onChange={(e)=>{
                        setAlbumTitle(e.target.value)
                    }} placeholder="Enter name for New album" ref={albumTitleRef} value={albumTitle}/>
                    <button onClick={async()=>{
                        await createNewAlbum(albumTitle);
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

export default AddAlbum