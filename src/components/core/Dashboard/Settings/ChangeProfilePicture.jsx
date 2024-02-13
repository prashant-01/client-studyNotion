import React, { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { updatePicture } from '../../../../services/operations/settingsAPI';
import { setUser } from '../../../../slices/profileSlice';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function ChangeProfilePicture() {
    const dispatch = useDispatch();
    const { user } = useSelector( (state) => state.profile )
    const { token } = useSelector( (state) => state.auth )

    const [ loading , setLoading ] = useState(false);

    const fileInput = useRef();
    const selectFile = () => {
        document.getElementById('imageFile').click();
        // fileInput.current.select();
    }
    const [selectedImage, setSelectedImage] = useState(null);

    const {
        register ,
        handleSubmit ,
        setValue ,
        getValues ,
        formState : { errors }
    } = useForm();

    const isPictureUpdated = () => {
        if( getValues('imageFile') === null)return false
        return getValues('imageFile')[0] ? true : false ;
    }
    const submitHandler = async (data) => {
        setLoading(true);
        if( isPictureUpdated() ){
            const formData = new FormData();
            formData.append( 'displayPicture' , data.imageFile[0] );
            try{
                const updatedUserDetails = await updatePicture( formData , token )
                if( updatedUserDetails ){
                    dispatch( setUser( updatedUserDetails ) );
                    setValue('imageFile' , null);
                }
            }catch(error){
                console.log(error);
            }
        }
        else{
            toast.error( 'No image selected so far!' );
        }
        setLoading(false);
    }
  return (
    <div className='flex bg-richblack-800 px-6 py-4 rounded-md gap-6 '>
        <img src={ user.image } className='h-[80px] w-[80px] object-cover aspect-square rounded-full' />
        <div className='flex flex-col gap-4'>
        <p className='font-semibold'>Change Profile Picture</p>
        <form onSubmit={ handleSubmit(submitHandler) } className='flex gap-6 font-bold'>
            <input 
                type="file" 
                id="imageFile" 
                className='hidden'
                // ref={fileInput} 
                // onChange={ (e) => setSelectedImage( e.target.files[0] ) }
                { ...register( 'imageFile' ) }
            />
            <button type="button" disabled={ loading } 
            className='bg-richblack-500 p-2 rounded-md' 
            onClick={ selectFile }>
                Select
            </button>
            <button disabled={ loading }
            type='submit' className='flex gap-2 items-center justify-center bg-yellow-50 p-2 text-richblack-700 rounded-md'>
                { loading ? "Uploading..." : "Upload" }
                <FiUpload />
            </button>
        </form>
        </div>
    </div>
  )
}

export default ChangeProfilePicture