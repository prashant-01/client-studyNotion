import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import viewCourseReducer from "../slices/viewCourseSlice";
import reviewReducer from "../slices/reviewSlice"
import categoryReducer from "../slices/categorySlice"
// Combining all reducers of all the slices created here 
const rootReducer = combineReducers({
    auth : authReducer ,
    profile : profileReducer ,
    cart : cartReducer , 
    course : courseReducer ,
    viewCourse : viewCourseReducer ,
    review : reviewReducer ,
    categories : categoryReducer
});

// exporting rootReducer so that it can be put inside store
export default rootReducer;