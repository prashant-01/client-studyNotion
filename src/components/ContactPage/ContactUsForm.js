import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { contact } from '../../services/operations/contactUsAPI';
import CountryCode from '../../data/country-code.json'

function ContactUsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ loading , setLoading ] = useState( false );
  const {
    register ,
    handleSubmit ,
    reset ,
    formState : { errors , isSubmitSuccessful } 
  } = useForm();

  const submitContactForm = async ( data ) => {
    const { email , message } = data;
    console.log('Contact form data ' , data)
    dispatch( contact( email , message , navigate ) );
  }

  useEffect( () => {
    if(isSubmitSuccessful){
      reset({
        firstName : "" ,
        lastName : "" ,
        email : "" ,
        message : "" ,
      })
    }
  } , [ isSubmitSuccessful ]);
  return (
    <form onSubmit={ handleSubmit( submitContactForm ) }
    className='flex flex-col gap-6 justify-center p-8 border border-richblack-300 rounded-xl w-full'>
      <div className='flex items-center justify-between'>
        {/* firstName */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='firstName'>
            <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>First Name
                <sup className='text-pink-200'>*</sup>
            </p>
          </label>
          <input type='text'
            name='firstName'
            id='firstName'
            placeholder='Enter First Name'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px]'
            { ...register( "firstName" , { required : true }) }
          />
        {
          errors.firstName && (
            <span className='text-red text-sm italic font-mono  '>
              Please Enter your First Name
            </span>
          )
        }
        </div>

        {/* lastName */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='lastName'>
            <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Last Name
                <sup className='text-pink-200'>*</sup>
            </p>
          </label>
          <input type='text'
            name='lastName'
            id='lastName'
            placeholder='Enter Last Name'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px]'
            { ...register( "lastName" , { required : true }) }
          />
        {
          errors.lastName && (
            <span className='text-red text-sm italic font-mono  '>
              Please Enter your Last Name
            </span>
          )
        }
        </div>
      </div>
      {/* email */}
      <div className='flex flex-col gap-2'>
          <label htmlFor='email'>
            <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Email Address
                <sup className='text-pink-200'>*</sup>
            </p>
          </label>
          <input type='email'
            name='email'
            id='email'
            placeholder='Enter Email'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            { ...register( "email" , { required : true }) }
          />
        {
          errors.email && (
            <span className='text-red text-sm italic font-mono  '>
              Please Enter your Email Address
            </span>
          )
        }
      </div>
      {/* phone number */}
      <div className='flex flex-col'>
        <label htmlFor='phoneNumber'>
            <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Phone Number
              <sup className='text-pink-200'>*</sup>
            </p>
        </label>
        <div className='flex justify-between'>
        {/* country code dropdown */}
          <div className='w-[18%]'>
            <select
                  name='dropdown'
                  id='dropdown'
                  className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[14px]'
                  { ...register('countryCode' , { required : true }) }
                >
                  {
                    CountryCode.map( ( element , index ) => {
                      return (
                        <option key={ index } value={ element.dial_code }>
                          { element.dial_code } - { element.name }
                        </option>
                      )
                    })
                  }
            </select>
          </div>
          <div className='flex flex-col gap-2 w-[75%]'>
            <input type='number'
              name='phoneNumber'
              id='phoneNumber'
              placeholder='12345 67890'
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
              { ...register( "phoneNumber" , {
                required : { value : true , message : "Please enter Phone Number" } ,
                maxLength : { value : 10 , message : "Invalid Phone number" } ,
                minLength : { value : 8 , message : "Invalid Phone number" } ,
              }) }
            />
            {
              errors.phoneNumber && (
                <span className='text-red text-sm italic font-mono  '>
                  Please Enter your Phone Number 
                </span>
              )
            }
          </div>
        </div>
      </div>
      {/* message */}
      <div>
          <label htmlFor='message'>
            <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 '>Message
                <sup className='text-pink-200'>*</sup>
            </p>
          </label>
          <textarea
            name='message'
            id='message'
            cols={30}
            rows={5}
            placeholder='Enter message'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            { ...register( "message" , { required : true }) }
          />
        {
          errors.message && (
            <span className='text-red text-sm italic font-mono  '>
              Please Enter your Message
            </span>
          )
        }
      </div>
      <button type='submit' className='bg-yellow-50 rounded-[8px] font-semibold text-richblack-900 px-[12px] py-[8px] mt-6'>Send Message</button>
    </form>
  )
}

export default ContactUsForm