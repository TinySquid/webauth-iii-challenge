const bcrypt = require("bcrypt");

exports.seed = function(knex) {
  return knex("users").insert([
    { username: "Darrin", password: bcrypt.hashSync("password", 8), department: "Software" },
    { username: "Michael", password: bcrypt.hashSync("password", 8), department: "Software" },
    { username: "Joah", password: bcrypt.hashSync("password", 8), department: "Accounting" },
    { username: "Oliver", password: bcrypt.hashSync("password", 8), department: "Accounting" },
    { username: "Pedro", password: bcrypt.hashSync("password", 8), department: "Finance" },
  ]);
};
