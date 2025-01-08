'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const AccessCode = sequelize.define('AccessCode', {
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
  });

  AccessCode.associate = function(models) {
    AccessCode.belongsTo(models.User);
    AccessCode.belongsTo(models.Appointment);
  };

  return AccessCode;
};