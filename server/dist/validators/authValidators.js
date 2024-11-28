"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.loginSchema = void 0;
// File: schemas/authSchemas.ts
const zod_1 = require("zod");
// Schema for login validation
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email address' }),
        password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters long' }),
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
exports.signupSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().min(2, { message: 'Name must be at least 2 characters long' }),
        email: zod_1.z.string().email({ message: 'Invalid email address' }),
        password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters long' }),
        confirmPassword: zod_1.z.string(),
        contactNumber: zod_1.z
            .string()
            .regex(/^\d{10}$/, { message: 'Contact number must be exactly 10 digits' }),
    })
        .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'], // Highlight the confirmPassword field in error
    }),
});
