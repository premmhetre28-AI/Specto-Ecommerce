import connectDB from "@/lib/connectDB";
import Product from "@/app/models/Product";
import StockHistory from "@/app/models/stockHistory";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";


export async function POST(req) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value
        if (!token) {
            return Response.json({
                success: false,
                message: "No token found",
            });
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            return Response.json({
                success: false,
                message: "Invalid token",
            });
        }
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


        await connectDB();

        const body = await req.json();

        const product = await Product.create({
            name: body.name,
            stock: body.stock,
            price: body.price,
            selling_price: body.selling_price,
            category: body.category,
            user: userId,
            gender: body.gender,
            description: body.description,
            image: body.image
        });

        const stockHistory = await StockHistory.create({
            productId: product._id,
            name: product.name,
            category: product.category,
            price: product.price,
            selling_price: product.selling_price,
            user: userId,
            type: "IN",
            quantity: product.stock,
            gender: product.gender,
            description: product.description,
            image: product.image
        });

        return NextResponse.json(
            {
                success: true,
                message: "Product added successfully",
                product,
            },
            { status: 201 }
        );

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

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value
        const decoded = verifyToken(token);
        const userId = decoded.id
        await connectDB();
        const product = await Product.find({ user: userId })
            .sort({ createdAt: -1 }); // Newest first

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

export async function DELETE(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { id, user } = body;

        const product = await Product.findOneAndDelete({
            _id: id,
            user: user
        });

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Product deleted successfully",
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

export async function PUT(req) {
    try {
        await connectDB();

        const body = await req.json();

        // Separate id from updated fields
        const { id, ...updatedData } = body;

        const product = await Product.findByIdAndUpdate(
            id,
            updatedData,
            {
                returnDocument: "after"   // updated document
            }
        );

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
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