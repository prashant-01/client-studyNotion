import React, { useState } from 'react'
import { AiOutlineEyeInvisible ,  AiOutlineEye } from 'react-icons/ai'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../services/operations/authAPI';
import { setSignupData } from '../../../slices/authSlice';
function SignupForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [showPassword, setshowPassword] = useState(false);
    const [showPassword1, setshowPassword1] = useState(false);
    const [accountType, setaccountType] = useState("Student");

    const [formData , setformData] = useState({
        firstName:'' , 
        lastName:'' ,
        email:'' , 
        createPassword:'' ,
        confirmPassword:'' ,
    });

    const { firstName , lastName , email , createPassword , confirmPassword } = formData;
    function changeHandler(event){
        const { name , value } = event.target ;
        setformData((prevState) => {
            return { ...prevState , [name] : value }
        });
    }
    function handleOnSubmit(event){
        event.preventDefault();
        dispatch( setSignupData({
            firstName ,
            lastName ,
            email ,
            createPassword ,
            confirmPassword ,
            accountType ,
        } ) );
        dispatch( sendOtp( email , navigate ) );
    }
  return (
    <form onSubmit={ handleOnSubmit }
    className='flex flex-col w-full gap-y-4 mt-6'>
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <span 
            className={`${accountType === "Student" ? 
            "bg-richblack-900 text-richblack-5" : 
            "bg-transparent text-richblack-200" } py-2 px-5 rounded-full transition-all duration-200 cursor-pointer`}
            onClick={() => setaccountType("Student")}>Student</span>
            <span 
            className={`${accountType === "Instructor" ? 
            "bg-richblack-900 text-richblack-5" : 
            "bg-transparent text-richblack-200" } py-2 px-5 rounded-full transition-all duration-200 cursor-pointer`}
            onClick={() => setaccountType("Instructor")}>Instructor</span>
        </div>
        <div className='flex items-center gap-x-4'>
            <label className='w-full'>
                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>First Name
                    <sup className='text-pink-200'>*</sup>
                </p>
                <input 
                required
                type='text' 
                name='firstName' 
                value={formData.firstName}
                onChange={changeHandler}
                placeholder='Enter First Name'
                className='focus:outline-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
            </label>
            <label className='w-full'>
                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Last Name
                    <sup className='text-pink-200'>*</sup>
                </p>
                <input 
                required
                type='text' 
                name='lastName' 
                placeholder='Enter Last Name'
                value={formData.lastName}
                onChange={changeHandler}
                className='focus:outline-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
            </label>
        </div>
        <label className='w-full'>
            <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Email Address
                <sup className='text-pink-200'>*</sup>
            </p>
            <input 
            required
            type='email' 
            name='email' 
            placeholder='Enter Email Address'
            value={formData.email}
            onChange={changeHandler}
            className='focus:outline-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
        </label>
        <div className='flex items-center gap-x-4'>
            <label className='w-full relative'>
                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Create Password
                    <sup className='text-pink-200'>*</sup>
                </p>
                <input 
                required
                type={showPassword ? `text` : `password`}
                name='createPassword' 
                placeholder='Create Password'
                value={formData.createPassword}
                onChange={changeHandler}
                className='focus:outline-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
                <span className='absolute right-3 top-[38px] cursor-pointer '>
                { 
                    showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword(!showPassword)} />) : 
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword(!showPassword)} />) 
                }
                </span>
            </label>
            <label className='w-full relative'>
                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Confirm Password
                    <sup className='text-pink-200'>*</sup>
                </p>
                <input 
                required
                type={showPassword1 ? `text` : `password`}
                name='confirmPassword' 
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={changeHandler}
                className='focus:outline-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' 
                />
                <span className='absolute right-3 top-[38px] cursor-pointer '>
                { 
                    showPassword1 ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword1(!showPassword1)} />) : 
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword1(!showPassword1)} />) 
                }
                </span>
            </label>
        </div>
        <div className='flex justify-center items-center'>
            <button 
            type='submit' 
            className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Create Account</button>
        </div>
    </form>
  )
}

export default SignupForm