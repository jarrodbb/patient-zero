const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Patient = require('./Patient');

class MedicalCertificate extends Model {}

MedicalCertificate.init(
  {
    certificate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { //this is the foreign key for patients\\
        model: Patient,
        key: 'patient_id',
      },
    },
    patient_name: {
      type: DataTypes.STRING,
    },
    patient_date_of_birth: {
      type: DataTypes.DATEONLY,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    reason: {
      type: DataTypes.STRING,
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

// Define the association between MedicalCertificate and Patient
MedicalCertificate.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = MedicalCertificate;