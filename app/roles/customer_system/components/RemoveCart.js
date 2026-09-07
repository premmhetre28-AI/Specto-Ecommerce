"use client"
import React from 'react'
import { ShoppingCart } from "lucide-react";
import { useDispatch } from 'react-redux';
import {deleteCart} from '@/app/redux/slices/cartSlice'

const RemoveCart = ({product}) => {
    const dispatch = useDispatch()
    const RemoveCart=async ()=>{
        const res = await dispatch(deleteCart(product._id))
        console.log("res",res)
        if(res.payload.success){
            alert(res.payload.message)
        }
        else{
            alert(res.payload.message)
        }
    }
    return (
        <div
            onClick={RemoveCart}
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
                Remove to cart
            </button>
        </div>
    )
}

export default RemoveCart
