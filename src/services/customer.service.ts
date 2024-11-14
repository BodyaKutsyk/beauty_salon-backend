import { Customer } from '../models/customer.model.js';
import { CustomerType } from '../types/CustomerType.js';

const getAll = async () => {
  return await Customer.findAll();
};

const get = async (id: string) => {
  return await Customer.findByPk(id);
};

const getByUserId = async (id: string) => {
  return await Customer.findOne({ where: { userId: id } });
};

const add = async (customer: CustomerType) => {
  return await Customer.create(customer);
};

const remove = async (id: string) => {
  return await Customer.destroy({ where: { userId: id } });
};

export const customerService = { get, getAll, add, remove, getByUserId };
