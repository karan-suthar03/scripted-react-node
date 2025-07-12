import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = UserModel;

function generateToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET || "default secret",
        {
            expiresIn: "30d"
        }
    );
}

async function userRegister(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = generateToken(newUser);

        res.cookie('authToken', token, {
            httpOnly: true, // Prevents XSS attacks
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: 'strict', // CSRF protection
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user:{
                    id: String(newUser._id),
                    name: newUser.name,
                    email: newUser.email
                },
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during registration",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user);

        res.cookie('authToken', token, {
            httpOnly: true, // Prevents XSS attacks
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // CSRF protection
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
        });

        res.json({
            success: true,
            message: "Login successful",
            data: {
                id: String(user._id),
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during login",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}

async function userLogout(req, res) {
    try {
        // Clear the auth token cookie
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during logout",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}

export {
    userLogin,
    userRegister,
    userLogout
};
