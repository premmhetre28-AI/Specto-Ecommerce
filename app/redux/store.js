import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/redux/slices/authSlice";
import productReducer from '@/app/redux/slices/productSlice'
import customerReducer from '@/app/redux/slices/customerSlice'
import cartReducer from '@/app/redux/slices/cartSlice'

export const store =configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        customer:customerReducer,
        cart:cartReducer
    }
})