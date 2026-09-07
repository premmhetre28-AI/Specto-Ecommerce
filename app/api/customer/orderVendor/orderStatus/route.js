
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
        const { order } = await req.json()

        const newOrder = await Orders.findOneAndUpdate(
            {
                _id: order._id,
                vendorId: userId,
            },
            {
                $set: { orderStatus: "Shipped" }
            },
            {
                new: true, // returns the updated document
            }
        )
        return NextResponse.json({
            success: true,
            message: "Order Accepeted",
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
