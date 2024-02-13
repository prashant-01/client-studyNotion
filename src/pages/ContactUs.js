import React from 'react'
import { LuMessagesSquare } from "react-icons/lu";
import { TbWorldSearch } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import ContactUsForm from '../components/ContactPage/ContactUsForm';
import ReviewSlider from '../components/common/ReviewSlider';
import { useSelector } from 'react-redux';
function ContactUs() {
  const { allReviews } = useSelector( (state) => state.review );
  return (
    <div className=' text-white w-full mx-auto'>
      <div className='flex flex-col w-full mt-10'>
        <div className='flex items-start justify-center gap-10'>
          <div className='flex flex-col gap-8 bg-richblack-700 p-8 rounded-lg'>
            <div className='flex gap-2'>
              <LuMessagesSquare size={`1.75rem`}/>
              <div className='flex flex-col text-sm text-richblack-300'>
                <p className='text-white text-lg'>Chat on us</p>
                <p>Our friendly team is here to help.</p>
                <p>study@notion.ed</p>
              </div>
            </div>
            <div className='flex gap-2'>
              <TbWorldSearch size={`1.75rem`}/>
              <div className='flex flex-col text-sm text-richblack-300'>
                <p className='text-white text-lg'>Visit us</p>
                <p>Come and say hello at our office HQ.</p>
                <p>Here is the location/ address</p>
              </div>
            </div>
            <div className='flex gap-2'>
              <IoCall size={`1.75rem`}/>
              <div className='flex flex-col text-sm text-richblack-300'>
                <p className='text-white text-lg'>Call us</p>
                <p>Mon - Fri From 8am to 5pm</p>
                <p>+123 456 7890</p>
              </div>
            </div>
          </div>
          <div><ContactUsForm/></div>
        </div>

        <div className='font-bold text-3xl w-full flex items-center justify-center mt-16'>Review from other learners</div>
        <div className='p-4'>
          { allReviews.length > 0 && <ReviewSlider reviewData={allReviews}/> }
        </div>
      </div>
    </div>
  )
}

export default ContactUs