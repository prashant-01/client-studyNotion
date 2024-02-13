import React from 'react'

import logo1 from '../../../assets/Logos/leadership.png'
import logo2 from '../../../assets/Logos/graduate.png'
import logo3 from '../../../assets/Logos/provision.png'
import logo4 from '../../../assets/Logos/code.png'
import timelineImage from '../../../assets/Images/timelineImage.jpg'

const timeline = [
    {
        logo : logo1 ,
        heading : 'Leadership' ,
        description : 'Fully committed to the success of the company'
    } ,
    {
        logo : logo2 ,
        heading : 'Responsibility' ,
        description : 'Students will always be our top priority'
    } ,
    {
        logo : logo3 ,
        heading : 'Flexibility' ,
        description : 'The ability to switch is an important skills'
    } ,
    {
        logo : logo4 ,
        heading : 'Solve the problem' ,
        description : 'Code your way to a solution'
    }
];
function TimelineSection() {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-center gap-5'>
        {/* Section 1 */}
        <div className='lg:w-[40%] w-full'>
            {
                timeline.map(( element , index ) => {
                    return (
                        <div className='flex gap-5 mb-2' key={ index }>
                            <div className='flex flex-col gap-2 items-center justify-center'>
                                <div className='flex items-center justify-center w-[50px] h-[50px] rounded-[100%] bg-pure-greys-5'>
                                    <img src={ element.logo } alt=''/>
                                </div>
                                <div className={`bg-pure-greys-25 ${ index !== 3 ? 'w-[1px] h-6' : 'w-0 h-0' }`}></div>
                            </div>
                            <div>
                                <h2 className='text-[18px] font-semibold'> { element.heading } </h2>
                                <p className='text-base'> { element.description } </p>
                            </div>
                        </div>
                    )
                } )
            }
        </div>
        {/* Section 2 */}
        <div className='relative lg:w-[60%] w-full'>
            <div className='absolute lg:h-[400px] lg:w-[700px] h-[350px] w-[400px] rounded-[50%] top-0 -left-10
            bg-gradient-to-br from-from via-via to-to 
            filter blur-2xl opacity-40 '></div>
            <img src={ timelineImage } alt=''
                className='relative lg:h-[450px] h-[300px] shadow-[15px_15px_rgba(0,_0,_0,_.2)]'
            />
            <div className='absolute bg-caribbeangreen-700 flex flex-col lg:flex-row lg:gap-0 gap-5 items-center justify-center text-white py-6 uppercase
            lg:translate-x-[35%] lg:translate-y-[-60%] translate-x-[50%] translate-y-[-50%]'>
                <div className='flex items-center gap-4 lg:border-r border-caribbeangreen-300 
                lg:px-7 px-5 py-2'>
                    <p className='text-3xl font-bold'>10</p>
                    <div className='flex flex-col items-start justify-center text-sm text-caribbeangreen-300'>
                        <p>Years of</p>
                        <p>Experience</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 px-7 py-5'>
                    <p className='text-3xl font-bold'>250</p>
                    <div className='flex flex-col items-start justify-center text-sm text-caribbeangreen-300'>
                        <p>Types of</p>
                        <p>Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection