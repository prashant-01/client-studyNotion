import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import ReactStars from 'react-stars';
function CourseReviewModal({ setReviewModal }) {
  const modalRef = useRef();
  const { user } = useSelector( (state) => state.profile )
  const { token } = useSelector( (state) => state.auth )
  const { courseEntireData } = useSelector( (state) => state.viewCourse );
  const {
    register ,
    handleSubmit ,
    setValue ,
    getValues ,
    formState : { errors }
  } = useForm();

  const ratingChanged = (newRating) => {
    setValue( "courseRating" , newRating );
  }
  const onSubmit = async (data) => {
    await createRating( {
      courseId : courseEntireData._id ,
      rating : data.courseRating ,
      review : data.courseExperience
    } , token );
    setReviewModal(false);
  }

  const closeModal = (e) => {
    if( modalRef.current === e.target ){
        setReviewModal(false);
    }
}

  useEffect( () => {
    setValue( "courseExperience" , '' );
    setValue( "courseRating" , 0 );
  } , [])
  return (
    <div ref={ modalRef } onClick={ closeModal }
    className='fixed inset-0 flex items-center z-20 justify-center backdrop-blur-sm bg-black bg-opacity-25 text-richblack-300'>
      <div className='bg-richblack-800 rounded-xl'>
        {/* modal header */}
        <div className='flex justify-between  text-xl bg-richblack-700 rounded-t-xl p-3'>
          <p className='text-white'>Add Review</p>
          <button className='hover:text-white'
          onClick={ () => setReviewModal(false) }><RxCross2/></button>
        </div>
        {/* modal body */}
        <div className='flex flex-col p-5'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <img src={user.image} className='w-[50px] h-[50px] rounded-[100%] aspect-square object-cover'/>
            <div className='flex flex-col items-center justify-center gap-2'>
              <p className='text-white'>{user.firstName}{' '}{user.lastName}</p>
              <p>Posting Publicly</p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={ handleSubmit( onSubmit ) } className='mt-4 flex flex-col items-center'>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={34}
              activeColor="#ffd700"
            />
            <div>
              <label htmlFor='courseExperience' className=''>Add your experience<sup className='text-red'>*</sup></label>
              <textarea
              id='courseExperience'
              placeholder='Add Experience'
              className='min-h-[140px] focus:outline-none w-full bg-richblack-700 rounded-md p-2 border-b border-richblack-300  text-richblack-300'
              { ...register ("courseExperience" , { required : true })  }
              />
              {
                errors.courseExperience && (
                  <span className='text-red'>Please add your experience</span>
                )
              }
            </div>

            <div className='flex justify-end gap-4 w-full mt-4 font-semibold'>
              <button type='button' onClick={ () => setReviewModal(false) }
              className='w-full p-2 bg-richblack-300 rounded-md text-richblack-800 cursor-pointer'>Cancel</button>
              <button type='submit' className='w-full text-md p-2 bg-yellow-50 rounded-md text-richblack-800 cursor-pointer'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal