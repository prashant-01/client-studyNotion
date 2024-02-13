import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
import { FaRupeeSign } from 'react-icons/fa';
function CourseCard({ course , Height }) {
  const [ avgReviewCount , setAvgReviewCount ] = useState(0);

  useEffect( () => {
    const count = GetAvgRating( course.ratingAndReviews );
    setAvgReviewCount(count);
    
  } , [course])
  console.log(course)
  return (
    <div className='text-white'>
      {
        course && (
          <Link to={`/courses/${course._id}`}>
            <div className='flex flex-col gap-4'>
              <div>
                <img 
                  src={ course.thumbnail }
                  className={`${Height} w-full rounded-xl object-cover`}
                />
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <p><span className='text-richblack-300'>Course Name - </span> { course.courseName }</p>
                <p><span className='text-richblack-300'>Instructor Name - </span> { course.instructor.firstName } { course.instructor.lastName }</p>
                <div>
                  <span className='flex gap-x-3 items-center'>
                  <span className='text-richblack-300'>Average Rating - </span>{ avgReviewCount || 0 }
                    <RatingStars Review_Count={ avgReviewCount } Star_Size={ 23 }/>
                  </span>
                  <span><span className='text-richblack-300'>Total Reviews - </span>{ course.ratingAndReviews.length }</span>
                </div>
                <p className='flex items-center'><span className='text-richblack-300'>Course Price - </span><FaRupeeSign/>{ course.price }</p>
              </div>
            </div>
          </Link>
        )
      }
    </div>
  )
}

export default CourseCard