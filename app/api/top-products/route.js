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

    const top_product = await StockHistory.aggregate([
        {
            $match: {
                user: userId,
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
            $limit: 10   // top 5
        }

    ]);
    return NextResponse.json({
        success: true,
        top_product
    });
}