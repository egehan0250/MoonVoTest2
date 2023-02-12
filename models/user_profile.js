const mongoose = require("mongoose");

const profile = new mongoose.Schema({
  user: String,
  user_id: String,
  first_name: String,
  last_name: String,
  age: String,
  number: String,
  mail: String,
  description: String,
  folowers: Number,
  folowers_user: String,
  folowing: Number,  
  like: Number,
  like_user: String,
  balance: Number,
  lastip: String,
  firstip: String,
  country: String,
  city: String,
  hostname: String,
  creationdate: String,
  github: String,
  ınstagram: String,
  codepen: String,
  last_login_date: String,
  avatarURL: String,
  ban: String,
  plan: String,
  status: String,
  total_user_login: Number,
  mail_send: String,
  confirmationCode: String,
    login_detail: [{
    last_id: String,
    last_mail: String,
    last_ip: String,
    last_date: String,
  }],
  plan_first_date: String,
  plan_finish_date: String,
  plan_detail: [{
    plan_name: String,
    start_date: String,
    finish_date: String
  }]
});

const MessageModel = (module.exports = mongoose.model("profile", profile));
