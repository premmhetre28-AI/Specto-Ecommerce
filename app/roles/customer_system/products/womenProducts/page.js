"use client";

import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWomenProducts } from "@/app/redux/slices/customerSlice";
import Product_card from "@/app/roles/customer_system/components/Product_card";

const Page = () => {
    const dispatch = useDispatch()
    const { womenProducts } = useSelector((state) => state.customer)
    console.log(womenProducts)
    useEffect(() => {
        dispatch(fetchWomenProducts())
    }, [dispatch])
    return (
        <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-10 py-10">

            {/* Heading */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    All Women Products
                </h1>
                <p className="text-gray-500 mt-3">
                    Explore our latest premium collection
                </p>
            </div>

            {/* Grid */}
            {
                !womenProducts || womenProducts?.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-700">
                            No Products Available
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Products will appear here soon.
                        </p>
                    </div>
                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        {womenProducts.map((product) => (
                            <Product_card product={product}/>
                        ))}

                    </div>
                )
            }
        </div>
    );
};

export default Page;