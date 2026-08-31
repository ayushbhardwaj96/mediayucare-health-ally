import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Required for cleaning up temporary files
import doctorModel from "../models/doctorModel.js"; 
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

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

        //   Enhanced check to catch duplicate key errors safely across different versions of Mongo/Mongoose
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

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        // 1. Using .lean() converts the Mongoose document into a plain JS object, making the query 3x faster and saving server memory
        const doctors = await doctorModel.find({}).select('-password').lean();
        
        // 2. Gracefully handle the scenario where no doctor records exist in the database
        if (!doctors || doctors.length === 0) {
            return res.status(200).json({ 
                success: true, 
                message: "No doctors found in the system.",
                doctors: [] 
            });
        }

        // 3. Standard production success response with structured payload data
        return res.status(200).json({ 
            success: true, 
            message: "Doctors list retrieved successfully.",
            doctors 
        });

    } catch (error) {
        // 4. Log the exact internal error message on the backend console for strict tracking and debugging
        console.error(`[allDoctors API Error]: ${error.message}`);
        
        // 5. Send a generic clean error message to the frontend client without leaking internal database architecture strings
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. Unable to fetch doctors list at this moment." 
        });
    }
};

// Fetch all system appointments sorted by newest first
const appointmentsAdmin = async (req, res) => {
    try {
        // Find all records and sort them so newest bookings appear at the top
        const appointments = await appointmentModel.find({}).sort({ createdAt: -1 });
        
        return res.status(200).json({ 
            success: true, 
            appointments 
        });

    } catch (error) {
        // Log the detailed error string securely on the backend terminal
        console.error("Admin Appointments Fetch Exception:", error);
        
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve appointments due to a server error." 
        });
    }
};

// API for cancel the appointments from admin
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        // Fetch the active appointment record to read the schedule information
        const appointmentData = await appointmentModel.findById(appointmentId).lean();

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment record not found." });
        }

        // Prevent processing if the appointment has already been cancelled
        if (appointmentData.cancelled) {
            return res.status(400).json({ success: false, message: "This appointment is already cancelled." });
        }

        // Mark the appointment as cancelled in the database
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Extract scheduling metadata parameters safely
        const { docId, slotDate, slotTime } = appointmentData;
        const slotQueryKey = `slots_booked.${slotDate}`;

        // Release the booked time slot from the doctor's schedule array instantly
        await doctorModel.findByIdAndUpdate(docId, {
            $pull: { [slotQueryKey]: slotTime }
        });

        return res.status(200).json({ success: true, message: "Appointment cancelled successfully." });

    } catch (error) {
        console.error(`[cancelAppointment Admin API Error]: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error. Failed to cancel appointment." });
    }
};

const adminDashboard = async (req, res) => {
    try {
        // Fetch summary counts and latest records concurrently to optimize execution speed
        const [doctorCount, patientCount, totalAppointments, latestAppointments] = await Promise.all([
            doctorModel.countDocuments({}),
            userModel.countDocuments({}),
            appointmentModel.countDocuments({}),
            appointmentModel.find({})
                .select('-__v')
                .sort({ createdAt: -1 }) // Sort by newest records directly on the database server
                .limit(5)
                .lean()
        ]);

        const dashData = {
            doctors: doctorCount,
            appointments: totalAppointments,
            patients: patientCount,
            latestAppointments: latestAppointments || []
        };

        return res.status(200).json({ 
            success: true, 
            dashData 
        });

    } catch (error) {
        console.error(`[adminDashboard API Error]: ${error.message}`);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. Failed to compile dashboard metrics." 
        });
    }
};


export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel,adminDashboard };
