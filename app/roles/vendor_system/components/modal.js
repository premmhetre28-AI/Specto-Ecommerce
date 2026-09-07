"use client"
import { React } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "@/app/redux/slices/productSlice";

const Modal = (props) => {
    const { editProduct, setEditProduct, setShowModal, showModal } = props
    const dispatch = useDispatch();
    const { alerts } = useSelector(
        (state) => state.product
    );

    const saveProduct = async (editProduct) => {
        await dispatch(updateProduct(editProduct));
        setShowModal(false)
    }

    return (
        <>
            {/* Added p-4 to the outer container to ensure it doesn't touch the screen edges on mobile */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                {/* Added max-h-[90vh] and overflow-y-auto to allow scrolling on small devices. Tweaked padding for mobile. */}
                <div className="bg-slate-800 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-5 sm:p-8 shadow-2xl">

                    {/* Scaled text down slightly on mobile to prevent wrapping issues */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
                        Edit Product
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Product Name */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Product Name
                            </label>
                            <input
                                value={editProduct.name}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Enter product name"
                                className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none"
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Stock Quantity
                            </label>
                            <input
                                value={editProduct.stock}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        stock: e.target.value,
                                    })
                                }
                                placeholder="Enter stock"
                                type="number"
                                className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Original Price
                            </label>
                            <input
                                value={editProduct.price}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        price: e.target.value,
                                    })
                                }
                                placeholder="Enter price"
                                type="number"
                                className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none"
                            />
                        </div>

                        {/* Selling Price */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Selling Price
                            </label>
                            <input
                                value={editProduct.selling_price}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        selling_price: e.target.value,
                                    })
                                }
                                placeholder="Enter selling price"
                                type="number"
                                className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Category
                            </label>
                            <select
                                value={editProduct.category}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        category: e.target.value,
                                    })
                                }
                                className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none"
                            >
                                <option value="">Select Category</option>
                                <option value="fashion">Fashion</option>
                                <option value="footwear">Footwear</option>
                                <option value="electronics">Electronics</option>
                                <option value="beauty">Beauty</option>
                                <option value="accessories">Accessories</option>
                            </select>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Gender
                            </label>
                            <select
                                value={editProduct.gender}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        gender: e.target.value,
                                    })
                                }
                                className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none"
                            >
                                <option value="">Select Gender</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="unisex">Unisex</option>
                            </select>
                        </div>

                        {/* Image */}
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-300 mb-2">
                                Product Image URL
                            </label>
                            <input
                                value={editProduct.image}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        image: e.target.value,
                                    })
                                }
                                placeholder="Paste image url"
                                className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-300 mb-2">
                                Product Description
                            </label>
                            <textarea
                                value={editProduct.description}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        description: e.target.value,
                                    })
                                }
                                rows="4"
                                placeholder="Write description..."
                                className="w-full p-3 rounded-xl bg-slate-700 text-white outline-none resize-none"
                            />
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => setShowModal(false)}
                            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => saveProduct(editProduct)}
                            className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal