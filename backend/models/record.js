const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  client: {
    type: String,
    required: true,
  },
  contractor: {
    type: String,
    required: true,
  },
  max_x: {
    type: Number,
    reuired: true,
  },
  min_x: {
    type: Number,
    reuired: true,
  },
  max_y: {
    type: Number,
    reuired: true,
  },
  min_y: {
    type: Number,
    reuired: true,
  },
  max_z: {
    type: Number,
    reuired: true,
  },
  min_z: {
    type: Number,
    reuired: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Record", recordSchema);
