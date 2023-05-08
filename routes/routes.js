const fs = require("fs");
const allRooms = require("../data/mockRooms.json");
const meetingRoomData = require("../data/meetingRoomData.json");
const meetingInfo = require("../data/meetingInfo.json");

const dataRoute = (app) => {
  app.get("/participantsData", (req, res) => {
    const participantsData = require("../data/participantsData.json");
    res.json(participantsData.participantsData);
  });

  app.get("/participants", (req, res) => {
    res.json(meetingRoomData.participants);
  });

  app.get("/roomdata", (req, res) => {
    res.json(meetingRoomData.roomdata);
  });

  app.get("/meetings", (req, res) => {
    res.json(meetingRoomData.meetings);
  });

  app.get("/rooms", (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(allRooms.rooms);
  });

  app.get("/rooms/:id", (req, res) => {
    const data = allRooms.rooms.filter((e) => {
      return e.id == req.params.id;
    });
    res.status(200).send(data[0]);
  });

  app.get("/meetingInfo/:id", (req, res) => {
    const data = meetingInfo.meetingInfo.filter((e) => {
      return e.id == req.params.id;
    });
    res.status(200).send(data[0]);
  });
};

module.exports = dataRoute;
