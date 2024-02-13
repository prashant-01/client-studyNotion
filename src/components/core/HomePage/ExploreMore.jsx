import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    'Free' ,
    'New to Coding' ,
    'Most Popular' ,
    'Skill Paths' ,
    'Career Paths' ,
];

function ExploreMore() {
    const [ currentTab , setCurrentTab ] = useState( tabsName[0] );
    const [ courses , setCourses ] = useState( HomePageExplore[0].courses );
    const [ currentCard , setCurrentCard ] = useState( HomePageExplore[0].courses[0].heading );

    const setMyTab = ( value ) => {
        setCurrentTab( value );
        const result = HomePageExplore.filter( (course) => course.tag === value );
        setCourses( result[0].courses );
        setCurrentCard( result[0].courses[0].heading );
    }

  return (
    <div className='relative'>
        <div className='text-4xl font-semibold lg:text-center' >
            Unlock the 
            <HighlightText text={ ' Power of Code' }/>
        </div>
        <p className='lg:text-center text-richblack-300 text-lg font-semibold text-[16px] mt-3'>
            Learn to Build Anything You Can Imagine
        </p>
        <div className='flex lg:flex-row flex-col rounded-full lg:bg-richblack-800 
            px-2 py-1 lg:gap-6 gap-3 mt-6 mb-5 lg:items-center justify-center'>
            {
                tabsName.map( ( element , index ) => {
                    return (
                        <div className={`text-[16px] font-inter
                        ${ currentTab === element ? 'lg:bg-richblack-900 bg-richblack-800 text-richblack-100 font-medium' : 
                        'lg:bg-richblack-800 bg-richblack-900 text-richblack-100' }
                        rounded-full transition-all duration-200 cursor-pointer
                        hover:lg:bg-richblack-900 hover:bg-richblack-800 hover:text-richblack-5 px-4 py-2` } 
                        key={ index }
                        onClick={ () => setMyTab(element) }>
                            <div className='lg:p-0 p-2 lg:text-[16px] text-[20px]'>{ element }</div>
                        </div>
                    )
                })
            }
        </div>
        <div className='lg:h-[150px]'></div>

        {/* Course Card */}
        <div className='flex lg:flex-row flex-col gap-10 justify-between w-full 
        lg:absolute lg:top-[200px] lg:right-[300px]'>
            {
                courses.map( ( element , index ) => {
                    return (
                        <CourseCard
                            key = { index }
                            cardData = { element }
                            currentCard = { currentCard }
                            setCurrentCard = { setCurrentCard }
                        />
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore