'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    planType: {
      type: DataTypes.ENUM('monthly', 'pay-per-use'),
      allowNull: false
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'cancelled'),
      defaultValue: 'active'
    }
  });

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User);
    Subscription.hasMany(models.Payment);
  };

  return Subscription;
};