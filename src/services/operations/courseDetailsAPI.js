import { toast } from 'react-hot-toast'
import { apiConnector } from '../apiconnector';
import { courseEndpoints } from '../apis';
const {
    GET_PUBLISHED_COURSES_API ,
    COURSE_DETAILS_API  ,
    EDIT_COURSE_API  ,
    COURSE_CATEGORIES_API  ,
    CREATE_COURSE_API ,
    CREATE_SECTION_API  ,
    CREATE_SUBSECTION_API  ,
    UPDATE_SECTION_API  ,
    UPDATE_SUBSECTION_API  ,
    DELETE_COURSE_API  ,
    DELETE_SECTION_API  ,
    DELETE_SUBSECTION_API  ,
    LECTURE_COMPLETION_API  ,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED  ,
    GET_ALL_INSTRUCTOR_COURSES_API ,
    CREATE_RATING_API ,
    ALL_REVIEWS_API ,
    IS_REVIEW_MADE_API ,
    MARK_COURSE_COMPLETE ,
    UPDATE_COURSE_STATS ,
    GET_COURSE_DETAILS_WITH_DURATION ,
    UPDATE_COURSE_STATUS
} = courseEndpoints;

// Course related 
export const getAllCourses = async () => {
    const toastId = toast.loading('Loading...');
    try{

    }catch(error){

    }
    toast.dismiss(toastId);
}
export const fetchCourseDetails = async ( courseId , token ) => {
    let result=null;
    // const toastId = toast.loading('Loading...');
    try{
        const response = await apiConnector( "GET" , COURSE_DETAILS_API + courseId , null , {
            "authorization" : `Bearer ${token}` ,
        } )
        if(!response.data.success){
            throw new Error( response.data.message );
        }
        result = response.data.data;
        console.log("COURSE_DETAILS_API Resposne.........." , response);
    }catch(error){
        console.log('COURSE_DETAILS_API ERROR.........' , error);
    }
    // toast.dismiss(toastId);
    return result;
}

export const fetchCourseDetailsWithDuration = async ( courseId , token ) => {
    let result=null;
    // const toastId = toast.loading('Loading...');
    try{
        const response = await apiConnector( "PATCH" , GET_COURSE_DETAILS_WITH_DURATION + courseId , null , {
            "authorization" : `Bearer ${token}` ,
        } )
        if(!response.data.success){
            throw new Error( response.data.message );
        }
        result = response.data.data;
        console.log("GET_COURSE_DETAILS_WITH_DURATION Resposne.........." , response);
    }catch(error){
        console.log('GET_COURSE_DETAILS_WITH_DURATION ERROR.........' , error);
    }
    // toast.dismiss(toastId);
    return result;
}


export const fetchCompleteCourseDetails = async ( courseId , token ) => {
    let result = null ;
    const toastId = toast.loading('Loading...');
    try{
        const response = await apiConnector( 'GET' , GET_FULL_COURSE_DETAILS_AUTHENTICATED + `${ courseId }` , null ,{
            "authorization" : `Bearer ${token}` ,
        } )
        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        console.log('GET_FULL_COURSE_DETAILS_AUTHENTICATED response.........' , response);
        result = response.data.data;
    }catch(error){
        console.log('GET_FULL_COURSE_DETAILS_AUTHENTICATED error.........' , error);
    }
    toast.dismiss(toastId);
    return result
}

export const fetchInstructorCourses = async ( token ) => {
    let result=null;
    // const toastId = toast.loading('Loading...');
    try{
        const response = await apiConnector( 'GET' , GET_ALL_INSTRUCTOR_COURSES_API , null , {
            "authorization" : `Bearer ${token}` ,
        } );

        if( !response.data.success ){
            throw new Error(response.error.message);
        }
        console.log('GET_ALL_INSTRUCTOR_COURSES_API..........' , response);
        result = response.data.data ;
    }catch(error){
        console.log('GET_ALL_INSTRUCTOR_COURSES_API Error.........' , error);
    }
    // toast.dismiss(toastId);
    return result;
}

export const fetchCourseCategories = async () => {
    // const toastId = toast.loading('Loading...');
    let result=null;
    try{
        const response = await apiConnector( 'GET' , COURSE_CATEGORIES_API );
        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        console.log('COURSE_CATEGORIES_API Response.....' , response);
        result = response.data.data;
    }catch(error){
        console.log('COURSE_CATEGORIES_API Error.....' , error);
    }
    // toast.dismiss(toastId);
    return result;
}

