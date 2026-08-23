import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    try {
        // Checking your exact .env keys configuration mappings
        if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
            throw new Error("Cloudinary credentials mismatch or missing in your .env file");
        }

        // Direct cloud parameters mapped exactly to your .env keys
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });

        console.log("☁️ Cloudinary Configuration Connected Successfully !!");
    } 
    catch (error) {
        console.log("❌ Cloudinary Connection Error safely caught:", error.message);
    }
};

export default connectCloudinary;
