import { RequestHandler } from 'express';
import { ApiError } from '../exceptions/api.error.js';
import { customerService } from '../services/customer.service.js';

const get: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw ApiError.badRequest('Id should be provided!');
  }

  const customer = await customerService.getByUserId(id);

  if (!customer) {
    throw ApiError.notFound();
  }

  res.send(customer);
};

export const customerController = { get };
