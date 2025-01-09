require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authenticationRoute");
const productsRoutes = require("./routes/productsRoute");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use("/", authRoutes);
app.use("/product", productsRoutes);

mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
