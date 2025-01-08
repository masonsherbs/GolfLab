'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    phoneNumber: DataTypes.STRING(20)
  });

  User.associate = function(models) {
    User.hasMany(models.Subscription);
    User.hasMany(models.Appointment);
    User.hasMany(models.AccessCode);
    User.hasMany(models.Payment);
  };
  return User;
};