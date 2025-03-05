'use strict';

const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('Users', [
    {
      username: 'johndoe',
      email: 'john@example.com',
      password: 'hashedpassword123', // In real scenario, ensure this is properly hashed
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
      password: 'hashedpassword456',
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

export { up, down };