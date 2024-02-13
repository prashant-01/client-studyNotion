import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from '../HomePage/CTAButton'
function LearningGrid() {

    const LearningGridArray = [
        {
            order : -1 ,
            heading : 'World-Class Learning for ' ,
            highlightText : 'Anyone, Anywhere' ,
            btnText : 'Learn More' ,
            btnLink : '/' ,
            description : 'Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.' ,
        } ,
        {
            order : 1 ,
            heading : 'Curriculum Based on Industry Needs' ,
            description : 'Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.' ,
        } ,
        {
            order : 2 ,
            heading : 'Our Learning Methods' ,
            description : 'The learning process uses the namely online and offline.' ,
        } ,
        {
            order : 3 ,
            heading : 'Certification' ,
            description : 'You will get a certificate that can be used as a certification during job hunting.' ,
        } ,
        {
            order : 4 ,
            heading : `Rating "Auto-grading"` ,
            description : 'You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.' ,
        } ,
        {
            order : 5 ,
            heading : 'Ready to Work' ,
            description : 'Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.' ,
        }
    ]
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 '>
        {
            LearningGridArray.map(( card , index ) => (
                <div key={ index }
                className={ `
                ${ 
                    index === 0 && `lg:col-span-2`
                }
                ${ 
                    card.order % 2 === 1 ? `bg-richblack-700` : `bg-richblack-800`
                }
                ${
                    card.order === 3 && `lg:col-start-2`
                }
                `}>
                    {
                        card.order === -1 ? (
                            <div className='flex flex-col gap-4 bg-richblack-900 lg:h-[250px]
                            px-10 py-4'>
                                <div>
                                    <p className='text-3xl font-semibold text-white'>{ card.heading }</p>
                                    <p className='text-3xl font-semibold '><HighlightText text={ card.highlightText }/></p>
                                </div>
                                <p className='text-richblack-300' >
                                    { card.description }
                                </p>
                                <div className='flex items-start'>
                                    <CTAButton active={true} linkTo={card.btnLink}>
                                        { card.btnText }
                                    </CTAButton>
                                </div>
                            </div>
                        ) : (
                        <div className='flex flex-col gap-8 lg:h-[250px] px-8 py-4'>
                            <p className='text-white font-semibold'>{ card.heading }</p>
                            <p className='text-richblack-300'>{ card.description } </p>
                        </div>
                        )
                    }
                </div>
            ))
        }
    </div>
  )
}

export default LearningGrid