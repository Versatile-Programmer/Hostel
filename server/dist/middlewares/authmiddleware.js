"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Authorization token is missing",
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role }; // Attach user ID to the request object
        //    console.log("is control reach here",req.body);
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
        return;
    }
};
exports.authMiddleware = authMiddleware;
