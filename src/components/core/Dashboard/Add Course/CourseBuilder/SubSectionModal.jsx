import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../Upload';
function SubSectionModal( { 
    modalData ,
    setModalData ,
    add = false ,
    view = false ,
    edit = false 
 } ) {
    const {
        register , 
        handleSubmit ,
        setValue ,
        getValues ,
        formState : { errors }
    } = useForm();

    const dispatch = useDispatch();
    const [ loading , setLoading ] = useState(false);
    const { course } = useSelector( (state) => state.course );
    const { token } = useSelector( (state) => state.auth );

    const checkKeyDown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    };

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append('courseId' , course._id );
        formData.append('sectionId' , modalData.sectionId );
        formData.append('subSectionId' , modalData._id );
        formData.append('title' , currentValues.lectureTitle );
        formData.append('description' , currentValues.lectureDesc );
        formData.append('videoUrl' , currentValues.lectureVideo );
        formData.append('timeDuration' , currentValues.lectureTime );
        // API call To Edit Sub Section
        setLoading(true);
        const result = await updateSubSection( formData , token );
        if( result ){
            dispatch( setCourse( result ) );
        }
        setModalData( null );
        setLoading(false);
    }

    const isFormUpdated = () => {
        const currentValues = getValues();
        if( currentValues.lectureTitle !== modalData.title || 
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl ||
            currentValues.lectureTime !== modalData.timeDuration ){
                return true;
            }
        return false;
    }

    const onSubmit = async (data) => {
        if( view ){
            return;
        }
        if( edit ){
            isFormUpdated() ? handleEditSubSection() : toast.error("No changes made so far");
        }
        if( add ){
            const formData = new FormData();
            formData.append( 'courseId' , course._id );
            formData.append( 'sectionId' , modalData );
            formData.append( 'title' , data.lectureTitle );
            formData.append( 'description' , data.lectureDesc );
            formData.append( 'videoUrl' , data.lectureVideo );
            formData.append( 'timeDuration' , data.lectureTime );
            // API call To Create Sub Section
            setLoading(true);
            const result = await createSubSection( formData , token );
            if( result ){
                dispatch( setCourse( result ) );
                localStorage.setItem('course' , JSON.stringify( result ));
            }
            setLoading(false);
        }
        setModalData( null );
    }

    useEffect( () => {
        if( view || edit ){
            setValue( 'lectureTitle' , modalData.title )
            setValue( 'lectureDesc' , modalData.description )
            setValue( 'lectureVideo' , modalData.videoUrl )
            setValue( 'lectureTime' , modalData.timeDuration )
        }
    } , [])
  return (
    <div className='z-20 fixed flex items-center justify-center inset-0 backdrop-blur-sm bg-black bg-opacity-25 overflow-auto'>
        <div className='bg-richblack-800 rounded-lg'>
            <div className='flex justify-between items-center w-full px-4 py-1 bg-richblack-700 border-b border-richblack-400'>
                <p>{ view && 'Viewing' } { edit && 'Editing' } { add && 'Adding' } Lecture</p>
                <button onClick={ () => { !loading && setModalData(null) } }>
                    <RxCross1/>
                </button>
            </div>
            <form onSubmit={ handleSubmit( onSubmit ) } onKeyDown={ (e) => checkKeyDown(e) }
            className='rounded-md border-richblack-700 bg-richblack-800 p-4 space-y-2 text-white'>
                <Upload
                    label='Lecture Video'
                    name='lectureVideo'
                    register={ register }
                    setValue={ setValue }
                    getValues={ getValues }
                    errors={ errors }
                    video={ true }
                    viewData = { view ? modalData.videoUrl : null }
                    editData = { edit ? modalData.videoUrl : null }
                />
                <div>
                    <label htmlFor='lectureTitle'>Lecture Title<sup className='text-red'>*</sup></label>
                    <input
                        id='lectureTitle'
                        placeholder='Enter lecture title'
                        className='w-full text-richblack-300 bg-richblack-700 rounded-md p-2 border-b border-richblack-300'
                        { ...register( 'lectureTitle' , { required : true } ) }
                    />
                    {
                        errors.lectureTitle && (
                            <span className='text-red'>Lecture title is required</span>
                        )
                    }
                </div>
                <div>
                    <label htmlFor='lectureTime'>Lecture Duration<sup className='text-red'>*</sup></label>
                    <input
                        id='lectureTime'
                        placeholder='Enter lecture title'
                        className='w-full text-richblack-300 bg-richblack-700 rounded-md p-2 border-b border-richblack-300'
                        { ...register( 'lectureTime' , { required : true } ) }
                    />
                    {
                        errors.lectureTime && (
                            <span className='text-red'>Lecture Duration is required</span>
                        )
                    }
                </div>
                <div>
                    <label htmlFor='lectureDesc'>Lecture Description<sup className='text-red'>*</sup></label>
                    <input
                        id='lectureDesc'
                        placeholder='Enter lecture description'
                        className='w-full text-richblack-300 bg-richblack-700 rounded-md p-2 border-b border-richblack-300'
                        { ...register( 'lectureDesc' , { required : true } ) }
                    >
                    </input>
                    {
                        errors.lectureDesc && (
                            <span className='text-red'>Lecture title is required</span>
                        )
                    }
                </div>
                <div className='flex justify-end'>
                    {
                        !view && (
                            <button 
                            disabled={loading}
                            type='submit' 
                            className='p-2 bg-yellow-50 text-richblack-800 font-semibold rounded-md'>
                                {
                                    loading ? "Saving..." : edit ? "Save Changes" : "Save"
                                }
                            </button>
                        )
                    }
                </div>
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal