import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
    const cookieStore = await cookies();
    
    cookieStore.delete("token");

    return NextResponse.json({
        success: true,
        message: "Logged out successfully",
    });
}