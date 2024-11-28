import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set.');
}

export const signupHandler = async (req: Request, res: Response) : Promise<void> => {
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
      return ;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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
    return ;
  } catch (error) {
    console.error(error);
      res.status(500).json({
      success: false,
      message: 'Something went wrong.',
    });
  }
};
export const loginHandler = async (req: Request, res: Response): Promise<void> => {
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
        return ;
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
           res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
        return ;
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
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
    } catch (error) {
      console.error(error);
         res.status(500).json({
        success: false,
        message: 'Something went wrong.',
      });
    }
  };
  