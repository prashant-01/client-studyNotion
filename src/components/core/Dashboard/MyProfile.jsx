import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";

function MyProfile() {
  const { user } = useSelector( (state) => state.profile );
  const navigate = useNavigate();
  return (
    <div className='w-[800px] flex flex-col gap-6 text-white font-inter text-sm font-bold mx-auto'>
      <div className='text-3xl'> My Profile </div>

      {/* section 1 */}
      <div className='flex items-center justify-between bg-richblack-800 rounded-md px-8 py-4'>
        <div className='flex items-center justify-center gap-2'>
          <img src={ user.image } 
          alt={ user.firstName }
          className='aspect-square w-[60px] rounded-[100%] object-cover'
          />
          <div>
            <p className='font-bold text-lg'>{ user.firstName + ' ' + user.lastName }</p>
            <p className='text-richblack-500'>{ user.email }</p>
          </div>
        </div>
        <button className='flex gap-x-2 items-center justify-center bg-yellow-50 px-2 py-1 rounded-md' onClick={ () => navigate('/dashboard/settings') }>
            <p className='text-richblack-800'>Edit</p>
            <span><FaRegEdit className='text-richblack-800'/></span>
          </button>
      </div>
      {/* section 2 */}
      <div className='flex flex-col bg-richblack-800 rounded-md px-8 py-4 gap-6'>
        <div className='flex items-center justify-between'>
          <p className='text-lg'>About</p>
          <button className='flex gap-x-2 items-center justify-center bg-yellow-50 px-2 py-1 rounded-md' onClick={ () => navigate('/dashboard/settings') }>
            <p className='text-richblack-800'>Edit</p>
            <span><FaRegEdit className='text-richblack-800'/></span>
          </button>
        </div>
        <p className='text-richblack-500 w-[400px]  text-wrap'>{ user?.additionalDetails?.about ?? 'Write something about yourself' }</p>
      </div>
      {/* section 3 */}
      <div className='flex flex-col bg-richblack-800 rounded-md px-8 py-4 gap-6'>
        <div className='flex items-center justify-between'>
          <p className='text-lg'>Personal Details</p>
          <button className='flex gap-x-2 items-center justify-center bg-yellow-50 px-2 py-1 rounded-md' onClick={ () => navigate('/dashboard/settings') }>
            <p className='text-richblack-800'>Edit</p>
            <span><FaRegEdit className='text-richblack-800'/></span>
          </button>
        </div>
        <div className='flex gap-32 mb-0'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
              <p className='text-richblack-500 font-bold'>First Name</p>
              <p>{ user?.firstName }</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-richblack-500 font-bold'>Email</p>
              <p>{ user?.email }</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-richblack-500 font-bold'>Gender</p>
              <p>{ user?.additionalDetails?.gender ? user?.additionalDetails?.gender : 'Add Gender'}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
              <p className='text-richblack-500 font-bold'>Last Name</p>
              <p>{ user?.lastName }</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-richblack-500 font-bold'>Phone Number</p>
              <p>{ user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : 'Add Phone Number'}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-richblack-500 font-bold'>Date of Birth</p>
              <p>{ user?.additionalDetails?.dateOfBirth ? new Date( user?.additionalDetails?.dateOfBirth ).toDateString() : 'Add Date of Birth'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile