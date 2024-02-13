import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import Loader from '../../../common/Loader';
import InstructorChart from './InstructorChart'
import { Link } from 'react-router-dom';
import { PiHandWaving } from "react-icons/pi";
function InstructorDashboard() {
    const { token } = useSelector( (state) => state.auth );
    const { user } = useSelector( (state) => state.profile );
    const [ loading , setLoading ] = useState(false);
    const [ instructorData , setInstructorData ] = useState([]);
    const [ instructorCourses , setInstructorCourses ] = useState([]);
    useEffect( () => {
        const getInstructorDataWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const courses = await fetchInstructorCourses(token);
            console.log(instructorApiData)
            console.log(courses)
            setLoading(false);
            if( instructorApiData.length ){
                setInstructorData(instructorApiData);
                
            }
            if(courses.instructorCourses.length){
                setInstructorCourses(courses.instructorCourses);
            }
        }
        getInstructorDataWithStats();
    } , [])
    const totalAmountEarned = instructorData.reduce( (acc , curr) => acc + curr.totalAmountEarned , 0);
    const totalStudentsEnrolled = instructorData.reduce( (acc , curr) => acc + curr.totalStudentsEnrolled , 0);
  return (
    <div className='text-white flex items-center justify-center w-full py-10'>
    {
        loading ? <Loader/> : (
            <div>
                <div>
                    <p className='font-bold text-xl flex'>
                        Hi { user.firstName } 
                        <span className='text-yellow-50'><PiHandWaving size={`1.75rem`}/></span>
                    </p>
                    <p className='text-sm'>Let's start something new</p>
                </div>
                <div>
                    {
                        (
                            instructorCourses.length > 0 ? (
                                <div className='mt-4'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <div className='bg-richblack-800 rounded-xl text-xl'>
                                            <InstructorChart courses={ instructorData } totalStudentsEnrolled={totalStudentsEnrolled}/>
                                        </div>
                                        <div className='flex flex-col gap-6 bg-richblack-800  rounded-xl'>
                                            <p className='font-semibold text-xl border-b-[1px] p-4 border-richblack-700'>Statistics</p>
                                            <div className='flex gap-4 p-4'>
                                                <div>
                                                    <p className='font-semibold text-xl'>Total Courses</p>
                                                    <p className='text-lg'>{ instructorCourses.length }</p>
                                                </div>
                                                <div>
                                                    <p className='font-semibold text-xl'>Total Subscriptions</p>
                                                    <p className='text-lg'>{ totalStudentsEnrolled }</p>
                                                </div>
                                            </div>
                                            <div className='p-4'>
                                                <p className='font-semibold text-xl'>Total Income</p>
                                                <p className='text-lg'>Rs. { totalAmountEarned }</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* instructor courses */}
                                    <div className='bg-richblack-800 rounded-xl p-4 mt-3'>
                                        <div className='flex justify-between'>
                                            <p className='font-semibold'>Your Courses</p>
                                            <Link to={`/dashboard/my-courses`} className='text-yellow-50 text-sm'>View all</Link>
                                        </div>
                                        <div className='flex gap-4'>
                                            {
                                                instructorCourses.slice(0 , 3).map( (course) => (
                                                    <div key={ course._id } className='flex flex-col gap-2'>
                                                        <img src={ course.thumbnail } 
                                                        className='w-[220px] h-[150px] rounded-lg object-cover aspect-square'/>
                                                        <div >
                                                            <p>{ course.courseName }</p>
                                                            <div className='flex gap-2 text-sm text-richblack-300'>
                                                                <p>{ course.studentsEnrolled.length + ' '}student(s){ ' ' }</p>
                                                                <p>|</p>
                                                                <p>Rs. { course.price }</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) 
                            : (
                                <div className='bg-richblack-800 rounded-xl p-4 mt-6'>
                                    <p className='font-semibold text-lg'>You have not created any courses yet!</p>
                                    <Link to={`/dashboard/addCourse`} className='text-yellow-50'>
                                        Create Course
                                    </Link>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
        
    </div>
  )
}

export default InstructorDashboard