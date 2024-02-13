import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { CiTimer } from "react-icons/ci";
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from '../services/operations/authAPI';

function VerifyEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ otp , setOtp ] = useState('');

  const { loading } = useSelector( (state) => state.auth );
  const { signupData } = useSelector( (state) => state.auth );

  const { 
    firstName , 
    lastName , 
    email , 
    createPassword ,
    confirmPassword ,
    accountType } = signupData;

  useEffect( () => {
    if( !signupData ){
      navigate('/signup');
    }
  } , [])
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch( signUp( 
      firstName , 
      lastName , 
      email , 
      createPassword , 
      confirmPassword , 
      accountType , 
      otp , 
      navigate ) )
  }
  return (
    <div>
      {
        loading ? ( <div>Loading...</div> ) : (
        <div className='flex flex-col items-center justify-center gap-6 mt-32'>
          <h1 className='text-white text-4xl font-bold'> Verify Email </h1>
          <p className='text-richblack-300 text-sm'>A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={ handleOnSubmit }>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={
                <span
                  style={{
                    fontSize: "7px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  {" "}
                </span>
              }
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "60px",
                height: "70px",
                borderRadius:'4px' ,
                backgroundColor: "#2C333F",
                outline: "none",
                color:"#F1F2FF"
              }}
              
            />
            <button type='submit' className='w-full flex items-center justify-center bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Verify Email</button>
          </form>
          <div className='flex justify-between items-center gap-10'>
            <Link to={ `/login` } className='text-blue-200 flex gap-x-1 items-center justify-center'>
                <IoIosArrowBack/>
                <p>Back to Login</p>
            </Link>
            <div onClick={ () => { sendOtp( email ) } }
            className='text-blue-200 flex justify-between gap-1 items-center'>
              <CiTimer/>
              <p>Resend it</p>
            </div>
          </div>
        </div>
        )
      }
    </div>
  )
}

export default VerifyEmail