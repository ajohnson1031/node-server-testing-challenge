const db = require("../data/dbConfig.js");

async function insert(user) {
  const [id] = await db("users").insert(user);
  return getById(id).first();
}

async function update(id, changes) {
  const user = await db("users")
    .where({ id })
    .update(changes);

  return getById(id);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function getUsers() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

module.exports = { insert, update, remove, getUsers, getById };
