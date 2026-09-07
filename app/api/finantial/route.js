import connectDB from "@/lib/connectDB";
import StockHistory from "@/app/models/stockHistory"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
    
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const decoded = verifyToken(token);
    const userId = decoded.id
    await connectDB()
    const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
    );

    const endOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
        23, 59, 59
    );

    const finatial_analytics = await StockHistory.aggregate([
        {
            $match: {
                user: userId,
                type: "OUT",
                createdAt: {
                    $gte: startOfMonth,
                    $lte: endOfMonth
                }
            }
        },

        {
            $group: {
                _id: null,

                // Revenue = selling price × quantity
                totalRevenue: {
                    $sum: {
                        $multiply: ["$selling_price", "$quantity"]
                    }
                },

                // Cost = buying price × quantity
                totalCost: {
                    $sum: {
                        $multiply: ["$price", "$quantity"]
                    }
                },

                // Total units sold
                totalSales: {
                    $sum: "$quantity"
                },

                // Loss if sold below buying price
                totalLoss: {
                    $sum: {
                        $cond: [
                            { $lt: ["$selling_price", "$price"] },

                            {
                                $multiply: [
                                    { $subtract: ["$price", "$selling_price"] },
                                    "$quantity"
                                ]
                            },

                            0
                        ]
                    }
                }
            }
        }

    ]);
    return NextResponse.json({
        success: true,
        finatial_analytics
    });
}