const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.post(
  "/add",
  productsController.upload.single("image"),
  productsController.addproducts
);

router.delete("/remove", productsController.removeproducts);

module.exports = router;
