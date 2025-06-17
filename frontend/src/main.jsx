import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom"

//components
import App from './App.jsx'
import AllAlbums from './components/Album/AllAlbums.jsx'
import Album from './components/Album/Album.jsx'
import AllThoughts from './components/Thought/AllThoughts.jsx'
import Thought from './components/Thought/Thought.jsx'

const allAlbums=[
  {
    title:"Album1",
    albumId:"1234",
    thumbnail:"thumbnail1.com",
    createdAt:Date.now()-20000
  },{
    title:"Album2",
    albumId:"5678",
    thumbnail:"thumbnail2.com",
    createdAt:Date.now()-10000
  }
]


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App/>}>
    <Route path="albums" element={<AllAlbums allAlbums={allAlbums}/>} />
    <Route path="albums/:albumId" element={<Album />} /> 
  
    <Route path="thoughts"  element={<AllThoughts/>}/>
    <Route path="thoughts/:thoughtId" element={<Thought />} />
   
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

