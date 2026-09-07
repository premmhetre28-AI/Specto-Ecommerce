import { NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB'
import Orders from '@/app/models/Orders'
import { cookies } from 'next/headers'
import { verifyToken } from "@/lib/jwt";

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
        const { product,orderId } = await req.json()

        const newOrder = await Orders.create({
            customerId: userId,
            vendorId: product.user,
            productId: product._id,
            productName: product.name,
            quantity: 1,
            email: decoded.email,
            price: product.selling_price,
            totalAmount: product.selling_price * 1,

            razorpayOrderId: orderId,

            paymentStatus: "Paid",
            orderStatus: "Pending",
            image: product.image,
            description: product.description,
            category: product.category
        });

        return NextResponse.json({
            success: true,
            newOrder
        })

    } catch (error) {
        console.log("BACKEND ERROR:", error);
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}
