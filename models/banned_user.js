const mongoose = require("mongoose");

const banned = new mongoose.Schema({
  user: String,
  date: String,
  sebep: String,
  banlayanname: String,
  banlayanıd: String,
});

const MessageModel = (module.exports = mongoose.model("banned_user", banned));