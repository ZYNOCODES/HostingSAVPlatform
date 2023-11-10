const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});
console.log(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD);
module.exports = sequelize;
