import { z } from 'zod';

const createRequestBodySchema = z.object({
  roomNo: z.string().length(3, 'Room number must be exactly 3 characters'), // Validates roomNo as a non-empty string
  wing: z.string().min(1, 'Wing is required'),         // Validates wing as a non-empty string
  description: z.string().min(10, 'Description must be at least 10 characters'), // Validates description length
  photo: z.string().optional(), // Optional: Validate a URL or file path for the photo
});
export const createRequestSchema = z.object({
  body: createRequestBodySchema,
  query: z.object({}),
  params: z.object({})
}); 
export const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "in-progress", "resolved"], {
      message: "Status must be one of: pending, in-progress, resolved",
    }),
  }),
});