const express = require("express");
const notificationRouter = express.Router();
const functions = require("../shared/functions");
const notificationController = require("../controllers/notificationscontroller");

notificationRouter.route("/").post(notificationController.sendNotification);

module.exports = notificationRouter;
