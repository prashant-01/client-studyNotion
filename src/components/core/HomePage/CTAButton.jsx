import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton( { children , active , linkTo } ) {
  return (
    <Link to={`${ linkTo }`}>
      <div className={ `text-center text-[13px] px-6 py-3 rounded-md font-bold 
        ${ active ? 'bg-yellow-50 text-black shadow-[2px_2px_rgba(255,255,255,0.9)]' : 
        'bg-richblack-800 text-richblack-50 shadow-[2px_2px_rgba(255,255,255,0.2)]' }
        hover:scale-95 transition-all duration-200` }>
          { children }
      </div>
    </Link>
  )
}

export default CTAButton