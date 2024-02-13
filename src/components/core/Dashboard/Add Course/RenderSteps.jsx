import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import InformationForm from './CourseInformation/InformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import CoursePublishForm from './CoursePublish/CoursePublishForm';
function RenderSteps({ loading , setLoading }) {
  const { step } = useSelector( (state) => state.course );
  const steps = [
    {
      id : 1 ,
      title : 'Course Information'
    } ,
    {
      id : 2 ,
      title : 'Course Builder'
    } ,
    {
      id : 3 ,
      title : 'Publish'
    } ,
  ];
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-2 text-richblack-300'>
        <div className='flex'>
          {
            steps.map( ( item , index ) => (
              // circle steps
              <div key={ index } className='flex flex-col items-center justify-center'>
                <div className='flex items-center justify-center'>
                  <div className={ `w-[48px] h-[48px] flex items-center justify-center rounded-[100%] 
                  ${ item.id <= step 
                  ? 'bg-yellow-900 border  border-yellow-50 text-yellow-50' 
                  : 'bg-richblack-800 border border-richblack-700 text-richblack-300' }` }>
                    <p>
                      {
                        (step > item.id) ? (<FaCheck size={`1.5rem`}/>)  : (item.id) 
                      }
                    </p>
                  </div>
                  { index <= 1 && <div className={`w-32 border-b border-dashed 
                  ${ item.id < step ? 'border-yellow-50' : 'border-richblack-300' } `}></div> }
                  {/* Add dotted line */}
                </div>
              </div>
            ) )
          }
        </div>
        {/* steps name */}
        <div className='flex gap-10'>
          {
            steps.map( ( item , index ) => (
              <div key={ index }>
                <p className={ `${ index === 2 && 'ml-8' }` }>{ item.title  }</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className='mt-10 w-full flex items-center justify-center'>
        { step === 1 && <InformationForm loading={loading} setLoading={setLoading}/> }
        { step === 2 && <CourseBuilderForm loading={loading} setLoading={setLoading}/> }
        { step === 3 && <CoursePublishForm loading={loading} setLoading={setLoading}/> }
      </div>
    </div>
  )
}

export default RenderSteps