const { Sequelize } = require("sequelize");
const config = require('../util/config')

const sequelize = new Sequelize(`postgres://${config.POSTGRES_USER}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_HOST}:${config.POSTGRES_PORT}/${config.POSTGRES_DB}`, {
    dialect: "postgres",
    logging: false,
});

module.exports = sequelize;