export const createCourse = async ( data , token ) => {
    let result = null ;
    // const toastId = toast.loading('Loading...');
    try{
        const response = await apiConnector( 'POST' , CREATE_COURSE_API , data , {
            'Content-Type': 'multipart/form-data' , 
            "authorization" : `Bearer ${token}` ,
        } )

        if( !response.data.success ){
            throw new Error( response.data.message );
        }

        console.log( 'CREATE_COURSE_API Response............' , response );
        result = response.data.data ;
    }catch(error){
        console.log('CREATE_COURSE_API Error........' , error)
        toast.error(error.message)
    }
    // toast.dismiss(toastId);
    return result;
}

export const editCourseDetails = async ( data , token ) => {
    let result = null ;
    // const toastId = toast.loading('Loading...');
    try{
        const response = await apiConnector( 'PATCH' , EDIT_COURSE_API , data , {
            'Content-Type': 'multipart/form-data' , 
            "authorization" : `Bearer ${token}` ,
        } )
        if( !response.data.success ){
            throw new Error( response.data.message );
        }

        console.log( 'UPDATE_COURSE_API Response............' , response );
        // toast.success("Details Updated Successfully")
        result = response.data.data ;
    }catch(error){
        console.log('CREATE_COURSE_API Error........' , error)
        toast.error(error.message)
    }
    // toast.dismiss(toastId);
    return result;
}

export const updateCourseStatus = async ( data , token ) => {
    let result = false ;
    // const toastId = toast.loading('Loading...');
    try{
        const response = await apiConnector( 'PATCH' , UPDATE_COURSE_STATUS , data , {
            "authorization" : `Bearer ${token}` ,
        } )
        if( !response.data.success ){
            throw new Error( response.data.message );
        }

        console.log( 'UPDATE_COURSE_STATUS_API Response............' , response );
        // toast.success("Details Updated Successfully")
        result = true ;
    }catch(error){
        console.log('UPDATE_COURSE_STATUS_API Error........' , error)
        toast.error(error.message)
    }
    // toast.dismiss(toastId);
    return result;
}

export const deleteCourse = async ( data , token ) => {
    const toastId = toast.loading('Loading...');
    try{
        console.log(data)
        const response = await apiConnector('DELETE' , DELETE_COURSE_API , data , {
            "authorization" : `Bearer ${token}` ,
        })

        if(!response.data.success){
            throw new Error(response.success.message);
        }

        console.log('DELETE_COURSE_API Response...........' , response);
        toast.success('Course deleted Successfully');
    }catch(error){
        console.log('DELETE_COURSE_API Error...........' , error);
    }
    toast.dismiss(toastId);
}

// Section related
export const createSection = async ( data , token ) => {
    let result = null ;
    // const toastId = toast.loading('Loading...');
    try{
        const courseId = data.get( 'courseId' ) 
        const response = await apiConnector( 'POST' , CREATE_SECTION_API + courseId , data , { 
            "authorization" : `Bearer ${token}` 
        })
        if( !response.data.success ){
            throw new Error( response.data.message );
        }

        console.log( 'CREATE_SECTION_API Response............' , response );
        toast.success("Section Added Successfully");
        result = response.data.data ;
    }catch(error){
        console.log('CREATE_SECTION_API Error........' , error)
        toast.error(error.message)
    }
    // toast.dismiss(toastId);
    return result;
}

export const updateSection = async ( data , token ) => {
    let result = null ;
    // const toastId = toast.loading('Loading...');
    try{
        const sectionId = data.get('sectionId');
        const response = await apiConnector( 'PATCH' , UPDATE_SECTION_API + sectionId , data , { 
            "authorization" : `Bearer ${token}` 
        });
        if( !response.data.success ){
            throw new Error( response.data.message );
        }

        console.log( 'UPDATE_SECTION_API Response............' , response );
        toast.success("Section Name Updated Successfully");
        result = response.data.data ;
    }catch(error){
        console.log('UPDATE_SECTION_API Error........' , error)
        toast.error(error.message)
    }
    // toast.dismiss(toastId);
    return result;
}

