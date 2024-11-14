import { DataTypes } from 'sequelize';

export const baseModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
};
