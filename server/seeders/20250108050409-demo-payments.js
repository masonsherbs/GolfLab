'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Payments', [
    {
      userId: 1,
      subscriptionId: 1,
      appointmentId: 1,
      amount: 50.00,
      paymentDate: new Date(),
      paymentMethod: 'credit_card',
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      subscriptionId: 2,
      appointmentId: 2,
      amount: 75.00,
      paymentDate: new Date(),
      paymentMethod: 'paypal',
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Payments', null, {});
};

export { up, down };