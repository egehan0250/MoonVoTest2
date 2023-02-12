const mongoose = require("mongoose");

const bakim = new mongoose.Schema({
  dataid: String,
  title: String,
  description: String
});

const MessageModel = (module.exports = mongoose.model("bakim", bakim));