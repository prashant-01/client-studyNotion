import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';

function UploadThumbnail( { label , name , register , errors , setValue , isSubmit = false ,  } ) {
    const [ imagePreview , setImagePreview ] = useState(null);
    const [ image , setImage ] = useState(null);
    
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            setImagePreview( URL.createObjectURL(file) )
            setImage( file );
        })
    }, [])
    const { getRootProps , getInputProps , isDragActive } = useDropzone({
        onDrop ,
        accepts : {
            "image/*" : [] ,
            "video/*" : []
        } ,
        multiple : false
    })
    useEffect( () => {
        { register( `${ name }` , { required : true } ) }
    } , [])
    useEffect( () => {
        setValue( name , image );
    } , [image])
    useEffect( () => {
        setImagePreview(null);
        setImage(null);
    } , [ isSubmit ])
  return (
    <div className='text-richblack-300'>
        <div { ...getRootProps() } 
            className='w-full h-[250px] border border-dashed border-richblack-300 rounded-md flex items-center justify-center'>
            <input {...getInputProps({
                name : `${ name }`
            })} />
            {
                imagePreview ?
                <img src={ imagePreview } className='w-full h-[248px] rounded-md object-cover'/>
                : (
                    isDragActive ?
                    <p className='text-md'>Drop the files here ...</p> :
                    <p className='text-md'>Drag 'n' drop file here or <span className='text-yellow-25 font-semibold'>Browse</span></p>
                )
            }
        </div>
        {
            errors[name] && (
                <span className='text-red'>Course Thumbnail is required</span>
            )
        }
    </div>
  )
}

export default UploadThumbnail