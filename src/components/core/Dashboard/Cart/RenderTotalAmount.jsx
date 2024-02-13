import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
function RenderTotalAmount( { setConfirmationModal } ) {
  const { token } = useSelector( (state) => state.auth );
  const { user } = useSelector( (state) => state.profile );
  const { totalAmount , totalItems , cart } = useSelector( (state) => state.cart )
  const coursesId = cart.flatMap( (c) => c._id );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ courseIdInCart , setCourseIdInCart ] = useState(null);
  const handleBuyCourse = async ( ) => {
    if( token ){
      console.log(coursesId)
      await buyCourse( coursesId , user , token , navigate , dispatch);
      return;
    }
    else{
      // login m bhej do modal show karke
      setConfirmationModal( {
        text1 : "You are not Logged in" ,
        text2 : "Please Login to purchase course" ,
        btn1Text : "Login",
        btn2Text : "Cancel",
        btn1Handler : () => { navigate("/login") } ,
        btn2Handler : () => { setConfirmationModal(null) } ,
      } )
    }
  }
  return (
    <div className='bg-richblack-700 rounded-lg px-8 py-4'>
      <p className='text-lg'>Total : { totalItems } { totalItems > 1 ? "courses" : "course" }</p>
      <span className='flex items-center text-3xl text-caribbeangreen-200'><FaRupeeSign/>{ totalAmount }</span>
      <button onClick={() => handleBuyCourse()}
      className='w-full bg-yellow-50 rounded-[8px] text-sm font-semibold text-richblack-900 px-[12px] py-[8px] mt-6'>Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount