import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        const token = req.headers.token || req.headers['token'];

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Not Authorized: Session missing. Please log in again." 
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!req.body) req.body = {};
        req.body.docId = decodedToken.id;
        
        next();
    } catch (error) {
       
        console.error(`[Doctor Auth Crash Debug]: ${error.message}`);
        
        return res.status(401).json({ 
            success: false, 
            message: `Authentication failed: ${error.message}` 
        });
    }
};

export default authDoctor;
