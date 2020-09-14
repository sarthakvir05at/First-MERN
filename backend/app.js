const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/codecampTuto", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Database connected successfully");
});

const exerciseRoute = require("./routes/exercisesroute");
const userRoute = require("./routes/usersroute");

app.use("/exercisesRoute", exerciseRoute);
app.use("/usersRoute", userRoute);

app.listen(5000, () => {
  console.log("App Running Fine");
});
