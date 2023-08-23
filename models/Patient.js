const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Patient extends Model {}

Patient.init(
  {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    requires_certificate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    allergies: {
      type: DataTypes.STRING,
    },
    diabetes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    heart_disease: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    high_blood_pressure: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    kidney_or_liver_disease: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    medication_list: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'patient',
  }
);

module.exports = Patient;
