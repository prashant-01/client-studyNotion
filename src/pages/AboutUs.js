import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import aboutus1  from '../assets/Images/aboutus1.webp'
import aboutus2  from '../assets/Images/aboutus2.webp'
import aboutus3  from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png';
import Vision from '../components/core/AboutPage/Vision'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import AboutUsForm from '../components/core/AboutPage/AboutUsForm'
import { useSelector } from 'react-redux'
import ReviewSlider from '../components/common/ReviewSlider'
function AboutUs() {
  const space=' ';
  const { allReviews } = useSelector( (state) => state.review );
  return (
    <div className='flex flex-col'>
      <div className='relative flex flex-col items-center justify-center bg-richblack-800 pt-20 pb-72'>
        <p className='text-white font-bold text-3xl'>Driving Innovation in Online Education for a</p>
        <p className='text-3xl'><HighlightText text={ `Brighter Future` }/></p>
        <p className='text-richblack-300 text-center mx-[200px] mt-4'>
          Studynotion is at the forefront of driving innovation in online education. 
          We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
        </p>
        <div className='absolute flex gap-8 items-center justify-center top-[50%]'>
          <img className='' src={ aboutus1 } />
          <img className='' src={ aboutus2 } />
          <img className='' src={ aboutus3 } />
        </div>
      </div>
      <div className='bg-richblack-900 border-b border-dashed border-richblack-300'>
        <p className='text-center text-white font-semibold text-3xl mt-32 mx-24 pb-24'>
        “ We are passionate about revolutionizing the way we learn. 
          Our innovative platform <span className=''><HighlightText text={`combines technology`}/></span>, 
          <span>{ space }</span>
          <span className={`font-bold 
            bg-gradient-to-br from-from2 to-to2
            text-transparent bg-clip-text`}>
                expertise
          </span>
          , and community to create an <span>{ space }</span> 
          <span className={`font-bold 
            bg-gradient-to-br from-from3 to-to3
            text-transparent bg-clip-text`}>
                unparalleled educational experience.
          </span> ”
        </p>
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between px-24 py-24'>
          <div className='flex flex-col gap-8 lg:w-[500px] '>
            <p className={`font-bold text-4xl 
              bg-gradient-to-br from-from4 via-via4 to-to4
              text-transparent bg-clip-text`}>
                  Our Founding Story 
            </p>
            <p className='text-richblack-300 text-sm italic lg:w-[500px]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
            <p className='text-richblack-300 text-sm italic lg:w-[500px]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
          </div>
          <div className='relative'>
            <div className='absolute bg-gradient-to-br from-from5 to-to5 rounded-full 
            h-[200px] w-[350px] blur-3xl opacity-50 top-6'></div>
            <img className='relative h-[250px] w-[400px] shadow-[15px_15px_rgba(255,_255,_255,_1)]' src={ FoundingStory }></img>
          </div>
        </div>
        <div className='flex justify-between items-center px-24 py-24'>
          <Vision title={`Our Vision`} index={1}
            description={ `With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.` }
          />
          <Vision title={`Our Mission`} index={2}
            description={ `Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.` }
          />
        </div>
      </div>
      <div className='flex items-center justify-center bg-richblack-800 py-10 gap-[200px]'>
        <div>
          <p className='text-white font-bold text-3xl'>5k+</p>
          <p className='text-richblack-300'>Active Students</p>
        </div>
        <div>
          <p className='text-white font-bold text-3xl'>10+</p>
          <p className='text-richblack-300'>Mentors</p>
        </div>
        <div>
          <p className='text-white font-bold text-3xl'>200+</p>
          <p className='text-richblack-300'>Courses</p>
        </div>
        <div>
          <p className='text-white font-bold text-3xl'>50+</p>
          <p className='text-richblack-300'>Awards</p>
        </div>
      </div>
      <div className='mt-20 px-24'>
        <LearningGrid/>
      </div>
      <div className='lg:w-[500px] mx-auto pb-24 '>
        <AboutUsForm/>
      </div>
      <div className='pt-16 border-t border-dashed border-richblack-300 mb-10 px-10'>
        <p className='text-white text-center text-3xl font-bold mb-4'>Review from other learners</p>
        {/* Review Slider */}
        { allReviews.length > 0 && <ReviewSlider reviewData={allReviews}/> }
      </div>
    </div>
  )
}

export default AboutUs