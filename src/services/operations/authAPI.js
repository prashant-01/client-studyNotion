import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading , setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    SENDOTP_API  ,
    SIGNUP_API ,
    LOGIN_API  ,
    RESETPASSTOKEN_API ,
    RESETPASSWORD_API ,
} = endpoints;

export function sendOtp( email , navigate ){
    return async ( dispatch ) => {
        const toastId = toast.loading('Loading...');
        dispatch( setLoading(true) );
        try{
            const response = await apiConnector( 'POST' , SENDOTP_API , {
                email
            } )

            if( !response.data.success ){
                throw new Error( response.data.message );
            }

            console.log('SENDOTP_API response.......' , response);
            toast.success('OTP sent Successfully');
            navigate('/verify-email');
        }catch(error){
            console.log("SENDOTP_API Error........" , error);
            toast.error('OTP not sent');
            navigate('/login');
        }
        dispatch( setLoading(false) );
        toast.dismiss(toastId);
    }
}

export function signUp(
    firstName ,
    lastName ,
    email ,
    createPassword ,
    confirmPassword ,
    accountType ,
    otp ,
    navigate ){
    return async ( dispatch ) => {
        const toastId = toast.loading('Loading...');
        dispatch( setLoading(true) );

        try{
            const response = await apiConnector( 'POST' , SIGNUP_API , {
                firstName ,
                lastName ,
                email ,
                createPassword ,
                confirmPassword ,
                accountType ,
                otp
            } );
            
            if( !response.data.success ){
                throw new Error(response.data.message);
            }
            console.log( 'SIGNUP_API response.......' , response)
            toast.success('Signup Successfull');
            navigate('/login');
        }catch(error){
            console.log('SIGNUP_API Error.........' , error);
            toast.error('Signup Failed');
            navigate('/signup')
        }

        dispatch( setLoading(false) );
        toast.dismiss(toastId)
    }
}

export function login( email , password , navigate ){
    return async ( dispatch ) => {
        const toastId = toast.loading('Loading...');
        dispatch( setLoading(true) );

        try{
            const response = await apiConnector( 'POST' , LOGIN_API , {
                email ,
                password , 
            } )
            console.log('LOGIN API RESPONSE.....' , response);
            if( !response.data.success ){
                throw new Error( response.data.message );
            }
            toast.success('Login Successfull');
            dispatch( setToken( response.data.data.token ) )
            //console.log(response.data.data);
            dispatch( setUser( response.data.data ) )

            localStorage.setItem( 'token' , JSON.stringify( response.data.data.token ) )
            localStorage.setItem( 'user' , JSON.stringify( response.data.data ) )
            navigate('/dashboard/my-profile')
        }catch(error){
            console.log('Login API error......' , error);
            toast.error('Login Failed');
        }

        dispatch( setLoading(false) );
        toast.dismiss(toastId)
    }
}

export function logout( navigate ){
    return ( dispatch ) => {
        dispatch( setToken( null ) );
        dispatch( setUser( null ) );
        dispatch( resetCart() );
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('allReviews');
        localStorage.removeItem('totalAmount');
        localStorage.removeItem('totalItems');
        localStorage.removeItem('courseSectionData');
        localStorage.removeItem('courseEntireData');
        localStorage.removeItem('completedLectures');
        localStorage.removeItem('totalNoOfLectures');
        toast.success('Logged out Successfully');
        navigate('/');
    }
}

export function getPasswordResetToken( email , setEmailSent , navigate ){
    return async ( dispatch ) => {
        const toastId = toast.loading('Loading...');
        dispatch( setLoading(true) );
        
        try{
            const response = await apiConnector( 'POST' , RESETPASSTOKEN_API , { email } );
            if( !response.data.success ){
                throw new Error( response.data.message );
            }
            console.log('RESET PASSWORD TOKEN RESPONSE..........' , response);
            toast.success('Reset email sent');
            setEmailSent( true );
        }catch(error){
            console.log('RESET PASSWORD TOKEN API Error.........' , error);
            toast.error('Email not sent');
        }

        dispatch( setLoading(false) );
        toast.dismiss(toastId);
    }
}

export function resetPassword( newPassword , confirmNewPassword , token , navigate){
    return async ( dispatch ) => {
        const toastId = toast.loading('Loading...');
        dispatch( setLoading(true) );
        
        try{
            const response = await apiConnector( 'POST' , RESETPASSWORD_API , {
                newPassword ,
                confirmNewPassword ,
                token ,
            } );

            if( !response.data.success ){
                throw new Error(response.data.message);
            }

            console.log('RESET PASSWORD API Response .................' , response);
            toast.success('Password reset successful');
            navigate('/login');
        }catch(error){
            console.log('RESET PASSWORD API Error.....' , error);
            toast.error('Password not reset');
            navigate('/login');
        }

        dispatch( setLoading(false) );
        toast.dismiss(toastId);
    }
}