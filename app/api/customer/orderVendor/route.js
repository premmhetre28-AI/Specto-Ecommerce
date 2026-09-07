import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB'
import Orders from '@/app/models/Orders'
import { cookies } from 'next/headers'
import { verifyToken } from "@/lib/jwt";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

export async function POST(req) {
    try {
        await connectDB()
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value
        if (!token) {
            return Response.json({
                success: false,
                message: "No token found",
            });
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            return Response.json({
                success: false,
                message: "Invalid token",
            });
        }
        const userId = decoded.id
        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }
        const { product } = await req.json()
        
        const options = {
            amount: (product.selling_price) * 100,   // convert to paise
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

export async function GET() {
    try {
        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No token found",
                },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid token",
                },
                { status: 401 }
            );
        }

        const userId = decoded.id;

        const orders = await Orders.find({ vendorId: userId }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            orders,
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        await connectDB()
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value
        if (!token) {
            return Response.json({
                success: false,
                message: "No token found",
            });
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            return Response.json({
                success: false,
                message: "Invalid token",
            });
        }
        const userId = decoded.id

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }
        const order = await req.json()
        const customerOrder = await Orders.findOneAndUpdate(
            {
                customerId: userId,
                productId: order.productId,
                razorpayOrderId: order.razorpayOrderId,
            },
            {
                $set: {
                    orderStatus: "Cancelled",
                },
            },
            { new: true }
        );

        if (!customerOrder) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order not found",
                },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            message: "Order cancel successfull",
            customerOrder,
        })

    } catch (error) {
        console.log("BACKEND ERROR:", error);
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}