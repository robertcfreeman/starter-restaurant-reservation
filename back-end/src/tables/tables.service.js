const knex = require("../db/connection")

const create = (table) => {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then(createdRecords => createdRecords[0])

}

const list = () => {
  return knex("tables")
    .select("*")
    .returning("*")
}


module.exports = {
  create,
  list,
}