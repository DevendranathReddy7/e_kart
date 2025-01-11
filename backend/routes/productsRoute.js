const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.post(
  "/add",
  productsController.upload.single("image"),
  productsController.addProducts
);

router.post(
  "/update/:id",
  productsController.upload.single("image"),
  productsController.updateProducts
);

router.delete("/remove/:id", productsController.removeProducts);

module.exports = router;
