const knex = require("knex");
const config = requir("../knexfile.js");

const environment = process.env.DB_ENV || "development";

module.exports = knex(config[environment]);
