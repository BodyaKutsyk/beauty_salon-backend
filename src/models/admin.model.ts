import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { baseModel } from './base.model.js';
import { AdminType } from '../types/AdminType.js';

export interface AdminInstance extends Model<AdminType>, AdminType {}

export const Admin = sequelize.define<AdminInstance>(
  'admin',
  {
    ...baseModel,
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: 'admins',
    updatedAt: false,
  },
);

// Admin.belongsTo(User);
// User.hasOne(Admin);
