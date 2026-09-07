import { NextResponse } from "next/server";
import StockHistory from "@/app/models/stockHistory";
import connectDB from "@/lib/connectDB";

export async function GET() {
    try {
        await connectDB()
        const product = await StockHistory.aggregate([
            {
                $match: {
                    type: "OUT"
                }
            },
            {
                $sort: {
                    createdAt: -1   // latest first
                }
            },
            {
                $group: {
                    _id: "$productId",
                    productName: { $first: "$name" },
                    category: { $first: "$category" },
                    selling_price: { $first: "$selling_price" },
                    totalSold: { $sum: "$quantity" },
                    image: { $first: "$image" },
                    description: { $first: "$description"},

                    totalRevenue: {
                        $sum: {
                            $multiply: ["$quantity", "$selling_price"]
                        }
                    }
                }
            },
            {
                $sort: {
                    totalSold: -1
                }
            },
            {
                $limit: 1  // top 1
            }

        ]);
        return NextResponse.json({
            success: true,
            product
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}

