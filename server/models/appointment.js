import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.User);
      Appointment.hasOne(models.AccessCode);
      Appointment.hasOne(models.Payment);
    }
  }

  Appointment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
      defaultValue: 'scheduled'
    }
  }, {
    sequelize,
    modelName: 'Appointment',
  });

  return Appointment;
};