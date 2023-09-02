//Med Cert Model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Patient = require("./Patient");

class MedicalCertificate extends Model {}

// Med Cert properties (columns)
MedicalCertificate.init(
  {
    // Attributes for each property
    certificate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is the foreign key for patients
        model: 'patient',
        key: 'patient_id',
      },
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctor',
        key: 'doctor_id',
      },
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value is set to false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'medical_certificate',
  }
);

module.exports = MedicalCertificate;

// Summary
/// Defines a model for a MedCert with with attributes like reason and is_approved
/// Should allow patient responses to be rendered
