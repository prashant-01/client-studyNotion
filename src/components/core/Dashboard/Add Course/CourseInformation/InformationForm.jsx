import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import ChipInput from './ChipInput';
import RequirementField from './RequirementField';
import toast from 'react-hot-toast';
import { setCourse , setStep } from '../../../../../slices/courseSlice';
import Upload from '../Upload';
function InformationForm({ setLoading }) {
    const dispatch = useDispatch();
    const {
        register ,
        handleSubmit ,
        setValue ,
        getValues ,
        formState : { errors } 
    } = useForm();

    const { token } = useSelector( (state) => state.auth );
    const { course , editCourse } = useSelector( (state) => state.course );
    const { categories } = useSelector( (state) => state.categories );

    const isFormUpdated = () => {
        const currentValues = getValues();
        if( currentValues.courseTitle !== course.courseName || 
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ){
                return true;
            }
        return false;
    }
    const checkKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };
    const onSubmit = async (data) => {
        setLoading(true);
        let result;
        const formData = new FormData()
        formData.append( 'courseName' , data.courseTitle )
        formData.append( 'courseDescription' , data.courseShortDesc )
        formData.append( 'price' , data.coursePrice )
        formData.append( 'category' , data.courseCategory )
        formData.append( 'tag' , data.courseTags )
        formData.append( 'whatYouWillLearn' , data.courseBenefits )
        formData.append( 'instructions' , data.courseRequirements )
        formData.append( 'thumbnail' , data.courseImage )
        // Case 1 : Editing course already present
        if( editCourse ){
            formData.append( 'courseId' , course._id)
            isFormUpdated() 
            ? result = await editCourseDetails( formData , token ) 
            : toast.error( "No Values updated so far" )
        }
        else{
            // Case 2: creating new course
            result = await createCourse( formData , token );
        }
        if(result){
            dispatch( setStep(2) );
            dispatch( setCourse( result ) );
        }
        setLoading(false);
    }

    useEffect( () => {
        if( editCourse ){
            setValue( "courseTitle" , course.courseName );
            setValue( "courseShortDesc" , course.courseDescription );
            setValue( "coursePrice" , course.price );
            setValue( "courseCategory" , course.category._id );
            setValue( "courseTags" , course.tag );
            setValue( "courseBenefits" , course.whatYouWillLearn );
            setValue( "courseRequirements" , course.instructions );
            setValue( "courseImage" , course.thumbnail );
        }
        // getCourseCategories();
    } , []);
  return (
    <div className='flex items-center justify-center'>
        <form
        onSubmit={ handleSubmit(onSubmit) }
        onKeyDown={ (e) => checkKeyDown(e) }
        className='w-full rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 text-white '>
            <div className=''>
                <label htmlFor='courseTitle'>Course Title<sup className='text-red'>*</sup></label>
                <input
                    id='courseTitle'
                    placeholder='Enter course title'
                    className='focus:outline-none w-full bg-richblack-700 rounded-md p-2 border-b border-richblack-300 text-richblack-300'
                    { ...register( 'courseTitle' , { required : true } ) }
                />
                {
                    errors.courseTitle && (
                        <span className='text-red'>Course Title is required</span>
                    )
                }
            </div>
            <div>
                <label htmlFor='courseShortDesc'>Course Short Description<sup className='text-red'>*</sup></label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter course description'
                    className='focus:outline-none min-h-[140px] w-full bg-richblack-700 rounded-md p-2 border-b border-richblack-300  text-richblack-300'
                    { ...register( 'courseShortDesc' , { required : true } ) }
                >
                </textarea>
                {
                    errors.courseShortDesc && (
                        <span className='text-red'>Course Description is required</span>
                    )
                }
            </div>
            <div className='relative'>
                <label htmlFor='coursePrice'>Course Price<sup className='text-red'>*</sup></label>
                <input
                    id='coursePrice'
                    placeholder='Enter course price'
                    className='focus:outline-none w-full bg-richblack-700 rounded-md px-10 py-2 border-b border-richblack-300  text-richblack-300'
                    { ...register( 'coursePrice' , { required : true } ) }
                />
                <HiOutlineCurrencyRupee className='absolute top-[30px] left-2  text-richblack-300' size={`1.75rem`}/>
                {
                    errors.coursePrice && (
                        <span className='text-red'>Course Price is required</span>
                    )
                }
            </div>
            <div className='flex flex-col'>
                <label htmlFor='courseCategory'>Course Category<sup className='text-red'>*</sup></label>
                <select 
                    id='courseCategory'
                    // defaultValue='' 
                    className='focus:outline-none bg-richblack-700 rounded-md p-2 border-b border-richblack-300  text-richblack-300'
                    { ...register( 'courseCategory' , { required : true } ) }
                >
                <option value="" selected="selected" hidden="hidden">Choose a Category</option>
                {/* <option value='' disabled></option> */}
                {
                    categories && categories.map( (category , index) => (
                        <option key={index} value={category._id}>
                            { category.name }
                        </option>
                    ))
                }
                </select>
                {
                    errors.courseCategory && (
                        <span className='text-red'>Course Category is required</span>
                    )
                }
            </div>
            <ChipInput 
                label = 'Enter Tags'
                name = 'courseTags'
                placeholder = 'Enter Tag and press enter'
                register = { register }
                errors = { errors }
                setValue = { setValue }
                getValues = { getValues }
            />
            <Upload
                label = 'Course Thumbnail'
                name = 'courseImage'
                register = { register }
                errors = { errors }
                setValue = { setValue }
            />
            <div>
                <label htmlFor='courseBenefits'>Benefits Of the Course<sup className='text-red'>*</sup></label>
                <textarea
                    id='courseBenefits'
                    placeholder='Enter course Benefits'
                    className='focus:outline-none min-h-[140px] w-full bg-richblack-700 rounded-md p-2 border-b border-richblack-300  text-richblack-300'
                    { ...register( 'courseBenefits' , { required : true } ) }
                >
                </textarea>
                {
                    errors.courseBenefits && (
                        <span className='text-red'>Course Benefits is required</span>
                    )
                }
            </div>
            <RequirementField
                label = 'Course Requirements/Instructions'
                name = 'courseRequirements'
                placeholder = 'Add Tag Course Requirements'
                register = { register }
                errors = { errors }
                setValue = { setValue }
                getValues = { getValues }
            />
            
            <div className='flex gap-2 justify-end text-sm font-semibold'>
                <div className='p-2 bg-richblack-300 rounded-md text-richblack-800 cursor-pointer'
                onClick={ () => {
                    dispatch( setStep(2) )
                    localStorage.setItem( 'step' , JSON.stringify(2) );
                } }>
                    Continue Without Saving
                </div>
                <button type='submit' 
                className='text-md p-2 bg-yellow-50 rounded-md text-richblack-800 cursor-pointer'>
                    { editCourse ? 'Save Changes' : 'Next' }
                </button>
            </div>
        </form>
    </div>
  )
}

export default InformationForm