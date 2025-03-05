'use strict';

const up = async (queryInterface, Sequelize) => {
    // Check if Users table exists, if not, create it
    const tablesExist = await queryInterface.showAllTables();
    if (!tablesExist.includes('Users')) {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        // Add other necessary columns for Users table
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
      });
    }
    const tableInfo = await queryInterface.describeTable('Subscriptions');
    const columnExists = (columnName) => Object.keys(tableInfo).includes(columnName);

    const columnsToAdd = [
      {
        name: 'userId',
        type: Sequelize.INTEGER,
        allowNull: true,  // Changed to true to allow adding without existing users
        references: { model: 'Users', key: 'id' }
      },
      {
        name: 'planType',
        type: Sequelize.ENUM('monthly', 'pay-per-use', 'trial', 'punch-card'),
        allowNull: false,
        defaultValue: 'monthly'
      },
      {
        name: 'currentSubscriptionPrice',
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      {
        name: 'startDate',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        name: 'endDate',
        type: Sequelize.DATE,
        allowNull: true
      },
      {
        name: 'status',
        type: Sequelize.ENUM('active', 'inactive', 'cancelled'),
        allowNull: false,
        defaultValue: 'active'
      },
      {
        name: 'sessionsRemaining',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      {
        name: 'stripeCustomerId',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        name: 'stripeSubscriptionId',
        type: Sequelize.STRING,
        allowNull: true
      },
      {
        name: 'nextPaymentDate',
        type: Sequelize.DATE,
        allowNull: true
      },
      {
        name: 'lastPaymentDate',
        type: Sequelize.DATE,
        allowNull: true
      },
      {
        name: 'lastPaymentAmount',
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      }
    ];

    for (const column of columnsToAdd) {
      if (!columnExists(column.name)) {
        await queryInterface.addColumn('Subscriptions', column.name, column);
      } else if (column.name === 'planType' || column.name === 'status') {
        await queryInterface.changeColumn('Subscriptions', column.name, column);
      }
    }

    // After adding all columns, update userId to be non-nullable
    await queryInterface.changeColumn('Subscriptions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    });
  };

  const down = async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Subscriptions');
    const columnExists = (columnName) => Object.keys(tableInfo).includes(columnName);

    const columnsToRemove = [
      'userId', 'planType', 'currentSubscriptionPrice', 'startDate', 'endDate',
      'status', 'sessionsRemaining', 'stripeCustomerId', 'stripeSubscriptionId',
      'nextPaymentDate', 'lastPaymentDate', 'lastPaymentAmount'
    ];

    for (const columnName of columnsToRemove) {
      if (columnExists(columnName)) {
        await queryInterface.removeColumn('Subscriptions', columnName);
      }
    }

    // Check if Users table was created by this migration, if so, remove it
    const tablesExist = await queryInterface.showAllTables();
    if (tablesExist.includes('Users')) {
      await queryInterface.dropTable('Users');
    }
  };

  export { up, down };