import express from 'express';
 import { 
 createRequestHandler,
  getAllRequestsHandler,
updateRequestStatusHandler,
  deleteRequestHandler 
 } from '../controllers/requestController';
import { authMiddleware } from '../middlewares/authmiddleware';
import { validateRequest } from '../middlewares/zodmiddleware';
import { createRequestSchema , updateStatusSchema } from '../validators/requestValidator';

const router = express.Router();
console.log("calling /create api");
// Route to create a new maintenance request
router.post('/create', authMiddleware, validateRequest(createRequestSchema), createRequestHandler);

//Route to get all requests (admin-only or authorized personnel)
router.get('/all', authMiddleware, getAllRequestsHandler);

// Route to update the status of a request (admin-only or authorized personnel)
router.patch('/:id/status', authMiddleware, validateRequest(updateStatusSchema), updateRequestStatusHandler);

//Route to delete a maintenance request
router.delete('/:id', authMiddleware, deleteRequestHandler);

export default router;
