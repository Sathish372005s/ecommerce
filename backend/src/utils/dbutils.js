import mongoose from "mongoose";
export const connectdb = async () => {
    try {
        const url = process.env.MONGODB_URL
        await mongoose.connect(url)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
    }
}