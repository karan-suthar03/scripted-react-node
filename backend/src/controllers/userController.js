import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function generateToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET || "default secret", {
        expiresIn: "30d"
    });
}

/**
 * Handles user registration.
 * @param req - The request object containing user details.
 * @param res - The response object to send back the result.
 */
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

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: String(newUser._id),
                name: newUser.name,
                email: newUser.email
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

function userLogin(req, res) {
    // Logic for user login
    res.json({
        success: true,
        message: "UserModel login logic here"
    });
}

export {
    userLogin,
    userRegister
};
