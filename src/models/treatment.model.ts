import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { TreatmentType as TreatmentInterface } from '../types/TreatmentType.js';

export interface TreatmentInstance
  extends Model<TreatmentInterface>,
    TreatmentInterface {}

export const Treatment = sequelize.define<TreatmentInstance>(
  'treatment',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeToComplete: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    treatmentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'treatment_type_id',
      references: {
        model: 'treatmentTypes',
        key: 'id',
      },
    },
  },
  {
    tableName: 'treatments',
    updatedAt: false,
  },
);
