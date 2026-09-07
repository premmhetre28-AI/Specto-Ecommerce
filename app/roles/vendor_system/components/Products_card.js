"use client"
import { React, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "@/app/redux/slices/productSlice";
import Modal from './modal';


const Products_card = () => {
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const dispatch = useDispatch();
    const { products } = useSelector(
        (state) => state.product
    );

    const updateproduct = (item) => {
        setShowModal(true)
        setEditProduct(item)
    }

    const deleteproduct = async (id, user) => {
        dispatch(deleteProduct({ id, user }))
    }

    return (
        <>
            <div className="w-[95%] lg:w-[80%] xl:w-[70%] mx-auto mb-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        📦 Products List
                    </h2>
                    <div className="w-28 h-1 bg-blue-500 mx-auto mt-3 rounded-full"></div>
                </div>

                {products.length === 0 ? (
                    <p className="text-center text-gray-400">No products added</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {products.map((item) => (
                            <div
                                key={item._id}
                                className="bg-slate-800 rounded-2xl p-5 shadow-lg 
                                            hover:scale-105 transition
                                            h-[420px] flex flex-col"
                            >
                                {/* Product Image */}
                                <div className="h-35 bg-slate-700 rounded-lg flex items-center justify-center mb-3 flex-shrink-0">
                                    <img
                                        src={
                                            item.image
                                                ? item.image
                                                : "https://tse1.mm.bing.net/th/id/OIP._YbO1chgv3Q6aeNa19RgAwHaHa?pid=Api&P=0&h=180"
                                        }
                                        alt={item.name}
                                        className="w-33 h-33 rounded-lg object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-3 truncate">
                                        {item.name}
                                    </h3>

                                    <p className="text-gray-300 mb-2">
                                        Category: {item.category}
                                    </p>

                                    <p className="text-green-400 font-semibold mb-2">
                                        Cost_price: ₹ {item.price}
                                    </p>
                                    <p className="text-green-400 font-semibold mb-2">
                                        Selling_price: ₹ {item.selling_price}
                                    </p>

                                    <p
                                        className={`font-medium ${item.stock > 0 ? "text-blue-400" : "text-red-400"
                                            }`}
                                    >
                                        Stock: {item.stock}
                                    </p>
                                </div>

                                {/* Buttons always at bottom */}
                                <div className="flex items-center gap-3">

                                    {/* Edit */}
                                    <button
                                        onClick={() => updateproduct(item)}
                                        className="group relative flex items-center justify-center
                                                    w-10 h-10 rounded-xl
                                                    bg-amber-500 hover:bg-amber-600
                                                    transition-all duration-200
                                                    active:scale-95 shadow-lg"
                                    >
                                        <FaEdit className="text-black text-base" />

                                        {/* Tooltip */}
                                        <span
                                            className="absolute -top-10 left-1/2 -translate-x-1/2
                                                    whitespace-nowrap rounded-md
                                                    bg-gray-900 px-2 py-1 text-xs text-white
                                                    opacity-0 group-hover:opacity-100
                                                    transition duration-200 pointer-events-none"
                                        >
                                            Edit
                                        </span>
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => deleteproduct(item._id, item.user)}
                                        className="group relative flex items-center justify-center
                                                w-10 h-10 rounded-xl
                                                bg-red-500 hover:bg-red-600
                                                transition-all duration-200
                                                active:scale-95 shadow-lg"
                                    >
                                        <MdDelete className="text-white text-base" />

                                        {/* Tooltip */}
                                        <span
                                            className="absolute -top-10 left-1/2 -translate-x-1/2
                                                    whitespace-nowrap rounded-md
                                                    bg-gray-900 px-2 py-1 text-xs text-white
                                                    opacity-0 group-hover:opacity-100
                                                    transition duration-200 pointer-events-none"
                                        >
                                            Delete
                                        </span>
                                    </button>
                                    {/* Stock In */}
                                    <button
                                        onClick={() => stockIn(item)}
                                        className="flex-1 py-2 rounded-lg
                                                bg-green-500 hover:bg-green-600
                                                text-white font-medium transition"
                                    >
                                        + Stock In
                                    </button>

                                    {/* Stock Out */}
                                    <button
                                        onClick={() => stockOut(item)}
                                        className="flex-1 py-2 rounded-lg
                                                bg-red-500 hover:bg-red-600
                                                text-white font-medium transition"
                                    >
                                        - Stock Out
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showModal && (
                <Modal editProduct={editProduct} setEditProduct={setEditProduct} setShowModal={setShowModal} />
            )}

        </>
    )
}

export default Products_card
