"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestController_1 = require("../controllers/requestController");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const zodmiddleware_1 = require("../middlewares/zodmiddleware");
const requestValidator_1 = require("../validators/requestValidator");
const router = express_1.default.Router();
console.log("calling /create api");
// Route to create a new maintenance request
router.post('/create', authmiddleware_1.authMiddleware, (0, zodmiddleware_1.validateRequest)(requestValidator_1.createRequestSchema), requestController_1.createRequestHandler);
//Route to get all requests (admin-only or authorized personnel)
router.get('/all', authmiddleware_1.authMiddleware, requestController_1.getAllRequestsHandler);
// Route to update the status of a request (admin-only or authorized personnel)
router.patch('/:id/status', authmiddleware_1.authMiddleware, (0, zodmiddleware_1.validateRequest)(requestValidator_1.updateStatusSchema), requestController_1.updateRequestStatusHandler);
//Route to delete a maintenance request
router.delete('/:id', authmiddleware_1.authMiddleware, requestController_1.deleteRequestHandler);
exports.default = router;
