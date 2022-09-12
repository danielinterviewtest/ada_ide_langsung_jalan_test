const sequelize = require('sequelize');

const db = new sequelize('adaidetest', process.env.DB_USER, process.env.DB_SECRET, {
  dialect: 'mysql',
});

db.sync({});

module.exports = db;
