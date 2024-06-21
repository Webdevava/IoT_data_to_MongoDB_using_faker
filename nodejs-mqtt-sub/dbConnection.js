const mongoose = require("mongoose");

const url =
  "mongodb+srv://ankurauti:ankurauti02@cluster0.hgmfs5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function mongoConnect() {
  try {
    await mongoose
      .connect(url);
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

module.exports = mongoConnect;
