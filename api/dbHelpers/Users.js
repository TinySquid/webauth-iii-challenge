const knex = require("../../data/dbConfig");

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  if (id) {
    return knex
      .select("*")
      .from("users")
      .where({ id: id });
  } else {
    return knex.select("*").from("users");
  }
}

function insert(user) {
  return knex("users").insert(user, "id");
}

function update(id, changes) {
  return knex("users")
    .where({ id: id })
    .update(changes);
}

function remove(id) {
  return knex("users")
    .where({ id: id })
    .del();
}
