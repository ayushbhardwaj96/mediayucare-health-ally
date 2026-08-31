import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import fs from "fs";   // Required for clearing out local temporary storage uploads
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay';

const razorpayInstance = (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
    ? new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
    : null;

/**
 * Registers a new user account, encrypts credentials, 
 * and generates an authentication token.
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Enforce payload completeness checks
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required registration details." 
            });
        }

        // 2. Format and structural email sanitization
        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide a structurally valid email address." 
            });
        }

        // 3. Enforce production-grade password strength rules (min 8 chars, uppercase, lowercase, digit, special char)
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters." 
            });
        }

        // 4. Perform an explicit lookup to preempt database index validation collision drops
        const existingUser = await userModel.findOne({ email: email.toLowerCase() }).lean();
        if (existingUser) {
            return res.status(409).json({ 
                success: false, 
                message: "An account with this email address already exists." 
            });
        }

        // 5. Generate secure salt rounds and hash credentials 
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        // 6. Save sanitized operational document mapping structure
        const newUser = new userModel({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });
        const user = await newUser.save();

        // 7. Generate temporary structural sign-in web token parameters
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // Explicitly force production session expiry flags
        );

        // Return 201 Created status standard for resource generation success
        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully.",
            token 
        });

    } catch (error) {
        // Track unhandled exception traces on the server terminal
        console.error(`[registerUser API Error]: ${error.message}`);
        
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. Unable to complete registration." 
        });
    }
};


/**
 * Authenticates user credentials, verifies encrypted passwords,
 * and issues an authentication web token.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Enforce payload completeness checks
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide both email and password." 
            });
        }

        // 2. Fetch the user profile from the database cleanly using .lean() for speed
        const user = await userModel.findOne({ email: email.toLowerCase().trim() }).lean();

        // 3. Fail gracefully if the account does not exist
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User account does not exist." 
            });
        }

        // 4. Compare the raw incoming password against the secure hashed database string
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // 5. Generate an authentication token with a production-grade 7-day expiration constraint
            const token = jwt.sign(
                { id: user._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '7d' }
            );

            return res.status(200).json({ 
                success: true, 
                message: "Login successful.",
                token 
            });
        } else {
            // 6. Return standard 401 Unauthorized code for invalid credentials
            return res.status(401).json({ 
                success: false, 
                message: "Invalid login credentials." 
            });
        }

    } catch (error) {
        // Track unhandled trace sequences safely on the server console
        console.error(`[loginUser API Error]: ${error.message}`);
        
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. Unable to complete login request." 
        });
    }
};

/**
 * Retrieves a sanitized user profile dataset using an authenticated ID payload, 
 * explicitly omitting sensitive keys.
 */
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;

         
        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "Bad Request: User ID (userId) is required." 
            });
        }

        
        const userData = await userModel.findById(userId).select('-password').lean();

         
        if (!userData) {
            return res.status(404).json({ 
                success: false, 
                message: "Resource Not Found: User profile record does not exist." 
            });
        }

        
        return res.status(200).json({ 
            success: true, 
            userData 
        });

    } catch (error) {
        // Log raw structural exception parameter trace details on host server console
        console.error(`[getProfile API Error]: ${error.message}`);
        
        // Respond with standard semantic 500 server crash status error structure
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. Failed to retrieve profile data." 
        });
    }
};


 

