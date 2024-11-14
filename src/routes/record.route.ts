import { Router } from 'express';
import { catchError } from '../utils/catchError.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { recordController } from '../controllers/record.controller.js';

const recordRouter = Router();

recordRouter.get(
  '/join',
  authMiddleware,
  catchError(recordController.getAllWithJoin),
);
recordRouter.get('/', authMiddleware, catchError(recordController.getAll));
recordRouter.post('/', authMiddleware, catchError(recordController.create));

export default recordRouter;
