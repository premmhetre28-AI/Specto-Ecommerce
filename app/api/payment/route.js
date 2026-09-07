import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB'


const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

export async function POST(req) {
    try {
        await connectDB()
        const { amount } = await req.json()
        const options = {
            amount: amount * 100,   // convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            success: true,
            order
        })
    } catch (error) {
        console.log("RAZORPAY BACKEND ERROR:", error);
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}