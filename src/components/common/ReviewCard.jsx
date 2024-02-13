import React from 'react'
import RatingStars from './RatingStars'

function ReviewCard({ review }) {
  return (
    <div className='flex flex-col justify-evenly text-richblack-100 px-4 py-2 rounded-md bg-richblack-800 min-h-[200px]'>
        <div className='flex items-center gap-4'>
            <img src={ review.user.image } 
            className='w-[48px] h-[48px] rounded-[100%] aspect-square object-cover'/>
            <div className='flex flex-col gap-1'>
                <p>{ review.user.firstName }{' '}{ review.user.lastName }</p>
                <p className='text-richblack-500 text-sm'>{ review.user.email }</p>
            </div>
        </div>
        <div className='text-sm '>Course Name - { review.course.courseName }</div>
        <div className='text-wrap italic text-white mt-4'>{ review.review }</div>
        <div className='flex items-center gap-2'>
            <span>{ review.rating }</span>
            <span><RatingStars Review_Count={ review.rating }/></span>
        </div>
    </div>
  )
}

export default ReviewCard