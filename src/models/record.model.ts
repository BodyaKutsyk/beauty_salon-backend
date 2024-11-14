import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { RecordType } from '../types/RecordType.js';
import { Treatment } from './treatment.model.js';
import { Customer } from './customer.model.js';
import { Master } from './master.model.js';

export interface RecordInstance extends Model<RecordType>, RecordType {}

export const Record = sequelize.define<RecordInstance>(
  'record',
  {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      field: 'customer_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
    },
    masterId: {
      field: 'master_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'masters',
        key: 'id',
      },
    },
    treatmentId: {
      field: 'treatment_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'treatments',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
      allowNull: false,
    },
  },
  {
    tableName: 'records',
    updatedAt: false,
  },
);

Record.belongsTo(Master);
Master.hasMany(Record);

Record.belongsTo(Customer);
Customer.hasMany(Record);

Record.belongsTo(Treatment);
Treatment.hasMany(Record);
