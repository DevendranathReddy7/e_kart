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
  .connect(
    "mongodb+srv://devendraReddy:Me%40ekart7733@cluster-ekart.ggh4p.mongodb.net/e_kartDB?retryWrites=true&w=majority&appName=Cluster-ekart"
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
