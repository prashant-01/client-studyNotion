import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../../services/operations/settingsAPI';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const { token } = useSelector( (state) => state.auth );
    const [ loading , setLoading ] = useState(false);
    const {
        register ,
        handleSubmit ,
        reset ,
        formState : { errors , isSubmitSuccessful } 
    } = useForm();
    
    const submitHandler = async ( data ) => {
        setLoading(true);
        const formData = new FormData();
        formData.append( 'oldPassword' , data.oldPassword );
        formData.append( 'newPassword' , data.newPassword );
        formData.append( 'confirmPassword' , data.confirmPassword );
        await updatePassword( formData , token );
        setLoading(false);
    }
    useEffect( () => {
        if(isSubmitSuccessful){
        reset({
            oldPassword : "",
            newPassword : "",
            confirmPassword : ""
        })
        }
    } , [ isSubmitSuccessful ]);
  return (
    <div className='flex flex-col bg-richblack-800 rounded-md px-6 py-2 '>
        <p className='font-bold text-lg mb-10 text-lg'>Change Password</p>
        <form className='flex flex-col gap-4' onSubmit={ handleSubmit( submitHandler ) }>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='oldPassword'>
                    <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 text-lg'>Old Password
                        <sup className='text-red'>*</sup>
                    </p>
                    </label>
                    <input type='password'
                    name='oldPassword'
                    id='oldPassword'
                    placeholder='Current Password'
                    className='focus:outline-none bg-richblack-700 rounded-[0.5rem] text-richblack-300 p-[12px]'
                    { ...register( "oldPassword" , { 'required' : true } ) }
                    />
                    {
                    errors.oldPassword && (
                        <span className='text-red text-sm italic font-mono  '>
                        Please Enter Old Password
                        </span>
                    )
                    }
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='newPassword'>
                        <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 text-lg'>New Password
                            <sup className='text-red'>*</sup>
                        </p>
                        </label>
                        <input type='password'
                        name='newPassword'
                        id='newPassword'
                        placeholder='New Password'
                        className='focus:outline-none bg-richblack-700 rounded-[0.5rem] text-richblack-300 p-[12px]'
                        { ...register( "newPassword" , { 'required' : true } ) }
                        />
                        {
                        errors.newPassword && (
                            <span className='text-red text-sm italic font-mono  '>
                            Please Enter New Password
                            </span>
                        )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='confirmPassword'>
                        <p className='text-[0.875rem] leading-[1.375rem] text-richblack-5 mb-1 text-lg'>Confirm Password
                            <sup className='text-red'>*</sup>
                        </p>
                        </label>
                        <input type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        placeholder='Confirm Password'
                        className='focus:outline-none bg-richblack-700 rounded-[0.5rem] text-richblack-300 p-[12px]'
                        { ...register( "confirmPassword" , { 'required' : true } ) }
                        />
                        {
                        errors.confirmPassword && (
                            <span className='text-red text-sm italic font-mono  '>
                            Please Confirm Your Password
                            </span>
                        )
                        }
                    </div>
                </div>
            </div>
        <div className='flex justify-end gap-4 font-bold'>
        <button type='button' disabled={loading}
        className='bg-richblack-500 p-2 rounded-md' onClick={ reset }>
            Cancel
        </button>
        <button type='submit' disabled={loading}
        className='flex gap-2 items-center justify-center bg-yellow-50 p-2 text-richblack-700 rounded-md'>
            { loading ? "Updating..." : "Update" }
        </button>
        </div>
    </form>
    </div>
  )
}

export default ChangePassword