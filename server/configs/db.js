import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Mongoose is connected");
        })
        const mongodbURI = process.env.MONGODB_URI;
        if(!mongodbURI){
            throw new Error('MONGODB_URI is not defined')
        }
        await mongoose.connect(mongodbURI);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
};

export default connectDB