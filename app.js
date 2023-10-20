const express = require("express");
const path = require("path");
const http = require("http");
const nodeCron = require("node-cron");
const app = express();

/*****************
 *VIEW ENGINE CONFIG
 *****************/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

/*****************
 *MIDDLEWARE
 *****************/
app.use(require("./src/services/middleware"));
app.use(require("./src/routes/ROUTE_MOUNTER"));
app.use("/public/img", express.static(path.join(__dirname, "public/img")));

/*****************
 *SERVER INSTANTIATION
 *****************/
var server = http.createServer(app);

server.listen(8000, function () {
  console.log("Roomies server listening on port " + 8000);
});

//Sheduled job to run every minute to delete dead rooms
nodeCron.schedule("*/60 * * * * *", async () => {
  try {
    var twentyMinsAgo = new Date(Date.now() - 20000 * 60);
    console.log(twentyMinsAgo);

    var room = await roomsModel.find({
      $and: [
        { activeTime: { $lt: twentyMinsAgo } },
        { event: false },
        { ended: false },
      ],
    });

    //     console.log(room[0]._id);

    await roomsModel.updateMany(
      {
        $and: [
          { activeTime: { $lt: twentyMinsAgo } },
          { event: false },
          { ended: false },
        ],
      },
      {
        $set: {
          ended: true,
          endedTime: Date.now(),
          productImages: [],
        },
      }
    );

    for (var i = 0; i < room.length; i++) {
      if (room[i]["channel"] != null) {
        await clubModel.findByIdAndUpdate(room[i]["channel"], {
          $pullAll: { rooms: [room[i]["_id"]] },
        });
      }
    }
  } catch (error) {
    console.log(error + " u");
  }
});

module.exports = app;
