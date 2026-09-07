import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import Supplier from '@/app/models/Supplier'

export async function POST(req) {
  try {
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

    await connectDB();

    const body = await req.json();
    const check = await Supplier.findOne({
      user: userId,
      productName: body.productName,
    })
    if (check) {
      return NextResponse.json(
        {
          success: false,
          message: "Aleready in your Suppliers-log",
        },
        { status: 401 }
      );
    }
    else {
      const suppliers = await Supplier.create({
        productName: body.productName,
        name: body.name,
        company: body.company,
        email: body.email,
        phone: body.phone,
        address: body.address,
        totalAmount: body.totalAmount,
        paidAmount: body.paidAmount,
        dueAmount: body.dueAmount,
        paymentStatus: body.paymentStatus,
        user: userId
      })


      return NextResponse.json(
        {
          success: true,
          message: "Supplier added successfully",
          suppliers,
        },
        { status: 201 }
      );
    }



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
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const suppliers = await Supplier.find({
      user: userId,
    })
    return NextResponse.json(
      {
        success: true,
        suppliers
      }
    )
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
    const { id } = body;

    const product = await Supplier.findOneAndDelete({
      _id: id,
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
      message: "Supplier deleted successfully",
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
    const { id, ...payload } = body;

    const supplier = await Supplier.findByIdAndUpdate(
      id,
      payload,
      { new: true }
    );

    if (!supplier) {
      return NextResponse.json(
        {
          success: false,
          message: "Supplier not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Supplier updated successfully",
      supplier,
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