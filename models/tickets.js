const mongoose = require("mongoose");

const tickets = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    subject: String,
    userid: String,
    priority: String,
    status: String,
    createDate: String,
    view_id: String,
    messages: Array
});

const MessageModel = (module.exports = mongoose.model("tickets", tickets));
