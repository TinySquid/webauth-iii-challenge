const knex = require("../../data/dbConfig");

const usersDB = require("../dbHelpers/Users");

module.exports = {
  get: usersDB.get,
  getByUsername,
  insert: usersDB.insert,
};

function getByUsername(username) {
  return knex
    .select("*")
    .from("users")
    .where({ username });
}
