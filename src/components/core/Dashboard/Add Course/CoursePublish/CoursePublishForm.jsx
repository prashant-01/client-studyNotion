import React, { useEffect } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { updateCourseStatus  } from '../../../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';

function CoursePublishForm({ loading , setLoading }) {
    const {
      register , 
      handleSubmit ,
      setValue ,
      getValues ,
      formState : { errors }
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { course } = useSelector( (state) => state.course );
    const { token } = useSelector( (state) => state.auth );
    const goToBack = () => {
      dispatch( setStep( 2 ) );
    }
    const checkKeyDown = (e) => {
      if (e.key === 'Enter') e.preventDefault();
    }
    const goToCourses = () => {
      dispatch( resetCourseState() );
      navigate('/dashboard/my-courses');
    }
    const handleCoursePublish = async () => {
      if( course.status === 'Published' && getValues('public') === true || 
      course.status === 'Draft' && getValues('public') === false ){
        // it means course is not updated or it is already published
        // in this case do not publish course instead show My Courses and reset the course state
        goToCourses();
        return;
      }
      // if form is updated
      const formData = new FormData();
      formData.append('courseId' , course._id);
      formData.append('status' , getValues('public') ? 'Published' : 'Draft' );
      setLoading(true);
      const result = await updateCourseStatus( formData , token );
      if(result){
        toast.success('Your Course is Published!!')
        goToCourses();
      }
      setLoading(false);
    }


    const onSubmit = async(data) => {
      console.log(data.public)
      handleCoursePublish();
    }


    useEffect(() => {
      console.log(course.status)
      if( course.status === 'Published'  ){
        setValue('public' , true);
        console.log(getValues('public'))
      }
    } , [])
  return (
    <div className='text-white bg-richblack-800 rounded-md p-4 w-full'>
        <p className='text-xl mb-4'>Course Publish</p>
        <form onSubmit={ handleSubmit( onSubmit ) } onKeyDown={ (e) => checkKeyDown(e) }>
          <div>
            <label htmlFor='public' className='flex gap-x-2 items-center '>
              <input 
                type='checkbox'
                id='public'
                { ...register('public') }
                className='rounded-md h-4 w-4'
              />
              <span>Make this course public</span> 
            </label>
          </div>
          <div className='flex gap-2 justify-end text-sm font-semibold mt-4'>
            <button 
            type='button'
            disabled={ loading }
            className='flex gap-1 p-2 items-center justify-center rounded-md bg-richblack-300 text-richblack-800'
            onClick={ () => goToBack() }
            >
              <IoIosArrowBack/>
              Back
            </button>
            <button 
            type='submit'
            disabled={ loading }
            className='flex gap-1 items-center justify-center p-2 rounded-md bg-yellow-50 text-richblack-800'>
              { loading ? "Publishing..." : "Publish" }
              <IoIosArrowForward/>
            </button>
          </div>
        </form>
    </div>
  )
}

export default CoursePublishForm