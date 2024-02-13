import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/Banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
import { getAllReviews } from '../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setAllReviews } from '../slices/reviewSlice';

function HomePage() {
    const dispatch = useDispatch();
    const { token } = useSelector( (state) => state.auth );
    const { allReviews } = useSelector( (state) => state.review );
    useEffect( () => {
        const getAllReviewsAndRatings = async () => {
            const result = await getAllReviews(token);
            if(result){
                dispatch( setAllReviews( result ) );
            }
        }
        getAllReviewsAndRatings();
        console.log( allReviews )
    } , []);
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 maz-w-maxContent items-center text-white justify-between'>
        
            <Link to={ '/signup' }>
                <div className='group mt-12 p-[4px] mx-auto rounded-full bg-richblack-800 text-richblack-200 font-bold 
                transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex items-center gap-[5px] rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='lg:text-center text-4xl font-semibold mt-7'>
                Empower your future with 
                <HighlightText text={ " Coding Skills" }/>
            </div>

            <div className='mt-4 lg:text-center text-sm font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex gap-7 mt-8'>
                <CTAButton active={ true } linkTo={'/signup'}>
                    Learn More
                </CTAButton>
                <CTAButton active={ false } linkTo={'/login'}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='relative my-12' >
                <div className='absolute lg:h-[400px] lg:w-[710px] h-[130px] w-[300px] top-10 left-10 rounded-[100%]
                bg-gradient-to-br from-from via-via to-to
                filter blur-3xl'></div>
                <video className='relative w-full h-fit mx-auto shadow-[15px_15px_rgba(255,_255,_255,_1)]'
                muted
                loop
                autoPlay>
                    <source src={Banner}/>
                </video>
            </div>

            {/* CodeSection 1 */}
            <div>
                <CodeBlocks 
                position={ 'flex-col lg:flex-row' } 
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your <HighlightText text={ 'coding potential' }/> with our online courses.
                    </div>
                }
                subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                ctabtn1={
                    {
                        btnText : 'Try it yourself' ,
                        linkTo : '/signup' ,
                        active : true
                    }
                }
                ctabtn2={
                    {
                        btnText : 'Learn more' ,
                        linkTo : '/login' ,
                        active : false
                    }
                }
                codeblock={
                    `<!DOCTYPE html>
                    <html>
                        <head>
                            <title>Example</title>
                            <link rel="stylesheet"href="styles.css">
                        </head>
                        <body>
                            <h1><a href="/">Header</a></h1>
                            <nav>
                                <a href="one/">One</a>
                                <a href="two/">Two</a>
                            </nav>
                        </body>
                    </html>`
                }
                codeColor={'text-yellow-25'}
                backgroundGradient={ `bg-gradient-to-br from-from1 via-via1 to-to1` }
                />
            </div>
            {/* CodeSection 2 */}
            <div>
                <CodeBlocks 
                position={ 'flex-col lg:flex-row-reverse' } 
                heading={
                    <div className='flex flex-col text-4xl font-semibold'>
                        <div>Start <HighlightText text={ 'coding' }/> </div>
                        <div> <HighlightText text={ 'in seconds' } />.</div>
                    </div>
                }
                subheading={'Go ahead, give it a try, you will not regret . Our hands-on learning environment means you will be writing real code from your very first lesson.'}
                ctabtn1={
                    {
                        btnText : 'Continue Lesson' ,
                        linkTo : '/signup' ,
                        active : true
                    }
                }
                ctabtn2={
                    {
                        btnText : 'Learn more' ,
                        linkTo : '/login' ,
                        active : false
                    }
                }
                codeblock={
                    `<!DOCTYPE html>
                    <html>
                        <head>
                            <title>Example</title>
                            <link rel="stylesheet" href="styles.css">
                        </head>
                        <body>
                            <h1><a href="/">Header</a></h1>
                            <nav>
                                <a href="one/">One</a>
                                <a href="two/">Two</a>
                            </nav>
                        </body>
                    </html>`
                }
                codeColor={'#1FA2F'}
                backgroundGradient={ `bg-gradient-to-br from-from via-via to-to` }
                />
            </div>
            <ExploreMore/>
        </div>
        {/* Section 2 */}
        <div className='bg-white text-richblack-700'>
            <div className='homepage_bg lg:h-[333px] h-[150px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='lg:h-[200px] h-[50px]'></div>
                    <div className='flex justify-center gap-7 text-white'>
                        <CTAButton active={ true } linkTo={ `/signup` }>
                            <div className='flex items-center gap-2'>
                                Explore full catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={ false } linkTo={ `/login` }>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                <div className='flex flex-col lg:flex-row justify-center gap-5 my-10'>
                    <div className='text-4xl font-semibold lg:w-[45%] w-full'>
                        Get the skills you need for a 
                        <HighlightText text={' job that is in demand'}/>.
                    </div>
                    <div className='flex flex-col justify-center gap-5 items-start lg:w-[40%] w-full'>
                        <p className='text-[16px] font-semibold'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <CTAButton className='' active={ true } linkTo={ `/signup` }>
                            Learn more
                        </CTAButton>
                    </div>
                </div>
                <TimelineSection/>
                <LearningLanguageSection/>
            </div>
        </div>
        {/* Section 3 */}
        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center gap-5 bg-richblack-900 text-white'>
            <InstructorSection/>
        </div>
        {/* Review slider */}
        <div className='mb-10  mx-6'>
            <h2 className='text-white text-4xl font-semibold text-center mt-10 mb-4'>Reviews from Other Learners</h2>
            { allReviews.length > 0 && <ReviewSlider reviewData={allReviews}/> }
        </div>
        
        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default HomePage;