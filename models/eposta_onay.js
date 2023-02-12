const mongoose = require("mongoose");

const dogrulandı = new mongoose.Schema({
  eposta: String,
  kullanıcıadı: String,
});

const MessageModel = (module.exports = mongoose.model("eposta_onay", dogrulandı));