import toast from "react-hot-toast";
import { apiConnector } from '../apiconnector';
import { logout } from './authAPI'
import { profileEndpoints } from "../apis";
import { setLoading , setUser } from "../../slices/profileSlice";
const { GET_USER_DETAILS_API , 
        GET_USER_ENROLLED_COURSES_API ,
        GET_INSTRUCTOR_DATA } = profileEndpoints;


export function getUserDetails(token , navigate){
    return async ( dispatch ) => {
        dispatch( setLoading( true ) );
        try{
            const response = await apiConnector( 'GET' , GET_USER_DETAILS_API , null , {
                "Authorization" : `Bearer ${token}` ,
            });
            if( !response.data.success ){
                throw new Error(response.data.message);
            }

            toast.success('Data fetched');
            // navigate('');
        }catch(error){
            console.log('GET_USER_DETAILS_API ERROR.......' , error);
            if( error.response.request.status === 403 ){
                toast.error(' Your session expired , please login again ')
                dispatch( logout( navigate ) );
            }else{
                toast.error(' Error in Fetching User Details ');
            }
        }
        dispatch( setLoading( false ) );
    }
}

export async function getUserEnrolledCourses( token){
    // const toastId = toast.loading('Loading...');
    let result = [];
    try{
        const response = await apiConnector( 'PATCH' , GET_USER_ENROLLED_COURSES_API , null , {
            "authorization" : `Bearer ${token}` ,
        });
        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        console.log('GET_USER_ENROLLED_COURSES_API Response.....' , response);
        // toast.success('Courses fetched');
        result = response.data.data ;
        console.log(response)
    }catch(error){
        console.log('GET_USER_ENROLLED_COURSES_API ERROR.......' , error);
        // if( error.response.request.status === 403 ){
        //     toast.error(' Your session expired , please login again ')
        //     dispatch( logout( navigate ) );
        // }else{
        //     toast.error(' Error in Fetching User Courses ');
        // }
    }
    // toast.dismiss( toastId );
    return result;
}

export const getInstructorData = async ( token ) => {
    let result=null;
    try{
        const response = await apiConnector('GET' , GET_INSTRUCTOR_DATA , null , {
            "authorization" : `Bearer ${token}` ,
        });

        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        console.log('GET_INSTRUCTOR_DATA Response.....' , response);
        result = response.data.data ;
        console.log(response)
    }catch(error){
        console.log('GET_INSTRUCTOR_DATA Response.....' , error);
    }
    return result;
}