import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { UserType } from '../types/UserType.js';
import { CustomerType } from '../types/CustomerType.js';

export interface UserInstance extends Model<UserType>, UserType {
  customer: CustomerType;
}

export const User = sequelize.define<UserInstance>(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activationToken: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('admin', 'customer', 'master'),
      defaultValue: 'customer',
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  },
);
