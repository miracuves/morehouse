const BASE_URL = "https://onesignal.com/api/v1";
const request = require("request");
require("dotenv").config({ path: ".env" });

async function sendNotificationOneSignal(
  userTokenList,
  title,
  msg,
  screenA,
  id
) {
  var sendNotification = function (data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers,
    };

    var https = require("https");
    var req = https.request(options, function (res) {
      res.on("data", function (data) {
        console.log("data", data.body);
      });
    });

    req.on("error", function (e) {
      console.log("ERROR:");
      console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
  };

  var message = {
    app_id: process.env.ONESIGNAL_APP_ID,
    headings: { en: title },
    contents: { en: msg },
    data: { screen: screenA, id: id },
    include_player_ids: userTokenList,
  };

  sendNotification(message);
}

const optionsBuilder = async (method, path, body) => {
  var key = process.env.ONESIGNAL_KEY;
  body["app_id"] = process.env.ONESIGNAL_APP_ID;
  return {
    method,
    url: `${BASE_URL}/${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${key}`,
    },
    body: body ? JSON.stringify(body) : null,
  };
};

const sendNotificationToAll = async (body) => {
  const options = await optionsBuilder("POST", "notifications", body);
  request(options, (error, response) => {
    if (error) {
      console.log("error sending notification");
    } else {
    }
  });
};

module.exports = {
  sendNotificationOneSignal,
  sendNotificationToAll,
};
