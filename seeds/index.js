const sequelize = require('../config/connection');
const seedDoctors = require('./doctorData');
const seedPatients = require('./patientData');
// const seedCertificate = require('./patientData'); Still need to work on this

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedDoctors();

  await seedPatients();

  process.exit(0);
};

seedAll();
