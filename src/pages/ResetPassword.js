import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import Loader from '../components/common/Loader';
function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ emailSent , setEmailSent ] = useState(false) ;
    const [ email , setEmail ] = useState('');
    const { loading } = useSelector( (state) => state.auth );

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch( getPasswordResetToken( email , setEmailSent , navigate ) );
    }
  return (
    <div className='lg:w-[500px] mx-auto'>
        {
            loading ? ( <div><Loader/></div> ) : (
                <div className='flex items-center justify-center mt-32'>
                    <div className='flex flex-col gap-6 font-inter'>
                        <h1 className='text-white text-4xl font-bold'>
                            {
                                !emailSent ? 'Reset your Password' : 'Check your Email'
                            }
                        </h1>
                        <p className='text-sm text-richblack-100'>
                            {
                                !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :  
                                `We have sent the reset email to`
                            }
                            {
                                emailSent && <span className='text-white font-semibold'> { email } </span>
                            }
                        </p>
                        <form onSubmit={ handleOnSubmit }>
                            <div>
                                {
                                    !emailSent && (
                                        <label htmlFor='email'>
                                            <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Email Address
                                                <sup className='text-pink-200'>*</sup>
                                            </p>
                                            <input 
                                            required
                                            type='email' 
                                            name='email' 
                                            placeholder='Enter email id'
                                            value={ email }
                                            onChange={ (e) => setEmail( e.target.value ) }
                                            className='focus:outline-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] mb-6'
                                            />
                                        </label>
                                    ) 
                                }
                            </div>
                            <button type='submit'
                            className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]'>
                                {
                                    !emailSent ? 'Reset Password' : 'Resend Email'
                                }
                            </button>
                        </form>
                        <Link to={ `/login` } className='flex gap-x-1 items-center text-blue-200 text-lg'>
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

export default ResetPassword