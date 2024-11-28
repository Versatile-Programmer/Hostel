// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

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
import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/authRoutes';
import cors from 'cors';
import requestRouter from './routes/requestRoutes';
import './types/types';
dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());
app.use('/auth',authRouter);
app.use('/request',requestRouter);

const connectToDatabase = async () => {
    try {
      await prisma.$connect(); // Connect to the database
      console.log('🟢 Connected to the database successfully');
    } catch (error) {
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
