//Doctor Model
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
class Doctor extends Model {
  //defines a class named Doctor that extends the model class
  checkPassword(loginPw) {
    // check pw method to compare a user input pw wuth the hashed pw in the DB to autenticate
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// Doctor Model properties (columns)
Doctor.init(
  {
    // Attributes for each property
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
        len: [6], //minimum length for a str atribute so the password thingie //
      },
    },
  },
  {
    //Model options
    hooks: {
      //defines hooks and functions that run before creating the doc model
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
    modelName: 'doctor',
  }
);

module.exports = Doctor;

// Summary
/// this code defines a Sequelize model for a Doctor with attributes (doctor_id, name etc), validation rules, and hooks for securely handling passwords.
