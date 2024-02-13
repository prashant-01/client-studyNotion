import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from '../apis';
import { setUser } from "../../slices/profileSlice";
import FormData from 'form-data'
import { logout } from "./authAPI";
const { 
    UPDATE_DISPLAY_PICTURE_API , 
    UPDATE_PROFILE_API  , 
    DELETE_PROFILE_PICTURE_API  ,
    DELETE_PROFILE_API ,
    CHANGE_PASSWORD_API
} = settingsEndpoints

export const updatePicture = async ( data , token ) => {
    let result=null;
    try{
        const response = await apiConnector( 'PATCH' , UPDATE_DISPLAY_PICTURE_API , data , {
            'Content-Type': 'multipart/form-data' , 
            "authorization" : `Bearer ${token}` ,
        } );
        console.log('UPDATE PROFILE PICTURE API RESPONSE.....' , response);
        if( !response.data.success ){
            throw new Error( response.data.message );
        }
        toast.success('Image Successfully Uploaded!');
        result = response.data.data;
    }catch(error){
        console.log('UPDATE PROFILE PICTURE API ERROR..........' , error)
    }
    return result;
}

// export function updatePicture( token , image , navigate ){
//     return async ( dispatch ) => {
//         try{
            
//             const response = await apiConnector( 'PATCH' , UPDATE_DISPLAY_PICTURE_API , data , {
//                 'Content-Type': 'multipart/form-data' , 
//                 "authorization" : `Bearer ${token}` ,
//             } );
//             console.log('UPDATE PROFILE PICTURE API RESPONSE.....' , response);
//             if( !response.data.success ){
//                 throw new Error( response.data.message );
//             }
//             toast.success('Image Uploaded Successfull');
//             dispatch( setUser( response.data.data ) );
//         }catch(error){
//             console.log('UPDATE PROFILE PICTURE API ERROR..........' , error)
//             if( error.response.request.status === 403 ){
//                 toast.error(' Your session expired , please login again ')
//                 dispatch( logout( navigate ) );
//             }
//         }
//     }
// }


export const updateProfileInfo = async( data , token ) => {
    let result = null;
    try{
        const response = await apiConnector( 'PATCH' , UPDATE_PROFILE_API , data , {
            "authorization" : `Bearer ${token}` 
        })
        if( !response.data.success ){
            throw new Error( response.data.message );
        }
        console.log('UPDATE PROFILE API RESPONSE.....' , response.data.data);
        toast.success('Profile Details Updated Successfully');
        result = response.data.data
    }catch(error){
        console.log('UPDATE PROFILE API ERROR..........' , error)
    }
    return result;
}


export const updatePassword = async ( data , token ) => {
    try{
        const response = await apiConnector( 'POST' , CHANGE_PASSWORD_API , data , {
            "authorization" : `Bearer ${token}`
        })
        if( !response.data.success ){
            throw new Error( response.data.message );
        }
        console.log('CHANGE PASSWORD API RESPONSE.....' , response);
        toast.success('Password updated successfully!');
    }catch(error){
        console.log('CHANGE PASSWORD API...........' , error);
    }
}


export function deleteProfile( token , navigate ){
    return async ( dispatch ) => {
        try{
            const response = await apiConnector( 'DELETE' , DELETE_PROFILE_API , null , 
            { "authorization" : `Bearer ${token}` } );
            if( !response.data.success ){
                throw new Error( response.data.message );
            }
            console.log('DELETE PROFILE API RESPONSE.....' , response);
            toast.success('Profile Deleted Successfully');
            dispatch( setUser(null) );
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            navigate( '/' );
        }catch(error){
            console.log('DELETE PROFILE API ERROR........' , error);
            if( error.response.request.status === 403 ){
                toast.error(' Your session expired , please login again ')
                dispatch( logout( navigate ) );
            }
        }
    }
}