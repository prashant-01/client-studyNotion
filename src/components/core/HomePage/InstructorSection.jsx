import React from 'react'
import instructorImage from '../../../assets/Images/instructor.jpg'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
function InstructorSection() {
  return (
    <div className='mt-16 flex lg:flex-row flex-col lg:gap-0 gap-6 items-center justify-between' >
        <div className='relative flex gap-20 items-center lg:w-[40%] w-full'>
            <div className='absolute lg:h-[200px] h-[150px] w-[400px] rounded-[100%] filter blur-3xl right-0
            bg-gradient-to-br from-from via-via to-to ' ></div>
            <img src={ instructorImage } alt=''
            className='relative shadow-[-15px_-15px_0_0_rgba(255,_255,_255,_1)]' />
        </div>
        <div className='lg:w-[40%] w-full flex flex-col gap-8'>
            <div className='text-4xl font-semibold'>
                <div>Become an</div>
                <HighlightText text={'instructor'} />.
            </div>
            <div className='text-base font-inter text-richblack-300'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>
            <div className='w-fit'>
                <CTAButton active={ true } linkTo={ `/signup` }>
                    <div className='flex items-center justify-center gap-2 text-richblack-800'>
                        Start Teaching Today
                        <FaArrowRight/>
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection