import { ErrorRequestHandler } from 'express';
import { ApiError } from '../exceptions/api.error.js';

export const errorMiddleware: ErrorRequestHandler = (error, req, res) => {
  if (error instanceof ApiError) {
    res.status(error.status).send({
      message: error.message,
      errors: error.errors,
    });

    return;
  }

  res.status(500).send({
    message: 'Server error',
  });
};
