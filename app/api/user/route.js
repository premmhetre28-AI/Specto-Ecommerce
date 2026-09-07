import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import User from "@/app/models/User";
import connectDB from '@/lib/connectDB'

export async function GET() {
    try {
        // Connect DB
        await connectDB();
        // Get token from cookies
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized - No token found",
                },
                { status: 401 }
            );
        }
        // Verify JWT
        const decoded = verifyToken(token);

        if (!decoded) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid token",
                },
                { status: 401 }
            );
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                user,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Server error",
            },
            { status: 500 }
        );
    }
}