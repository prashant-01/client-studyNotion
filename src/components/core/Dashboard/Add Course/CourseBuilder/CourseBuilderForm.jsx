import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
function CourseBuilderForm({ loading , setLoading }) {
  const dispatch = useDispatch();
  const {
    register ,
    handleSubmit ,
    setValue ,
    getValues ,
    formState : { errors }
  } = useForm();
  const [ editSectionName , setEditSectionName ] = useState(null);
  const { course } = useSelector( (state) => state.course );
  const { token } = useSelector( (state) => state.auth );
  
  const cancelEdit = () => {
    setEditSectionName( false );
    setValue( 'sectionName' , "" );
  }

  const goToBack = () => {
    dispatch( setStep( 1 ) );
    dispatch( setEditCourse(true) );
  }

  const goToNext = () => {
    if( course.courseContent.length === 0 ){
      toast.error( 'Please add atleast one section' );
      return ;
    }
    if( course.courseContent.some( section => section.subSection.length === 0 ) ){
      toast.error( 'Please add atleast one lecture to each section' );
      return ;
    }

    // if everything is okay then only proceed to publish
    dispatch( setStep(3) );
  }

  const handleChangeEditSectionName = ( sectionId , sectionName ) => {
    if( editSectionName === sectionId ){
      cancelEdit();
      return;
    }
    else{
      setEditSectionName( sectionId );
      setValue( 'sectionName' , sectionName );
    }
  }

  const checkEnterKey = (e) => {
    if( e.key === 'Enter' )return;
  }

  const onSubmit = async (data) => {
    setLoading( true );
    let result ;
    const formData = new FormData();
    formData.append( 'sectionName' , data.sectionName );
    formData.append( 'courseId' , course._id );

    if( editSectionName ){
      // it means we are editing the section name for sectionId is also required
      formData.append( 'sectionId' , editSectionName );
      result = await updateSection( formData , token );
    }
    else{
      // it means creating a new section
      result = await createSection( formData , token );
    }
    if( result ){
      dispatch( setCourse( result ) );
      setEditSectionName( null )
      setValue( 'sectionName' , "" );
    }
    setLoading( false );
  }

  return (
    <div className='text-white bg-richblack-800 rounded-md p-4 w-full'>
      <p className='text-2xl mb-5'>Course Builder</p>
      <form onSubmit={ handleSubmit( onSubmit )} onKeyDown = { (e) => checkEnterKey(e) } className='mb-6'>
        <div>
          <label htmlFor='sectionName'>Section Name<sup className='text-red'>*</sup></label>
          <input 
            id='sectionName' 
            placeholder='Enter section name'
            { ...register( 'sectionName' , { required : true }) }
            className='focus:outline-none w-full bg-richblack-700 rounded-md p-2 border-b border-richblack-300'
          />
          {
            errors.sectionName && (
              <span className='text-red'>Section name is required</span>
            )
          }
        </div>
        <div className='flex gap-4 mt-5 items-end'>
          <button 
          disabled={loading}
          type='submit' 
          className='flex gap-2 items-center rounded-md bg-transparent border-2 border-yellow-50 text-yellow-50 font-semibold p-2'>
            { 
              loading 
              ? ( editSectionName ? 'Editing...' : 'Creating...' )
              : ( editSectionName ? 'Edit Section Name' : 'Create Section' )
            }
            { !loading && <HiOutlinePlusCircle size={`1.5rem`}/> }
          </button>
          { 
            editSectionName && 
            <p className=' cursor-pointer underline text-sm text-richblack-500'
              onClick={ cancelEdit }>
            Cancel Edit</p> 
          }
        </div>
      </form>

      {
        course.courseContent.length > 0 && (
          <NestedView 
            handleChangeEditSectionName = { handleChangeEditSectionName }
          />
        )
      }

      <div className='flex gap-2 justify-end text-sm font-semibold mt-4'>
        <button className='flex gap-1 p-2 items-center justify-center rounded-md bg-richblack-300 text-richblack-800'
        onClick={ () => goToBack() }
        >
          <IoIosArrowBack/>
          Back
        </button>
        <button className='flex gap-1 items-center justify-center p-2 rounded-md bg-yellow-50 text-richblack-800'
        onClick={ () => goToNext() }
        >
          Next
          <IoIosArrowForward/>
        </button>
      </div>
    </div>
  )
}

export default CourseBuilderForm