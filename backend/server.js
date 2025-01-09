require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authenticationRoute");
const itemsRoutes = require("./routes/itemsRoute");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/", authRoutes);
app.use("/items", itemsRoutes);

mongoose
  .connect(process.env.mongoURL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
