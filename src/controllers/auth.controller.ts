import { RequestHandler, Response } from 'express';
// import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { userService } from '../services/user.service.js';
import { User } from '../models/user.model.js';
import { jwtService } from '../services/jwt.service.js';
import { ApiError } from '../exceptions/api.error.js';
import { UserType } from '../types/UserType.js';

const register: RequestHandler = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  // const activationToken = uuidv4();

  if (!email || !firstName || !lastName || !password) {
    res.sendStatus(422);
    return;
  }

  const user = await userService.getByEmail(email);

  if (user) {
    throw ApiError.badRequest('User is already exists!', {
      email: 'User already exists',
    });
  }

  const users = await userService.getAll();

  const hashedPassword = await bcrypt.hash(
    password,
    +(process.env.SALT_ROUNDS || 10),
  );
  // await emailService.sendActivationEmail(email, activationToken);

  const newUser = {
    email,
    password: hashedPassword,
    activationToken: null,
  };

  const data = {
    firstName,
    lastName,
  };

  if (!users.length) {
    await userService.createUserWithAdmin(newUser, data);
    res.sendStatus(201);

    return;
  }

  await userService.createUserWithCustomer(newUser, data);
  res.sendStatus(201);
};

const activate: RequestHandler = async (req, res) => {
  const { activationToken } = req.params;
  const user = await User.findOne({ where: { activationToken } });

  if (!user) {
    res.sendStatus(404);
    return;
  }
  user.activationToken = null;
  user.save();

  res.send(user);
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw ApiError.badRequest('Email or password is not provided!');
  }

  const user = await userService.getByEmail(email);
  const isPasswordValid = await bcrypt.compare(password, user?.password || '');

  if (!user || !isPasswordValid) {
    throw ApiError.badRequest('Not valid password or email!', {
      data: 'Not valid password or email!',
    });
  }

  if (user?.activationToken !== null) {
    throw ApiError.badRequest('Email is not activated', {
      email: 'Not activated email',
    });
  }

  await generateTokens(res, user);
};

const refresh: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || '';

  const userData = jwtService.verifyRefreshToken(refreshToken) as UserType;

  if (!userData) {
    throw ApiError.unauthorized();
  }

  await generateTokens(res, userData);
};

const generateTokens = async (res: Response, user: UserType) => {
  const normalizedUser = userService.normalize(user);

  const accessToken = jwtService.sign(normalizedUser);
  const refreshToken = jwtService.signRefreshToken(normalizedUser);

  res.cookie('refreshToken', refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.send({
    user: normalizedUser,
    accessToken,
  });
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};

export const authContoller = {
  register,
  activate,
  login,
  logout,
  refresh,
};
