import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import ViewCourseSideBar from '../components/core/ViewCourse/ViewCourseSideBar'
import { fetchCompleteCourseDetails } from '../services/operations/courseDetailsAPI';
function ViewCourse() {
    const [ reviewModal , setReviewModal ] = useState(false);
    const { token } = useSelector( (state) => state.auth );
    const { courseId } = useParams();
    const dispatch = useDispatch();

    useEffect( () => {
        const getCourseDetails = async () => {
            const courseData = await fetchCompleteCourseDetails( courseId , token );
            console.log(courseData)
            if( courseData ){
                dispatch( setCourseSectionData( courseData.courseDetails.courseContent ) )
                dispatch( setCourseEntireData( courseData.courseDetails ) )
                dispatch( setCompletedLectures( courseData.completedVideos ) )
                let lectures = 0;
                courseData.courseDetails.courseContent.forEach( section => lectures += section.subSection.length )
                dispatch( setTotalNoOfLectures( lectures ) )
            }
        }
        getCourseDetails();
    } , [])
  return (
    <div className='relative flex w-screen h-[100%]'>
        <div className='w-[20%]'>
            <ViewCourseSideBar setReviewModal={ setReviewModal } />
        </div>
        <div className='min-h-[calc(100vh-3.70rem)] flex  w-[80%]'>
            <Outlet/>
        </div>
        { reviewModal && <CourseReviewModal setReviewModal={ setReviewModal }/> }
    </div>
  )
}

export default ViewCourse