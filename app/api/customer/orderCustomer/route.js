import { NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB'
import Orders from '@/app/models/Orders'
import { cookies } from 'next/headers'
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No token found",
        },
        { status: 401 }
      );
    }

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

    const userId = decoded.id;

    const orders = await Orders.find({ customerId: userId,orderStatus: { $in: ["Pending", "Packed", "Shipped", "Delivered"] }, })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}