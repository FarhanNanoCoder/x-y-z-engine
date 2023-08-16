require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { recordRouter } = require("./routes");

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ignoreUndefined: true,
  
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.use("/api/record", recordRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
