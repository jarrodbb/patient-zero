// import models
const Doctor = require('./Doctor');
const Patient = require('./Patient');
const MedicalCertificate = require('./MedCert');

Patient.belongsTo(Doctor, {
  foreignKey: 'doctor_id'
});

Patient.hasMany(MedicalCertificate, {
  foreignKey: 'patient_id'
});

Doctor.hasMany(Patient, {
  foreignKey: 'doctor_id'
});

Doctor.hasMany(MedicalCertificate, {
  foreignKey: 'doctor_id'
});

module.exports = { Doctor, Patient, MedicalCertificate };