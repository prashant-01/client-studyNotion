import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEyeInvisible , AiOutlineEye } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData , setformData] = useState({
        email:'' , 
        password:'' ,
    });

    const { email , password } = formData ;
    const [showPassword, setshowPassword] = useState(false);
    
    function changeHandler(event){
        const { name , value } = event.target ;
        setformData((prevState) => {
            return { ...prevState , [name] : value }
        });
    }
    function handleOnSubmit(event){
        event.preventDefault();
        dispatch( login( email , password , navigate ) );
    }
  return (
    <form onSubmit={ handleOnSubmit }
    className='flex flex-col w-full gap-y-4 mt-6 font-inter'>
        <label className='w-full'>
            <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Email Address
                <sup className='text-pink-200'>*</sup>
            </p>
            <input 
            required
            type='email' 
            name='email' 
            placeholder='Enter email id'
            value={formData.email}
            onChange={changeHandler}
            className='focus:outline-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
        </label>
        
        <label className='w-full relative'>
            <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Password
                <sup className='text-pink-200'>*</sup>
            </p>
            <input 
            required
            type={showPassword ? `text` : `password`}
            name='password' 
            placeholder='Enter Password'
            value={formData.password}
            onChange={changeHandler}
            className='focus:outline-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
            <span className='absolute right-3 top-[38px] cursor-pointer'>
                { 
                    showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword(!showPassword)} />) : 
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword(!showPassword)} />) 
                }
            </span>
            <Link to={`/reset-password`}>
                <p className='max-w-max ml-auto text-xs mt-1 text-blue-200 '>Forget Password</p>
            </Link>
        </label>
        <button type='submit' className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Log In</button>
    </form>
  )
}

export default LoginForm