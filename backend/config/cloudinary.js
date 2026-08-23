import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    try {
        // Checking if environment variables exist before loading config flags
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            throw new Error("Cloudinary credentials are not defined in your .env file");
        }

        // Direct cloud parameters structure config mapping
        await cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        console.log("☁️ Cloudinary Configuration Connected Successfully !!");
    } 
    catch (error) {
        console.log("❌ Cloudinary Connection Error safely caught:", error.message);
        // Throwing error back to server initialization log safely if needed
        throw error; 
    }
};

export default connectCloudinary;
