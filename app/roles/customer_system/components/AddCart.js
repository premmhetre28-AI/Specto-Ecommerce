"use client"
import React from 'react'
import { ShoppingCart } from "lucide-react";
import { useDispatch } from 'react-redux';
import {createCart} from '@/app/redux/slices/cartSlice'

const AddCart = ({product}) => {
    const dispatch = useDispatch()
    const AddCart=async ()=>{
        const res = await dispatch(createCart(product._id))
        if(res.payload.success){
            alert(res.payload.message)
        }
        else{
            alert(res.payload.message)
        }
    }
    return (
        <div
            onClick={AddCart}
            className="absolute bottom-4 left-4 right-4
            scale-90 opacity-0
            group-hover:scale-100 group-hover:opacity-100
            transition-all duration-300"
        >
            <button
                className="w-full bg-yellow-400 hover:bg-yellow-500
                text-black py-3 rounded-full
                font-semibold
                flex items-center justify-center gap-2
                shadow-md transition-all"
            >
                <ShoppingCart size={18} />
                Add To Cart
            </button>
        </div>
    )
}

export default AddCart
