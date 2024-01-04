module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
  },
};
