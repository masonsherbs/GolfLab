'use strict';

const up = async (queryInterface, Sequelize) => {
  // First, fetch the IDs of the users we just inserted
//   const users = await queryInterface.sequelize.query(
//     `SELECT id FROM Users;`,
//     { type: queryInterface.sequelize.QueryTypes.SELECT }
//   );

//   if (users.length < 2) {
//     throw new Error('Not enough users in the database to create subscriptions');
//   }

  await queryInterface.bulkInsert('Subscriptions', [
    {
      userId: 1,
      planType: 'Premium',
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      planType: 'Basic',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Subscriptions', null, {});
};

module.exports = { up, down };