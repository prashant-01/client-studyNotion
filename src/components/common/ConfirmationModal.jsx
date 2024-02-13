import React, { useRef } from 'react'

function ConfirmationModal( { modalData } ) {
    const modalRef = useRef();
    const closeModal = (e) => {
        if( modalRef.current === e.target ){
            modalData.btn2Handler();
        }
    }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-20 text-white 
    flex flex-col items-center justify-center' ref={ modalRef } onClick={ closeModal }>
        <div className='bg-richblack-300 bg-opacity-25 p-6 rounded-md flex flex-col items-center justify-center gap-4
        border-[1px] border-richblack-100' >
            <p className='text-lg'>
                { modalData.text1 }
            </p>
            <p className='text-sm text-richblack-300'>
                { modalData.text2 }
            </p>
            <div className='flex items-center gap-4 text-sm'> 
                <button onClick={ modalData.btn1Handler }
                className={ `bg-yellow-50 px-4 py-2 rounded-md text-richblack-800 font-bold` }>
                    { modalData.btn1Text }
                </button>
                <button onClick={ modalData.btn2Handler }
                className={ `bg-richblack-100 px-4 py-2 rounded-md text-richblack-800 font-bold` }>
                    { modalData.btn2Text }
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal