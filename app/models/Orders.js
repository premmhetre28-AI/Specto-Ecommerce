import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        productName:{
            type:String
        },

        quantity: {
            type: Number,
            default: 1,
        },
        email: {
            type: String,
        },

        price: Number,

        totalAmount: Number,

        razorpayOrderId: String,

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },

        orderStatus: {
            type: String,
            enum: ["Pending", "Packed", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        image: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "fashion",
                "footwear",
                "electronics",
                "beauty",
                "accessories",
                "sports",
                "watches",
                "bags",
            ],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Orders ||
    mongoose.model("Orders", orderSchema);