"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const zodmiddleware_1 = require("../middlewares/zodmiddleware");
const authValidators_1 = require("../validators/authValidators");
const router = express_1.default.Router();
// Login route with Zod validation
router.post('/login', (0, zodmiddleware_1.validateRequest)(authValidators_1.loginSchema), authController_1.loginHandler);
// Signup route with Zod validation
router.post('/signup', (0, zodmiddleware_1.validateRequest)(authValidators_1.signupSchema), authController_1.signupHandler);
exports.default = router;
