import connectDB from "@/lib/connectDB";
import Supplier from "@/app/models/Supplier";
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
        const {search} = await req.json()

        if (!search) {
            return NextResponse.json({
                success: false,
                message:"data not found"
            });
        }
        else {
            const data = await Supplier.find({
                user:userId,
                productName: { $regex: search, $options: "i" }
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
                    suppliers: data
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