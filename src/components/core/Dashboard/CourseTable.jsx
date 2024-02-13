import React, { useState } from 'react'
import { FaRupeeSign } from 'react-icons/fa';
import { MdModeEdit, MdOutlinePublishedWithChanges } from 'react-icons/md';
import { RiDeleteBin6Line, RiDraftLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { deleteCourse, fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import ConfirmationModal from '../../common/ConfirmationModal'
import { IoTimeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
function CourseTable({ courses , setCourses , totalDuration }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector( (state) => state.auth );
    const [ loading , setLoading ] = useState(false);
    const [ confirmationModal , setConfirmationModal ] = useState(null);

    const handleDeleteCourse = async ( courseId ) => {
        setLoading( true );

        // const formData = new FormData();
        // formData.append('courseId' , courseId);
        await deleteCourse( { courseId : courseId } , token );
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses( result );
        }

        setLoading( false );
        setConfirmationModal(null);
    }
  return (
    <div className='text-white mb-16'>
        <Table className='border border-richblack-700 lg:w-[850px]'>
            <Thead className='border-b border-richblack-700'>
                <Tr className='flex px-[25px] '>
                    <Th className='lg:w-[500px] py-4'>Courses</Th>
                    <Th className='lg:w-[100px] py-4'>Duration</Th>
                    <Th className='lg:w-[100px] py-4'>Price</Th>
                    <Th className='lg:w-[100px] py-4'>Actions</Th>
                </Tr>
            </Thead>
            <Tbody className='border border-richblack-700'>
                {
                    courses.length === 0 ? (<Tr>
                        <Td className='flex items-center justify-center p-3 text-xl'>You have not created any course yet</Td>
                    </Tr>)
                    : (
                        courses.map( (course , index) => (
                            <Tr key={ course._id } className= "flex border-b  border-richblack-700 px-[25px] py-6">
                                <Td colSpan={2} className='flex gap-x-4 items-center  lg:w-[500px]'>
                                    <img src={ course.thumbnail } className='h-[150px] w-[220px] rounded-lg aspect-square object-cover'/>
                                    <div className='flex flex-col gap-2'>
                                        <p>{ course.courseName }</p>
                                        <p className='text-sm text-richblack-300 text-wrap pr-3'>{ course.courseDescription }</p>
                                        <p>Created At : { new Date( course.createdAt ).toDateString() } </p>
                                        <p className={`flex gap-2 items-center text-sm rounded-md max-w-min px-2 py-1 
                                            ${ course.status === 'Draft' ? 'bg-richblack-400' : course.status === 'Approval Pending' ? 'bg-yellow-100' : 'bg-caribbeangreen-400'}`}>
                                            { 
                                                course.status === 'Draft' ? <RiDraftLine/> 
                                                : course.status === 'Approval Pending' ? <IoTimeOutline/> 
                                                : <MdOutlinePublishedWithChanges/>
                                            }
                                            { course.status }
                                        </p>
                                    </div>
                                </Td>
                                <Td className='flex items-center justify-center  lg:w-[100px]'>{ totalDuration[index] || '0 : 00' } mins</Td>
                                <Td className='flex items-center justify-center  lg:w-[100px]'>
                                    <FaRupeeSign/>
                                    <span>{ course.price }</span>
                                </Td>
                                <Td className='flex items-center justify-center gap-4  lg:w-[100px]'>
                                    <div className='group relative'>
                                        <div className='invisible group-hover:visible absolute -top-7 transition-all duration-200 ease-in-out bg-yellow-50 text-richblack-900 text-xs p-1 rounded-md font-semibold'>
                                            <div className='absolute top-[19px] left-3 bg-yellow-50 rotate-45 h-2 w-2'></div>
                                            edit
                                        </div>
                                        <button 
                                        disabled={ loading }
                                        onClick={ () => navigate(`/dashboard/edit-course/${ course._id }`) }>
                                            <MdModeEdit size={`1.25rem`}/>
                                        </button>
                                    </div>
                                    
                                    <div className='group relative'>
                                        <div className='invisible group-hover:visible absolute -top-7 transition-all duration-200 ease-in-out bg-yellow-50 text-richblack-900 text-xs p-1 rounded-md font-semibold'>
                                            <div className='absolute top-[19px] left-3 bg-yellow-50 rotate-45 h-2 w-2'></div>
                                            delete
                                        </div>
                                        <button 
                                        disabled={ loading } 
                                        onClick={ () => {
                                            setConfirmationModal( {
                                                text1 : 'Are you sure you want to delete this course ?' ,
                                                text2 : 'This course will be removed from your list.' ,
                                                btn1Text : 'Delete' ,
                                                btn2Text : 'Cancel' ,
                                                btn1Handler : !loading ? () => handleDeleteCourse( course._id ) : ()=>{} ,
                                                btn2Handler : !loading ? () => setConfirmationModal(null) : ()=>{}
                                            } )
                                        } }>
                                            <RiDeleteBin6Line  size={`1.25rem`}/>
                                        </button>
                                    </div>
                                    
                                </Td>
                            </Tr>
                        ) )
                    )
                }
            </Tbody>
        </Table>
        { confirmationModal && <ConfirmationModal modalData={ confirmationModal }/> }
    </div>
  )
}

export default CourseTable