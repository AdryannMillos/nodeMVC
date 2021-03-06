const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
require("./auth/passport");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors("*"));
app.use("/", require("./routes/api.router"));

module.exports = app;
