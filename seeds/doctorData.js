// Seed for doctors

const { Doctor } = require('../models');

const doctorData = [
  {
    doctor_id: 1,
    name: 'Dr. Dan Javascript',
    email: 'javascript@example.com',
    password: 'password123',
  },
  {
    doctor_id: 2,
    name: 'Dr. Error Prone',
    email: 'error@example.com',
    password: 'securepassword456',
  },
  {
    doctor_id: 3,
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
