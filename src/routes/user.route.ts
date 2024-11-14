import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { catchError } from '../utils/catchError.js';

const userRouter = Router();

userRouter.get(
  '/customers',
  authMiddleware,
  catchError(userController.getAllCustomers),
);

// userRouter.get('/allmasters', authMiddleware, catchError(userController.getMasters))

userRouter.get(
  '/masters',
  authMiddleware,
  catchError(userController.getAllMasters),
);
userRouter.get('/', authMiddleware, catchError(userController.getAll));
userRouter.get('/:id', authMiddleware, catchError(userController.getAll));

userRouter.patch('/:id', authMiddleware, userController.updateRole);
userRouter.delete('/customers/:id', authMiddleware, userController.remove);

export default userRouter;
