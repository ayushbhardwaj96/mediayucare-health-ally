
import doctorModel from "../models/doctorModel.js"; 
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password parameters are required." 
            });
        }

        // Clean user input and check if the doctor exists in the database
        const doctor = await doctorModel.findOne({ email: email.toLowerCase().trim() });

        // Generic error response to prevent account enumeration attacks
        if (!doctor) {
            return res.status(401).json({ success: false, message: "Invalid email or password credentials." }) ;
        }

        const isMatch = await bcrypt.compare(password, doctor.password) ;

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password credentials." });
        }

        // Generate a secure token with explicit role scope tracking
        const token = jwt.sign(
            { 
                id: doctor._id, 
                role: 'doctor', 
                email: doctor.email 
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        doctor.password = undefined;

        return res.status(200).json({ 
            success: true, 
            token,
            message: "Authentication successful. Welcome to your dashboard."
        });

    } catch (error) {
        console.error(`[loginDoctor API Exception]: ${error.message}`);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error occurred during authentication processing." 
        });
    }
};



/**
 * @api {post} /api/admin/change-availability Toggle doctor availability status
 * @apiDescription Toggles the availability boolean state cleanly using an optimized update operation.
 * @apiAccess Private (Admin / Doctor Panel)
 */
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        // 1. Validate that the required ID payload parameter exists
        if (!docId) {
            return res.status(400).json({ 
                success: false, 
                message: "Bad Request: Doctor ID (docId) is required." 
            });
        }

        // 2. Fetch the target doctor record explicitly to find current status
        const doctor = await doctorModel.findById(docId);
        
        if (!doctor) {
            return res.status(404).json({ 
                success: false, 
                message: "Resource Not Found: No doctor profile exists with the provided ID." 
            });
        }

        // 3. Update the boolean state to its direct inverse cleanly
        doctor.available = !doctor.available;
        await doctor.save();

        // 4. Return standard 200 OK semantic status with an explicit success message
        return res.status(200).json({ 
            success: true, 
            message: "Availability status updated successfully." 
        });

    } catch (error) {
        // 5. Securely log internal trace parameters on the host system console for auditing
        console.error(`[ChangeAvailability API Error]: ${error.message}`);

        // 6. Respond with a proper 500 error instead of masking server crashes behind a 200 JSON payload
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. Failed to toggle availability state at this moment." 
        });
    }
};


/**
 * Retrieves an optimized list of public doctor profiles, 
 * excluding sensitive credential data.
 */
const doctorList = async (req, res) => {
    try {
        // Exclude sensitive fields and convert to plain JS objects for 3x performance boost
        const doctors = await doctorModel.find({})
            .select('-password -email')
            .lean();

        // Handle empty directory scenarios gracefully without crashing
        if (!doctors || doctors.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No doctor profiles found.",
                doctors: []
            });
        }

        return res.status(200).json({
            success: true,
            doctors
        });

    } catch (error) {
        // Track the exact issue securely on the server terminal
        console.error(`[doctorList API Error]: ${error.message}`);

        return res.status(500).json({
            success: false,
            message: "Internal server error. Unable to load the doctors list."
        });
    }
};

// Fetch all scheduled appointments assigned to a specific doctor
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required." });
        }

        // Retrieve appointments for the doctor and sort them from newest to oldest
        const appointments = await appointmentModel.find({ docId })
            .select('-__v')
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({ success: true, appointments });

    } catch (error) {
        console.error(`[appointmentsDoctor API Error]: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error. Failed to retrieve appointments." });
    }
};



 

export { 

    doctorList,
    changeAvailability , loginDoctor , appointmentsDoctor
};