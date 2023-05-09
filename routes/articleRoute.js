const express = require("express");
const router = express.Router();

const articleController = require("../controllers/articleController");
// const authDoctor = require("../controllers/authDoctorController");
const authController = require("../controllers/authController");

// router.use("/search", ticketController.searchTicket);

router.use("/image/:imageName", articleController.getImage);

router
  .route("/")
  .get(articleController.getAllArticles)
  .post(
    authController.protect,
    articleController.uploadArticleImages,
    articleController.resizeArticleImages,
    articleController.createOneArticle
  );

router
  .route("/:id")
  .get(articleController.getOneArticle)
  .patch(
    authController.protect,
    articleController.uploadArticleImages,
    articleController.resizeArticleImages,
    articleController.updateOneArticle
  )
  .delete(articleController.deleteOneArticle);

module.exports = router;
