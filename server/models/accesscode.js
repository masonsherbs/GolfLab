'use strict';
const {
  Model
} = require('sequelize');
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class AccessCode extends Model {
    static associate(models) {
      AccessCode.belongsTo(models.User);
      AccessCode.belongsTo(models.Appointment);
    }
  }

  AccessCode.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Appointments',
        key: 'id'
      }
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AccessCode',
  });

  return AccessCode;
};