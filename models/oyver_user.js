const mongoose = require("mongoose");

const oyver = new mongoose.Schema({
  user: String,
  votes: [{
    guild: String,
    date: String,
  }],
  total_vote: Number,
  date: String,
  last_vote_server_name: String,
  last_vote_server_id: Number,
  last_vote_server_date: String
});

const MessageModel = (module.exports = mongoose.model("oyver_user", oyver));