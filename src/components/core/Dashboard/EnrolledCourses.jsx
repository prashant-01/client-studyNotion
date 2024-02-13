import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import Loader from '../../common/Loader'
import { markCourseComplete } from '../../../services/operations/courseDetailsAPI';
import { setCompletedLectures } from '../../../slices/viewCourseSlice';
function EnrolledCourses() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector( (state) => state.auth );
    const [ enrolledCourses , setEnrolledCourses ] = useState(null);
    const [ loading , setLoading ] = useState(false); 
    const [ progressFlag , setProgressFlag ] = useState(false);
    const handleMarkComplete = async (courseId) => {
        setLoading(true)
        const result = await markCourseComplete(courseId , token);
        if(result){
            // pushing all subSections/videos in the completedVideos 
            dispatch( setCompletedLectures( result ) );
            setProgressFlag(!progressFlag);
            // updating course with progressPercentage = 100%
        }
        else{
            console.log('Error in fetching completed subsections ');
        }
        setLoading(false)
    }

    const getEnrolledCourses = async () => {
        try{
            const response = await getUserEnrolledCourses( token , navigate , dispatch);
            console.log(response);
            setEnrolledCourses( response );
        }catch(error){
            console.log('Unable to get the courses')
        }
    }
    useEffect(() => {
        getEnrolledCourses();
    } , [progressFlag]);
  return (
    <div className='mx-auto w-full'>
        {
            !enrolledCourses ? ( <div className='flex items-center justify-center'><Loader/></div> ) 
            : (
                <div className='relative flex flex-col gap-8 items-center justify-center text-richblack-25 font-inter mx-auto pb-[100px] '>
                    <div className='text-3xl font-bold text-white'>Enrolled Courses</div>
                    {
                        enrolledCourses.length === 0 ? (<p className=''>You have not enrolled in any course yet</p>)
                        : (
                        <div className='grid grid-rows-[20px_minmax(min-content , 1fr)] gap-2 border border-richblack-700'>
                            <div className='grid grid-cols-[350px_200px_200px_100px] gap-4 bg-richblack-700 p-4'>
                                <p className='flex items-center justify-center'>Course Name</p>
                                <p className='flex items-center justify-center'>Duration</p>
                                <p className='flex items-center justify-center'>Progress</p>
                            </div>
                            {/* Enrolled Course Cards */}
                            <div>
                                {
                                    enrolledCourses.map( ( course , index ) => (
                                        <div key={ index } className={`grid grid-cols-[350px_200px_200px_100px] gap-2 mb-2 px-5 py-3 ${ index < enrolledCourses.length-1 && `border-b border-richblack-700`   }`}>
                                            <div onClick={ () => {
                                                navigate(`/view-course/${course.courseDetail._id}/section/${course.courseDetail.courseContent[0]._id}/subSection/${course.courseDetail.courseContent[0].subSection[0]._id}`)
                                            } }
                                            className='flex items-center gap-2 cursor-pointer'>
                                                <img src={ course.courseDetail.thumbnail } className='h-[100px] w-[100px] rounded-md aspect-square object-cover'/>
                                                <div className='flex flex-col '>
                                                    <p className='font-semibold'>{ course.courseDetail.courseName }</p>
                                                    <p className='text-sm text-richblack-500 italic text-wrap'>
                                                        {/* {course.courseDescription} */}
                                                        {course.courseDetail.courseDescription.substring(0, 80)} {course.courseDetail.courseDescription.length >= 20 && '...'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-center'>{ course.courseDetail.totalDuration } mins</div>
                                            <div className='flex flex-col gap-4 justify-center'>
                                                <p className=''>Progress : <span className='text-yellow-50'>{ course.progressPercentage || 0 }%</span></p>
                                                <div>
                                                    <ProgressBar completed={ parseFloat(course.progressPercentage) || 0 }
                                                        height='8px'
                                                        isLabelVisible={ false }
                                                        bgColor	= '#FFD60A'
                                                    />
                                                </div>
                                            </div>
                                            <div className='group relative text-richblack-300 flex items-center justify-center cursor-pointer'>
                                                <div className='invisible group-hover:visible flex flex-col absolute left-2 top-10
                                                    bg-richblack-700 min-w-max cursor-pointer rounded-md text-richblack-300 z-10'>
                                                    <p className='flex  items-center gap-x-2 py-2 px-4 text-sm hover:text-richblack-5'
                                                    onClick={ () => handleMarkComplete(course._id) }>
                                                        <HiOutlineDocumentCheck size={`1rem`} />
                                                        mark as completed
                                                    </p>
                                                    <p className='flex w-full items-center gap-x-2 py-2 px-4 text-sm hover:text-richblack-5'>
                                                        <RiDeleteBin6Line size={`1rem`}/>
                                                        remove
                                                    </p>
                                                </div>
                                                <div><HiOutlineDotsVertical size={'1.5rem'} /></div>
                                            </div>
                                        </div>
                                    ) )
                                }
                            </div>
                        </div>
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses