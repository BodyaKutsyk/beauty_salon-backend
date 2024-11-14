import { Customer } from '../models/customer.model.js';
import { Master } from '../models/master.model.js';
import { Record } from '../models/record.model.js';
import { Treatment } from '../models/treatment.model.js';
import { RecordType } from '../types/RecordType.js';

const add = async (record: RecordType) => {
  return await Record.create(record);
};

const getAll = async () => {
  return await Record.findAll();
};

const getAllWithJoin = async () => {
  return await Record.findAll({
    include: [
      {
        model: Customer,
        required: true,
      },
      {
        model: Master,
        required: true,
      },
      {
        model: Treatment,
        required: true,
      },
    ],
  });
};

export const recordService = { add, getAll, getAllWithJoin };
