'use strict';
const {
  Model
} = require('sequelize');
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.User);
      Payment.belongsTo(models.Subscription);
      Payment.belongsTo(models.Appointment);
    }
  }

  Payment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Subscriptions',
        key: 'id'
      }
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Appointments',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    paymentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    paymentMethod: {
      type: DataTypes.ENUM('credit_card', 'debit_card', 'paypal'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });

  return Payment;
};