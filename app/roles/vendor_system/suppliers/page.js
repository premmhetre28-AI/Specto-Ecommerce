"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Phone, Building2, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getSupplier, searchSupplier, deleteSupplier, payment, updateSupplier } from "@/app/redux/slices/productSlice";
import SupplierUpdateModal from "@/app/roles/vendor_system/components/SupplierUpdateModal";

export default function page() {
    const dispatch = useDispatch()
    const { supplier } = useSelector((state) => state.product)
    const [modal, setModal] = useState(false)
    const [updateData, setupdateData] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [search, setSearch] = useState("");
    const handleSearch = async (e) => {
        e.preventDefault()
        const result = await dispatch(searchSupplier(search))
        if (result.payload.success) {
            setSearchResults(result.payload.suppliers)
        }
        else {
            alert("data not found")
        }
    }
    // Edit supplier
    const handleEdit = (supplierData) => {
        setModal(true)
        setupdateData(supplierData)
    }
    // Delete supplier
    const handleDelete = async (supplierId) => {
        const result = await dispatch(deleteSupplier(supplierId))
        if (result.payload.data.success) {
            alert(result.payload.data.message)
        }
        else {
            alert(result.payload.data.message)
        }
    }
    const handlePay = async (supplier) => {
        const res = await dispatch(payment(supplier.dueAmount))
        if (res.payload.success) {
            const order = res.payload.order

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Stock Management",
                description: "Supplier Payment",
                order_id: order.id,

                handler: async function (response) {
                    const payload = {
                        ...supplier,
                        dueAmount: 0,
                        paymentStatus: "Paid"
                    }
                    alert("Payment Success");
                    // update supplier payment after success
                    dispatch(updateSupplier({ id: supplier._id, payload }))

                }

            }
            const paymentObject = new window.Razorpay(options);

            paymentObject.open();
        }

    }
    // Example fetch
    useEffect(() => {
        dispatch(getSupplier())
    }, []);
    const displaySuppliers = searchResults.length > 0 ? searchResults : supplier;
    const getStatusStyle = (status) => {
        switch (status) {
            case "Paid":
                return "bg-green-500/20 text-green-400";
            case "Pending":
                return "bg-red-500/20 text-red-400";
            case "Partial":
                return "bg-yellow-500/20 text-yellow-400";
            default:
                return "bg-gray-500/20 text-gray-300";
        }
    };

    return (
        <div className=" p-6 bg-slate-900 min-h-screen text-white">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="beforeInteractive"
            />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 ">

                {/* Heading */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        All <span className="text-purple-400">Suppliers</span>
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Manage all supplier records
                    </p>
                </div>

                {/* Search Form */}
                <form
                    onSubmit={handleSearch}
                    className="flex w-full lg:w-[420px] items-center rounded-3xl bg-slate-800 border border-slate-700 p-2 shadow-md"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search supplier..."
                        className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-400 outline-none"
                    />

                    <button
                        type="submit"
                        className="ml-2 rounded-3xl bg-blue-600 px-4 sm:px-5 py-2 text-white font-medium hover:bg-blue-700 transition"
                    >
                        🔍
                    </button>
                </form>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displaySuppliers && displaySuppliers.length > 0 ?
                    (
                        
                            displaySuppliers.map((supplier) => (
                                <div
                                    key={supplier._id}
                                    className="relative bg-slate-800 rounded-xl p-4 
                                    border border-slate-700 hover:border-purple-500 
                                    transition-all duration-300"
                                >
                                    {/* Actions */}
                                    <div className="absolute top-3 right-3 flex gap-2">

                                        <button
                                            onClick={() => handleEdit(supplier)}
                                            className="p-1.5 rounded-lg bg-blue-500/10 
                                    hover:bg-blue-500/20 text-blue-400"
                                        >
                                            <Pencil size={15} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(supplier._id)}
                                            className="p-1.5 rounded-lg bg-red-500/10 
                                hover:bg-red-500/20 text-red-400"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>

                                    {/* Product */}
                                    <div className="mb-3">
                                        <p className="text-xs text-slate-500">Product</p>
                                        <h2 className="text-base font-semibold text-white truncate">
                                            {supplier.productName}
                                        </h2>
                                    </div>

                                    {/* Supplier */}
                                    <div className="space-y-2 mb-3 text-sm">

                                        <p className="text-slate-300">
                                            <span className="text-slate-500">Supplier:</span> {supplier.name}
                                        </p>

                                        <div className="flex items-center gap-2 text-slate-300">
                                            <Building2 size={14} />
                                            <span className="truncate">{supplier.company}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-slate-300">
                                            <Phone size={14} />
                                            <span>{supplier.phone}</span>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="border-t border-slate-700 pt-3 mb-3 text-sm">

                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Total Amount</span>
                                            <span className="text-green-400 font-semibold">
                                                ₹{supplier.totalAmount}
                                            </span>
                                        </div>

                                        {supplier.dueAmount > 0 && (
                                            <div className="flex justify-between mt-1">
                                                <span className="text-slate-400">Due Amount</span>
                                                <span className="text-red-400 font-semibold">
                                                    ₹{supplier.dueAmount}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bottom */}
                                    <div className="flex items-center justify-between gap-2">

                                        <span
                                            className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusStyle(
                                                supplier.paymentStatus
                                            )}`}
                                        >
                                            {supplier.paymentStatus}
                                        </span>

                                        {supplier.dueAmount > 0 && (
                                            <button
                                                onClick={() => handlePay(supplier)}
                                                className="px-3 py-1.5 text-sm rounded-lg 
                                        bg-emerald-600 hover:bg-emerald-700
                                        transition font-medium"
                                            >
                                                💳 Pay Now
                                            </button>
                                        )}

                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <p className="text-xl font-semibold text-slate-300">
                                No suppliers found
                            </p>
                            <p className="text-sm text-slate-500 mt-2">
                                There are no supplier records available.
                            </p>
                        </div>
                    )}
            </div>
            {modal &&
                (
                    <SupplierUpdateModal updateData={updateData} setupdateData={setupdateData} setModal={setModal} />
                )
            }

        </div >
    );
}

