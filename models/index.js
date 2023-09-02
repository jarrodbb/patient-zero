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
  onDelete: 'CASCADE',
});

Doctor.hasMany(Patient, {
  // Doctor can have many Patient records.
  foreignKey: 'doctor_id',
  onDelete: 'CASCADE',
});

Doctor.hasMany(MedicalCertificate, {
  // Doctor can issue multiple MedicalCertificate records
  foreignKey: 'doctor_id',
  onDelete: 'CASCADE',
});

MedicalCertificate.belongsTo(Patient, {
  // MedicalCertificate record belongs to a Patient
  foreignKey: 'patient_id',
  onDelete: 'SET NULL',
});

MedicalCertificate.belongsTo(Doctor, {
  // MedicalCertificate record belongs to a Doctor
  foreignKey: 'doctor_id',
  onDelete: 'SET NULL',
});

module.exports = { Doctor, Patient, MedicalCertificate };
