const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
const authRoutes = require("./routes/authenticationRoute");
app.use(cors());
app.use(bodyParser.json());
app.use("/signin", authRoutes);

mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
