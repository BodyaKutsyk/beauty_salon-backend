import { RequestHandler } from 'express';
import { userService } from '../services/user.service.js';
import { customerService } from '../services/customer.service.js';
import { CustomerType } from '../types/CustomerType.js';
import { UserType } from '../types/UserType.js';
import { validate } from 'uuid';
import { masterService } from '../services/master.service.js';
import { ApiError } from '../exceptions/api.error.js';
import { MasterType } from '../types/MasterType.js';

interface UserJoinCustomer extends UserType {
  customer: CustomerType;
}

interface UserJoinMaster extends UserType {
  master: MasterType;
}

const getAll: RequestHandler = async (req, res) => {
  const users = await userService.getAllActivated();
  res.send(users.map(userService.normalize));
  res.send(users);
};

const normalizeCustomers = (customers: UserJoinCustomer) => {
  const { id, email, customer } = customers;
  const { firstName, lastName, createdAt } = customer;

  return { id, email, firstName, lastName, createdAt };
};

const normalizedMasters = (masters: UserJoinMaster) => {
  const { email, master } = masters;
  const { firstName, lastName, createdAt, experience, id } = master;

  return { id, email, firstName, lastName, createdAt, experience };
};

const getAllCustomers: RequestHandler = async (req, res) => {
  const customers = await userService.getAllCustomers();

  if (customers) {
    res.send(customers.map(customer => normalizeCustomers(customer)));
    return;
  }
  res.sendStatus(404);
};

const getAllMasters: RequestHandler = async (req, res) => {
  const masters = await userService.getAllMasters();

  if (masters) {
    res.send(
      masters.map(master =>
        normalizedMasters(master as unknown as UserJoinMaster),
      ),
    );
    return;
  }

  res.sendStatus(404);
};

const add: RequestHandler = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    res.sendStatus(422);
    return;
  }

  const possibleUser = await userService.getByEmail(email);

  if (possibleUser) {
    res.sendStatus(409);
    return;
  }

  const user = await userService.add({ email, password, role: 'customer' });
  const userId = user.id;

  if (userId) {
    await customerService.add({ firstName, lastName, userId });
  }
  res.sendStatus(201);
};

const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let foundByRole = false;

  if (!id || !validate(id)) {
    res.sendStatus(404);
    return;
  }

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  const customer = await customerService.getByUserId(id);
  const master = await masterService.getByUserId(id);

  switch (user?.role) {
    case 'customer':
      if (customer) {
        foundByRole = true;
        await customerService.remove(id);
      }
      break;
    case 'master':
      if (master) {
        foundByRole = true;
        await masterService.remove(id);
      }
      break;
  }

  if (!user || !foundByRole) {
    res.sendStatus(404);
    return;
  }

  await userService.remove(id);
  res.sendStatus(204);
};

const updateRole: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const role = req.body.role as 'master' | 'customer';

  console.log(id, role);

  if (!id || !role) {
    throw ApiError.notFound();
  }

  const user = await userService.getById(id);
  if (!user) {
    throw ApiError.notFound();
  }

  const customer = await customerService.getByUserId(id);
  const master = await masterService.getByUserId(id);

  switch (role) {
    case 'master':
      if (!customer) {
        throw ApiError.notFound();
      }

      await masterService.add({
        firstName: customer.firstName,
        lastName: customer.lastName,
        userId: customer.userId,
        experience: '1 day',
      });
      await customerService.remove(id);
      await userService.updateUser(id, { role });

      break;

    case 'customer':
      if (!master) {
        throw ApiError.notFound();
      }

      await customerService.add({
        firstName: master.firstName,
        lastName: master.lastName,
        userId: master.userId,
      });
      await masterService.remove(id);
      await userService.updateUser(id, { role });

      break;

    default:
      throw ApiError.badRequest('invalid role');
  }

  res.sendStatus(204);
};

export const userController = {
  getAll,
  getAllCustomers,
  getAllMasters,
  add,
  remove,
  updateRole,
};
