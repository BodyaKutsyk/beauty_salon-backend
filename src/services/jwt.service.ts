import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserType } from '../types/UserType.js';

function sign(user: Pick<UserType, 'id' | 'email'>) {
  const token = jwt.sign(user, process.env.JWT_KEY as string, {
    expiresIn: '120s',
  });

  return token;
}

function verify(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_KEY as string);
     
    /* eslint-disable  @typescript-eslint/no-unused-vars */
  } catch (e) {
    return null;
  }
}

function signRefreshToken(user: Pick<UserType, 'id' | 'email'>) {
  const token = jwt.sign(user, process.env.JWT_REFRESH_KEY as string, {
    expiresIn: '7d',
  });

  return token;
}

function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_KEY as string);
     
    /* eslint-disable  @typescript-eslint/no-unused-vars */
  } catch (e) {
    return null;
  }
}

export const jwtService = {
  sign,
  verify,
  signRefreshToken,
  verifyRefreshToken,
};
