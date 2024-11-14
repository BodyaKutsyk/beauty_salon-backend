import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { TreatmentTypeType } from '../types/TreatmentTypeType.js';
import { Treatment } from './treatment.model.js';

export interface TreatmentTypeInstance
  extends Model<TreatmentTypeType>,
    TreatmentTypeType {}

export const TreatmentType = sequelize.define<TreatmentTypeInstance>(
  'treatmentType',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'treatmentTypes',
    createdAt: false,
    updatedAt: false,
  },
);

TreatmentType.hasMany(Treatment);
Treatment.belongsTo(TreatmentType);
