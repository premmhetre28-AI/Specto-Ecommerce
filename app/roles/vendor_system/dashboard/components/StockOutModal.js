"use client"
import { React, useState } from 'react'
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { stockOut } from "@/app/redux/slices/productSlice";

const StockOutModal = (props) => {
    const [quantity, setQuantity] = useState("")
    const { editStock, setEditStock, setOutModal } = props
    const {alerts} = useSelector(
        (state)=>state.product
    )
    const dispatch = useDispatch();
    const handleStock = async (editStock, quantity) => {
        dispatch(
            stockOut({
                productId: editStock,
                quantity: quantity
            })
        )
        
        alert(alerts)
        setOutModal(false)
    }
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-slate-800 p-5 rounded-xl w-80 relative">

                {/* Cross Button */}
                <button
                    onClick={() => setOutModal(false)}
                    className="absolute top-3 right-3 text-white hover:text-red-400"
                >
                    <X size={20} />
                </button>

                <h2 className="text-white font-bold mb-3">
                    Update Stock
                </h2>

                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2 rounded bg-slate-700 text-white"
                />

                <button
                    onClick={() => handleStock(editStock, quantity)}
                    className="w-full mt-3 bg-green-500 py-2 rounded"
                >
                    Confirm
                </button>

            </div>
        </div>
    )
}

export default StockOutModal
