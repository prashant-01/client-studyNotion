import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allReviews : localStorage.getItem('allReviews') ? JSON.parse( localStorage.getItem('allReviews') ) : [] ,
}
const reviewSlice = createSlice({
    name : 'review' ,
    initialState ,
    reducers : {
        setAllReviews : ( state , action ) => {
            state.allReviews = action.payload;
            localStorage.setItem( 'allReviews' , JSON.stringify(state.allReviews) );
        }
    }
});

export const { setAllReviews } = reviewSlice.actions
export default reviewSlice.reducer