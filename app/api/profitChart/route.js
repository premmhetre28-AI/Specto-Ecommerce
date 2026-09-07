import { NextResponse } from "next/server";
import connectDB from '@/lib/connectDB';
import StockHistory from "@/app/models/stockHistory"
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

    const graphDataprofit = await StockHistory.aggregate([
        {
            $match: {
                user: userId,
                type: "OUT",
                createdAt: {
                    $gte: startDate,
                }
            }
        },

        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt",
                    },
                },

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
                },
                // net profit 
                netProfit: {
                    $sum: {
                        $multiply: [
                            { $subtract: ["$selling_price", "$price"] },
                            "$quantity"
                        ]
                    }
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }

    ]);
    return NextResponse.json({
        success: true,
        graphDataprofit,
    });
}
