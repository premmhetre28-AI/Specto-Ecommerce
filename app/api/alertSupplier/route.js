import connectDB from '@/lib/connectDB'
import Supplier from '@/app/models/Supplier'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
    try {
        await connectDB()
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value
        const decoded = verifyToken(token);
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
        const alertSuppliers = await Supplier.find({
            user: userId,
            paymentStatus: {
                $in: ["Pending", "Partial"]
            }
        })
        return NextResponse.json({
            success: true,
            alertSuppliers
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}