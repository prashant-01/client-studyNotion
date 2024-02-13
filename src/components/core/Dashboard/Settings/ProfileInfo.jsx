import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileInfo } from '../../../../services/operations/settingsAPI';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setUser } from '../../../../slices/profileSlice';

function ProfileInfo() {
    const dispatch = useDispatch();
    const { token } = useSelector( (state) => state.auth );
    const { user } = useSelector( state => state.profile );
    const [ loading , setLoading ] = useState();
    const {
        register ,
        handleSubmit ,
        getValues ,
        setValue ,
        formState : { errors , isSubmitSuccessful } 
    } = useForm();
    
    const isFormUpdated = () => {
        const currentValues = getValues();
        if( currentValues.firstName !== user.firstName ||
        currentValues.lastName !== user.lastName ||
        currentValues.gender !== user.additionalDetails.gender ||
        currentValues.dateOfBirth !== user.additionalDetails.dateOfBirth ||
        currentValues.about !== user.additionalDetails.about ||
        currentValues.contactNumber !== user.additionalDetails.contactNumber ){
            return true;
        }
        return false;
    }
    const submitContactForm = async ( data ) => {
        if( isFormUpdated() ){
            setLoading(true);
            const formData = new FormData();
            formData.append( 'firstName' , data.firstName );
            formData.append( 'lastName' , data.lastName );
            formData.append( 'dateOfBirth' , data.dateOfBirth );
            formData.append( 'gender' , data.gender );
            formData.append( 'contactNumber' , data.contactNumber );
            formData.append( 'about' , data.about );
            const updatedUserDetails =  await updateProfileInfo( formData , token );
            if( updateProfileInfo ){
                dispatch( setUser( updatedUserDetails ) );
            }
            else{
                toast.error('Error in updating');
            }
            setLoading(false);
        }
        else{
            toast.error('No fields updated so far!')
        }
    }
    const handleReset = () => {
        if( user ){
            setValue( 'firstName' , user.firstName );
            setValue( 'lastName' , user.lastName );
            setValue( 'dateOfBirth' , user.additionalDetails.dateOfBirth );
            setValue( 'gender' , user.additionalDetails.gender );
            setValue( 'contactNumber' , user.additionalDetails.contactNumber );
            setValue( 'about' , user.additionalDetails.about );
        }
    }
    useEffect( () => {
        handleReset();
    } , []);
  return (
    <div className='bg-richblack-800 rounded-md px-6 py-2 '>
        <p className='font-bold text-lg mb-10'>Profile Information</p>
        <form className='flex flex-col gap-4' onSubmit={ handleSubmit( submitContactForm ) }>
            <div className='flex items-center justify-between '>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                <label htmlFor='firstName'>
                    <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 text-lg'>First Name</p>
                </label>
                <input type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter First Name'
                    className='focus:outline-none bg-richblack-700 rounded-[0.5rem] text-richblack-300 p-[12px] placeholder-richblack-300'
                    { ...register( "firstName" ) }
                />
            {
                errors.firstName && (
                    <span className='text-red text-sm italic font-mono  '>
                    { errors.message }
                    </span>
                )
            }
            </div>
                <div className='flex flex-col gap-2'>
                <label htmlFor='dateOfBirth'>
                    <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 text-lg'>Date of Birth</p>
                </label>
                <input type='date'
                    name='dateOfBirth'
                    id='dateOfBirth'
                    placeholder='Enter Date of Birth'
                    className='focus:outline-none bg-richblack-700 rounded-[0.5rem] text-richblack-300 p-[12px] placeholder-richblack-300'
                    { ...register( "dateOfBirth" ) }
                />
            {
                errors.dateOfBirth && (
                <span className='text-red text-sm italic font-mono  '>
                { errors.message }
                </span>
            )
            }
            </div>
                <div className='flex flex-col gap-2'>
                <label htmlFor='contactNumber'>
                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 text-lg'>Contact Number</p>
                </label>
                <input type='Number'
                    name='contactNumber'
                    id='contactNumber'
                    placeholder='Enter Contact Number'
                    className='focus:outline-none bg-richblack-700 rounded-[0.5rem] text-richblack-300 p-[12px] placeholder-richblack-300'
                    { ...register( "contactNumber" ) }
                />
            {
                errors.contactNumber && (
                <span className='text-red text-sm italic font-mono  '>
                { errors.message }
                </span>
                )
            }
            </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                <label htmlFor='lastName'>
                    <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 text-lg'>Last Name</p>
                </label>
                <input type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Enter Last Name'
                    className='focus:outline-none bg-richblack-700 rounded-[0.5rem] text-richblack-300 p-[12px] placeholder-richblack-300'
                    { ...register( "lastName" ) }
                />
                {
                    errors.lastName && (
                    <span className='text-red text-sm italic font-mono  '>
                    { errors.message }
                    </span>)
                }
            </div>
                <div className='flex flex-col gap-2'>
                <label htmlFor="gender">
                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 text-lg'>Gender</p>
                </label>
                <select 
                name="gender" 
                id="gender"
                defaultValue='-Gender-'
                className='focus:outline-none bg-richblack-700 rounded-[0.5rem] text-richblack-300 p-[12px] placeholder-richblack-300'
                { ...register( "gender" ) }
                >
                {/* <option value="" hidden selected>-Gender-</option> */}
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Others">Others</option>
                </select>
                {
                errors.gender && (
                <span className='text-red text-sm italic font-mono  '>
                    { errors.message }
                </span>
                )
            }
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor='about'>
                <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 text-lg'>About</p>
                </label>
                <input type='text'
                name='about'
                id='about'
                placeholder='Write about yourself'
                className='focus:outline-none bg-richblack-700 rounded-[0.5rem] text-richblack-300 p-[12px] placeholder-richblack-300'
                { ...register( "about" ) }
                />
            {
                errors.about && (
                <span className='text-red text-sm italic font-mono  '>
                { errors.message }
                </span>
                )
            }
            </div>
            </div>
        </div>
        <div className='flex justify-end gap-4 font-bold'>
            <button type="button" className='bg-richblack-500 p-2 rounded-md' onClick={ () => handleReset() }>
            Cancel
            </button>
            <button type='submit' disabled={loading}
            className='flex gap-2 items-center justify-center bg-yellow-50 p-2 text-richblack-700 rounded-md'>
            { loading ? "Saving..." : "Save Changes" }
            </button>
        </div>
        </form>
    </div>
  )
}

export default ProfileInfo