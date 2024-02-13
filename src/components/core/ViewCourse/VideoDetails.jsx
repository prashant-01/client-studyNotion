import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; 
import '../../../App.css'
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
function VideoDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const videoPlayerRef = useRef();
  const { courseId , sectionId , subSectionId } = useParams(); 
  const { 
    courseSectionData  ,
    courseEntireData  ,
    completedLectures  ,
    totalNoOfLectures
  } = useSelector( (state) => state.viewCourse );
  const { token } = useSelector( (state) => state.auth )
  
  const [ videoData , setVideoData ] = useState([]);
  const [ videoEnded , setVideoEnded ] = useState(false);
  const [ loading , setLoading ] = useState(false);
  const getIndex = () => {
    console.log(courseSectionData)
    const currentSectionIndex = courseSectionData.findIndex( (section) => section._id === sectionId );
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex( (subSection) => subSection._id === subSectionId );
    return { currentSectionIndex , currentSubSectionIndex };
  }
  const isFirstVideo = () => {
    // if the video is present in 1st section and in that too 1st subsection then it is first video
    const { currentSectionIndex , currentSubSectionIndex } = getIndex();
    if( currentSectionIndex === 0 && currentSubSectionIndex === 0 ){
      return true;
    }
    return false;
  }

  const isLastVideo = () => {
    const { currentSectionIndex , currentSubSectionIndex } = getIndex();
    // last section index = courseSectionData.length-1 ; 
    // total subsections in last section = courseSectionData[courseSectionData.length-1].subSection.length
    if( currentSectionIndex === courseSectionData.length-1 && 
      currentSubSectionIndex === courseSectionData[courseSectionData.length-1].subSection.length-1 )return true;
    return false;
  }

  const goToNextVideo = () => {
    const { currentSectionIndex , currentSubSectionIndex } = getIndex();
    if( currentSubSectionIndex === courseSectionData[currentSectionIndex].subSection.length-1 ){
      // last video of it's section , then move to next section's 1st video
      const nextSectionIndex = currentSectionIndex + 1;
      const nextSectionId = courseSectionData[nextSectionIndex]._id;
      const nextSubSectionId = courseSectionData[nextSectionIndex].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/subSection/${nextSubSectionId}`)
    }
    else{
      // in the current section , move to next video
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const { currentSectionIndex , currentSubSectionIndex } = getIndex();
    if( currentSubSectionIndex === 0 ){
      // first video of it's section , then move to prev section last video
      const prevSectionIndex = currentSectionIndex-1;
      const prevSectionId = courseSectionData[prevSectionIndex]._id;
      const prevSubSectionIndex = courseSectionData[prevSectionIndex].subSection.length-1;
      const prevSubSectionId = courseSectionData[ prevSectionIndex ].subSection[ prevSubSectionIndex ]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/subSection/${prevSubSectionId}`)
    }
    else{
      // in the same section move it to prev video
      const prevSubSectionId = courseSectionData[ currentSectionIndex ].subSection[ currentSubSectionIndex -1 ]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/subSection/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete( {
      courseId : courseId ,
      subSectionId : subSectionId ,
      totalNoOfLectures : totalNoOfLectures
    } , token );
    if(res){
      dispatch( updateCompletedLectures( subSectionId ) );
    }
    setLoading(false);
  }

  useEffect( () => {
    const setVideoSpecificDetails = () => {
      console.log(courseSectionData)
      console.log('video details mein......sectionId' , sectionId);
      if( !courseId && !sectionId && !subSectionId )navigate( '/dashboard/enrolled-courses' );
      else{
        const filteredSection = courseSectionData.filter( (section) => section._id === sectionId );
        console.log(filteredSection)
        if( filteredSection.length > 0 ){
          const filteredSubSection = filteredSection[0].subSection.filter( (subSection) => subSection._id === subSectionId );
          setVideoData( filteredSubSection[0] );
          setVideoEnded(false);
        }
      }
    }
    if(courseSectionData.length > 0){
      setVideoSpecificDetails();
    }
  } , [ courseEntireData , courseSectionData , location.pathname ]);
  return (
    <div className='relative text-white w-full'>
      {
        !videoData ? <p>No Data Found</p> 
        : (
        <div className='flex items-center justify-center'>
          <Player
            ref={ videoPlayerRef }
            aspectratio='16:9'
            onEnded = { () => setVideoEnded(true) }
            src={ videoData.videoUrl }
            fluid="true"
            className='min-h-[calc(100vh-3.70rem)] items-center justify-center'
            >
            
            <div className=' text-richblack-5 flex flex-col gap-4 items-center justify-center absolute top-[150px]  left-[450px] z-10'>
              <div>
                {
                  !completedLectures.includes( subSectionId ) && videoEnded && (
                  <button 
                    disabled={ loading }
                    onClick={ () => {
                      handleLectureCompletion();
                    } }
                    className='bg-yellow-25 text-richblack-800 px-3 py-2 text-lg rounded-xl w-full disabled:opacity-75 disabled:cursor-not-allowed'>
                    { loading ? 'Loading...' : "Mark as Complete" }
                  </button>)
                }
              </div>

              <div>
                {
                  videoEnded && (
                    <button 
                      disabled={ loading }
                      onClick={ () => {
                        if(videoPlayerRef.current){
                          videoPlayerRef.current.seek(0);
                          setVideoEnded(false);
                        }
                      } }
                      className='flex gap-2 items-center bg-yellow-25 text-richblack-800 px-3 py-2 text-lg rounded-xl disabled:opacity-75 disabled:cursor-not-allowed'
                    >
                      Rewatch <FaArrowRotateLeft size={`1rem`}/>
                    </button>
                  )
                }
              </div>

              <div className='flex gap-4'>
                <div>
                  {
                    videoEnded && (
                      <button 
                      disabled={ loading || isFirstVideo() }
                      onClick={ () => goToPrevVideo() }
                      className='flex gap-1 items-center bg-yellow-25 text-richblack-800 px-3 py-2 text-lg rounded-xl disabled:opacity-75 disabled:cursor-not-allowed'>
                        <IoIosArrowBack/>Prev
                      </button>
                    )
                  }
                </div>
                <div>
                  {
                    videoEnded && (
                      <button 
                      disabled={ loading || isLastVideo() }
                      onClick={ () => goToNextVideo() }
                      className='flex gap-1 items-center bg-yellow-25 text-richblack-800 px-3 py-2 text-lg rounded-xl disabled:opacity-75 disabled:cursor-not-allowed'>
                        Next<IoIosArrowForward/>
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          </Player>
        </div>
        )
      }
      <div className='p-4 flex flex-col gap-3'>
        <p className='text-lg'>Lecture name - { videoData.title }</p>
        <p className='text-lg'>Description - { videoData.description }</p>
      </div>
    </div>
  )
}

export default VideoDetails