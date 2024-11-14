import { RequestHandler } from 'express';
import { RecordType } from '../types/RecordType.js';
import { ApiError } from '../exceptions/api.error.js';
import { recordService } from '../services/record.service.js';

const create: RequestHandler = async (req, res) => {
  const { customerId, masterId, treatmentId, date } = req.body as RecordType;

  console.log(customerId, masterId, treatmentId, date);

  if (!customerId || !masterId || !treatmentId || !date) {
    throw ApiError.badRequest('Not all data is provided!');
  }

  const record = await recordService.add({
    customerId,
    masterId,
    treatmentId,
    date,
  });

  res.send(record);
};

const getAll: RequestHandler = async (req, res) => {
  const records = await recordService.getAll();

  res.send(records);
};

const getAllWithJoin: RequestHandler = async (req, res) => {
  const recordsWithJoin = await recordService.getAllWithJoin();

  res.send(recordsWithJoin);
};

export const recordController = { create, getAll, getAllWithJoin };
