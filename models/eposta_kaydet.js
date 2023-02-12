const mongoose = require("mongoose");

const eposta = new mongoose.Schema({
  user: String,
  date: String,
  eposta: String,
  kullanıcıadı: String,
  avatar: String,
  username: String,
  userdiscriminator: String,
  userid: String,
});

const MessageModel = (module.exports = mongoose.model("eposta_kaydet", eposta));