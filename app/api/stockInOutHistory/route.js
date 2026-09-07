import connectDB from "@/lib/connectDB";
import StockHistory from "@/app/models/stockHistory"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
    await connectDB()
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const decoded = verifyToken(token);
    const userId = decoded.id
    const start = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
    );

    const end = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
        23, 59, 59, 999
    );
    const totalinout = await StockHistory.find({
        user: userId,
        createdAt: {
            $gte: start,
            $lte: end
        }
    }).sort({ createdAt: -1 })
    return NextResponse.json({
        success: true,
        totalinout
    });
}