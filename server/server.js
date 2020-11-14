const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/exercises", exerciseRouter);
app.use("/users", usersRouter);

//mongoose options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(process.env.DB_URI, options, function (err) {
  console.log(err ? err : "DB connection successful");
});

app.listen(port, function (req, res) {
  console.log("Server running on Port 5000");
});
