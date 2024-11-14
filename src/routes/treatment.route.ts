import { Router } from 'express';
import { treatmentController } from '../controllers/treatment.controller.js';
import { catchError } from '../utils/catchError.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const treatmentRouter = Router();

treatmentRouter.delete(
  '/:id',
  authMiddleware,
  catchError(treatmentController.remove),
);
treatmentRouter.post(
  '/type',
  authMiddleware,
  catchError(treatmentController.addTreatmentType),
);
treatmentRouter.get(
  '/types',
  authMiddleware,
  catchError(treatmentController.getTreatmentTypes),
);
treatmentRouter.post('/', authMiddleware, catchError(treatmentController.add));
treatmentRouter.patch(
  '/:id',
  authMiddleware,
  catchError(treatmentController.patch),
);
treatmentRouter.get('/', treatmentController.getAll);
treatmentRouter.get('/:id', catchError(treatmentController.get));

export default treatmentRouter;
