import { RequestHandler } from 'express';
import { treatmentService } from '../services/treatment.service.js';
import { ApiError } from '../exceptions/api.error.js';
import { TreatmentType } from '../types/TreatmentType.js';

const getAll: RequestHandler = async (req, res) => {
  const treatments = await treatmentService.getAll();

  res.send(treatments);
};

const get: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw ApiError.badRequest('Id is required!');
  }

  const treatment = treatmentService.get(id);

  if (!treatment) {
    throw ApiError.notFound();
  }

  res.send(treatment);
};

const add: RequestHandler = async (req, res) => {
  const { name, description, timeToComplete, price, treatmentTypeId } =
    req.body as TreatmentType;

  if (!name || !description || !timeToComplete || !price || !treatmentTypeId) {
    throw ApiError.badRequest('Invalid treatment data');
  }

  await treatmentService.add({
    name,
    description,
    timeToComplete,
    price,
    treatmentTypeId,
  });
  res.sendStatus(201);
};

const addTreatmentType: RequestHandler = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw ApiError.badRequest('Name is required!');
  }

  await treatmentService.addTreatmentType(name);
  res.sendStatus(204);
};

const getTreatmentTypes: RequestHandler = async (req, res) => {
  const types = await treatmentService.getTreatmentTypes();

  if (!types) {
    throw ApiError.notFound();
  }

  res.send(types);
};

const patch: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw ApiError.notFound();
  }

  const newTreatment = req.body as TreatmentType;

  if (!newTreatment) {
    throw ApiError.badRequest('Invalid treatment data');
  }

  await treatmentService.update(id, newTreatment);
  res.sendStatus(202);
};

const remove: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw ApiError.notFound();
  }

  const treatment = await treatmentService.get(id);

  if (!treatment) {
    throw ApiError.notFound();
  }

  await treatmentService.remove(id);
  res.sendStatus(204);
};

export const treatmentController = {
  getAll,
  get,
  add,
  patch,
  remove,
  addTreatmentType,
  getTreatmentTypes,
};
