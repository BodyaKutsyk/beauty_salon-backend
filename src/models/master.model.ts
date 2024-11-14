import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { baseModel } from './base.model.js';
import { MasterType } from '../types/MasterType.js';
import { User } from './user.model.js';

export interface MasterInstance extends Model<MasterType>, MasterType {}

export const Master = sequelize.define<MasterInstance>(
  'master',
  {
    ...baseModel,
    experience: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'masters',
    updatedAt: false,
  },
);

Master.belongsTo(User);
User.hasOne(Master);
