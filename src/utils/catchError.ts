import { RequestHandler } from 'express';

export const catchError = (action: RequestHandler): RequestHandler => {
  return async function (req, res, next) {
    try {
      await action(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};
