const fs = require("fs");
const allRooms = require("../data/mockRooms.json");
const meetingRoomData = require("../data/meetingRoomData.json");
const meetingInfo = require("../data/meetingInfo.json");

const dataRoute = (app) => {
  //GET
  //participants
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

  //meetings
  app.get("/meetings", (req, res) => {
    res.json(meetingRoomData.meetings);
  });

  //rooms
  app.get("/rooms", (req, res) => {
    res.json(allRooms.rooms);
  });

  app.get("/rooms/:id", (req, res) => {
    const data = allRooms.rooms.filter((e) => {
      return e.id == req.params.id;
    });
    res.status(200).send(data[0]);
  });

  //meetingInfo
  app.get("/meetingInfo/:id", (req, res) => {
    const data = meetingInfo.meetingInfo.filter((e) => {
      return e.id == req.params.id;
    });
    res.status(200).send(data[0]);
  });

  //POST
  //metings
  app.post("/meetings", (req, res) => {
    const meetingData = req.body;

    let maxId = 0;
    for (const meeting of meetingRoomData.meetings) {
      const id = parseInt(meeting.id);
      if (id > maxId) {
        maxId = id;
      }
    }
    meetingData.id = maxId + 1;

    meetingRoomData.meetings.push(meetingData);

    fs.writeFile(
      "./data/meetingRoomData.json",
      JSON.stringify(meetingRoomData),
      (err) => {
        if (err) {
          res.status(500).send("Error create");
        } else {
          res.status(200).send("Create successfull");
        }
      }
    );
  });

  //rooms
  app.post("/rooms", (req, res) => {
    const roomData = req.body;

    let maxId = 0;
    for (const room of allRooms.rooms) {
      const id = parseInt(room.id);
      if (id > maxId) {
        maxId = id;
      }
    }
    maxId++;
    roomData.id = "" + maxId;
    roomData.meetings = [];

    allRooms.rooms.push(roomData);

    fs.writeFile("./data/mockRooms.json", JSON.stringify(allRooms), (err) => {
      if (err) {
        res.status(500).send("Error create");
      } else {
        res.status(200).send("Create successfull");
      }
    });
  });

  //PUT
  app.put("/rooms/:id", (req, res) => {
    const roomId = req.params.id;
    const updatedRoomData = req.body;
    updatedRoomData.id = roomId;

    allRooms.rooms = allRooms.rooms.map((room) => {
      if (room.id === roomId) {
        return updatedRoomData;
      }
      return room;
    });

    fs.writeFile("./data/mockRooms.json", JSON.stringify(allRooms), (err) => {
      if (err) {
        res.status(500).send("Error edit");
      } else {
        res.status(200).send("Room edited");
      }
    });

    res.status(200).set("Room updated successfully");
  });

  //DELETE
  app.delete("/rooms/:id", (req, res) => {
    allRooms.rooms = allRooms.rooms.filter((room) => room.id !== req.params.id);

    fs.writeFile("./data/mockRooms.json", JSON.stringify(allRooms), (err) => {
      if (err) {
        res.status(500).send("Error delete");
      } else {
        res.status(200).send("Room deleted");
      }
    });
  });
};

module.exports = dataRoute;
