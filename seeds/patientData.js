// seed for patients
const { Patient } = require('../models');

const patientData = [
  {
    name: 'Joe Sickie',
    date_of_birth: '1995-05-15',
    email: 'sickie@gmail.com',
    password: 'securepass123',
    requires_certificate: true,
    allergies: 'Pollen',
    diabetes: false,
    heart_disease: false,
    high_blood_pressure: true,
    kidney_or_liver_disease: false,
    medication_list: 'Antihistamine',
    doctor_id: 2,
  },
  {
    name: 'John Sleep',
    date_of_birth: '1988-09-20',
    email: 'sleep@hotmail.com',
    password: 'strongpass456',
    requires_certificate: false,
    allergies: 'Nuts',
    diabetes: true,
    heart_disease: false,
    high_blood_pressure: false,
    kidney_or_liver_disease: true,
    medication_list: 'Insulin',
    doctor_id: 1,
  },
  {
    name: 'Amanda Away',
    date_of_birth: '2000-03-10',
    email: 'away@example.com',
    password: 'secretword789',
    requires_certificate: true,
    allergies: 'None',
    diabetes: false,
    heart_disease: true,
    high_blood_pressure: true,
    kidney_or_liver_disease: true,
    medication_list: 'Beta-blockers',
    doctor_id: 1,
  },
];

const seedPatients = () =>
  Patient.bulkCreate(patientData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedPatients;
