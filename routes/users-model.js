const db = require("../data/dbConfig.js");

async function insert(user) {
  return null;
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getUsers() {
  return db("users");
}

function getById(id) {
  return null;
}

module.exports = { insert, update, remove, getUsers, getById };
