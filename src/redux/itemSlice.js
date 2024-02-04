import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Loading:false,
    cartItems:[]
}

const itemSlice=createSlice({
    name:"item",
    initialState,
    reducers:{
        showLoading:(state,action)=>{
            state.Loading=true
        },
        hideLoading:(state,action)=>{
            state.Loading=false
        },
        addToCart: (state, action) => {
            // state.cartItems = [...state.cartItems, action.payload];
            let newData = state.cartItems.push(action.payload)
            console.log("newData", newData)
            console.log(state, action)
          },
          updateCart: (state, action) => {
           state.cartItems = state.cartItems.map((item) =>
                item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item)
        },
        
            updateBill: (state, action) => {
            state.cartItems=action.payload
        }
       
    }
})

export const {showLoading,hideLoading,addToCart,updateCart,updateBill}=itemSlice.actions
export default itemSlice.reducer