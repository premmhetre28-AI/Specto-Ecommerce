"use client"
import React from 'react'
import { useDispatch } from 'react-redux';
import { updateOrder } from "@/app/redux/slices/customerSlice"
import { stockOut } from '@/app/redux/slices/productSlice';
import {
    User, Mail, Phone, Eye, Calendar, ShoppingBag, Hash, Package, Boxes, Wallet,
    IndianRupee,
    ShoppingCart,
    BadgeCheck,
    UserRound
} from "lucide-react";
const Customer = ({ customer }) => {
    const dispatch = useDispatch()
    const handleAccept = async (order) => {
        const confirm = window.confirm("Are you sure you want to Accept this order ?")
        if (confirm) {
            dispatch(updateOrder(order))
            await dispatch(
                stockOut({
                    productId: order.productId,
                    quantity: order.quantity,
                })
            )
        }

    }
    return (
        <div
            className="group overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                            <User size={36} />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                {customer.name || "Customer"}
                            </h2>

                            <p className="text-indigo-100">
                                {customer.email}
                            </p>

                            <p className="mt-1 text-sm text-indigo-200">
                                Joined{" "}
                                {new Date(customer.createdAt).toLocaleDateString("en-IN")}
                            </p>
                        </div>
                    </div>

                    <span
                        className={`rounded-full px-5 py-2 text-sm font-semibold ${customer.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : customer.orderStatus === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : customer.orderStatus === "Pending"
                                    ? "bg-orange-100 text-orange-700"
                                    : customer.orderStatus === "Cancelled"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                        {customer.orderStatus}
                    </span>

                </div>
            </div>

            {/* Body */}
            <div className="p-6">

                <div className="grid gap-5 lg:grid-cols-3">

                    {/* Customer Info */}
                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">

                        {/* Header */}
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-xl bg-indigo-100 p-2">
                                <UserRound size={22} className="text-indigo-600" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-800">
                                    Customer Information
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Customer contact details
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">

                            {/* Email */}
                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3">
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className="text-indigo-600" />

                                    <span className="text-sm font-medium text-slate-500">
                                        Email
                                    </span>
                                </div>

                                <span
                                    title={customer.email}
                                    className="max-w-[180px] truncate text-right text-sm font-semibold text-slate-800"
                                >
                                    {customer.email}
                                </span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3">
                                <div className="flex items-center gap-3">
                                    <Phone size={18} className="text-green-600" />

                                    <span className="text-sm font-medium text-slate-500">
                                        Phone
                                    </span>
                                </div>

                                <span className="font-semibold text-slate-800">
                                    {customer.phone || "Not Available"}
                                </span>
                            </div>

                            {/* Joined Date */}
                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3">
                                <div className="flex items-center gap-3">
                                    <Calendar size={18} className="text-orange-500" />

                                    <span className="text-sm font-medium text-slate-500">
                                        Joined
                                    </span>
                                </div>

                                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                                    {new Date(customer.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Recent Order */}
                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-xl bg-indigo-100 p-2">
                                <ShoppingBag className="text-indigo-600" size={22} />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-800">
                                    Recent Order
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Latest purchase details
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">

                            {/* Order ID */}
                            <div className="flex items-start justify-between gap-4 rounded-xl bg-white p-3 border border-slate-100">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Hash size={18} />
                                    <span className="text-sm font-medium">
                                        Order ID
                                    </span>
                                </div>

                                <span className="max-w-[180px] break-all text-right text-xs font-semibold text-slate-800">
                                    #{customer.razorpayOrderId}
                                </span>
                            </div>

                            {/* Product */}
                            <div className="flex items-center justify-between rounded-xl bg-white p-3 border border-slate-100">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Package size={18} />
                                    <span className="text-sm font-medium">
                                        Product
                                    </span>
                                </div>

                                <span title={customer.productName} className="min-w-0 max-w-[170px] truncate text-sm font-semibold text-slate-800">
                                    {customer.productName?.length > 15 ? `${customer.productName.slice(0, 15)}...` : customer.productName}
                                </span>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center justify-between rounded-xl bg-white p-3 border border-slate-100">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Boxes size={18} />
                                    <span className="text-sm font-medium">
                                        Quantity
                                    </span>
                                </div>

                                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">
                                    {customer.quantity}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Payment */}
                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">

                        {/* Header */}
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-xl bg-green-100 p-2">
                                <Wallet className="text-green-600" size={22} />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-800">
                                    Payment Summary
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Order payment details
                                </p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">

                            {/* Total */}
                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <IndianRupee size={18} />
                                    <span className="text-sm font-medium">
                                        Total Amount
                                    </span>
                                </div>

                                <span className="text-lg font-bold text-green-600">
                                    ₹{Number(customer.totalAmount).toLocaleString()}
                                </span>
                            </div>

                            {/* Orders */}
                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <ShoppingCart size={18} />
                                    <span className="text-sm font-medium">
                                        Total Orders
                                    </span>
                                </div>

                                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-700">
                                    {customer.quantity}
                                </span>
                            </div>

                            {/* Payment Status */}
                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <BadgeCheck size={18} />
                                    <span className="text-sm font-medium">
                                        Payment Status
                                    </span>
                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                    Paid
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">

                    <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700">
                        <Eye size={18} />
                        View History
                    </button>

                    {customer.orderStatus === "Pending" && (
                        <>
                            <button
                                onClick={() => handleAccept(customer)}
                                className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
                            >
                                Accept Order
                            </button>

                            <button
                                onClick={() => handleCancel(customer)}
                                className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700"
                            >
                                Cancel Order
                            </button>
                        </>
                    )}

                    {customer.orderStatus === "Shipped" && (
                        <button
                            onClick={() => handleDelivered(customer)}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                        >
                            Mark Delivered
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Customer
