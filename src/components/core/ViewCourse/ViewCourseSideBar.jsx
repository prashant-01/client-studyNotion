import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { isReviewMade } from '../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';

function ViewCourseSideBar( { setReviewModal } ) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    courseSectionData  ,
    courseEntireData  ,
    completedLectures  ,
    totalNoOfLectures ,
  } = useSelector( (state) => state.viewCourse );
  const { courseId , sectionId , subSectionId } = useParams();

  const [ paramCourseId , setParamCourseId ] = useState(null);
  const [ paramSectionId , setParamSectionId ] = useState(null);
  const [ paramSubSectionId , setParamSubSectionId ] = useState(null);

  const { token } = useSelector( (state) => state.auth )

  const [ activeSection , setActiveSection ] = useState();
  const [ activeSubSection , setActiveSubSection ] = useState();
  const [ loading , setLoading ] = useState(false);

  
  

  const handleAddReview = async () => {
    setLoading(true);
    const res = await isReviewMade( courseId , token );
    if( res ){
      toast.error("Review is already made");
    }
    else{
      setReviewModal(true);
    }
    setLoading(false);
  }

  // useEffect( () => {
  //   setParamCourseId( useParams().courseId );
  //   setParamSectionId( useParams().sectionId );
  //   setParamSubSectionId( useParams().subSectionId );
  // } , [location.pathname ])

  useEffect( () => {
    const activateDetails = () => {
      console.log('video side bar courseSection...' , courseSectionData);
      console.log('video side bar mein......sectionId' , sectionId);
      // getting of of current active section
      const currentSectionIndex = courseSectionData.findIndex( (section) => section._id === sectionId.toString() );
      // getting of of current active subsection
      console.log(currentSectionIndex)
      if( currentSectionIndex !== -1 ){
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex( (subSection) => subSection._id === subSectionId );
        // using above two index , getting id of current active subsection
        const activeSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex]._id;

        setActiveSection( courseSectionData[currentSectionIndex]._id );
        setActiveSubSection( activeSubSectionId );
      }
    }
    if( courseSectionData.length > 0 ){
      activateDetails();
    }
  } , [ courseEntireData , courseSectionData , location.pathname ]);

  
  return (
    <div className='text-richblack-100 bg-richblack-700 h-[100%] border-r border-t border-richblack-500'>
      <div >
          <div className='flex justify-between items-center p-2 border-b border-richblack-500'>
          {/* buttons */}
            <div onClick={ () => navigate('/dashboard/enrolled-courses') } className='cursor-pointer'>
              <IoChevronBackCircleOutline size={`1.75rem`}/>
            </div>
            <button onClick={  () => handleAddReview() }
            className='bg-yellow-50 text-richblack-800 rounded-lg px-4 py-2 font-semibold'>
              { loading ? "Loading..." : "Add Review" }
            </button>
          </div>
          {/* heading and title */}
          <div className='border-b border-richblack-500 py-4'>
            <p className='pl-2'>{ courseEntireData.courseName }</p>
            <p className='pl-2'>Lectures completed : { completedLectures.length } / { totalNoOfLectures }</p>
          </div>
      </div>

      {/* for sections and SubSections */}
      <div className='mt-4'>
        <p className='pl-2 text-xl'>Course content</p>
        {
          courseSectionData.map( (section , index) => (
            <div key={ index } onClick={ () => setActiveSection( section._id ) }>
              {/* section */}
              <div >
                <p className={`pl-2 text-lg cursor-pointer ${ activeSection === section._id && 'text-white' }`}>{index+1}{'. '}{ section.sectionName }</p>
                {/* icon up down */}
              </div>

              {/* subSection */}
              <div>
                {/* show subsections of only that section which is currently active */}
                {
                  activeSection === section._id && (
                    <div>
                      {
                        section.subSection.map( (subSection , index) => (
                          <div key={ index } onClick={ () => {
                            navigate(`/view-course/${courseEntireData._id}/section/${section._id}/subSection/${subSection._id}`);
                            setActiveSubSection( subSection._id );
                          } }
                          className={`p-4 pl-6 rounded-sm flex gap-2 ${ activeSubSection === subSection._id 
                          ? 'bg-yellow-50 text-richblack-900' 
                          : 'bg-richblack-900 text-white border-b border-richblack-500' }`}>
                            <input type='checkbox' onChange={ () => {} }
                              checked={ completedLectures.includes( subSection._id ) }
                            />
                            <p className='text-sm cursor-pointer'>{index+1}{'. '}{ subSection.title }</p>
                          </div>
                        ) )
                      }
                    </div>
                  )
                }
              </div>
            </div>
          ) )
        }
      </div>
    </div>
  )
}

export default ViewCourseSideBar