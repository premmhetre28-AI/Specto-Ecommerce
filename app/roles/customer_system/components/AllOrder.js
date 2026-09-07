"use client"
import React from 'react'
import {
  Truck,
  PackageCheck,
  Clock3,
  Eye,
  Download,
  RotateCcw,
  MapPinned,
  XCircle,
} from "lucide-react";
import { useDispatch } from 'react-redux';
import { deleteOrder, getOrders } from '@/app/redux/slices/customerSlice'

const statusStyle = {
  Delivered: {
    color: "bg-green-100 text-green-700",
    icon: <PackageCheck className="w-4 h-4" />,
  },
  Shipped: {
    color: "bg-blue-100 text-blue-700",
    icon: <Truck className="w-4 h-4" />,
  },
  Pending: {
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock3 className="w-4 h-4" />,
  },
  Cancelled: {
    color: "bg-red-100 text-red-700",
    icon: <XCircle className="w-4 h-4" />,
  },
};
const AllOrder = ({ order }) => {
  const dispatch = useDispatch()

  const handleCancel = async (order) => {
    try {
      const confirm = window.confirm("Are you sure you want to cancel this order?")
      if (confirm) {
        const result = await dispatch(deleteOrder(order));

        if (result.payload?.success) {
          alert("Order cancelled successfully");
          await dispatch(getOrders())
        } else {
          alert(result.payload?.message || "Failed to cancel order");
        }
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      key={order._id}
      className="group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          <div>
            <p className="text-sm opacity-90">Order ID</p>

            <h2 className="text-xl font-bold break-all">
              #{order.razorpayOrderId}
            </h2>

            <p className="mt-2 text-indigo-100">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div
            className={`flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md font-semibold ${statusStyle[order.orderStatus].color}`}
          >
            {statusStyle[order.orderStatus].icon}
            {order.orderStatus}
          </div>
        </div>
      </div>

      {/* Product */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={order.image}
                alt={order.productName}
                className="w-28 h-28 rounded-2xl object-cover border group-hover:scale-105 transition"
              />

              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow">
                x{order.quantity}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {order.productName}
              </h2>

              <p className="text-gray-500 mt-1">
                Quantity : {order.quantity}
              </p>

              <p className="mt-4 text-3xl font-bold text-indigo-600">
                ₹{order.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="bg-gray-50 rounded-2xl p-5 min-w-[220px]">
              <h3 className="text-gray-500 text-sm">Payment</h3>

              <p className="font-semibold text-green-600 mt-1">Paid</p>

              <div className="border-t my-3"></div>

              <div className="flex justify-between">
                <span>Total</span>

                <span className="font-bold text-xl">
                  ₹{order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition">
            <Eye size={18} />
            View Details
          </button>

          {order.orderStatus === "Delivered" && (
            <>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                <Download size={18} />
                Download Invoice
              </button>

              <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                <RotateCcw size={18} />
                Buy Again
              </button>
            </>
          )}

          {order.orderStatus === "Shipped" && (
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition">
              <MapPinned size={18} />
              Track Order
            </button>
          )}

          {order.orderStatus === "Pending" && (
            <button onClick={() => handleCancel(order)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition">
              <XCircle size={18} />
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllOrder
