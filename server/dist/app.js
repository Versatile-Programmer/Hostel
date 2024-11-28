"use strict";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// async function insertUser(name:string,email:string,password:string, role:string) {
//     const res = await prisma.user.create({
//         data:{
//             name,
//             email,
//             password,
//             role
//         }
//     })
// }
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
require("./types/types");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/auth', authRoutes_1.default);
app.use('/request', requestRoutes_1.default);
const connectToDatabase = async () => {
    try {
        await prisma.$connect(); // Connect to the database
        console.log('🟢 Connected to the database successfully');
    }
    catch (error) {
        console.error('🔴 Failed to connect to the database', error);
        process.exit(1); // Exit the process with an error code
    }
};
const port = process.env.PORT || 5000;
// Start the server only after connecting to the database
const startServer = async () => {
    await connectToDatabase(); // Ensure DB connection before starting server
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });
};
startServer(); // Initialize the application
