const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  logging: false, // Defina como true para ver as consultas SQL no console
});

module.exports = sequelize;
