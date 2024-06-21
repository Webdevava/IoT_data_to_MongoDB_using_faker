const mongoose = require("mongoose");

const devSchema = new mongoose.Schema({
  speed: { type: Number, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  time: { type: Number, required: true },
  date: { type: String, required: true },
});

const deviceSchema = mongoose.model("device", devSchema, "device_info");

module.exports = deviceSchema;
