// File: types.d.ts
import { Request } from "express";

declare global {
  namespace Express {
   export interface Request {
      user?: {
        id: number;
        role: string; // Optional, if you want to include roles in the token
      };
    }
  }
}
