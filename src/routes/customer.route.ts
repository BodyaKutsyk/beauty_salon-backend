import { Router } from 'express';
import { customerController } from '../controllers/customer.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { catchError } from '../utils/catchError.js';

const customerRouter = Router();

customerRouter.get('/:id', authMiddleware, catchError(customerController.get));

export default customerRouter;
