import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router"

function ThoughtCard({ thoughtId, title, createdBy, createdAt }) {
  const navigate = useNavigate();

  function visitThought(thoughtId) {
    navigate("/thoughts/" + thoughtId)
  }

  return (
    <>
      <p>--------------------</p>
      <p>Thought Card</p>
      <p>title : {title}</p>
      <p>thoughtId : {thoughtId}</p>
      <p>createdBy : {createdBy}</p>
      <p>createdAt : {createdAt}</p>
      <button onClick={() => visitThought(thoughtId)}>
        Go to this thought</button>
      <p>--------------------</p>
    </>
  )
}

export default ThoughtCard
