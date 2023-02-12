const mongoose = require("mongoose");

const bakiye = new mongoose.Schema({
  user: String,
  balance: Number
});

const MessageModel = (module.exports = mongoose.model("bakiye_transfer", bakiye));