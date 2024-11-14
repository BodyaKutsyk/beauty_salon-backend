import { Treatment } from '../models/treatment.model.js';
import { TreatmentType } from '../models/treatmentType.model.js';
import { TreatmentType as TreatmentInterface } from '../types/TreatmentType.js';

const getAll = async () => {
  return await Treatment.findAll();
};

const get = async (id: string) => {
  return await Treatment.findByPk(id);
};

const add = async (treatment: TreatmentInterface) => {
  return await Treatment.create(treatment);
};

const addTreatmentType = async (name: string) => {
  return await TreatmentType.create({ name });
};
const getTreatmentTypes = async () => {
  return await TreatmentType.findAll();
};

const remove = async (id: string) => {
  return await Treatment.destroy({ where: { id } });
};

const update = async (
  id: string,
  newTreatment: Partial<TreatmentInterface>,
) => {
  return await Treatment.update(
    {
      ...newTreatment,
    },
    { where: { id } },
  );
};

export const treatmentService = {
  getAll,
  get,
  add,
  remove,
  update,
  addTreatmentType,
  getTreatmentTypes,
};
