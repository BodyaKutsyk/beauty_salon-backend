import { RequestHandler } from 'express';
import { jwtService } from '../services/jwt.service.js';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authorization = req.headers['authorization'] || ('' as string);
  const [, token] = authorization.split(' ');

  if (!token || !authorization) {
    res.sendStatus(401);
    return;
  }

  const userData = jwtService.verify(token);

  if (!userData) {
    res.sendStatus(401);
    return;
  }

  next();
};
