import React from 'react'
import '../../App.css'
function Spinner() {
  return (
    <span className='loader fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-20 text-white 
    flex flex-col items-center justify-center'></span>
  )
}

export default Spinner