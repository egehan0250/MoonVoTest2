const mongoose = require("mongoose");

const oyver = new mongoose.Schema({
  guild: String,
  votes: Number,
  date: String,
  last_vote_user_name: String,
  last_vote_user_id: Number,
  last_vote_user_date: String
});

const MessageModel = (module.exports = mongoose.model("oyver_guild", oyver));