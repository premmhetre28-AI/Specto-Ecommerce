import connectDB from "@/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const product = await Product.find({
            gender: { $in: ["women", "unisex"] },
            category:"fashion"
        });
        return NextResponse.json({
            success: true,
            product,
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