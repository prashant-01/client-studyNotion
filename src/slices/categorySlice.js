import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories : localStorage.getItem( 'categories' ) ? JSON.parse(localStorage.getItem( 'categories' )) : []
}
const categorySlice = createSlice({
    name : 'categories' ,
    initialState ,
    reducers : {
        setCategories : ( state , action ) => {
            state.categories = action.payload;
            localStorage.setItem( 'categories' , JSON.stringify(state.categories) );
        }
    }
})

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer