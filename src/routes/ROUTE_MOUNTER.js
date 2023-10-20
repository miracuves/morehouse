const express = require("express");
const notifications = require("./notifications");
const agoraRouter = require("../routes/agora");
module.exports = app = express();

app.use("/notifications", notifications);
app.use("/agora", agoraRouter);
