const express = require("express");
const path = require("path");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");

module.exports = app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(passport.initialize());
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});