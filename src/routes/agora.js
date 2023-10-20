const express = require("express");
const agora = require("../controllers/agoracontroller");
const agoraRouteRouter = express.Router();
agoraRouteRouter.route("/generatertctoken").post(agora.generateRtcToken);
agoraRouteRouter.route("/generatertmtoken/:uid").get(agora.generateRtmToken);

module.exports = agoraRouteRouter;
