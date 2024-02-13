const BASE_URL = process.env.REACT_APP_BASE_URL

// Auth Endpoints
export const endpoints = {
    SENDOTP_API : BASE_URL + '/auth/send-otp' ,
    SIGNUP_API : BASE_URL + '/auth/signup' ,
    LOGIN_API : BASE_URL + '/auth/login' ,
    RESETPASSTOKEN_API : BASE_URL + '/auth/reset-password-token' ,
    RESETPASSWORD_API : BASE_URL + '/auth/reset-password' ,
}

// Profile Endpoints
export const profileEndpoints = {
    GET_USER_DETAILS_API : BASE_URL + '/profile/get-user-details' ,
    GET_USER_ENROLLED_COURSES_API : BASE_URL + '/profile/get-user-enrolled-courses' ,
    GET_INSTRUCTOR_DATA : BASE_URL + '/profile/instructor-dashboard-data'
}

// Students Endpoints
export const studentsEndpoints = {
    CAPTURE_PAYMENT_API : BASE_URL + '/payment/capture-payment' ,
    VERIFY_PAYMENT_API : BASE_URL + '/payment/verify-payment' ,
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + '/payment/send-payment-success-email' ,
}

//  Course Endpoints
export const courseEndpoints = {
    GET_PUBLISHED_COURSES_API : BASE_URL + '/course/get-published-courses' ,
    COURSE_DETAILS_API : BASE_URL + '/course/get-course-details/' ,
    EDIT_COURSE_API : BASE_URL + '/course/edit-course' ,
    COURSE_CATEGORIES_API : BASE_URL + '/course/get-all-categories' ,
    CREATE_COURSE_API : BASE_URL + '/course/create-course' ,
    CREATE_SECTION_API : BASE_URL + '/course/create-section/' ,
    CREATE_SUBSECTION_API : BASE_URL + '/course/create-sub-section/' ,
    UPDATE_SECTION_API : BASE_URL + '/course/update-section/' ,
    UPDATE_SUBSECTION_API : BASE_URL + '/course/update-sub-section/' ,
    DELETE_COURSE_API : BASE_URL + '/course/delete-course' ,
    DELETE_SECTION_API : BASE_URL + '/course/delete-section/' ,
    DELETE_SUBSECTION_API : BASE_URL + '/course/delete-sub-section/' ,

    LECTURE_COMPLETION_API : BASE_URL + '/course/update-course-progress' ,
    
    UPDATE_COURSE_STATUS : BASE_URL + '/course/update-course-status' ,
    GET_COURSE_DETAILS_WITH_DURATION : BASE_URL + '/course/get-course-details-duration/' ,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED : BASE_URL + '/course/get-full-course-details/' ,
    GET_ALL_INSTRUCTOR_COURSES_API : BASE_URL + '/course/get-instructor-courses' ,
    CREATE_RATING_API : BASE_URL + '/course/create-rating-and-review/' ,
    ALL_REVIEWS_API : BASE_URL + '/course/get-all-rating-and-reviews' ,
    IS_REVIEW_MADE_API : BASE_URL + '/course/is-review-made/' ,
    MARK_COURSE_COMPLETE : BASE_URL +  '/course/mark-course-complete' ,
    // UPDATE_COURSE_STATS : BASE_URL + '/course/update-course-stats' ,
}

// Catalog Page Data
export const catalogData = {
    CATALOG_PAGE_DATA_API : BASE_URL + '/course/category-page-details/'
}

// Settings 
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + '/profile/update-display-profile' , 
    UPDATE_PROFILE_API : BASE_URL + '/profile/update-profile' , 
    DELETE_PROFILE_PICTURE_API : BASE_URL + '/profile/delete-display-profile' ,
    DELETE_PROFILE_API : BASE_URL + '/profile/delete-account' , 
    CHANGE_PASSWORD_API : BASE_URL + '/auth/change-password' ,
}

// Contact Us
export const contactUsEndpoints = {
    CONTACTUS_API : BASE_URL + '/auth/contact-us'
}