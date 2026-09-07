import mongoose from 'mongoose'

const connectDB=async () =>{
    try {
        if (mongoose.connections[0].readyState) {
            console.log("MongoDB already connected");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Error:", error);
        process.exit(1);
    }
}
export default connectDB