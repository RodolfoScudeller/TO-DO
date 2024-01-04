async function sequelizeInit() {
  const database = require('./sequelize');
  const { Tasks } = require('../models');

  await database.sync();
}

module.exports = sequelizeInit;
