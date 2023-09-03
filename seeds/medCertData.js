// Seed for med certs

const { MedicalCertificate } = require('../models');

const medCertData = [
  {
    reason: 'hate work',
    approved: false,
    patient_id: 1,
    doctor_id: 2,
  },
  {
    reason: 'sick of life',
    approved: false,
    patient_id: 2,
    doctor_id: 1,
  },
  {
    reason: 'cant be bothered',
    approved: false,
    patient_id: 3,
    doctor_id: 1,
  },
];

const seedMedCert = () => MedicalCertificate.bulkCreate(medCertData);

module.exports = seedMedCert;
