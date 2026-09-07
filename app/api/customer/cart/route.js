import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Cart from "@/app/models/Cart";
import { verifyToken } from "@/lib/jwt";
import {cookies} from "next/headers";
import Product from "@/app/models/Product";

export async function POST(req) {
    try {
        await connectDB()
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized - No token found",
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
            )
        }
        const userId = decoded.id;
        const { productId } = await req.json();
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
            });
        }
        const existingItem = cart.items.find(
            (item) =>
                item.productId.toString() === productId
        );
        if (existingItem) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product already in cart"
                },
                { status: 400 }
            );
        } 
        cart.items.push({
            productId,
        });
        await cart.save()
        return NextResponse.json(
            {
                success: true,
                message: "Product Added in cart",
                product:cart.items.map((item)=>item.productId)
            },
            { status: 200 }
        );
        


    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        )
    }
}
export async function GET() {
    try {
        await connectDB()
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized - No token found",
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
            )
        }
        const userId = decoded.id;
        let cart = await Cart.findOne({ userId }).populate("items.productId")
        if (!cart) {
            return NextResponse.json(
                {
                    success: true,
                    cart: []
                },
                { status: 200 }
            );
        }
        const items = [...cart.items].reverse()
        return NextResponse.json(
            {
                success: true,
                cart: items.map((item)=>item.productId)
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req){
    try {
        await connectDB()
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized - No token found",
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
            )
        }
        const userId = decoded.id;
        const { productId } = await req.json();
        const cart = await Cart.findOne({userId})
        if(!cart){
            return NextResponse.json({
                success:false,
                message: "Cart not found",
            })
        }
        // remove product from cart
        cart.items=cart.items.filter((item)=>item.productId.toString() !== productId)
        await cart.save()
        return NextResponse.json({
            success:true,
            message:"Product removed from cart",
            productId
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}