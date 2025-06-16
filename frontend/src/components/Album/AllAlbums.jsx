import React from 'react'
import { Outlet } from 'react-router'
import Album from './Album'
import AlbumCard from './AlbumCard.jsx'

function AllAlbums({allAlbums}) {
  return (
    <>
      All Albums component - Going to render all Albums
      {allAlbums.map(album=>{
        return (
          <AlbumCard albumId={album.albumId} title={album.title} thumbnail={album.thumbnail} createdAt={album.createdAt}/>
        )
      })}
    </>
  )
}

export default AllAlbums
