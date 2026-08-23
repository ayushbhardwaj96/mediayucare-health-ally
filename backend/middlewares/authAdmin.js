import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        //  Read token from authorization header or custom headers safely
        const token = req.headers.atoken || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Not Authorized. Please login again.' 
            });
        }

        // Verify and decode the payload securely
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            // Catches expired or tampered tokens gracefully
            return res.status(401).json({ 
                success: false, 
                message: 'Session expired or invalid token. Please login again.' 
            });
        }

        // Validate the structure we set during admin login
        if (decodedToken.email !== process.env.ADMIN_EMAIL || decodedToken.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied. Only administrators can access this resource.' 
            });
        }

        // Attach admin data to the request object so subsequent controllers can use it
        req.admin = decodedToken;

        // Correct parameter hook execution
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error during authentication." 
        });
    }
};

export default authAdmin;
