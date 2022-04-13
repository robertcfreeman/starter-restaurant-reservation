const knex = require("../db/connection")

const create = (reservation) => {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then(createdRecords => createdRecords[0])

}



module.exports = {
  create
}