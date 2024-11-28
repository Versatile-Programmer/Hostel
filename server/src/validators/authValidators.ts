// File: schemas/authSchemas.ts
import { z } from 'zod';

// Schema for login validation
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});

// Schema for signup validation
// export const signupSchema = z.object({
//   body: z.object({
//     name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
//     email: z.string().email({ message: 'Invalid email address' }),
//     password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
//     confirmPassword: z.string(),
//   }).refine((data) => data.password === data.confirmPassword, {
//     message: 'Passwords must match',
//     path: ['confirmPassword'], // Highlight the confirmPassword field in error
//   }),
// });
export const signupSchema = z.object({
  body: z
    .object({
      name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
      confirmPassword: z.string(),
      contactNumber: z
        .string()
        .regex(/^\d{10}$/, { message: 'Contact number must be exactly 10 digits' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'], // Highlight the confirmPassword field in error
    }),
});
