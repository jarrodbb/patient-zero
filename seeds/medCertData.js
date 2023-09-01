const { MedicalCertificate } = require('../models');

const medCertData = [
  {
    reason: 'hate work',
    patient_id: 1,
    doctor_id: 2,
  },
  {
    reason: 'sick of life',
    patient_id: 2,
    doctor_id: 1,
  },
  {
    reason: "can't be bothered",
    patient_id: 3,
    doctor_id: 1,
  },
];

const seedMedCert = () => MedicalCertificate.bulkCreate(medCertData);

module.exports = seedMedCert;
