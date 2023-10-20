const functions = require("../shared/functions");
exports.sendNotification = async (req, res) => {
  var screen = req.body.screen;
  var id = req.body.id;
  var message = req.body.message;
  var title = req.body.title;
  var users = req.body.users;
  if (users.length == 0) {
    functions.sendNotificationToAll({
      included_segments: ["Subscribed Users"],
      data: { screen: screen, id: id },
      headings: {
        en: title,
      },
      contents: {
        en: message,
      },
    });
  } else {
    if (users.length > 0) {
      functions.sendNotificationOneSignal(users, title, message, screen, id);
    }
  }
  return res.json("notification sent");
};
