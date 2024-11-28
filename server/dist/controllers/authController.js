"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = exports.signupHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set.');
}
const signupHandler = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, contactNumber } = req.body;
        // Ensure passwords match
        if (password !== confirmPassword) {
            res.status(400).json({
                success: false,
                message: 'Passwords do not match.',
            });
        }
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: 'Email is already in use.',
            });
            return;
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create the user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                contactNumber,
            },
        });
        // Return success response
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
            },
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
        });
    }
};
exports.signupHandler = signupHandler;
const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
            return;
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '2d', // Token expires in 2 days
        });
        // Return success response
        res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong.',
        });
    }
};
exports.loginHandler = loginHandler;
