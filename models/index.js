// Import models
const Doctor = require('./Doctor');
const Patient = require('./Patient');
const MedicalCertificate = require('./MedCert');

// Defines relationships between Doctor Patient and MedCert
Patient.belongsTo(Doctor, {
  // each patient is associated with one doctor
  foreignKey: 'doctor_id',
});

Patient.hasMany(MedicalCertificate, {
  // a Patient can have multiple MedicalCertificate records.
  foreignKey: 'patient_id',
});

Doctor.hasMany(Patient, {
  // Doctor can have many Patient records.
  foreignKey: 'doctor_id',
});

Doctor.hasMany(MedicalCertificate, {
  // Doctor can issue multiple MedicalCertificate records
  foreignKey: 'doctor_id',
});

MedicalCertificate.belongsTo(Patient, {
  // MedicalCertificate record belongs to a Patient
  foreignKey: 'patient_id',
});

MedicalCertificate.belongsTo(Doctor, {
  // MedicalCertificate record belongs to a Doctor
  foreignKey: 'doctor_id',
});

module.exports = { Doctor, Patient, MedicalCertificate };
