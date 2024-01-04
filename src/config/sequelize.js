const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  logging: false, // Defina como true para ver as consultas SQL no console
});

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
