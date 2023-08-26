const { MedicalCertificate } = require('../models');

const medCertData = [
  {
    patient_id: 1,
    doctor_id: 2,
  },
  {
    patient_id: 2,
    doctor_id: 1,
  },
  {
    patient_id: 3,
    doctor_id: 1,
  },
];

const seedMedCert = () => MedicalCertificate.bulkCreate(medCertData);

module.exports = seedMedCert;