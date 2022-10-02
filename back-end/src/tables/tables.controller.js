const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const list = async (req, res) => {
  const data = await tablesService.list();
  res.status(201).json({ data });
};

const create = async (req, res) => {
  const data = await tablesService.create(req.body.data);
  console.log(data);
  res.status(201).json({ data });
};

/***********************************************************
 Middleware & Validations
***********************************************************/

const hasRequiredProperties = (req, res, next) => {
  const {
    data: {
      table_name,
      capacity,
    },
  } = req.body;

  if (
    table_name &&
    capacity &&
    table_name.length >= 2 
  )
    return next();

  const invalidProperties = [];
  if (!table_name) invalidProperties.push("table name");
  if (!capacity) invalidProperties.push("capacity");
  
  const message = `
    A ${invalidProperties.join(", ")} is required to complete a table.
  `;
  return next({ status: 400, message });
};


module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, asyncErrorBoundary(create)],
  // listByDate: asyncErrorBoundary(listByDate),
};
