import toast from 'react-hot-toast';
import {apiConnector} from "../apiconnector"
import { studentsEndpoints } from '../apis';
import rzpLogo from "../../assets/Logos/razorpay-icon.png"
import { setPaymentLoading } from '../../slices/courseSlice';
import { resetCart } from '../../slices/cartSlice';
const {
    CAPTURE_PAYMENT_API ,
    VERIFY_PAYMENT_API  ,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentsEndpoints;

function loadScript( src ){
    return new Promise(( resolve , reject ) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
} 

export async function buyCourse( courses , userDetails , token , navigate , dispatch ){
    const toastId = toast.loading( "Initiating Payment..." );
    try{
        // As the buy button is clicked by user then load the script as mentioned by Razorpay website
        const res = await loadScript( "https://checkout.razorpay.com/v1/checkout.js" );
        if( !res ){
            toast.error("Razorpay SDK failed");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector( "POST" , CAPTURE_PAYMENT_API , {
            courses : courses
        } , { 
            "authorization" : `Bearer ${token}`
        });

        if( !orderResponse.data.success ){
            throw new Error( orderResponse.data.message );
        }

        // options
        console.log(orderResponse)
        const options = {
            key : "rzp_test_8Z9iI7i2Zp1U31" ,
            order_id : orderResponse.data.data.id,
            currency : orderResponse.data.data.currency,
            amount : orderResponse.data.data.amount ,
            name : "StudyNotion" ,
            description : "Thank You For Purchasing our Course",
            image : rzpLogo ,
            prefill : {
                name : userDetails.firstname ,
                email : userDetails.email
            } ,
            // handler m vo functions mntioned hote h jo order/payment successfully hone ke baad chlenge
            handler : function(response){
                verifyPayment( { ...response , courses } , token , navigate , dispatch )
                sendPaymentSuccessEmail( response , orderResponse.data.data.amount , token );
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on( 'payment.failed' , (response) => {
            toast.error("Oops! Payment Failed...");
            console.log('Payment failed........' , response.error);
        } )
    }catch(error){
        console.log('Buy Course Error........' , error);
        toast.error("Payment Failed")
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail( response , amount , token ){
    try{
        await apiConnector( "POST" , SEND_PAYMENT_SUCCESS_EMAIL_API , {
            orderId : response.razorpay_order_id ,
            paymentId : response.razorpay_payment_id ,
            amount : amount
        } , { "authorization" : `Bearer ${token}` })
    }catch(error){
        console.log('send Payment Email Error........' , error);
    }
}

async function verifyPayment( bodyData , token , navigate , dispatch  ){
    const toastId = toast.loading("Verifying Payment...");
    dispatch( setPaymentLoading( true ) );
    localStorage.setItem( "paymentLoading" , true );
    try{
        const response = await apiConnector( "POST" , VERIFY_PAYMENT_API , bodyData , { 
        "authorization" : `Bearer ${token}` } )

        if( !response.data.success ){
            throw new Error( response.data.message );
        }
        console.log("Verify Payment Success........" , response);
        toast.success("Verify Payment Successful");
        navigate( '/dashboard/enrolled-courses' );
        dispatch( resetCart() );
    }catch(error){
        console.log("Verify Payment Error......." , error);
    }
    dispatch( setPaymentLoading( false ) );
    localStorage.removeItem( "paymentLoading");
    toast.dismiss(toastId);
}