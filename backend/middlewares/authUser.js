import jwt from 'jsonwebtoken';
 
const authUser = async (req, res, next) => {
    try {
         
        const token = req.headers.token || req.headers['token'];

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Not Authorized: Session missing. Please log in again." 
            });
        }

        // Verify signature integrity against system secret key
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

          //   Ensure req.body is defined before adding properties (Solves the crash)
        if (!req.body) {
            req.body = {};
        }
        
        
        req.body.userId = decodedToken.id;
        
        next();

    } catch (error) {
        console.error(`[User Auth Middleware Error]: ${error.message}`);
        
        // Return 401 Unauthorized instead of generic success overrides
        return res.status(401).json({ 
            success: false, 
            message: "Session Expired: Invalid authentication token. Please log in again." 
        });
    }
};

export default authUser;
