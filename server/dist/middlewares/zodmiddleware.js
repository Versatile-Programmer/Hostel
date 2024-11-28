"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const validateRequest = (schema) => {
    return (req, res, next) => {
        // console.log("trying to validating schema",req.body);
        try {
            // Parse and validate request data
            // console.log("inside try block",req.body);
            // const data = schema.parse(req.body);
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            // console.log("parsed  data is",data);
            // console.log("this is body i am getting",req.body);
            // Proceed to the next middleware or handler
            next();
        }
        catch (error) {
            // res.status(400).json({
            //   success: false,
            //   message: message,
            //   errors: error.errors, // Zod provides structured validation errors
            // });
            if (error instanceof zod_1.ZodError) {
                // Extract error messages, combining clarity and conciseness
                const errorMessages = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                })).reduce((acc, curr) => ({ ...acc, [curr.field]: curr.message }), {});
                // Craft a user-friendly response with only success and message fields
                const response = {
                    success: false,
                    message: Object.values(errorMessages).join(', '), // Combine error messages
                };
                res.status(400).json(response);
                return;
            }
        }
    };
};
exports.validateRequest = validateRequest;
