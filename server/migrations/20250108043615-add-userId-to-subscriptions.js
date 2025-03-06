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
  try {
    // Check if the Subscriptions table exists
    const tables = await queryInterface.showAllTables();
    if (tables.includes('Subscriptions')) {
      // If the table exists, try to remove the column
      await queryInterface.removeColumn('Subscriptions', 'userId');
    } else {
      console.log("Subscriptions table doesn't exist, skipping column removal.");
    }
  } catch (error) {
    console.error('Migration down error:', error);
    // If the error is due to the table not existing, we can ignore it
    if (error.name !== 'SequelizeDatabaseError') {
      throw error;
    }
  }
};

module.exports = { up, down };