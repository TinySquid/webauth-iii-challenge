const knex = require("../../data/dbConfig");

const usersDB = require("../dbHelpers/Users");

module.exports = {
  get: usersDB.get,
  getUsersByDepartment,
};

function getUsersByDepartment(department) {
  return knex
    .select("*")
    .from("users")
    .where({ department: department });
}
