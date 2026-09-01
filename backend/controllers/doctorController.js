
import doctorModel from "../models/doctorModel.js"; 
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

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


// Marks a scheduled appointment as successfully completed by the assigned doctor
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        if (!appointmentId || !docId) {
            return res.status(400).json({ success: false, message: "Appointment ID and Doctor ID are required parameters." });
        }

        const appointmentData = await appointmentModel.findById(appointmentId).lean();

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Target appointment record not found." });
        }

        // Cross-verify session data to prevent cross-account modification attempts
        if (appointmentData.docId.toString() !== docId.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized action. This appointment is assigned to a different doctor." });
        }

        if (appointmentData.cancelled) {
            return res.status(400).json({ success: false, message: "Cannot complete an appointment that has already been cancelled." });
        }

        if (appointmentData.isCompleted) {
            return res.status(400).json({ success: false, message: "This appointment has already been marked as completed." });
        }

        // Update the completion flag atomically in the database
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

        return res.status(200).json({ success: true, message: "Appointment marked as completed successfully." });

    } catch (error) {
        console.error(`[appointmentComplete API Exception]: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error. Failed to complete appointment." });
    }
};


// API to cancel an appointment directly from the doctor dashboard panel
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        if (!appointmentId || !docId) {
            return res.status(400).json({ success: false, message: "Appointment ID and Doctor ID are required parameters." });
        }

        const appointmentData = await appointmentModel.findById(appointmentId).lean();

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Target appointment record not found." });
        }

        // Cross-verify doctor ownership to prevent cross-account modifications
        if (appointmentData.docId.toString() !== docId.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized action. This appointment is assigned to a different doctor." });
        }

        if (appointmentData.cancelled) {
            return res.status(400).json({ success: false, message: "This appointment has already been cancelled." });
        }

        if (appointmentData.isCompleted) {
            return res.status(400).json({ success: false, message: "Cannot cancel an appointment that has already been completed." });
        }

        // Atomically flag the appointment status as cancelled in the database
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { slotDate, slotTime } = appointmentData;
        const slotQueryKey = `slots_booked.${slotDate}`;

        // Instantly release the time slot from the doctor's calendar schedule for other patients
        await doctorModel.findByIdAndUpdate(docId, {
            $pull: { [slotQueryKey]: slotTime }
        });

        return res.status(200).json({ success: true, message: "Appointment cancelled successfully." });

    } catch (error) {
        console.error(`[appointmentCancel Doctor API Error]: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error. Failed to cancel appointment." });
    }
};


//  API to get dashboard data in doctor pannel

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID parameter is required." });
        }

        // Convert the string safely to an authentic ObjectId for matching
        const doctorObjectId = new mongoose.Types.ObjectId(docId);

        const [analytics, latestAppointments] = await Promise.all([
            appointmentModel.aggregate([
                { 
                    // FIXED: Check both the true ObjectId AND the raw String representation to handle schema mismatches
                    $match: { 
                        $or: [
                            { docId: doctorObjectId },
                            { docId: docId }
                        ]
                    } 
                },
                {
                    $group: {
                        _id: null,
                        totalAppointments: { $sum: 1 },
                        earnings: {
                            $sum: {
                                $cond: [
                                    { $or: [
                                        { $eq: ["$isCompleted", true] },
                                        { $eq: ["$completed", true] },
                                        { $eq: ["$payment", true] }
                                    ]},
                                    "$amount",
                                    0
                                ]
                            }
                        },
                        uniquePatients: { $addToSet: "$userId" }
                    }
                }
            ]),
            appointmentModel.find({ docId })
                .select('-__v')
                .sort({ createdAt: -1 })
                .limit(5)
                .lean()
        ]);

        // Access the first index item if the data array contains aggregated stats
        const stats = analytics[0] || { totalAppointments: 0, earnings: 0, uniquePatients: [] };

        const dashData = {
            earnings: stats.earnings || 0,
            appointments: stats.totalAppointments || 0,
            patients: stats.uniquePatients ? stats.uniquePatients.length : 0,
            latestAppointments: latestAppointments || []
        };

        return res.status(200).json({ success: true, dashData });

    } catch (error) {
        console.error(`[doctorDashboard API Error]: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error. Failed to compile dashboard metrics." });
    }
};

// get doctor profile in doctor panel
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;

        // Ensure the doctor ID parameter is provided before touching the database
        if (!docId) {
            return res.status(400).json({ 
                success: false, 
                message: "Doctor ID parameter is required." 
            });
        }

        // Fetch profile data without sensitive credentials and parse as a fast plain JS object
        const profileData = await doctorModel.findById(docId)
            .select('-password -__v')
            .lean();

        if (!profileData) {
            return res.status(404).json({ 
                success: false, 
                message: "Doctor profile record not found." 
            });
        }

        return res.status(200).json({ 
            success: true, 
            profileData 
        });

    } catch (error) {
        console.error(`[doctorProfile API Error]: ${error.message}`);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error. Failed to retrieve profile data." 
        });
    }
};


// API to update doctor profile data from Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fee, address, available } = req.body;

        // Fail-fast structural validation
        if (!docId) {
            return res.status(400).json({ success: false, message: "Doctor ID is a required parameter." });
        }

        // Basic verification to protect database schema constraints
        if (fee !== undefined && (isNaN(fee) || fee < 0)) {
            return res.status(400).json({ success: false, message: "Please provide a valid numeric fee amount." });
        }

        // Build a dynamic, safe update object payload
        const updateData = {};
        
        if (fee !== undefined) updateData.fee = Number(fee);
        if (available !== undefined) updateData.available = Boolean(available);
        
        // Secure nested object handling for line addresses
        if (address) {
            updateData.address = {
                line1: address.line1?.trim() || "",
                line2: address.line2?.trim() || ""
            };
        }

        // Perform atomic database record modification
        const updatedDoctor = await doctorModel.findByIdAndUpdate(
            docId, 
            { $set: updateData }, 
            { new: true, runValidators: true } // Runs schema rule checks before writing changes
        );

        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor profile record not found." });
        }

        return res.status(200).json({ success: true, message: "Profile parameters updated successfully." });

    } catch (error) {
        console.error(`[updateDoctorProfile API Error]: ${error.message}`);
        return res.status(500).json({ success: false, message: "Internal server error. Failed to modify profile data." });
    }
};



export { 

    doctorList,
    changeAvailability , loginDoctor , appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile
};