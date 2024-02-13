import { apiConnector} from '../apiconnector'
import { catalogData } from '../apis';
const { CATALOG_PAGE_DATA_API } = catalogData;

export const getCatalogPageDetails = async ( categoryId ) => {
    let result=null;
    // const toastId = toast.loading( "Loading..." );
    try{
        const response = await apiConnector( 'GET' , CATALOG_PAGE_DATA_API+`${categoryId}` )
        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        console.log('CATALOG_PAGE_DATA_API response.........' , response);
        result = response.data.data;
    }catch(error){
        console.log('CATALOG_PAGE_DATA_API Error...........' , error);
    }
    // toast.dismiss(toastId);
    return result;
}