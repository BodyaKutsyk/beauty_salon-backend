import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';
import { catchError } from '../utils/catchError.js';

const adminRouter = Router();

adminRouter.get('/', catchError(adminController.getAll));
adminRouter.get('/:id', catchError(adminController.get));
adminRouter.post('/', catchError(adminController.add));
adminRouter.delete('/:id', catchError(adminController.remove));

export default adminRouter;
