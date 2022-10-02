const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const list = async (req, res) => {
  const data = await reservationsService.list();
  res.status(201).json({ data });
};

const create = async (req, res) => {
  const data = await reservationsService.create(req.body.data);
  console.log(data);
  res.status(201).json({ data });
};

const listByDate = async (req, res) => {
  const { date } = req.query;
  const data = await reservationsService.listByDate(date);
  res.status(201).json({ data });
};

/***********************************************************
 Middleware & Validations
***********************************************************/

const hasRequiredProperties = (req, res, next) => {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    },
  } = req.body;

  if (
    first_name &&
    last_name &&
    mobile_number &&
    reservation_date &&
    reservation_time &&
    people
  )
    return next();

  const invalidProperties = [];
  if (!first_name) invalidProperties.push("first name");
  if (!last_name) invalidProperties.push("last name");
  if (!mobile_number) invalidProperties.push("mobile number");
  if (!reservation_date) invalidProperties.push("reservation date");
  if (!reservation_time) invalidProperties.push("reservation time");
  if (!people) invalidProperties.push("minimum party of 1");
  const message = `
    A ${invalidProperties.join(", ")} is required to complete a reservation.
  `;
  return next({ status: 400, message });
};

const hasValidDate = (req, res, next) => {
  const today = new Date();
  const { reservation_date } = req.body.data;
  const dayOfReservation = new Date(reservation_date).getDay();
  console.log("today:", today + 1);
  if (new Date(reservation_date) < today || dayOfReservation == "1") {
    return next({
      status: 400,
      message:
        "Reservation cannot be made before prior to the current day and cannot be made on Tuesdays.",
    });
  }

  return next();
};

const hasValidTime = (req, res, next) => {
  const { reservation_time } = req.body.data;
  console.log(reservation_time)
  if (reservation_time >= "10:30" && reservation_time <= "21:30") {
    return next();
  }
  return next({
    status: 400,
    message: "Reservation cannot be made before 10:30 AM or after 9:30 PM",
  });
};

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, hasValidDate, hasValidTime, asyncErrorBoundary(create)],
  listByDate: asyncErrorBoundary(listByDate),
};
