import React, { useState } from 'react';
import RenderSteps from './RenderSteps';
import { MdTipsAndUpdates } from "react-icons/md";
import Loader from '../../../common/Loader';
function AddCourse() {
    const [ loading , setLoading ] = useState(false);
  return (
    <div className='w-full mx-auto'>
        <p className='text-white text-3xl font-bold mb-5 w-full flex items-center justify-center'>Add Course</p>
        {
            loading ? <div className='flex items-center justify-center'><Loader/></div>
            : (
                <div className='flex mt-2'>
                    <div className='ml-10'>
                        <div><RenderSteps loading={loading} setLoading={ setLoading }/></div>
                    </div>
                    <div className=' fixed text-white right-10  h-[420px] w-[400px] space-y-4 bg-richblack-700 border border-richblack-300 rounded-md min-h-max p-8'>
                        <p className='text-xl flex gap-1 items-center  underline'>Course Upload Tips<MdTipsAndUpdates className='text-yellow-50' size={`1.5rem`}/></p>
                        <ul className='list-disc'>
                            <li>Set the Course Price option or make it free.</li>
                            <li>Standard size for the course thumbnail is 1024x576.</li>
                            <li>Video section controls the course overview video.</li>
                            <li>Course Builder is where you create & organize a course.</li>
                            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                            <li>Information from the Additional Data section shows up on the course single page.</li>
                            <li>Make Announcements to notify any important</li>
                            <li>Notes to all enrolled students at once.</li>
                        </ul>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AddCourse;