const mongoose = require('mongoose');

const messagesSchema = mongoose.Schema({
    name: String, //使用者名稱
    msg: String,    //訊息內容
    time: Number,   //發送時間
});

module.exports = mongoose.model('Messages', messagesSchema);