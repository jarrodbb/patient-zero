const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Patient extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Patient model properties
Patient.init(
  {
    // Patient attributes
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
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'doctor',
        key: 'doctor_id',
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'patient',
  }
);

module.exports = Patient;

// Summary
/// Defines patient model with attributes for patient info
/// the model configuration specifies Sequelize-specific options such as hooks for password hashing, timestamps, table name, and model name.
