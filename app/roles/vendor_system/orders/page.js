"use client"

import { React, useEffect } from "react";
import { fetchOrders } from "@/app/redux/slices/customerSlice"
import { useDispatch, useSelector } from "react-redux";
import Customer from "@/app/roles/vendor_system/components/Customer";

const Page = () => {
    const dispatch = useDispatch()
    const {vendorOrders} = useSelector((state)=>state.customer)
    useEffect(() => {
       dispatch(fetchOrders())
    }, [])
    return (
        <div className="mt-3 px-6">
            {/* Heading */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    Customer History
                </h1>

                <p className="mt-3 text-gray-500">
                    Analyze customer purchases, order trends, and payment records.
                </p>
            </div>

            {/* Customer Cards */}
            <div className="flex flex-wrap justify-center gap-8">
                {vendorOrders?.length === 0 ? (
                    <div className="w-full text-center py-16">
                        <h2 className="text-2xl font-semibold text-slate-700">
                            No Customer History Found
                        </h2>
                        <p className="mt-2 text-slate-500">
                            Customer orders will appear here once purchases are made.
                        </p>
                    </div>
                ) : (
                    vendorOrders?.map((customer) => (
                        <Customer key={customer._id} customer={customer}/>
                        
                    )))}
            </div>
        </div>
    );
};

export default Page;