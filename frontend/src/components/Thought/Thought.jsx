import React from 'react'
import { useParams } from 'react-router'

function Thought() {
  const {thoughtId} = useParams();
  return (
    <div>
      Single Thought Component of thoughtId : {thoughtId}
    </div>
  )
}

export default Thought
