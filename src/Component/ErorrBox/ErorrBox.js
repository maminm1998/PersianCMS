import React from 'react'
import './ErorrBox.css'
export default function ErorrBox({msg}) {
  return (
    <div className='cms-emptu-error'>
        <h1>{msg}</h1>
    </div>
  )
}
