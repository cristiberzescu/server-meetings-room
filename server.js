const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dataRoute = require("./routes/routes.js");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

dataRoute(app);

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
