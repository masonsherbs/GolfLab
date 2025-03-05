'use strict';

const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointments', {
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
      dateTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('scheduled', 'completed', 'cancelled'),
        defaultValue: 'scheduled'
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
    await queryInterface.dropTable('Appointments');
  };

  export { up, down };