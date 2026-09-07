import connectDB from "@/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectDB();
        const { query } = await req.json()
        if (!query || query.trim() === "") {
            return NextResponse.json({
                success: false,
                message: "Query is required",
            }, { status: 400 });
        }
        let products;

        if (query === "men" || query === "women" || query === "unisex") {
            products = await Product.find({
                gender: query.toLowerCase()
            });
        } else {
            products = await Product.find({
                $text: {
                    $search: query
                }
            });
        }

        return NextResponse.json({
            success: true,
            products,
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