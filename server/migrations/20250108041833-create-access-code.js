'use strict';

const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AccessCodes', {
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
      appointmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Appointments',
          key: 'id'
        }
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      isUsed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      expiresAt: {
        type: Sequelize.DATE
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
  await queryInterface.dropTable('AccessCodes');
};

// export { up, down };

module.exports = { up, down };
