
import doctorModel from "../models/doctorModel.js"; 


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


export { 
   
    changeAvailability  
};