import { Master } from '../models/master.model.js';
import { MasterType } from '../types/MasterType.js';

const getAll = async () => {
  return await Master.findAll();
};

const get = async (id: string) => {
  return await Master.findByPk(id);
};

const getByUserId = async (id: string) => {
  return await Master.findOne({ where: { userId: id } });
};

const add = async (master: MasterType) => {
  return await Master.create(master);
};

const remove = async (id: string) => {
  return await Master.destroy({ where: { userId: id } });
};

export const masterService = { getAll, get, getByUserId, add, remove };
