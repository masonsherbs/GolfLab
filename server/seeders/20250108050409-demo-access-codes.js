'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AccessCodes', [
      {
        userId: 1,
        appointmentId: 1,
        code: 'ABC123',
        isUsed: false,
        expiresAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        appointmentId: 2,
        code: 'XYZ789',
        isUsed: false,
        expiresAt: new Date(new Date().setDate(new Date().getDate() + 14)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AccessCodes', null, {});
  }
};