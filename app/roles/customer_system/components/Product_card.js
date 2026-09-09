"use client"
import React from 'react'
import { Heart, Star } from "lucide-react";
import PayButton from "@/app/roles/customer_system/components/PayButton";
import AddCart from "@/app/roles/customer_system/components/AddCart";

const Product_card = ({ product }) => {
    return (
        <div
            key={product._id}
            className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 shrink-0">
                <img
                    src={
                        product.image
                            ? product.image
                            : "https://tse1.mm.bing.net/th/id/OIP._YbO1chgv3Q6aeNa19RgAwHaHa?pid=Api&P=0&h=180"
                    }
                    alt={product.name}
                    className="h-[180px] sm:h-64 md:h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                <span className="absolute left-2 top-2 sm:left-4 sm:top-4 rounded-full bg-slate-900 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-white">
                    Bestseller
                </span>

                {/* Wishlist */}
                <button
                    className="absolute right-2 top-2 sm:right-4 sm:top-4 rounded-full bg-white/90 p-1.5 sm:p-2 shadow-md backdrop-blur transition hover:bg-red-500 hover:text-white"
                >
                    <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </button>

                {/* Add Cart - Always visible on mobile, hover on desktop */}
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 opacity-100 md:opacity-0 transition-all duration-300 md:group-hover:opacity-100 scale-95 sm:scale-100 origin-bottom">
                    <AddCart product={product} />
                </div>
            </div>

            {/* Body */}
            <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                <h2 className="line-clamp-1 text-sm sm:text-lg md:text-xl font-semibold text-slate-900">
                    {product.name}
                </h2>

                <p className="mt-1 sm:mt-2 line-clamp-1 sm:line-clamp-2 text-xs sm:text-sm leading-relaxed sm:leading-6 text-gray-500">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="mt-2 sm:mt-4 flex items-center">
                    <div className="flex text-amber-400 gap-[1px] sm:gap-0">
                        {[1, 2, 3, 4].map((i) => (
                            <Star
                                key={i}
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="currentColor"
                            />
                        ))}
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
                    </div>

                    <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-sm text-gray-500">
                        4.0 <span className="hidden sm:inline">(120 Reviews)</span>
                    </span>
                </div>

                {/* Spacer to push footer to bottom if titles vary in height */}
                <div className="flex-grow" />

                {/* Divider */}
                <div className="my-3 sm:my-5 border-t border-gray-100" />

                {/* Footer */}
                <div className="flex items-center justify-between gap-1">
                    <div>
                        <p className="text-[9px] sm:text-xs uppercase tracking-wide text-gray-500 mb-0.5 sm:mb-0">
                            Price
                        </p>
                        <h3 className="text-base sm:text-2xl md:text-3xl font-bold text-slate-900 leading-none">
                            ₹{product.selling_price}
                        </h3>
                    </div>

                    {/* Scale down external component safely on mobile */}
                    <div className="scale-75 sm:scale-100 origin-right shrink-0">
                        <PayButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product_card