'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // First, check if the column exists
    const tableInfo = await queryInterface.describeTable('Subscriptions');

    if (!tableInfo.currentSubscriptionPrice) {
      // If the column doesn't exist, add it
      await queryInterface.addColumn('Subscriptions', 'currentSubscriptionPrice', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0 // You might want to set a default value
      });
    } else {
      // If it exists, change it
      await queryInterface.changeColumn('Subscriptions', 'currentSubscriptionPrice', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      });
    }

    // Add the rest of your new columns
    await queryInterface.addColumn('Subscriptions', 'stripeCustomerId', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Subscriptions', 'stripeSubscriptionId', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Subscriptions', 'nextPaymentDate', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Subscriptions', 'lastPaymentDate', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Subscriptions', 'lastPaymentAmount', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove all the columns we added
    await queryInterface.removeColumn('Subscriptions', 'currentSubscriptionPrice');
    await queryInterface.removeColumn('Subscriptions', 'stripeCustomerId');
    await queryInterface.removeColumn('Subscriptions', 'stripeSubscriptionId');
    await queryInterface.removeColumn('Subscriptions', 'nextPaymentDate');
    await queryInterface.removeColumn('Subscriptions', 'lastPaymentDate');
    await queryInterface.removeColumn('Subscriptions', 'lastPaymentAmount');
  }
};