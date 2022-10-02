const knex = require("../db/connection")

const create = (reservation) => {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then(createdRecords => createdRecords[0])

}

const list = () => {
  return knex("reservations")
    .select("*")
    .returning("*")
}

const listByDate = (reservation_date) => {
  return knex("reservations")
    .select("*")
    .where({reservation_date})
}

module.exports = {
  create,
  list,
  listByDate,
}