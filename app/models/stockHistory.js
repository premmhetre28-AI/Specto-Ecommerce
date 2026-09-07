import mongoose from 'mongoose'

const StockHistorySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    selling_price: {
        type: Number,
        required: true,
    },

    type: {
        type: String,
        enum: ["IN", "OUT"]
    },

    quantity: {
        type: Number,
        required: true,
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

    gender: {
        type: String,
        required: true,
        enum: ["men", "women", "unisex"],
    },

    image: {
        type: String,
        default: "",
    },

},
    { timestamps: true }   // gives createdAt automatically
);

export default mongoose.models.StockHistory ||
    mongoose.model("StockHistory", StockHistorySchema);
