const fs = require("fs");

const participantsDataRoute = (app) => {
  app.get("/participantsData", (req, res) => {
    fs.readFile("./data/participantsData.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading data file");
        return;
      }

      const jsonData = JSON.parse(data);
      res.json(jsonData.participantsData);
    });
  });
};

module.exports = participantsDataRoute;
