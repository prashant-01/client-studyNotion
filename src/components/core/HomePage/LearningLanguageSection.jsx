import React from 'react'
import HighlightText from './HighlightText'
import image1 from '../../../assets/Images/Know_your_progress.png'
import image2 from '../../../assets/Images/Compare_with_others.svg'
import image3 from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from './CTAButton'
function LearningLanguageSection() {
  return (
    <div className='w-11/12 max-w-maxContent mt-[130px] mb-10'>
        <div className='flex flex-col gap-5 items-center justify-center '>
            <div className='text-4xl lg:text-center font-semibold'>
                Your swiss knife for
                <HighlightText text={' learning any language'}/>
            </div>
            <div className='lg:w-[70%] w-full lg:text-center text-base text-richblack-600 font-medium mx-auto'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>
            <div className='flex lg:flex-row flex-col items-center justify-center mt-5'>
                <img src={ image1 } alt='' className='object-contain lg:-mr-28 '/>
                <img src={ image2 } alt='' className='object-contain'/>
                <img src={ image3 } alt='' className='object-contain lg:-ml-36'/>
            </div>
            <div className='w-fit'>
                <CTAButton active={ true } linkTo={`/signup`}>
                    Learn more
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection