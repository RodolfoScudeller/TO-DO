const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const config = require('../config/config');
const sequelizeInit = require('../config/index');
const sequelize = require('../config/sequelize');
const routes = require('../routes');

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const startServer = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routes);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  sequelizeInit();

  await sequelize.authenticate()
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.error('Error connecting to database:', error);
    });

  // Configurar modelos
  await sequelize.sync({ alter: true }) // Sincronizar modelos com o banco de dados
    .then(() => {
      console.log('Models synchronized with the database');
    })
    .catch((error) => {
      console.error('Error synchronizing models with the database:', error);
    });

  const PORT = config.server.port;
  app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
};

module.exports = { startServer, app };
