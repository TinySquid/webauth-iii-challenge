const knex = require("knex");

const config = require("../knexfile");

//Use environment variable first. Fallback to development when not set.
const DB_ENV = process.env.DB_ENV || "development";

module.exports = knex(config[DB_ENV]);
