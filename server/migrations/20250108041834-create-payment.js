'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      subscriptionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subscriptions',
          key: 'id'
        }
      },
      appointmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Appointments',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      paymentDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      paymentMethod: {
        type: Sequelize.ENUM('credit_card', 'debit_card', 'paypal'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('Payments');
};

export { up, down };