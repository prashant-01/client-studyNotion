import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import  RenderCartCourses  from './RenderCartCourses';
import  RenderTotalAmount  from './RenderTotalAmount';
import ConfirmationModal from '../../../common/ConfirmationModal'
function Cart() {
  const { totalItems } = useSelector( (state) => state.cart );
  const [ confirmationModal , setConfirmationModal ] = useState(null);
  return (
    <div className='text-white w-[100%] flex flex-col items-center'>
      <p className='text-3xl font-semibold'>Your Cart</p>
      <div className='mt-10'>
        {
          totalItems > 0 ? (
            <div className='flex gap-16 items-start justify-center'>
              <RenderCartCourses />
              <RenderTotalAmount setConfirmationModal={ setConfirmationModal }/>
            </div>
          ) : (<p className='text-3xl font-bold'>Your Cart is empty</p>)
        }
      </div>
      { confirmationModal && <ConfirmationModal modalData={ confirmationModal }/> }
    </div>
  )
}

export default Cart