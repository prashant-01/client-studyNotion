import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdAddCircleOutline } from "react-icons/md";
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import CourseTable from '../CourseTable';
import Loader from '../../../common/Loader'
function MyCourses() {
    const { token } = useSelector( (state) => state.auth );
    const [ myCourses , setMyCourses ] = useState(null);
    const [ loading , setLoading ] = useState(false);
    const getCourses = async () => {
        setLoading(true)
        try{
            const result = await fetchInstructorCourses( token );
            console.log(result)
            if( result ){
                setMyCourses( result );
            }
        }catch(error){
            console.log('Unable to get the courses')
        }
        setLoading(false)
    }
    useEffect(() => {
        getCourses();
    } , []);
  return (
    <div className='mx-auto px-32 w-full'>
        {
            loading ? <div className='flex items-center justify-center'><Loader/></div>
            : (
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-between w-full mb-10 mt-5'>
                        <div className='text-3xl font-bold text-white '>My Courses</div>
                        <Link to={ `/dashboard/add-course` } className=' flex gap-2 font-semibold items-center bg-yellow-50 rounded-[8px] text-richblack-800 px-[12px] py-[8px]'>
                            <MdAddCircleOutline size={`1.75rem`}/>
                            New Course
                        </Link>
                    </div>
                    { 
                        myCourses && <CourseTable 
                        courses={ myCourses.instructorCourses } 
                        totalDuration={ myCourses.totalDuration } 
                        setCourses={ setMyCourses } /> 
                    }
                </div>
            )
        }
    </div>
  )
}

export default MyCourses