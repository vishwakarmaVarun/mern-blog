import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected Successfully to Database")
    } catch (error) {
        console.log("Connection Failed to Database", error);
    }
}

export default connectDB