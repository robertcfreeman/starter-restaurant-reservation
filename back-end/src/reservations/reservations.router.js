const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.listByDate)
  .post(controller.create)
  .all(methodNotAllowed)


module.exports = router;
