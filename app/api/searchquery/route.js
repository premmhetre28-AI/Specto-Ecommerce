import connectDB from "@/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function POST(req) {
    try {
        await connectDB()
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value
        const decoded = verifyToken(token);
        const userId = decoded.id
        const { query } = await req.json()

        if (!query) {
            return NextResponse.json({
                success: false,
                message: "data not found"
            });
        }
        else {
            const data = await Product.find({
                user: userId,
                name: { $regex: query, $options: "i" }
            })
            if (data.length === 0) {
                console.log("data not found")
                return NextResponse.json({
                    success: false,
                    message: "Data not found"
                });
            }
            else {
                return NextResponse.json({
                    success: true,
                    products: data
                });
            }

        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}