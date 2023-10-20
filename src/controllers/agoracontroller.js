require("dotenv").config({ path: ".env" });
const {
  RtcTokenBuilder,
  RtcRole,
  RtmTokenBuilder,
  RtmRole,
} = require("agora-access-token");
exports.generateRtcToken = async (req, res) => {
  try {
    const expirationTimeInSeconds = 84600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const token = RtmTokenBuilder.buildToken(
      process.env.AGORA_APP_ID,
      process.env.AGORA_CERT,
      req.body.channel,
      RtmRole,
      privilegeExpiredTs
    );
    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.generateRtmToken = async (req, res) => {
  try {
    let uid = req.params.uid;
    if (!uid || uid === "") {
      return res.status(500).json({ error: "uid is required" });
    }
    let role = RtmRole.Rtm_User;
    const expirationTimeInSeconds = 84600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtmTokenBuilder.buildToken(
      process.env.AGORA_APP_ID,
      process.env.AGORA_CERT,
      uid,
      role,
      privilegeExpiredTs
    );
    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};
