const mongoose = require("mongoose");

const oyver = new mongoose.Schema({
  giris: Number
});

const MessageModel = (module.exports = mongoose.model("toplam_giris", oyver));