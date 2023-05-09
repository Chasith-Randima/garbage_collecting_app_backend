const express = require("express");
const router = express.Router();

const garbageController = require("../controllers/garbageController");
// const authDoctor = require("../controllers/authDoctorController");
const authController = require("../controllers/authController");

// router.use("/search", ticketController.searchTicket);

router.use("/image/:imageName", garbageController.getImage);

router
  .route("/")
  .get(garbageController.getAllGarbages)
  .post(
    authController.protect,
    garbageController.uploadGarbageSpotImages,
    garbageController.resizeGarbageSpotImages,
    garbageController.createOneGarbage
  );

router
  .route("/:id")
  .get(garbageController.getOneGarbage)
  .patch(
    authController.protect,
    garbageController.uploadGarbageSpotImages,
    garbageController.resizeGarbageSpotImages,
    garbageController.updateOneGarbage
  )
  .delete(garbageController.deleteOneGarbage);

module.exports = router;
