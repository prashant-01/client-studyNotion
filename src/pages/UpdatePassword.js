import React, { useDebugValue, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { IoIosArrowBack } from 'react-icons/io';
import HighlightText from '../components/core/HomePage/HighlightText';

function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading } = useSelector( (state) => state.auth );
    const [showPassword, setshowPassword] = useState(false);
    const [showPassword1, setshowPassword1] = useState(false);
    const [formData , setformData] = useState({
        newPassword:'' ,
        confirmNewPassword:'' 
    });

    const { newPassword , confirmNewPassword } = formData ;

    function changeHandler(event){
        const { name , value } = event.target ;
        setformData((prevState) => {
            return { ...prevState , [name] : value }
        });
    }
    function handleOnSubmit(e){
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch( resetPassword( newPassword , confirmNewPassword , token , navigate ) );
    }
  return (
    <div>
        {
            loading ? (<div>Loading...</div>) : (
                <div className='flex items-center justify-center font-inter mt-20'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-3xl font-bold text-white'>
                            Choose new password
                            {/* <HighlightText text={ 'Choose new password' }/> */}
                        </div>
                        <p className='text-sm text-richblack-100'>
                            Almost done. Enter your new password and youre all set.
                        </p>
                        <form onSubmit={ handleOnSubmit } className='flex flex-col gap-4'>
                            <label className='w-full relative'>
                                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>New Password
                                    <sup className='text-pink-200'>*</sup>
                                </p>
                                <input 
                                required
                                type={showPassword ? `text` : `password`}
                                name='newPassword' 
                                placeholder='Create Password'
                                value={formData.newPassword}
                                onChange={changeHandler}
                                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                                />
                                <span className='absolute right-3 top-[38px] cursor-pointer '>
                                { 
                                    showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword(!showPassword)} />) : 
                                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword(!showPassword)} />) 
                                }
                                </span>
                            </label>
                            <label className='w-full relative'>
                                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Confirm New Password
                                    <sup className='text-pink-200'>*</sup>
                                </p>
                                <input 
                                required
                                type={showPassword1 ? `text` : `password`}
                                name='confirmNewPassword' 
                                placeholder='Confirm Password'
                                value={formData.confirmNewPassword}
                                onChange={changeHandler}
                                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' 
                                />
                                <span className='absolute right-3 top-[38px] cursor-pointer '>
                                { 
                                    showPassword1 ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword1(!showPassword1)} />) : 
                                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' onClick={() => setshowPassword1(!showPassword1)} />) 
                                }
                                </span>
                            </label>
                            <button type='submit'
                            className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                                Reset Passowrd
                            </button>
                        </form>
                        <Link to={ `/login` } className='flex gap-x-1 items-center justify-center'>
                            <IoIosArrowBack/>
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword