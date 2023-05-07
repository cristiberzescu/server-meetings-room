const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const participantsDataRoute = require("./routes/routes.js");

const app = express();

app.use(morgan("tiny"));
app.use(cors());

participantsDataRoute(app);

app.listen(3002, () => {
  console.log("Listening on port 3002");
});
