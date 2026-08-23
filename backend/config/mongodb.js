import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log("Mongoose background me connect karne ki koshish kar raha hai...");
        
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in environment variables");
            return;
        }

        // Direct template literal integration mirroring your working architecture pattern
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        console.log(`\n ✅ MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MONGO connection error standard catch: ", error);
        process.exit(1);
    }
}

export default connectDB;
