'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('Subscriptions', 'userId', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    after: 'id'
  });
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('Subscriptions', 'userId');
};

export { up, down };