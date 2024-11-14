import { Router } from 'express';
import { authContoller } from '../controllers/auth.controller.js';
import { catchError } from '../utils/catchError.js';

const authRouter = Router();

authRouter.post('/registration', catchError(authContoller.register));
authRouter.get(
  '/activation/:activationToken',
  catchError(authContoller.activate),
);
authRouter.post('/login', catchError(authContoller.login));
authRouter.post('/logout', catchError(authContoller.logout));
authRouter.get('/refresh', catchError(authContoller.refresh));

export default authRouter;
