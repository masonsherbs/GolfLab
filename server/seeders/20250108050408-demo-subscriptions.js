'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Subscriptions', [
      {
        userId: 1,
        planType: 'monthly',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        planType: 'pay-per-use',
        startDate: new Date(),
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subscriptions', null, {});
  }
};