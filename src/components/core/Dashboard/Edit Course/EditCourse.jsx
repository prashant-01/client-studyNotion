import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../Add Course/RenderSteps';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { fetchCourseDetails } from '../../../../services/operations/courseDetailsAPI';
import Loader from '../../../common/Loader';

function EditCourse() {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { token } = useSelector( (state) => state.auth );
    const { course } = useSelector( (state) => state.course );
    const [ loading , setLoading ] = useState(false);

    

    useEffect( () => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await fetchCourseDetails( courseId , token );
            console.log(result)
            if(result){
                dispatch( setEditCourse(true) );
                dispatch( setCourse( result ) );
            }
            setLoading(false);
        }
        populateCourseDetails();
    } , [])
  return (
    <div className='text-white w-full max-auto flex flex-col'>
        <p className='text-3xl font-bold text-white mb-5 mx-auto'>Edit Course</p>
        <div className='flex flex-col items-center justify-center'>
            {
                loading ? <div><Loader/></div>   
                : course ? <div className='w-[700px]'>
                    <RenderSteps loading={loading} setLoading={ setLoading }/>
                </div> : <p>Course Not Found</p>
            }
        </div>
    </div>
  )
}

export default EditCourse