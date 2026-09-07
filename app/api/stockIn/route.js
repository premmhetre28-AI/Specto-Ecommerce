import connectDB from "@/lib/connectDB";
import Product from "@/app/models/Product";
import StockHistory from "@/app/models/stockHistory"
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

    const { editStock, quantity } = await req.json();

    if (!quantity || Number(quantity) <= 0) {
      return NextResponse.json(
        { message: "Invalid quantity" },
        { status: 400 }
      );
    }

    const product = await Product.findOne({
      _id: editStock,
      user: userId,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    product.stock += Number(quantity);

    await product.save();

    const StockInhistory = await StockHistory.create({
      productId: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      selling_price: product.selling_price,
      user: userId,
      type: "IN",
      quantity: Number(quantity),
      price: product.price,
      image: product.image,
      description: product.description,   // assuming product has price field
      gender:product.gender
    })

    return NextResponse.json({
      success: true,
      message: "Product stock updated",
      product,
      StockInhistory
    });

  } catch (err) {
    console.log("FULL ERROR:", err);
    console.log("MESSAGE:", err.message);
    console.log("STACK:", err.stack);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}