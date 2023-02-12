const mongoose = require("mongoose");

const servers = new mongoose.Schema({
  guildName: String,
  guildId: String,
  votes: Number,
  createDate: String,
  updateDate: String,
  serverDescription: String,
  serverInvite: String,
  ownerId: String,
  kurulumId: String,
  serverAvatarUrl: String,
  status: String,
    votes_detail: [{
    userId: String,
    userName: String,
    date: String,
  }],
});

const MessageModel = (module.exports = mongoose.model("servers", servers));