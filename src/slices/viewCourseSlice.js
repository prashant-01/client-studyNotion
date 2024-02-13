import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    courseSectionData : localStorage.getItem('courseSectionData') ? JSON.parse(localStorage.getItem('courseSectionData')) : [] ,
    courseEntireData : localStorage.getItem('courseEntireData') ? JSON.parse(localStorage.getItem('courseEntireData')) : []  ,
    completedLectures : localStorage.getItem('completedLectures') ? JSON.parse(localStorage.getItem('completedLectures')) : [] ,
    totalNoOfLectures : localStorage.getItem('totalNoOfLectures') ? JSON.parse(localStorage.getItem('totalNoOfLectures')) : [] ,
}
const viewCourseSlice = createSlice({
    name : 'viewCourse' ,
    initialState ,
    reducers : {
        setCourseSectionData : ( state , action ) => {
            state.courseSectionData = action.payload ;
            localStorage.setItem( 'courseSectionData' , JSON.stringify( state.courseSectionData ) )
        } ,
        setCourseEntireData : ( state , action ) => {
            state.courseEntireData = action.payload ;
            localStorage.setItem( 'courseEntireData' , JSON.stringify( state.courseEntireData ) )
        } ,
        setTotalNoOfLectures : ( state , action ) => {
            state.totalNoOfLectures = action.payload ;
            localStorage.setItem( 'totalNoOfLectures' , JSON.stringify( state.totalNoOfLectures ) )
        } ,
        setCompletedLectures : ( state , action ) => {
            state.completedLectures = action.payload ;
            localStorage.setItem( 'completedLectures' , JSON.stringify( state.completedLectures ) )
        } ,
        updateCompletedLectures : ( state , action ) => {
            state.completedLectures = [ ...state.completedLectures , action.payload ] ;
            localStorage.setItem( 'completedLectures' , JSON.stringify( state.completedLectures ) )
        }
    }
});

export const { 
    setCourseSectionData ,
    setCourseEntireData ,
    setTotalNoOfLectures ,
    setCompletedLectures ,
    updateCompletedLectures
 } = viewCourseSlice.actions

 export default viewCourseSlice.reducer ;