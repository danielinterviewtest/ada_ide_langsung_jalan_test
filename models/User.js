const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: Sequelize.STRING,
      validate: {
        len: [0, 50],
      },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [1, 15],
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telepon: {
      type: Sequelize.STRING,
      validate: {
        isNumeric: true,
        len: [0, 15],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
