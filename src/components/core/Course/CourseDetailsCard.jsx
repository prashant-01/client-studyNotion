import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../slices/cartSlice';
import { FaRupeeSign } from 'react-icons/fa';
import { IoMdShare } from "react-icons/io";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { GrWaypoint } from "react-icons/gr";

function CourseDetailsCard( { course , setConfirmationModal , handleBuyCourse , avgReviewCount } ) {
    
    const { user } = useSelector( (state) => state.profile );
    const { token } = useSelector( (state) => state.auth );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddCart = () => {
        if( token ){
            dispatch( addToCart( { ...course , avgReviewCount } ) )
            return;
        }
        else{
            setConfirmationModal( {
                text1 : "You are not Logged in",
                text2 : "Please login to add course to cart",
                btn1Text : "Login" ,
                btn2Text : "Cancel",
                btn1Handler : () => navigate( "/login" ),
                btn2Handler : () => setConfirmationModal(null) 
            } )
        }
    }
    const handleShare = () => {
        copy( window.location.href );
        toast.success( "Link copied to clipboard" );
    }
  return (
    <div className='flex flex-col bg-richblack-700 rounded-xl w-[300px]'>
        <img src={ course.thumbnail } className='h-[200px] w-[300px] rounded-t-xl object-cover aspect-square'/>
        <div className='flex flex-col px-2 pb-2' >
            <p className='flex items-center text-2xl mb-2 text-caribbeangreen-100'><FaRupeeSign/>{ course.price }</p>
            
            <div className='flex flex-col gap-2 '>
                { 
                    // instructor cannot add courses to cart
                    // user && user.accountType !== "Instructor" && 
                    (
                        <button disabled={ user && user.accountType === "Instructor" }
                        className='bg-richblack-400 text-richblack-800 p-2 rounded-md font-semibold text-sm disabled:opacity-75 disabled:cursor-not-allowed'
                        onClick={ () => handleAddCart() }>
                            Add To Cart
                        </button>
                    ) 
                }
                
                {
                    // not showing buy button to Instructor
                    // user && user.accountType !== "Instructor" && 
                    (
                        <div>
                            <button disabled={ user && user.accountType === "Instructor" }
                            className='w-full  bg-yellow-50 text-richblack-800 p-2 rounded-md font-semibold text-sm disabled:opacity-75 disabled:cursor-not-allowed'
                            onClick={ () => {
                                user && course.studentsEnrolled.flatMap((c) => c._id).includes(user._id)
                                ? navigate("/dashboard/enrolled-courses") 
                                : handleBuyCourse();
                                }}>
                                { user && course.studentsEnrolled.flatMap((c) => c._id).includes(user._id) ? "Go To Courses" : "Buy Course" }
                            </button>
                            <p className='flex items-center justify-center text-richblack-300 text-sm mt-2'>30-Day-Money-Back-Guarantee</p>
                        </div>
                    )
                }
            </div>
            
            <div className='flex flex-col text-caribbeangreen-100 mt-2 font-medium'>
                <p>Instructions for the course - </p>
                <div className='flex flex-col gap-2'>
                    {
                        course.instructions.map( (item , index) => (
                            <p key={index} className='flex gap-1 items-center text-sm'><GrWaypoint/>{ item }</p>
                        ) )
                    }
                </div>
            </div>
            <p className='text-yellow-50 text-lg mx-auto flex items-center mt-6 gap-1 cursor-pointer' 
                onClick={() => handleShare()}>
                <IoMdShare/>Share
            </p>
        </div>
    </div>
  )
}

export default CourseDetailsCard
