import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { contactUsEndpoints } from "../apis";
import { logout } from "./authAPI";

export function contact( email , message , navigate ){
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');

        try{
            const response = await apiConnector( 'POST' , contactUsEndpoints.CONTACTUS_API , 
            { email , message } );

            if( !response.data.success ){
                throw new Error(response.data.message);
            }

            toast.success('You successfully contacted us!');
            navigate('/');
        }catch(error){
            console.log('Error in CONTACTUS_API.........' , error);
            if( error.response.request.status === 403 ){
                toast.error(' Your session expired , please login again ')
                dispatch( logout( navigate ) );
            }else{
                toast.error('Unable to create contact');
            }
        }

        toast.dismiss( toastId );
    }
}