import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { VscDashboard, VscSignOut } from 'react-icons/vsc'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { logout } from '../../../services/operations/authAPI'
function ProfileDropDown() {
  const { user } = useSelector( (state) => state.profile )
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ modal , setModal ] = useState( false );
  const imgRef = useRef();
  const iconRef = useRef();
  const modalRef = useRef();
  const closeModal = (e) => {
    if( modalRef.current === e.target ){
      setModal(false);
      console.log(modal)
    }
  }
  // useEffect(() => {
  //     window.addEventListener( 'click' , (e) => {
  //     if( e.target !== imgRef.current && e.target !== menuRef.current ){
  //       setOpen( false );
  //     }
  //   } )
  //     return () => {
  //       window.addEventListener( 'click' , (e) => {
  //         if( e.target !== imgRef.current && e.target !== iconRef.current && e.target !== menuRef.current ){
  //           setOpen( false );
  //         }
  //       } )
  //     }
  //   } , []);

  if( user === null ) {
    console.log('user null hogya ... No Profile Dropdown possible')
    return null ;
  }
  return (
    <div className='relative cursor-pointer'>
      <div className='flex items-center gap-x-1 cursor-pointer' onClick={ () => setModal( true ) }>
        <img 
          src={ user.image }
          alt={ user.firstName }
          className='aspect-square rounded-full w-[40px] object-cover'
        />
        <div><AiOutlineCaretDown className='text-lg text-richblack-500' /></div>
      </div>
      {
        modal && (
          <div className='fixed inset-0 z-30' ref={ modalRef } onClick={ closeModal }>
            <div className='absolute top-[55px] right-[170px] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'>
              <Link to='/dashboard/my-profile' onClick={ () => setModal(false) }>
                <div className='flex w-full items-center gap-x-3 py-2 px-4 text-md text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                  <VscDashboard size={'1.5rem'}/>
                  Dashboard
                </div>
              </Link>
              <div onClick={() => {
                  dispatch( logout(navigate) )
                  setModal(false)
                }} className='flex w-full items-center gap-x-3 py-2 px-4 text-md text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                  <VscSignOut size={'1.5rem'}/>
                  Logout
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ProfileDropDown