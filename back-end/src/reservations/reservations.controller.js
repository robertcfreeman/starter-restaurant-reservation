/**
 * List handler for reservation resources
 */

const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasRequiredProperties = (req, res, next) => {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people
    }
  } = req.body

  if (first_name && last_name && mobile_number && reservation_date && reservation_time && people) return next();

  const invalidProperties = [];
  if (!first_name) invalidProperties.push("first name");
  if(!last_name) invalidProperties.push("last name");
  if(!mobile_number) invalidProperties.push("mobile number");
  if(!reservation_date) invalidProperties.push("reservation date");
  if(!reservation_time) invalidProperties.push("reservation time");
  if(!people) invalidProperties.push("minimum party of 1");
  const message = `
    A ${invalidProperties.join(", ")} is required to complete a reservation.
  `;
  return next({status: 400, message});
}

async function list(req, res) {
  res.json({
    data: [],
  });
}


const create = async (req, res) => {
  const data = await reservationsService.create(req.body.data)
  res.status(201).json({data})

}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, asyncErrorBoundary(create)],
};
