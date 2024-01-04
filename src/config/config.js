module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'a1b2c3',
    database: process.env.DB_DATABASE || 'to_do_list',
    dialect: process.env.DB_DIALECT || 'mysql',
  },
};
