import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete, MdEdit, MdOutlineEditNote } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { IoIosArrowForward , IoIosArrowDown } from "react-icons/io";
import { CgPlayListAdd } from 'react-icons/cg';
function NestedView( { handleChangeEditSectionName } ) {
    const dispatch = useDispatch();
    const { course } = useSelector( state => state.course );
    const { token } = useSelector( state => state.auth );

    const [ addSubSection , setAddSubSection ] = useState(null);
    const [ viewSubSection , setViewSubSection ] = useState(null);
    const [ editSubSection , setEditSubSection ] = useState(null);
    const [ confirmationModal , setConfirmationModal ] = useState(null);

    const [ activeSection , setActiveSection ] = useState([]);
    // API call to Delete Section
    const handleDeleteSection = async ( sectionId ) => {
        const formData = new FormData();
        formData.append( 'sectionId' , sectionId );
        formData.append( 'courseId' , course._id );
        const result = await deleteSection( formData , token );
        if( result ){
            dispatch( setCourse( result ) );
            localStorage.setItem( 'course' , JSON.stringify( result ) );
        }
        setConfirmationModal(null);
        
    }
    // API call to Delete Sub Section
    const handleDeleteSubSection = async ( subSectionId , sectionId ) => {
        const formData = new FormData();
        formData.append( 'subSectionId' , subSectionId );
        formData.append( 'sectionId' , sectionId );
        formData.append( 'courseId' , course._id );
        
        const result = await deleteSubSection( formData , token );
        if( result ){
            dispatch( setCourse( result ) );
            localStorage.setItem( 'course' , JSON.stringify( result ) );
        }
        setConfirmationModal(null);
        setAddSubSection(null);
        setViewSubSection(null);
        setEditSubSection(null)
    }

    // waise to hmne <details> tag ka use krke open close achieve kr liye h
    // but to toggle icons its not possible with <details> bcoz 1 ka update sab m transfer ho jara h
    // so to achieve this we will create a function below
    const handleIconDownOrRight = ( id ) => {
        activeSection.includes(id) 
        ? setActiveSection( activeSection.filter( (s) => s !== id ) )
        : setActiveSection( [ ...activeSection , id ] );
    }
  return (
    <div className='text-white rounded-lg bg-richblack-700 px-5 py-6'>
        <div>
            {
                course?.courseContent?.map( ( section ) => (
                    <details key={ section._id }  className='mb-4'>
                        <summary className='flex items-center justify-between gap-x-3 border-b-2 border-white'>
                            <div className='flex items-center gap-x-3 cursor-pointer' onClick={ () => handleIconDownOrRight(section._id) }>
                                { 
                                    activeSection.includes( section._id ) 
                                    ? <IoIosArrowDown className='text-richblack-300'/>
                                    : <IoIosArrowForward className='text-richblack-300'/>
                                }
                                <p>{ section.sectionName }</p>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <div className='group relative'>
                                    <div className='invisible group-hover:visible absolute -top-7 transition-all duration-200 ease-in-out bg-yellow-50 text-richblack-900 text-xs p-1 rounded-md font-semibold'>
                                        <div className='absolute top-[19px] left-3 bg-yellow-50 rotate-45 h-2 w-2'></div>
                                        edit
                                    </div>
                                    
                                    <button
                                    onClick={ () => handleChangeEditSectionName( section._id , section.sectionName ) }>
                                        <MdEdit className='text-white' size={`1.1rem`}/>
                                    </button>
                                </div>
                                <div className='group relative'>
                                    <div className='invisible group-hover:visible absolute -top-7 transition-all duration-200 ease-in-out bg-yellow-50 text-richblack-900 text-xs p-1 rounded-md font-semibold'>
                                        <div className='absolute top-[19px] left-3 bg-yellow-50 rotate-45 h-2 w-2'></div>
                                        delete
                                    </div>
                                    
                                    <button
                                    onClick={ () => setConfirmationModal({
                                        text1 : 'Delete this Section' ,
                                        text2 : 'All the lectures in this section will be deleted' ,
                                        btn1Text : 'Delete' ,
                                        btn2Text : 'Cancel' ,
                                        btn1Handler : () => handleDeleteSection( section._id ) ,
                                        btn2Handler : () => setConfirmationModal(null)
                                }) }>
                                    <RiDeleteBin5Line className='text-white' size={`1.1rem`}/>
                                </button>
                                </div>
                                
                                {/* <span className='text-richblack-300'>|</span>
                                <MdArrowDropDown className='text-white' size={`1.5rem`}/> */}
                            </div>
                        </summary>
                        <div>
                            {
                                section.subSection.map( (data) => (
                                    <div key={ data._id }
                                    className='ml-5 mt-1 flex items-center justify-between gap-x-3 border-b text-richblack-300'>
                                        <div className='flex items-center gap-x-3 cursor-pointer'
                                        onClick={ () => {
                                            setEditSubSection(null)
                                            setViewSubSection({ ...data })
                                        } }>
                                            
                                            <div className='group relative'>
                                                <div className='invisible group-hover:visible min-w-max absolute -top-7 bg-yellow-50 text-richblack-900 text-xs p-1 rounded-md font-semibold'>
                                                    <div className='absolute top-[19px] left-8 bg-yellow-50 rotate-45 h-2 w-2'></div>
                                                    view lecture
                                                </div>
                                                <div className='flex gap-x-3 items-center'>
                                                    <IoIosArrowForward className='text-richblack-300'/>
                                                    <div className='text-sm'>
                                                        { data.title }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button onClick={ () => {
                                                setViewSubSection(null);
                                                setEditSubSection( { ...data , sectionId : section._id } )
                                            } }>
                                                <MdOutlineEditNote className='text-richblack-300' size={`1.25rem`}/>
                                            </button>
                                            <button 
                                            onClick={ () => setConfirmationModal({
                                                text1 : 'Delete this Sub Section' ,
                                                text2 : 'Selected lecture will be deleted' ,
                                                btn1Text : 'Delete' ,
                                                btn2Text : 'Cancel' ,
                                                btn1Handler : () => handleDeleteSubSection( data._id , section._id ) ,
                                                btn2Handler : () => setConfirmationModal(null)
                                            }) }>
                                                <MdDelete  className='text-richblack-300' size={`1.15rem`}/>
                                            </button>
                                        </div>
                                    </div>
                                ) )
                            }
                            <button
                            onClick={ () => setAddSubSection( section._id ) }
                            className='mt-2 ml-4 flex items-center justify-center gap-x-1 text-yellow-50'>
                                <CgPlayListAdd size={`1.25rem`}/>
                                <p className='text-sm'>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ) )
            }
        </div>
        {
            addSubSection ? <SubSectionModal modalData = { addSubSection } setModalData = { setAddSubSection } add = { true } /> 
            : viewSubSection ? <SubSectionModal modalData = { viewSubSection } setModalData = { setViewSubSection } view = { true } />
            : editSubSection && <SubSectionModal modalData = { editSubSection } setModalData = { setEditSubSection } edit = { true } />
        }
        {
            confirmationModal && <ConfirmationModal modalData={ confirmationModal } />
        }
    </div>
  )
}

export default NestedView