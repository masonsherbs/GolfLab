'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Appointments', [
    {
      userId: 1,
      dateTime: new Date(new Date().setDate(new Date().getDate() + 7)),
      duration: 60,
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      dateTime: new Date(new Date().setDate(new Date().getDate() + 14)),
      duration: 90,
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Appointments', null, {});
};

export { up, down };