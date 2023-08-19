require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
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

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_HOST_URL,
  })
);
app.use(express.json(), (err, req, res, next) => {
  if (err) {
    res.status(400).json({
      code: 400,
      status: "failed",
      msg: "Invalid JSON body",
    });
  } else {
    next();
  }
});

app.use(express.urlencoded({ extended: true }));

app.use("/api/record", recordRouter);

app.listen(process.env.NEXT_PUBLIC_API_BACKEND_HOST_PORT, () => {
  console.log("Server is running on port 3000");
});
