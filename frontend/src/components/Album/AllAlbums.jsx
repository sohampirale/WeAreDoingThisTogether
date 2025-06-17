import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Album from './Album'
import AlbumCard from './AlbumCard.jsx'
import AddAlbum from "./AddAlbum.jsx"

//utils
import { fetchAllAlbums } from "../../utils/fetch.utils.js"

function AllAlbums() {

  const [allAlbums, setAllAlbums] = useState(false)

  useEffect(() => {
    const fetchAlbums = async () => {
      const fetchedAllAlbums = await fetchAllAlbums();
      if (fetchedAllAlbums) {
        setAllAlbums(fetchedAllAlbums);
        setTimeout(() => {
          // window.location.reload();
        }, 2000)
      } else {
        console.log("COuldn't fetch all albums");
      }
    }
    fetchAlbums();
  }, [])

  return (
    <>
      <AddAlbum />
      All Albums component - Going to render all Albums
      {allAlbums && allAlbums.length != 0 ? (allAlbums.data.map(album => {
        return (
          <>
            <p>-------------------</p>
            <AlbumCard albumId={album.albumId} title={album.title} thumbnail={album.thumbnail} createdAt={album.createdAt} />
            <p>-------------------</p>
          </>
        )
      })) : (
        <p>Couldn't fetch all albums</p>
      )}
    </>
  )
}

export default AllAlbums
