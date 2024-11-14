import { RequestHandler } from 'express';
import { adminService } from '../services/admin.service.js';
import { validate as isUUID } from 'uuid';

const getAll: RequestHandler = async (req, res) => {
  const admins = await adminService.getAll();
  res.send(admins);
};

const get: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    res.sendStatus(404);
    return;
  }

  const admin = await adminService.get(id);

  if (!admin) {
    res.sendStatus(404);
    return;
  }

  res.send(admin);
};

const add: RequestHandler = async (req, res) => {
  const { firstName, lastName, userId, phone } = req.body;

  if (!firstName || !userId || !lastName || !phone) {
    res.sendStatus(422);
    return;
  }

  await adminService.add({
    userId,
    firstName,
    lastName,
    phone,
  });

  res.sendStatus(201);
};

const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    res.sendStatus(404);
    return;
  }

  await adminService.remove(id);
  res.sendStatus(204);
};

export const adminController = {
  getAll,
  get,
  add,
  remove,
};
