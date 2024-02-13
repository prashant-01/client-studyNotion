import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    step : localStorage.getItem('step') ? JSON.parse( localStorage.getItem('step') ) : 1 ,
    course : localStorage.getItem('course') ? JSON.parse( localStorage.getItem('course') ) : null , 
    editCourse : localStorage.getItem('editCourse') ? JSON.parse( localStorage.getItem('editCourse') ) : null ,
    paymentLoading : localStorage.getItem('paymentLoading') ? JSON.parse( localStorage.getItem('paymentLoading') ) : false
}
const courseSlice = createSlice({
    name : 'course' ,
    initialState ,
    reducers : {
        setStep : ( state , action ) => {
            state.step = action.payload ;
            localStorage.setItem('step' , JSON.stringify( 2 ));
        } ,
        setCourse : ( state , action ) => {
            state.course = { ...action.payload } ;
            localStorage.setItem('course' , JSON.stringify(state.course));
        } ,
        setEditCourse : ( state , action ) => {
            state.editCourse = action.payload ;
            localStorage.setItem('editCourse' , JSON.stringify(state.editCourse));
        } ,
        setPaymentLoading : ( state , action ) => {
            state.paymentLoading = action.payload ;
            localStorage.setItem('paymentLoading' , JSON.stringify(state.paymentLoading));
        } ,
        resetCourseState : ( state ) => {
            state.step = 1 ;
            state.course = null ; 
            state.editCourse = false ;
            localStorage.setItem('step' , 1);
            localStorage.removeItem('course');
            localStorage.removeItem('editCourse');
        } ,
    }
}); 

export const {
    setStep ,
    setCourse ,
    setEditCourse ,
    setPaymentLoading ,
    resetCourseState 
} = courseSlice.actions

export default courseSlice.reducer ;