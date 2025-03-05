import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      Subscription.belongsTo(models.User);
      Subscription.hasMany(models.Payment);
    }
  }

  Subscription.init({
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
    currentSubscriptionPrice: {
      type: DataTypes.DECIMAL(10, 2),
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
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stripeSubscriptionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nextPaymentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastPaymentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastPaymentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Subscription',
  });

  return Subscription;
};