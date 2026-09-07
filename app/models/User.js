import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "customer", "vendor"],
        default: "customer"
    }
})

export default mongoose.models.User ||
    mongoose.model("User", userSchema)