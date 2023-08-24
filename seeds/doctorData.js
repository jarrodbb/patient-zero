const {Doctor} = require('../models/Doctor');

const doctorData = [
  {
    name: 'Dr. Dan Javascript',
    email: 'Javascript@example.com',
    password: 'password123',
  },
  {
    name: 'Dr. Error Prone',
    email: 'Error@example.com',
    password: 'securepassword456',
  },
  {
    name: 'Dr. Merge Conflict',
    email: 'conflict@example.com',
    password: 'secretpasswprd789',
  },
];

const seedDoctors = () => Doctor.bulkCreate(doctorData);

module.exports = seedDoctors;