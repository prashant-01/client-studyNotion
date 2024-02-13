import React , { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import { catalogData } from '../../../../services/apis';
function Upload( { label , name , register , errors , setValue , 
    getValues , video=false , viewData=null , editData=null } ) {
    
    const { course } = useSelector( (state) => state.course )
    const [ filePreview , setFilePreview ] = useState(null);
    const [ file , setFile ] = useState( video ? ( viewData || editData ) : course ? course.thumbnail : null )

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((f) => {
            setFilePreview( URL.createObjectURL(f) )
            setFile( f );
        })
    }, []);

    const { getRootProps , getInputProps , isDragActive } = useDropzone({
        onDrop ,
        accepts : { 
            'image/*' : [] ,
            'video/*' : []
        } ,
        multiple : false
    })
    
    useEffect( () => {
        setValue( name , file );
    } , [ file ]);

    useEffect( () => {
        { register( `${ name }` , { required : true } ) }
        // { ( viewData || editData ) && setFilePreview( URL.createObjectURL( viewData ) ) }
    } , []);
    return (
    <div className='text-richblack-300'>
        <label htmlFor={ name } className='text-white'>{ label }<sup className='text-red'>*</sup></label>
        <div {...getRootProps( {
            className : 'w-full h-[200px] border border-dashed border-richblack-300 cursor-pointer rounded-md flex items-center justify-center'
        } )}>
            <input {...getInputProps({
                name : `${ name }`
            })} />
            {
                ( filePreview || file ) ? video 
                ? (
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <video src={ filePreview || file } controls className='w-[380px] h-[180px] rounded-md object-cover'></video>
                    </div>
                )
                : (
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <img src={ filePreview || file } className='rounded-md object-cover w-[380px] h-[180px]'/>
                    </div>
                ) 
                : isDragActive ? <p>Drop the { video ? 'video ' : 'image ' }here ...</p> 
                : (
                <div className='flex flex-col gap-2 items-center justify-center px-4'>
                    <IoCloudUploadOutline className='text-yellow-50' size={`3rem`}/>
                    <p>Drag 'n' drop { video ? 'video ' : 'image ' }here, or click to <span className='text-yellow-50'>Browse</span> a file</p>
                </div>
                )
            }
        </div>
        {
            !viewData && (
                <div className='flex items-center justify-center'>
                    <p className='underline text-sm text-richblack-300 cursor-pointer flex gap-1 items-center'
                        onClick={ () => {
                            setFilePreview(null)
                            setFile(null);
                            setValue( name , null )
                            
                        } }>Change It<MdEdit/>
                    </p>
                </div>
            )
        }
        {
            errors[name] && (
                <span className='text-red'>{ video ? 'Video ' : 'Thumbnail ' } is required</span>
            )
        }
    </div>
    )
}

export default Upload