import { Model } from 'sequelize';
import { CustomerType } from '../types/CustomerType.js';
import { sequelize } from '../utils/db.js';
import { baseModel } from './base.model.js';
import { User } from './user.model.js';

export interface CustomerInstance extends Model<CustomerType>, CustomerType {}

export const Customer = sequelize.define<CustomerInstance>(
  'customer',
  {
    ...baseModel,
  },
  {
    tableName: 'customers',
    updatedAt: false,
  },
);

Customer.belongsTo(User);
User.hasOne(Customer);
