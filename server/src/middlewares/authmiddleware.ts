import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {

  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
 
  if (!token) {
      res.status(401).json({
      success: false,
      message: "Authorization token is missing",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number ,role: string };
    req.user = { id: decoded.id ,role:decoded.role}; // Attach user ID to the request object
  //    console.log("is control reach here",req.body);
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
    return ;
  }
};
