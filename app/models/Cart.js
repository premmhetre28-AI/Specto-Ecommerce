import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        }
    ]
})
export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);