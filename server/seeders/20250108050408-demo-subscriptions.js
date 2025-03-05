'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Subscriptions', [
    {
      userId: 1,
      planType: 'monthly',
      currentSubscriptionPrice: 49.99,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      status: 'active',
      stripeCustomerId: 'cus_123456789',
      stripeSubscriptionId: 'sub_987654321',
      nextPaymentDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      lastPaymentDate: new Date(),
      lastPaymentAmount: 49.99,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      planType: 'pay-per-use',
      currentSubscriptionPrice: 10.00,
      startDate: new Date(),
      status: 'active',
      stripeCustomerId: 'cus_987654321',
      stripeSubscriptionId: null,
      nextPaymentDate: null,
      lastPaymentDate: new Date(),
      lastPaymentAmount: 10.00,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 3,
      planType: 'monthly',
      currentSubscriptionPrice: 39.99,
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      status: 'cancelled',
      stripeCustomerId: 'cus_246810121',
      stripeSubscriptionId: 'sub_135791113',
      nextPaymentDate: null,
      lastPaymentDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      lastPaymentAmount: 39.99,
      createdAt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      updatedAt: new Date()
    }
  ], {});
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Subscriptions', null, {});
};

export { up, down };