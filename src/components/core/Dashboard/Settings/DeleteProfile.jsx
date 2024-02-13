import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteProfile } from '../../../../services/operations/settingsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
function DeleteProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ deleteModal , setDeleteModal ] = useState(null);
  const { token } = useSelector( (state) => state.auth );
  return (
    <div>
        <div className='bg-delete px-6 py-4 flex gap-4 rounded-md text-richblack-25'>
            <RiDeleteBin6Line size={`2.5rem`} style={ { color: "#EE4B2B" } }/>
        <div className='flex flex-col'>
            <p className='font-bold text-white'>Delete Account</p>
            <p className='text-sm'>Would you like to delete account?</p>
            <p className='text-sm'>This account may contain paid courses . Deleting your account is </p>
            <p className='text-sm'>permanent and will remove all the content associated with it.</p>
            <p onClick={ () => setDeleteModal({
                    text1 : "Are you sure ?" ,
                    text2 : "All your content will no longer be accessible to you" ,
                    btn1Text : "Delete" ,
                    btn2Text : "Cancel" ,
                    btn1Handler : () => dispatch( deleteProfile( token , navigate ) ) ,
                    btn2Handler : () => setDeleteModal( null )
                }) }
            className='text-delete1 font-semibold text-sm mt-6 cursor-pointer'>Want to delete my account</p>
        </div>
      </div>
      <div>
      { deleteModal && <ConfirmationModal modalData={ deleteModal }/> }
      </div>
    </div>
  )
}

export default DeleteProfile