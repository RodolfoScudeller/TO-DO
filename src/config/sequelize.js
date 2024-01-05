const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.database.database,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
  },
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem-sucedida.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

testConnection();

module.exports = sequelize;
