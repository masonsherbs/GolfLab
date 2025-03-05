import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Subscription);
      User.hasMany(models.Appointment);
      User.hasMany(models.AccessCode);
      User.hasMany(models.Payment);
    }
  }

  User.init({
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
    phoneNumber: DataTypes.STRING(20),
    accessLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};