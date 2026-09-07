"use client"
import React from 'react'
import { Heart, Star } from "lucide-react";
import PayButton from "@/app/roles/customer_system/components/PayButton";
import AddCart from "@/app/roles/customer_system/components/AddCart";

const Product_card = ({product}) => {
    return (
        <div
            key={product._id}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            {/* Image */}
            <div className="relative overflow-hidden bg-gray-100">
                <img
                    src={
                        product.image
                            ? product.image
                            : "https://tse1.mm.bing.net/th/id/OIP._YbO1chgv3Q6aeNa19RgAwHaHa?pid=Api&P=0&h=180"
                    }
                    alt={product.name}
                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                <span className="absolute left-4 top-4 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    Bestseller
                </span>

                {/* Wishlist */}
                <button
                    className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-md backdrop-blur transition hover:bg-red-500 hover:text-white"
                >
                    <Heart size={18} />
                </button>

                {/* Add Cart */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <AddCart product={product} />
                </div>
            </div>

            {/* Body */}
            <div className="p-6">
                <h2 className="line-clamp-1 text-xl font-semibold text-slate-900">
                    {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="mt-4 flex items-center">
                    <div className="flex text-amber-400">
                        {[1, 2, 3, 4].map((i) => (
                            <Star
                                key={i}
                                size={16}
                                fill="currentColor"
                            />
                        ))}
                        <Star size={16} className="text-gray-300" />
                    </div>

                    <span className="ml-2 text-sm text-gray-500">
                        4.0 (120 Reviews)
                    </span>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-gray-100" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                            Price
                        </p>

                        <h3 className="text-3xl font-bold text-slate-900">
                            ₹{product.selling_price}
                        </h3>
                    </div>

                    <PayButton product={product} />
                </div>
            </div>
        </div>
    )
}

export default Product_card
