import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Required for cleaning up temporary files
import doctorModel from "../models/doctorModel.js"; 

// API for adding Doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Dynamic check to catch multiple missing fields simultaneously
        const requiredFields = ['name', 'email', 'password', 'speciality', 'degree', 'experience', 'about', 'fees', 'address'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            if (imageFile?.path) fs.unlinkSync(imageFile.path); // Free local disk space immediately
            return res.status(400).json({ 
                success: false, 
                message: `Missing required details: Please provide ${missingFields.join(', ')}` 
            });
        }

        // Ensuring file uploaded successfully through middleware
        if (!imageFile) {
            return res.status(400).json({ 
                success: false, 
                message: "Please upload a profile image for the doctor." 
            });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            if (imageFile?.path) fs.unlinkSync(imageFile.path);
            return res.status(400).json({ 
                success: false, 
                message: "The email address formatting is incorrect. Please enter a valid email." 
            });
        }

        // Validating production-grade strong password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            if (imageFile?.path) fs.unlinkSync(imageFile.path);
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character." 
            });
        }

        // Hashing user password securely
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        // Uploading image to Cloudinary securely
        let imageUrl = "";
        try {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = imageUpload.secure_url;
            
            // Clean up the temporary local file on successful cloud delivery
            if (imageFile?.path) fs.unlinkSync(imageFile.path);
        } catch (cloudinaryError) {
            console.error("Cloudinary Error:", cloudinaryError.message);
            if (imageFile?.path) fs.unlinkSync(imageFile.path);
            return res.status(502).json({ 
                success: false, 
                message: "Failed to upload profile image to cloud storage." 
            });
        }

        // Validating JSON syntax structure for address safely
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (parseError) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid address format. Please check your data." 
            });
        }

        // Preparing mapped data for database submission
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee: fees, // Correctly mapped to schema key
            address: parsedAddress,
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // 201 Created status standard for new database resource entry
        return res.status(201).json({ success: true, message: 'Doctor Added Successfully' });

    } catch (error) {
        console.error("Database save failed:", error.message);

        // ✅ FIX: Enhanced check to catch duplicate key errors safely across different versions of Mongo/Mongoose
        if (error.code === 11000 || (error.message && error.message.includes('duplicate key'))) {
            return res.status(409).json({ 
                success: false, 
                message: "A doctor with this email address already exists." 
            });
        }

        // Clean fallback default for unhandled code runtime breaks
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. System could not complete request." 
        });
    }
};


// API for the admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate that input fields are present
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide both email and password." 
            });
        }

        // 2. Strict check for missing or unconfigured environment variables
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
            console.error("Critical Security Error: Admin credentials or JWT_SECRET are not set in environment variables.");
            return res.status(500).json({ 
                success: false, 
                message: "Internal server authentication configuration error." 
            });
        }

        // 3. Verify admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign(
                { email: email, role: 'admin' }, 
                process.env.JWT_SECRET,
                { expiresIn: '24h' } // Security practice: Tokens must always expire
            );

            return res.status(200).json({ success: true, token });
        } else {
            // Use 401 Unauthorized for bad credential submissions
            return res.status(401).json({ success: false, message: "Incorrect email or password. Please try again." });
        }  

    } catch (error) {
        console.error("Admin login error context:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. Authentication failed." 
        });
    }
};

export { addDoctor, loginAdmin };
