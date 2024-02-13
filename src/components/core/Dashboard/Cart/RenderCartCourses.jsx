import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
import RatingStars from '../../../common/RatingStars';
import { FaRupeeSign } from 'react-icons/fa';
function RenderCartCourses() {
  const dispatch = useDispatch();
  const { cart } = useSelector( (state) =>state.cart );
  const { token } = useSelector( (state) => state.auth )

  const handleRemoveFromCart = (course) => {
    if( token ){
      dispatch( removeFromCart(course) );
      return;
    }
  }
  return (
    <div className='flex flex-col gap-6 '>
      {
        cart.map((course , index) => (
          <div key={index} className={`bg-richblack-800 p-4 rounded-xl border-b border-richblack-600`}>
            <div className='flex gap-8'>
              <div className='flex gap-2'>
                <img src={ course.thumbnail } 
                className='w-[185px] h-[148px] aspect-square object-cover rounded-md' />
                <div className='w-[200px] text-wrap '>
                  <p>{ course.courseName }</p>
                  <p className='text-richblack-300 text-sm'>{ course.courseDescription }</p>
                  <div className='flex'>
                    <RatingStars
                      Review_Count = { course.avgReviewCount }
                      />
                      <span> { course.ratingAndReviews.length } Ratings </span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center p-4 border-l border-richblack-700'>
                <div onClick={() => handleRemoveFromCart(course) } 
                className='flex gap-2 items-center cursor-pointer text-yellow-50 text-lg'>
                  <RiDeleteBin6Line size={`1.75rem`}/>
                  <span className=''>Remove</span>
                </div>
                <p className='flex items-center text-xl text-caribbeangreen-200'><FaRupeeSign/>{ course.price }</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses