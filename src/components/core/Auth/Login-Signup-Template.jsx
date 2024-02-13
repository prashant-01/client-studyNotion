import React from 'react'
import frameImage from '../../../assets/Images/frame.png'
import SignupForm from './Signupform'
import LoginForm from './LoginForm'
import { FcGoogle } from 'react-icons/fc'
import HighlightText from '../HomePage/HighlightText'

function Template({ title , image , formType }) {
  return (
    <div className='flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0 text-white'>
        <div className='w-11/12 max-w-[450px]'>
            <div className='text-[1.875rem] font-bold leading-[2.375rem]'><HighlightText text={ title } /></div>
            {/* <h1 className='text-richblack-5 text-[1.875rem] font-semibold leading-[2.375rem]'>{title}</h1> */}
            <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                <span className='text-richblack-100'>Build skills for today tomorrow and beyond. </span><br/>
                <span className='italic'><HighlightText text={ 'Education to future-proof your career' }/></span>
            </p>
            {
                formType === "signup" ? <SignupForm /> : 
                                        <LoginForm />
            }
            <div className='w-full flex items-center my-4 gap-x-2'>
                <div className='w-full h-[1px] bg-richblack-700'></div>
                <p className='text-richblack-700 font-medium leading-[1.375rem]'>OR</p>
                <div className='w-full h-[1px] bg-richblack-700'></div>
            </div>
            <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border 
            border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6'>
                <FcGoogle/>
                <p>Sign Up with Google</p>
            </button>
        </div>
        <div className='relative w-11/12 max-w-[450px]'>
            <img src={frameImage} width={558} height={504} loading='lazy' />
            <img src={image} width={558} height={504} loading='lazy' 
                className='absolute -top-4 right-4'
            />
        </div>
    </div>
  )
}

export default Template