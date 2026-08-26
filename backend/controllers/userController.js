import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";



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

 


export { registerUser, loginUser  };
