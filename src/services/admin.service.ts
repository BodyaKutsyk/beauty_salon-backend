import { Admin } from '../models/admin.model.js';
import { AdminType } from '../types/AdminType.js';

const getAll = async () => {
  return await Admin.findAll();
};

const get = async (id: string) => {
  return Admin.findByPk(id);
};

const add = async (data: Omit<AdminType, 'id'>) => {
  return await Admin.create(data);
};

const remove = async (id: string) => {
  return await Admin.destroy({ where: { id } });
};

export const adminService = { get, getAll, add, remove };
