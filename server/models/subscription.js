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
      type: DataTypes.ENUM('monthly', 'pay-per-use', 'trial', 'punch-card'),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'cancelled'),
      defaultValue: 'active'
    },
    sessionsRemaining: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User);
    Subscription.hasMany(models.Payment);
  };

  return Subscription;
};