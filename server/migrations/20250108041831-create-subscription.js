'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Subscriptions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Users',
    //     key: 'id'
    //   }
    // },
    planType: {
      type: Sequelize.ENUM('monthly', 'pay-per-use'),
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive', 'cancelled'),
      defaultValue: 'active'
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
  await queryInterface.dropTable('Subscriptions');
};

// export { up, down };

module.exports = { up, down };