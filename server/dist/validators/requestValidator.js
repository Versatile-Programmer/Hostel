"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusSchema = exports.createRequestSchema = void 0;
const zod_1 = require("zod");
const createRequestBodySchema = zod_1.z.object({
    roomNo: zod_1.z.string().length(3, 'Room number must be exactly 3 characters'), // Validates roomNo as a non-empty string
    wing: zod_1.z.string().min(1, 'Wing is required'), // Validates wing as a non-empty string
    description: zod_1.z.string().min(10, 'Description must be at least 10 characters'), // Validates description length
    photo: zod_1.z.string().optional(), // Optional: Validate a URL or file path for the photo
});
exports.createRequestSchema = zod_1.z.object({
    body: createRequestBodySchema,
    query: zod_1.z.object({}),
    params: zod_1.z.object({})
});
exports.updateStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "in-progress", "resolved"], {
            message: "Status must be one of: pending, in-progress, resolved",
        }),
    }),
});