/**
 * Updates user profile information, sanitizes inputs, 
 * and handles cloud image storage transitions.
 */
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        // 1. Enforce validation check for required payload variables
        if (!name || !phone || !dob || !gender) {
            if (imageFile?.path) fs.unlinkSync(imageFile.path); // Free local disk space instantly
            return res.status(400).json({ success: false, message: "Missing required profile details." });
        }

        // 2. Prepare structural metadata collection mapping object
        const updateData = {
            name: name.trim(),
            phone: phone.trim(),
            dob,
            gender
        };

        // 3. Conditionally handle safe JSON string parsing for nested address blocks
        if (address) {
            try {
                updateData.address = JSON.parse(address);
            } catch (parseError) {
                if (imageFile?.path) fs.unlinkSync(imageFile.path);
                return res.status(400).json({ success: false, message: "Invalid address structural configuration format." });
            }
        }

        // 4. Handle secure image transitions through Cloudinary if a file payload exists
        if (imageFile) {
            try {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
                updateData.image = imageUpload.secure_url;
                
                // Clear the temporary local storage reference on cloud success
                if (imageFile?.path) fs.unlinkSync(imageFile.path);
            } catch (cloudinaryError) {
                if (imageFile?.path) fs.unlinkSync(imageFile.path);
                console.error(`[Cloudinary Profile Upload Exception]: ${cloudinaryError.message}`);
                return res.status(502).json({ success: false, message: "Failed to upload profile picture to cloud storage." });
            }
        }

        // 5. Production Optimization: Update all user fields in a SINGLE atomic database transaction
        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User profile record not found." });
        }

        return res.status(200).json({ success: true, message: "Profile updated successfully." });

    } catch (error) {
        // Safe tracking configuration logging inside host console
        if (req.file?.path) fs.unlinkSync(req.file.path);
        console.error(`[updateProfile API Error]: ${error.message}`);
        
        return res.status(500).json({ success: false, message: "Internal server error. Failed to update profile details." });
    }
};

 
// Book an appointment for a user
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        if (!userId || !docId || !slotDate || !slotTime) {
            return res.status(400).json({ success: false, message: "Missing slot details for booking selection." });
        }

        // Fetch doctor info and check general availability
        const docData = await doctorModel.findById(docId).select("-password").lean();
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor profile not found." });
        }

        if (!docData.available) {
            return res.status(400).json({ success: false, message: "Doctor is currently not available for bookings." });
        }

        let slots_booked = docData.slots_booked || {};

        // Check if the chosen time slot is already taken
        if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
            return res.status(409).json({ success: false, message: "This appointment slot is already booked." });
        }

        const userData = await userModel.findById(userId).select("-password").lean();
        if (!userData) {
            return res.status(404).json({ success: false, message: "User profile record not found." });
        }

        // Book the new slot in memory
        if (!slots_booked[slotDate]) {
            slots_booked[slotDate] = [];
        }
        slots_booked[slotDate].push(slotTime);

        // Remove slots data from doctor snapshot before saving the appointment record
        const sanitizedDocData = { ...docData };
        delete sanitizedDocData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: sanitizedDocData,
            amount: docData.fee, 
            slotTime,
            slotDate,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save the updated booking slots back to the doctor profile
        await doctorModel.findByIdAndUpdate(
            docId, 
            { slots_booked },
            { returnDocument: 'after', runValidators: true }
        );

        return res.status(201).json({ success: true, message: "Appointment booked successfully." });

    } catch (error) {
        console.error(`[bookAppointment API Error]: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error. Failed to book appointment." });
    }
};


/**
 * Retrieves a sorted collection of appointment records 
 * matching the authenticated user's ID payload.
 */
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "Bad Request: User identification parameter is missing." 
            });
        }

        // Fetch appointments, sort by latest creation date, and convert to plain JS objects for 3x performance
        const appointments = await appointmentModel.find({ userId })
            .sort({ createdAt: -1 }) 
            .lean();

        // Handle scenario where patient directory registry is empty gracefully
        if (!appointments || appointments.length === 0) {
            return res.status(200).json({ 
                success: true, 
                message: "No scheduled appointments found for this profile account.", 
                appointments: [] 
            });
        }

        return res.status(200).json({ 
            success: true, 
            appointments 
        });

    } catch (error) {
        console.error(`[listAppointment API Error]: ${error.message}`);
        
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. Failed to retrieve appointment histories." 
        });
    }
};

// Cancel an appointment and open up the doctor's time slot again
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        // Check if both required IDs are provided in the request
        if (!appointmentId || !userId) {
            return res.status(400).json({ success: false, message: "Appointment ID and User ID are required." });
        }

        // Find the appointment as a plain JavaScript object for better speed
        const appointmentData = await appointmentModel.findById(appointmentId).lean();

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment record not found." });
        }

        // Security check: Make sure the logged-in user actually owns this appointment
        if (appointmentData.userId !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized action. This appointment belongs to another user." });
        }

        // Don't allow cancelling an appointment that is already cancelled
        if (appointmentData.cancelled) {
            return res.status(400).json({ success: false, message: "This appointment has already been cancelled." });
        }

        // Mark the appointment as cancelled in the database
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;
        const slotQueryKey = `slots_booked.${slotDate}`;

        // Pull the booked time slot directly out of the doctor's schedule array in one clean step
        await doctorModel.findByIdAndUpdate(docId, {
            $pull: { [slotQueryKey]: slotTime }
        });

        return res.status(200).json({ success: true, message: "Appointment cancelled successfully." });

    } catch (error) {
        console.error(`[cancelAppointment API Error]: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error. Failed to cancel appointment." });
    }
};


// Initialize a secure checkout session order with Razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Appointment ID is required." });
        }

        if (!razorpayInstance) {
            return res.status(501).json({ success: false, message: "Razorpay setup is not initialized on the server." });
        }

        const appointmentData = await appointmentModel.findById(appointmentId).lean();

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment record not found." });
        }

        if (appointmentData.cancelled) {
            return res.status(400).json({ success: false, message: "Cannot initiate checkout on a cancelled appointment." });
        }

        // Configure payment specifications (amount is multiplied by 100 to map standard paisa)
        const options = {
            amount: appointmentData.amount * 100, 
            currency: process.env.CURRENCY || 'INR', 
            receipt: appointmentId.toString(),
        };

        const order = await razorpayInstance.orders.create(options);

        return res.status(201).json({ success: true, order });

    } catch (error) {
        console.error(`[paymentRazorpay API Error]: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error. Failed to initiate payment order." });
    }
};

 
 
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.status(201).json({ success: true, message: "Payment Successful" })
        }
        else {
            res.status(400).json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
 






export { registerUser,
     loginUser ,
      getProfile,
       updateProfile
       , bookAppointment,
        listAppointment,
         cancelAppointment ,
          paymentRazorpay ,
        verifyRazorpay};
