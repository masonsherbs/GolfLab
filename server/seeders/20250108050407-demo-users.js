'use strict';
const bcrypt = require('bcryptjs');

const up = async (queryInterface, Sequelize) => {
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password456', 10);
  await queryInterface.bulkInsert('Users', [
    {
      username: 'johndoe',
      email: 'john@example.com',
      password: hashedPassword1,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      accessLevel: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'janedoe',
      email: 'jane@example.com',
      password: hashedPassword2,
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '0987654321',
      accessLevel: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
};

const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Users', null, {});
};

module.exports = { up, down };