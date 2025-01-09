const express = require("express");
const router = express.Router();

const itemsController = require("../controllers/itemsController");

router.post("/add", itemsController.addItems);
router.delete("/remove", itemsController.removeItems);

module.exports = router;
