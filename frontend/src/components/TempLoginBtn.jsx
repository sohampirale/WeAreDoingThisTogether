import React from 'react'

import { tempLogin } from '../utils/tempLogin.js'

function TempLoginBtn() {
  return (
    <button onClick={tempLogin}>Login</button>
  )
}

export default TempLoginBtn