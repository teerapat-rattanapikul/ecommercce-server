const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./utils/database");
const APIROUTE = require("./routes/api");
const cors = require("cors");
const morgan = require("morgan");

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));
app.use("/uploads/", express.static("uploads"));
app.get("/", (req, res) => {
  res.json("This is the server");
});
app.use("/api", APIROUTE);
sequelize.sync().then((result) => {
  app.listen(8000, () => {
    console.log("server start on port 8000");
  });
});
