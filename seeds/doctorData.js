const { Doctor } = require('../models');

const doctorData = [
  {
    name: 'Dr. Dan Javascript',
    email: 'javascript@example.com',
    password: 'password123',
  },
  {
    name: 'Dr. Error Prone',
    email: 'error@example.com',
    password: 'securepassword456',
  },
  {
    name: 'Dr. Merge Conflict',
    email: 'conflict@example.com',
    password: 'secretpasswprd789',
  },
];

const seedDoctors = () =>
  Doctor.bulkCreate(doctorData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedDoctors;
