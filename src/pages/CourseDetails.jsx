import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetailsWithDuration } from '../services/operations/courseDetailsAPI';
import Loader from "../components/common/Loader"
import ConfirmationModal from "../components/common/ConfirmationModal"
import GetAvgRating from "../utils/avgRating";
import RatingStars from '../components/common/RatingStars';
import { MdDateRange } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { FaVideo } from "react-icons/fa";

function CourseDetails() {
    const { token } = useSelector( (state) => state.auth );
    // const { paymentLoading } = useSelector( (state) => state.course );
    const { user } = useSelector( (state) => state.profile );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { courseId } = useParams();

    const [ courseDetails , setCourseDetails ] = useState(null);
    const [ avgReviewCount , setAvgReviewCount ] = useState(0);
    const [ totalNoOfLectures , setTotalNoOfLectures ] = useState(0);
    const [ confirmationModal , setConfirmationModal ] = useState(null);

    const handleBuyCourse = () => {
        if( token ){
            buyCourse( [ courseId ] , user , token , navigate , dispatch);
            return;
        }
        else{
          // login m bhej do modal show karke
          setConfirmationModal( {
            text1 : "You are not Logged in" ,
            text2 : "Please Login to purchase course" ,
            btn1Text : "Login",
            btn2Text : "Cancel",
            btn1Handler : () => { navigate("/login") } ,
            btn2Handler : () => { setConfirmationModal(null) } ,
          } )
        }
    }

    const getCourseDetails = async(courseId) => {
      let result = await fetchCourseDetailsWithDuration( courseId , token );
      console.log(result);
      if(result){
        setCourseDetails( result );
      }
    }
    useEffect( () => {
      if(courseId){
        getCourseDetails(courseId)
      }
    } , [courseId , location.pathname])

    useEffect( () => {
      if( courseDetails ){
        // get avg rating after the course data gets load
        const count = GetAvgRating( courseDetails.ratingAndReviews )
        setAvgReviewCount(count);

        // count total no of lectures after the course data gets load
        let lectures = 0;
        courseDetails.courseContent.forEach( ( sec ) => {lectures += sec.subSection.length || 0 });
        setTotalNoOfLectures(lectures);
      }
    } , [courseDetails]);


    // collapse 
    const [ isOpen , setIsOpen ] = useState([]);
    const handleIsOpen = ( id ) => {
      setIsOpen( isOpen.includes(id) ? isOpen.filter( (o) => o !== id ) : [ ...isOpen , id ] );
    }

  return (
    <div className='text-white'>
        {
          courseDetails ? (
            <div>

              <div className='relative flex flex-col gap-3 bg-richblack-800 py-16 px-32 '>
                <p>{ `Home / Catalog / ` } <span className='text-yellow-50'>{ courseDetails.courseName }</span></p>
                <p className='text-3xl font-semibold text-white'>{ courseDetails.courseName }</p>
                <p className='w-[600px] text-wrap'>{ courseDetails.courseDescription }</p>
                <div className='flex items-center gap-1'>
                  {/* Average Rating - { avgReviewCount || 0 } */}
                  <RatingStars Review_Count={ avgReviewCount } Star_Size={ 20 }/>
                  <span>{`(${ courseDetails.ratingAndReviews.length } Ratings)`}</span>
                  <span>{`${ courseDetails.studentsEnrolled.length } students`}</span>
                </div>
                <p>Created By - { courseDetails.instructor.firstName }{' '}{ courseDetails.instructor.lastName }</p>
                <p className='flex gap-2 items-center'>
                  <MdDateRange/>
                  Created At - { new Date( courseDetails.createdAt ).toDateString() }
                  <TfiWorld/>
                  English
                </p>
                {/* course-card */}
                <div className='absolute right-32'>
                  <CourseDetailsCard 
                    course={ courseDetails }
                    setConfirmationModal = { setConfirmationModal }
                    handleBuyCourse = { handleBuyCourse }
                    avgReviewCount = { avgReviewCount }
                  />
                </div>

              </div>

              <div className='border-[1px] border-richblack-600 mx-32 mt-16 p-10 w-[735px] '>
                <p className='text-3xl font-semibold'>What you'll learn</p>
                <p className='text-wrap	mt-4'>
                  { courseDetails.whatYouWillLearn }
                </p> 
              </div>

              <div className='flex flex-col ml-32 mr-[500px] mt-16'>
                <div>
                  <div className='text-3xl font-semibold mb-4'>
                    Course Content
                  </div>
                  <div className='flex justify-between gap-x-3'>
                    <div className='flex gap-x-6 text-sm'>
                      <span>{ courseDetails.courseContent.length } section(s)</span>
                      <span>{ totalNoOfLectures } Lecture(s) </span>
                      <span>Total Duration : { courseDetails.totalDuration }min(s) </span>
                    </div>
                    <div>
                      <button onClick={ () => setIsOpen( [] ) }
                      className='text-sm text-yellow-50 '>
                        Collapse all sections
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    courseDetails.courseContent.length > 0 && (
                      courseDetails.courseContent.map( (section , index) => (
                        <div key={section._id} >
                          <div onClick={ () => { handleIsOpen( section._id ) }}
                          className={`flex justify-between ${ isOpen.includes( section._id ) ? '' : 'border-b border-richblack-600' }
                        bg-richblack-700 p-4 cursor-pointer text-white`}>
                          <p>{ section.sectionName }</p>
                          <p className='text-yellow-50 text-sm'>Total lecture(s) { section.subSection.length }</p>
                        </div>
                          {
                            section.subSection.length > 0 && (
                              section.subSection.map( (subSection) => (
                                <div key={subSection._id} >
                                  <span className={`flex items-center gap-x-4 text-sm p-4 bg-richblack-900 text-white cursor-pointer border border-richblack-700 
                                  ${ isOpen.includes( section._id ) ? 'transition-all duration-2000 ease-in-out' : 'hidden' } `}
                                    ><FaVideo/>{ subSection.title }</span>
                                </div>
                              ) )
                            )
                          }
                        </div>
                      ) )
                    )
                  }
                </div>
              </div>

              <div className='ml-32 mr-[500px] mt-16 mb-10 flex flex-col gap-3 bg-richblack-800 rounded-xl p-4'>
                <p className='text-3xl font-semibold'>Author</p>
                <div className='flex gap-x-4 items-center'>
                  <img src={ courseDetails.instructor.image } 
                    className='w-[48px] h-[48px] rounded-[100%] object-cover'
                  />
                  <p className='text-xl'>{ courseDetails.instructor.firstName }{' '}{ courseDetails.instructor.lastName }</p>
                </div>
                <p>About Instructor :
                  <span className='italic text-richblack-300'>{ courseDetails.instructor.additionalDetails.about }</span>
                </p>
              </div>
            </div> 
          ): <Loader/>
        }
        { confirmationModal && <ConfirmationModal modalData = { confirmationModal }/> }
    </div>
  )
}

export default CourseDetails