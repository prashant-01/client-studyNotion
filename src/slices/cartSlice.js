import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cart : localStorage.getItem('cart') ? JSON.parse( localStorage.getItem('cart') ) : [] ,
    totalAmount : localStorage.getItem('totalAmount') ? JSON.parse( localStorage.getItem('totalAmount') ) : 0 ,
    totalItems : localStorage.getItem('totalItems') ? JSON.parse( localStorage.getItem('totalItems') ) : 0 ,
}

const cartSlice = createSlice({
    name : 'cart' ,
    initialState ,
    reducers : {
        addToCart : ( (state , action) => {
            const course = action.payload ;
            // if course id already present
            const index = state.cart.findIndex( (item) => item._id === course._id );
            if( index >= 0 ){
                toast.error('Course already in cart')
                return ;
            }
            // if not present , then update the values
            state.cart = [...state.cart , course];
            state.totalItems++;
            state.totalAmount += parseInt(course.price);

            // set values in local storage also
            localStorage.setItem('cart' , JSON.stringify( state.cart ));
            localStorage.setItem('totalItems' , JSON.stringify( state.totalItems ));
            localStorage.setItem('totalAmount' , JSON.stringify( state.totalAmount ));
            toast.success('Course added to cart')
        }) ,
        removeFromCart : ( (state , action) => {
            const course = action.payload ;
            // if course is present then remove it
            const index = state.cart.findIndex( (item) => item._id === course._id );
            if( index >= 0 ){
                state.cart.splice( index , 1 );
                if( state.totalItems === 1 ){
                    state.totalItems = 0;
                    state.totalAmount = 0 ;
                    localStorage.removeItem('cart');
                    localStorage.removeItem('totalItems');
                    localStorage.removeItem('totalAmount');
                }
                else{
                    state.totalItems--;
                    state.totalAmount -= course.price ;
                    localStorage.setItem('cart' , JSON.stringify( state.cart ));
                    localStorage.setItem('totalItems' , JSON.stringify( state.totalItems ));
                    localStorage.setItem('totalAmount' , JSON.stringify( state.totalAmount ));
                }
                
                

                // update localstorage
                
                toast.success('Course removed from cart')
            }
            else{
                toast.error('Course not there in cart')
                return ;
            }
        }) ,
        resetCart : ( ( state ) => {
            state.cart = [];
            state.totalItems = 0;
            state.totalAmount = 0;

            // update localstorage
            localStorage.removeItem('cart');
            localStorage.removeItem('totalItems');
            localStorage.removeItem('totalAmount');
        }) ,
    }
});

export const { addToCart , removeFromCart , resetCart } = cartSlice.actions ;
export default cartSlice.reducer ;