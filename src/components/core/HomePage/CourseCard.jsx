import React from 'react'
import { ImTree } from "react-icons/im";
import { HiMiniUsers } from "react-icons/hi2";

function CourseCard( { index , cardData , currentCard , setCurrentCard } ) {
  return (
    <div className={` flex flex-col justify-between gap-4 text-richblack-400 cursor-pointer font-inter lg:min-w-[400px]
    ${ currentCard === cardData.heading ? 
    'bg-white shadow-[12px_12px_rgba(255,_214,_10,_1)]' : 
    'bg-richblack-800' } 
    ${ index === 2 ? 'absolute top-10' : '' }`}
    onClick = { () => setCurrentCard( cardData.heading ) }
    >
        <div className=' flex flex-col gap-4 p-6'>
            <div className={ ` ${ currentCard === cardData.heading ? 'text-richblack-800' : 'text-white' } font-semibold` }>
              {
                cardData.heading
              }
            </div>
            <div className='text-sm'>
              {
                cardData.description
              }
            </div>
        </div>
        <div className='flex justify-between items-center border-t border-dashed p-4'>
              <div className='flex items-center justify-center gap-2 font-semibold text-blue-500'>
                <HiMiniUsers/>
                <p>Beginner</p>
              </div>
              <div className='flex items-center justify-center gap-2 font-semibold text-blue-500'>
                <ImTree/>
                <p>6 Lessons</p>
              </div>
        </div>
    </div>
  )
}

export default CourseCard