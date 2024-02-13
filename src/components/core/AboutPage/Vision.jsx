import React from 'react'
import HighlightText from '../HomePage/HighlightText'

function Vision( { title , description , index } ) {
  return (
    <div className='flex flex-col gap-6 w-[500px]'>
        {
            index === 1 ? (
        <p className='text-3xl font-bold'> 
            <span className={`font-bold 
                bg-gradient-to-br from-from2 to-to2
                text-transparent bg-clip-text`}>
                    { title }
            </span> 
        </p>) : (<p className='text-3xl font-bold'> <HighlightText text={ title }/></p>)
        }
        <p className='text-richblack-300 italic text-sm'>{ description }</p>
    </div>
  )
}

export default Vision