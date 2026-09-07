import React from 'react'
import { customerPayment } from "@/app/redux/slices/productSlice";
import { useDispatch } from 'react-redux';
const PayButton = ({ product }) => {
    const dispatch = useDispatch()
    const handlePay = async (product) => {
        const res = await dispatch(customerPayment(product))
        if (res.payload.success) {
            const order = res.payload.order
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Stock Management",
                description: "Customer Payment",
                order_id: order.id,
                handler: async function (response) {
                    const result = await fetch('/api/customer/orderVendor/createOrder', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ product, orderId: order.id })
                    });
                }
            }
            const paymentObject = new window.Razorpay(options);

            paymentObject.open();
        }
    }
    return (
        <>
            <button
                onClick={() => handlePay(product)}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg active:scale-95"
            >
                Buy Now
            </button>
        </>
    )
}

export default PayButton
