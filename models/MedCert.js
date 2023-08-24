const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Patient = require("./Patient");

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
      references: {
        //this is the foreign key for patients\\
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

module.exports = MedicalCertificate;
