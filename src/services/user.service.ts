import { Admin } from '../models/admin.model.js';
import { Customer } from '../models/customer.model.js';
import { Master } from '../models/master.model.js';
import { User } from '../models/user.model.js';
import { CustomerType } from '../types/CustomerType.js';
import { UserType } from '../types/UserType.js';
import { sequelize } from '../utils/db.js';

const getAll = async () => {
  return await User.findAll();
};

const normalize = ({ id, email, role }: UserType) => {
  return { id, email, role };
};

const getAllActivated = async () => {
  return await User.findAll({ where: { activationToken: null } });
};

const getById = async (id: string) => {
  return await User.findByPk(id);
};

const getByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

const add = async (user: UserType) => {
  return await User.create(user);
};

const getAllCustomers = async () => {
  return await User.findAll({
    where: {
      role: 'customer',
    },
    include: [
      {
        model: Customer,
        required: true,
      },
    ],
  });
};

const getAllMasters = async () => {
  return await User.findAll({
    where: {
      role: 'master',
    },
    include: [
      {
        model: Master,
        required: true,
      },
    ],
  });
};

const updateUser = async (id: string, newUser: Partial<UserType>) => {
  return await User.update(
    {
      ...newUser,
    },
    {
      where: {
        id,
      },
    },
  );
};

const remove = async (id: string) => {
  return await User.destroy({ where: { id } });
};

const createUserWithCustomer = async (
  userData: Omit<UserType, 'role'>,
  customerData: Omit<CustomerType, 'userId'>,
) => {
  return await sequelize.transaction(async t => {
    const user = await User.create(
      { ...userData, role: 'customer' },
      { transaction: t },
    );

    const customer = await Customer.create(
      {
        ...customerData,
        userId: user.id || '',
      },
      { transaction: t },
    );

    return { user, customer };
  });
};

const createUserWithAdmin = async (
  userData: Omit<UserType, 'role'>,
  adminData: Omit<CustomerType, 'userId'>,
) => {
  return await sequelize.transaction(async t => {
    const user = await User.create(
      { ...userData, role: 'admin' },
      { transaction: t },
    );

    const admin = await Admin.create(
      {
        ...adminData,
        userId: user.id || '',
        phone: '123',
      },
      { transaction: t },
    );

    return { user, admin };
  });
};

export const userService = {
  getAll,
  getAllActivated,
  getAllCustomers,
  getAllMasters,
  getById,
  getByEmail,
  add,
  createUserWithCustomer,
  createUserWithAdmin,
  normalize,
  updateUser,
  remove,
};
