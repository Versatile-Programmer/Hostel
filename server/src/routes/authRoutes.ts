import express from 'express';
import { loginHandler, signupHandler } from '../controllers/authController';
import { validateRequest } from "../middlewares/zodmiddleware"
import { loginSchema, signupSchema } from "../validators/authValidators"

const router = express.Router();

// Login route with Zod validation
router.post('/login', validateRequest(loginSchema), loginHandler);

// Signup route with Zod validation
router.post('/signup', validateRequest(signupSchema), signupHandler);

export default router;
