const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define(
  'layanan',
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
    unit: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['kg', 'pcs', 'cm', 'm2']],
      },
    },
    harga: {
      type: Sequelize.DECIMAL,
    },
    User_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
