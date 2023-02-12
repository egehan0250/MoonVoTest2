const mongoose = require("mongoose");

const moonvostats = new mongoose.Schema({
last_login_date: String,
last_login_username: String,
last_login_userid: String,
total_login: Number,
last_login_mail: String,
last_control_time: String,
last_mongo_control_time: String,
      user_detail: [{
    userId: String,
    userName: String,
    date: String,
    ip: String,
  }],
});

const MessageModel = (module.exports = mongoose.model("moonvostats", moonvostats));