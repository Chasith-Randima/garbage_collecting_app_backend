const express = require("express");
const router = express.Router();

const incidentController = require("../controllers/incidentController");
// const authDoctor = require("../controllers/authDoctorController");
const authController = require("../controllers/authController");

// router.use("/search", ticketController.searchTicket);

router.use("/image/:imageName", incidentController.getImage);

router
  .route("/")
  .get(incidentController.getAllIncidents)
  .post(
    authController.protect,
    incidentController.uploadIncidentImages,
    incidentController.resizeIncidentImages,
    incidentController.createOneIncident
  );

router
  .route("/:id")
  .get(incidentController.getOneIncident)
  .patch(
    authController.protect,
    incidentController.uploadIncidentImages,
    incidentController.resizeIncidentImages,
    incidentController.updateOneIncident
  )
  .delete(incidentController.deleteOneIncident);

module.exports = router;
