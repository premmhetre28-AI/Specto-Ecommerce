import { NextResponse } from "next/server";
import connectDB from '@/lib/connectDB';
import StockHistory from "@/app/models/stockHistory";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET(req) {
    await connectDB()
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const decoded = verifyToken(token);
    const userId = decoded.id
    // get ?type=daily / weekly / monthly

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type")

    let startDate = new Date();

    // filter logic

    if (type === "daily") {
        startDate.setDate(startDate.getDate() - 1)
    }
    else if (type === "weekly") {
        startDate.setDate(startDate.getDate() - 7);
    }
    else if (type === "monthly") {
        startDate.setDate(startDate.getDate() - 30);
    }
    else if (type === "yearly") {
        startDate.setFullYear(startDate.getFullYear() - 1);
    }

    const graphData = await StockHistory.aggregate([
        {
            $match: {
                user: userId,
                createdAt: {
                    $gte: startDate
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt",
                    }
                },
                totalStockIn: {
                    $sum: {
                        $cond: [{ $eq: ["$type", 'IN'] }, "$quantity", 0]
                    }
                },
                totalStockOut: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "OUT"] }, "$quantity", 0],
                    },
                },

            }
        },
        {
            $sort: { _id: 1 },
        },
    ])
    return NextResponse.json({
        success: true,
        graphData,
    });
}