export const deleteSection = async ( data , token ) => {
    let result = null ;
    const toastId = toast.loading('Loading...');
    try{
        const sectionId = data.get('sectionId');
        const courseId = data.get('courseId');
        const response = await apiConnector( "DELETE" , DELETE_SECTION_API + `${ sectionId }/${ courseId }` , data , { 
            "authorization" : `Bearer ${token}` 
        });
        if( !response.data.success ){
            throw new Error( response.data.message );
        }

        console.log( 'DELETE_SECTION_API Response............' , response );
        toast.success("Section Deleted Successfully");
        result = response.data.data ;
    }catch(error){
        console.log('DELETE_SECTION_API Error........' , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// SubSection Related
export const createSubSection = async ( data , token ) => {
    let result = null ;
    const toastId = toast.loading('Loading...');
    try{
        const sectionId = data.get('sectionId');
        const response = await apiConnector( 'POST' , CREATE_SUBSECTION_API + sectionId , data , { 
            'Content-Type': 'multipart/form-data' , 
            "authorization" : `Bearer ${token}` 
        } );
        if( !response.data.success ){
            throw new Error( response.data.message );
        }

        console.log( 'CREATE_SUBSECTION_API Response............' , response );
        toast.success("SubSection Added Successfully");
        result = response.data.data ;
    }catch(error){
        console.log('CREATE_SUBSECTION_API Error........' , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSubSection = async ( data , token ) => {
    let result = null ;
    console.log('courseDetails API update subsection..............')
    const toastId = toast.loading('Loading...');
    try{
        const subSectionId = data.get('subSectionId');
        const response = await apiConnector( 'PATCH' , UPDATE_SUBSECTION_API + subSectionId , data , { 
            'Content-Type': 'multipart/form-data' , 
            "authorization" : `Bearer ${token}` 
        });
        if( !response.data.success ){
            throw new Error( response.data.message );
        }

        console.log( 'UPDATE_SUBSECTION_API Response............' , response );
        toast.success("SubSection Updated Successfully");
        result = response.data.data ;
    }catch(error){
        console.log('UPDATE_SUBSECTION_API Error........' , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSubSection = async ( data , token ) => {
    console.log('delete subsection  api.........')
    let result = null ;
    const toastId = toast.loading('Loading...');
    try{
        const courseId = data.get('courseId');
        const subSectionId = data.get('subSectionId');
        const sectionId = data.get('sectionId');
        const response = await apiConnector( "DELETE" , DELETE_SUBSECTION_API + `${subSectionId}/${sectionId}/${courseId}` , data , {  
            "authorization" : `Bearer ${token}` 
        });
        if( !response.data.success ){
            throw new Error( response.data.message );
        }

        console.log( 'DELETE_SUBSECTION_API Response............' , response );
        toast.success("Subsection Deleted Successfully");
        result = response.data.data ;
    }catch(error){
        console.log('DELETE_SUBSECTION_API Error........' , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}


// course progress 

export const markLectureAsComplete = async ( data , token ) => {
    let result = null ;
    try{
        const response = await apiConnector( 'PATCH' , LECTURE_COMPLETION_API , data , {
            "authorization" : `Bearer ${token}` 
        })

        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        console.log('MARK_LECTURE_AS_COMPLETE_API response.......' , response)
        toast.success("Lecture Completed")
        result = true
    }catch(error){
        console.log('MARK_LECTURE_AS_COMPLETE_API Error...........' , error);
        result = false
    }
    return result;
}


export const markCourseComplete = async ( courseId , token ) => {
    let result=null;
    try{
        const response = await apiConnector( 'PATCH' , MARK_COURSE_COMPLETE , {courseId} , {
            "authorization" : `Bearer ${token}` 
        } );
        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        console.log('MARK_COURSE_COMPLETE_API response.......' , response)
        toast.success("Course Completed...")
        result = response.data.data;
    }catch(error){
        console.log('MARK_COURSE_COMPLETE_API Error.......' , error );
    }
    return result;
}

// course ratings and reviews
export const createRating = async ( data , token ) => {
    try{
        const courseId = data.courseId;
        const response = await apiConnector( 'POST' , CREATE_RATING_API + courseId , data , {
            "authorization" : `Bearer ${token}` 
        } );

        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        console.log('CREATE_RATING_API response.......' , response)
        toast.success("Review made")
    }catch(error){
        console.log('CREATE_RATING_API Error........' , error);
    }
}

export const isReviewMade = async ( courseId , token ) => {
    let result=false;
    try{
        const response = await apiConnector('GET' , IS_REVIEW_MADE_API + courseId , null , {
            "authorization" : `Bearer ${token}` 
        } );

        if( response.data.success === true){
            result = true;
        }
    }catch(error){
        console.log('IS_REVIEW_MADE_API......error' , error);
    }
    return result;
}

export const getAllReviews = async ( token ) => {
    let result=[];
    try{
        const response = await apiConnector( 'GET' , ALL_REVIEWS_API , null , {
            "authorization" : `Bearer ${token}` 
        } )

        if( !response.data.success ){
            throw new Error(response.data.message);
        }
        console.log('ALL_REVIEWS_API response.......' , response)
        result = response.data.data;
    }catch(error){
        console.log('ALL_REVIEWS_API Error.....' , error);
    }
    return result;
}